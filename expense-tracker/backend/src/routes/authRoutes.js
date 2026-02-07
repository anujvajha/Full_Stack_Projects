import express from 'express';
const router = express.Router();
import {post_login, post_signup, get_logout, editProfile, editPassword} from '../controllers/authControllers.js';
import requireAuth from '../middleware/authMiddleware.js';

router.post('/login', post_login);
router.post('/signup', post_signup);
router.get('/logout', requireAuth, get_logout);
router.patch('/editProfile', requireAuth, editProfile);
router.patch('/editPassword', requireAuth, editPassword);



export default router;