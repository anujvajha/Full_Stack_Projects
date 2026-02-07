import express from 'express';
const router = express.Router();
import {addTransaction, deleteTransaction, editTransaction, display} from '../controllers/transactionController.js';
import requireAuth from '../middleware/authMiddleware.js';
import { getSummary, categoryExpense } from '../controllers/analyticsController.js';

router.post('/addTransaction', requireAuth, addTransaction);
router.delete('/deleteTransaction/:id', requireAuth, deleteTransaction);
router.patch('/editTransaction/:id', requireAuth, editTransaction);
router.get('/getSummary', requireAuth, getSummary)
router.get('/categoryExpense', requireAuth, categoryExpense)
router.get('/display', requireAuth, display);


export default router;