const User = require('../models/users.js');
const Product = require('../models/products.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60; 

const createToken = (id) => 
{
    return jwt.sign(
    { id }, process.env.JWT_SECRET,
    {
        expiresIn: maxAge,
        noTimestamp: true
    });

};

const post_signup = async (req, res) => 
{
    try 
    {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, 
        {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });
        res.status(201).json({ user: user._id });
    } 
    catch (err) 
    {
        if (err.name === "ValidationError")
        {
            const errors = {};

            Object.values(err.errors).forEach(e =>
            {
                errors[e.path] = e.message;
            });

            return res.status(400).json({ errors });
        }
        if (err.code === 11000)
        {
            return res.status(400).json(
            {
                errors: { email: "Email already exists!" }
            });
        }
        res.status(500).json({ errors: { general: "Signup failed!" } });
    }
};

const post_login = async (req, res) => 
{
    try 
    {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ errors: { email: "Wrong email!" } });

        if (user)
        {
            const auth = await bcrypt.compare(password, user.password);
            if(auth)
            {
                const token = createToken(user._id);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'       
                });
                res.status(200).json({ user: user._id });
            }
            else 
            {
                return res.status(401).json({ errors: { password: "Wrong password!" } });
            }
        }
        else 
        {
            return res.status(401).json({ errors: { email: "Wrong email!" } });
        }
 
    } 
    catch (err) 
    {
        res.status(500).json({ errors: { general: "Login failed!" } });
    }
};

const getLogout = (req, res) => 
{
    try 
    {
        res.cookie('jwt', '', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,          
            path: '/',
            expires: new Date(0)
        });

        res.status(200).json({ message: 'Logged out' });
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: "Logout Unsuccessful!" } });
    }
};



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
            res.status(500).json({ errors: { general: 'Failed to fetch products' } });
        }
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: 'Failed to fetch products' } });
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
            res.status(500).json({ errors: { general: "Failed to add to cart" } });
        }
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: "Failed to add to cart" } });
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
            res.status(404).json({ errors: { general: "User not found!" } });
        }
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: "User not found!" } });
    }
    
}

const payment = (req, res) => 
{
    try 
    {
        const { amount } = req.body;

        if (!amount || amount <= 0) 
        {
            return res.status(400).json({ errors: { general: "Invalid amount" } });
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
        res.status(500).json({ errors: { general: "Payment failed" } });
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
            res.status(500).json({ errors: { general: "Failed to remove item from cart" } });
        }
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: "Failed to remove item from cart" } });
    }
}

module.exports = { post_signup, post_login, getLogout, getProducts, addtocart, viewcart, payment, deleteitem };
