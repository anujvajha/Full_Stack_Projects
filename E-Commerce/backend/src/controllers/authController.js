const User = require('../models/users.js');
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
        console.log("Signup failed:", err.message);
        res.status(500).json({ message: "Signup failed" });
    }
};


const post_login = async (req, res) => 
{
    try 
    {
        const { email, password } = req.body;

        console.log("Entered email:", email);
        console.log("Entered password:", password);

        const user = await User.findOne({ email });

        console.log("User from DB:", user);

        if (!user) 
        {
            return res.status(401).json({ message: "Login failed" });
        }

        const auth = await bcrypt.compare(password, user.password);

        console.log("Password match:", auth);
        console.log("Stored hashed password:", user.password);

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
            return res.status(401).json({ message: "Login failed" });
        }
 
    } 
    catch (err) 
    {
        console.log("Login error:", err.message);
        res.status(500).json({ message: "Login failed" });
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
        console.log("Logout failed:", err.message);
        res.status(500).json({ message: "Logout failed" });
    }
};

module.exports = { post_signup, post_login, getLogout};