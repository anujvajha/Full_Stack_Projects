import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();
import {fetchDoc, shareDoc} from '../controllers/editorController.js';
import { addDoc, deleteDoc, display, updateDoc } from '../controllers/sidePanelController.js';
import { post_login, post_signup, get_logout, getMe } from '../controllers/authController.js';

router.post('/login', post_login);
router.post('/signup', post_signup);
router.get('/logout', requireAuth, get_logout);
router.get('/me', requireAuth, getMe);

router.get('/:id', requireAuth, fetchDoc);
router.get('/', requireAuth, display);
router.post('/', requireAuth, addDoc);
router.delete('/:id', requireAuth, deleteDoc);
router.patch('/:id', requireAuth, updateDoc);
router.patch('/:id/share', requireAuth, shareDoc);




export default router;