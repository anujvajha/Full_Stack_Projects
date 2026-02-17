import express from 'express';
const router = express.Router();
import requireAuth from '../middleware/authMiddleware.js';
import { get_all_conv, get_conv, get_messages } from '../controllers/convController.js';

router.get('/getConv/:id', requireAuth, get_conv);
router.get('/getAllConv', requireAuth, get_all_conv);
router.get('/getMessages/:id', requireAuth, get_messages);


export default router;