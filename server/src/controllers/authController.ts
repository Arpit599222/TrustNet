import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

const generateToken = (user: { id: string; email: string; name: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// POST /api/auth/signup
export const signup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: validationResult.error.errors[0].message 
      });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error('Database query error:', checkError);
      return res.status(500).json({ success: false, error: 'Database verification failure.' });
    }

    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email address already registered.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Save user in Supabase PostgreSQL mapping name -> full_name column
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          full_name: name,
          email: email.toLowerCase(),
          password_hash: passwordHash,
          last_login: new Date().toISOString()
        }
      ])
      .select('id, full_name, email, created_at')
      .single();

    if (insertError) {
      console.error('Insert query failure:', insertError);
      return res.status(500).json({ success: false, error: 'Failed to record user account.' });
    }

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.full_name
    });

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.full_name,
          email: newUser.email,
          createdAt: newUser.created_at
        }
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

// POST /api/auth/login
export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: validationResult.error.errors[0].message 
      });
    }

    const { email, password } = validationResult.data;

    // Find user in database, selecting full_name column
    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('id, full_name, email, password_hash, created_at')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (queryError) {
      console.error('Database query error:', queryError);
      return res.status(500).json({ success: false, error: 'Database query failure.' });
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: now })
      .eq('id', user.id);

    if (updateError) {
      console.warn('Failed to update last_login timestamp:', updateError);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.full_name
    });

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          createdAt: user.created_at
        }
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

const googleLoginSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  uid: z.string()
});

// POST /api/auth/google
export const googleLogin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validationResult = googleLoginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid Google Auth payload.' 
      });
    }

    const { email, name, uid } = validationResult.data;

    // Check if user exists
    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('id, full_name, email, created_at')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (queryError) {
      console.error('Database query error:', queryError);
      return res.status(500).json({ success: false, error: 'Database query failure.' });
    }

    let finalUser = user;

    // If no user exists, create one
    if (!finalUser) {
      // Create a random strong password hash for OAuth users so they can't login via email/password directly
      // unless they trigger a password reset later (if we implement that).
      const dummyPasswordHash = await bcrypt.hash(uid + Date.now().toString(), 10);
      
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            full_name: name,
            email: email.toLowerCase(),
            password_hash: dummyPasswordHash,
            last_login: new Date().toISOString()
          }
        ])
        .select('id, full_name, email, created_at')
        .single();

      if (insertError) {
        console.error('Insert query failure:', insertError);
        return res.status(500).json({ success: false, error: 'Failed to record Google user account.' });
      }
      finalUser = newUser;
    } else {
      // Update last_login for existing user
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', finalUser.id);
    }

    const token = generateToken({
      id: finalUser.id,
      email: finalUser.email,
      name: finalUser.full_name
    });

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: finalUser.id,
          name: finalUser.full_name,
          email: finalUser.email,
          createdAt: finalUser.created_at
        }
      }
    });

  } catch (err) {
    console.error('Google login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during Google login.' });
  }
};

// GET /api/auth/me
export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('id, full_name, email, created_at')
      .eq('id', req.user.id)
      .maybeSingle();

    if (queryError || !user) {
      return res.status(404).json({ success: false, error: 'User profile not found.' });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          createdAt: user.created_at
        }
      }
    });

  } catch (err) {
    console.error('GetMe profile fetch error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

export const logout = async (_req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};
