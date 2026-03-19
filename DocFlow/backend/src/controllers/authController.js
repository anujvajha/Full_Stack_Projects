import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const maxage = 4*24*60*60;

const createToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, 
    {
        expiresIn: maxage
    });
}

const post_signup = async (req, res) =>
{
    try 
    {
        const {name, email, password} = req.body;
        const user = await User.create({name, email, password});
        if(user)
        {
            const token = createToken(user._id);
            res.cookie('jwt', token, 
            {
                httpOnly: true,
                maxAge: maxage * 1000,
                sameSite: 'lax',
                secure: false,
                path: '/'
            });
            res.status(201).json({user: user._id});
        }
        else 
        {
            res.status(400).json({ error: "Signup failed!" });
        }
    }
    catch (err)
    {
        return res.status(500).json({ error: "Internal Error!" });
    }

}

const post_login = async (req, res) =>
{
    try 
    {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({error: "All fields are required!"});

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
                    maxAge: maxage * 1000,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
                res.status(200).json({user: user._id});
            }
            else 
            {
                res.status(401).json({ error: "Wrong password!" });
            }
        }
        else 
        {
            res.status(401).json({ error: "Wrong email!" });
        }
    }
    catch (err)
    {
        res.status(500).json({ error:"Internal Error!" });
    }
}


const get_logout = (req, res) =>
{
    try 
    {
        res.cookie('jwt', '', 
        {
            httpOnly: true,
            maxAge: 1,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });
        res.status(200).json({message: "Logout Successful!"});
    }
    catch (err)
    {
        res.status(500).json({error: "Logout Unsuccessful!"});
    }
}


const getMe = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found!" });
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(500).json({ error: "Could not fetch user!" });
    }
}

export {post_signup, post_login, get_logout, getMe};