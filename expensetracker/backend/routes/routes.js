const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware.js');
const {post_login, post_signup , get_logout } = require('../controllers/authController.js');
const { addExpense, deleteExpense, editExpense, displayExpenses} = require('../controllers/expenseController.js');

router.post('/login',post_login);
router.post('/signup',post_signup);
router.post('/addExpense', requireAuth, addExpense);
router.patch('/editExpense/:id', requireAuth, editExpense);
router.delete('/deleteExpense/:id', requireAuth, deleteExpense);
router.get('/allExpenses', requireAuth, displayExpenses);
router.get('/logout',get_logout);


module.exports = router;