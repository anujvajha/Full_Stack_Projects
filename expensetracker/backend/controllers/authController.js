const User = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const maxAge = 4*24*60*60;

const createToken = (id) => 
{
    return jwt.sign({id}, process.env.JWT_SECRET, 
    {
        expiresIn: maxAge,
    })
}

const post_signup = async (req, res) => 
{
    const {name, email, password} = req.body;
    const user = await User.create({name,email,password});

    if(user)
    {
        const token = createToken(user._id);
        res.cookie('jwt', token, 
        {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });
        res.status(201).json({user: user._id});
    }
    else 
    {
        return res.status(400).json({ error: "Signup failed" });
    }
}

const post_login = async (req, res) => 
{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user)
    {
        const auth = await bcrypt.compare(password, user.password);
        if(auth)
        {
            const token = createToken(user._id);
            res.cookie('jwt', token, 
            {
                httpOnly: true,
                maxAge: maxAge * 1000,
                sameSite: 'lax',
                secure: false,
                path: '/'
            });
            res.status(200).json({user: user._id});
        }
        else 
        {
            return res.status(400).json({ error: "Login failed" });
        }

    }
    else 
    {
        return res.status(400).json({ error: "Wrong Email" });
    }
}

const get_logout = (req, res) => 
{
    res.cookie('jwt', '', 
    {
        httpOnly: true,
        maxAge: 1, 
        sameSite: 'lax',
        path: '/'
    });
    res.status(200).json({ message: 'Logged out successfully' });
}



module.exports = {post_login, post_signup, get_logout};