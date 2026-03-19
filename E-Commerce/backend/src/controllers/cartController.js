const User = require('../models/users.js');
const Product = require('../models/products.js');
require('dotenv').config();

const getProducts = async (req, res) => 
{
    try 
    {
        const data = await Product.find();
        if(data) 
        {
            res.status(200).json(data);
        }
        else 
        {
            console.log("Failed to fetch products");
            res.status(500).json({ message: 'Failed to fetch products' });
        }
    }
    catch (err)
    {
        console.log("Failed to fetch products:", err.message);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

const addtocart = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        const {productId, quantity} = req.body;
        const required_user = await User.findById(userId);
        if(required_user)
        {
            required_user.cart.push({product: productId, quantity});
            await required_user.save();
            res.status(200).json({ message: "Product added to cart"});
        }
        else 
        {
            console.log("Failed to add to cart: user not found");
            res.status(500).json({ message: "Failed to add to cart" });
        }
    }
    catch (err)
    {
        console.log("Failed to add to cart:", err.message);
        res.status(500).json({ message: "Failed to add to cart" });
    }
}

const viewcart = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        const req_user = await User.findById(userId).populate("cart.product");
        if(req_user)
        {
            const cart = req_user.cart;
            res.status(200).json({cart: cart});
        }
        else 
        {
            console.log("User not found for viewcart");
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err)
    {
        console.log("Error viewing cart:", err.message);
        res.status(500).json({ message: "User not found" });
    }
    
}

const payment = (req, res) => 
{
    try 
    {
        const { amount } = req.body;

        if (!amount || amount <= 0) 
        {
            console.log("Invalid payment amount:", amount);
            return res.status(400).json({ message: "Invalid amount" });
        }
        const userId = req.userId;

        setTimeout(async () => 
        {
            await User.findByIdAndUpdate(userId, 
            {
                $set: {cart: []}
            });

            res.status(200).json(
            {
                success: true,
                paymentId: "PAY_" + Date.now()
            });
        }, 400);

    } 
    catch (err) 
    {
        console.log("Payment failed:", err.message);
        res.status(500).json({ message: "Payment failed" });
    }
}

const deleteitem = async (req, res) => 
{
    try 
    {
        const userId = req.userId;
        const cartId = req.params.id;
        const user = await User.findById(userId);

        if(user)
        {
            user.cart = user.cart.filter((item) => item._id.toString() !==cartId);
            await user.save();
            res.status(200).json({ message: "Item removed from cart", cart: user.cart });
        }
        else 
        {
            console.log("Failed to remove item: user not found");
            res.status(500).json({ message: "Failed to remove item from cart" });
        }
    }
    catch (err)
    {
        console.log("Failed to remove item from cart:", err.message);
        res.status(500).json({ message: "Failed to remove item from cart" });
    }
}

module.exports = {getProducts, addtocart, viewcart, payment, deleteitem };