import express from 'express';
const router = express.Router();
import {post_login, post_signup, get_logout, getMe} from '../controllers/authControllers.js';
import requireAuth from '../middleware/authMiddleware.js';

router.post('/login', post_login);
router.post('/signup', post_signup);
router.get('/logout', requireAuth, get_logout);
router.get('/me', requireAuth, getMe);



export default router;