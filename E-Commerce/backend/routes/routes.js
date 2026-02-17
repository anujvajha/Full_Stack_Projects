const express = require('express');
const { post_signup, post_login, getLogout, getProducts, addtocart, viewcart, payment, deleteitem } = require('../controllers/controllers');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware.js');

router.post('/signup', post_signup);
router.post('/login', post_login);
router.get('/logout', getLogout);
router.get('/products', getProducts);
router.post('/addtocart', requireAuth, addtocart);
router.get('/viewcart', requireAuth, viewcart);
router.post('/payment', requireAuth, payment);
router.delete('/deleteitem/:id', requireAuth, deleteitem);

module.exports = router;