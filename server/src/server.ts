import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const ALLOWED_ORIGINS = [CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'];

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS configurations
app.use(cors({
  origin: ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Request Parsers
app.use(express.json());

// 4. Rate Limiting to prevent brute-force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit login/signup to 10 requests per minute
  message: { success: false, error: 'Too many attempts. Please wait a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);

// 5. Mount API Routes
app.use('/api/auth', authRoutes);

// Root diagnostic route
app.get('/', (_req, res) => {
  res.json({ status: 'active', platform: 'TrustNet Trust API', timestamp: new Date().toISOString() });
});

// 6. Global Fallback Error Handler Middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server exception:', err);
  res.status(500).json({ success: false, error: 'Something went wrong on the server.' });
});

// Start listening if not in a serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`TrustNet Server running in local mode on port ${PORT}`);
    console.log(`Accepting CORS requests from: ${CLIENT_URL}`);
  });
}

export default app;
