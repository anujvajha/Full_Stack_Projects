import express from 'express';
const router = express.Router();
import {addTransaction, deleteTransaction, editTransaction} from '../controllers/transactionController';
import requireAuth from '../middleware/authMiddleware';
import { getSummary, categoryExpense } from '../controllers/analyticsController';

router.post('/addTransaction', requireAuth, addTransaction);
router.delete('/deleteTransaction/:id', requireAuth, deleteTransaction);
router.patch('/editTransaction/:id', requireAuth, editTransaction);
router.get('/getSummary', requireAuth, getSummary)
router.get('/categoryExpense', requireAuth, categoryExpense)

export default router;