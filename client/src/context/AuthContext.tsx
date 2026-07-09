import React, { createContext, useContext, useState, useEffect } from 'react';
// import { api } from '../services/api.js';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../config/firebase.js';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'mock-id',
    name: 'UI Prototype User',
    email: 'prototype@trustnet.local',
    createdAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear global context errors
  const clearError = () => setError(null);

  // ponytail: fetch user profile on startup if token exists in storage
  useEffect(() => {
    const fetchUser = async () => {
      // TODO: Restore backend API calls for production deployment.
      const isAuth = localStorage.getItem('isAuthenticated');
      if (!isAuth) {
        setLoading(false);
        return;
      }
      
      // Temporary mock session
      setUser({ id: 'mock-id', name: 'UI Prototype User', email: 'prototype@trustnet.local', createdAt: new Date().toISOString() });
      setLoading(false);
      /*
      const token = localStorage.getItem('trustnet_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setUser(res.data.data.user);
        } else {
          localStorage.removeItem('trustnet_token');
        }
      } catch (err) {
        console.warn('Failed to verify token on startup:', err);
        localStorage.removeItem('trustnet_token');
      } finally {
        setLoading(false);
      }
      */
    };
    fetchUser();
  }, []);

  const login = async (email: string, _password: string) => {
    setError(null);
    try {
      // TODO: Restore backend API calls for production deployment.
      localStorage.setItem('isAuthenticated', 'true');
      setUser({ id: 'mock-id', name: 'UI Prototype User', email, createdAt: new Date().toISOString() });
      /*
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token, user: userData } = res.data.data;
        localStorage.setItem('trustnet_token', token);
        setUser(userData);
      }
      */
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to sign in. Please try again.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const signup = async (name: string, email: string, _password: string) => {
    setError(null);
    try {
      // TODO: Restore backend API calls for production deployment.
      localStorage.setItem('isAuthenticated', 'true');
      setUser({ id: 'mock-id', name, email, createdAt: new Date().toISOString() });
      /*
      const res = await api.post('/auth/signup', { name, email, password });
      if (res.data.success) {
        const { token, user: userData } = res.data.data;
        localStorage.setItem('trustnet_token', token);
        setUser(userData);
      }
      */
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to create account. Please try again.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      // TODO: Restore backend API calls for production deployment.
      localStorage.setItem('isAuthenticated', 'true');
      setUser({ id: 'mock-id', name: 'Google Prototype User', email: 'google@trustnet.local', createdAt: new Date().toISOString() });
      /*
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const res = await api.post('/auth/google', { 
        name: user.displayName || 'Google User', 
        email: user.email,
        uid: user.uid
      });
      
      if (res.data.success) {
        const { token, user: userData } = res.data.data;
        localStorage.setItem('trustnet_token', token);
        setUser(userData);
      }
      */
    } catch (err: any) {
      console.error("Google Auth error:", err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to sign in with Google. Please try again.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const logout = async () => {
    try {
      // TODO: Restore backend API calls for production deployment.
      // Best-effort backend notify
      // await api.post('/auth/logout');
    } catch (err) {
      console.warn('Backend logout notification failed:', err);
    } finally {
      localStorage.removeItem('isAuthenticated');
      // localStorage.removeItem('trustnet_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
