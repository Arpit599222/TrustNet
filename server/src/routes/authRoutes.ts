import { Router } from 'express';
import { signup, login, googleLogin, getMe, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Routes definitions
router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', authenticateToken, getMe);
router.post('/logout', authenticateToken, logout);

export default router;
