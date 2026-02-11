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
        if(!name || !email || !password) return res.status(400).json({message: "All fields are required"});
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
            res.status(400).json({ message: "Signup failed" });
        }
    }
    catch (err)
    {
        res.status(500).json({ message: "Internal Error" });
    }
}

const post_login = async (req, res) =>
{
    try 
    {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!email || !password) return res.status(400).json({message: "All fields are required"});

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
                res.status(401).json({ message: "Wrong password" });
            }
        }
        else 
        {
            res.status(401).json({ message: "Wrong email" });
        }
    }
    catch (err)
    {
        res.status(500).json({ message:"Internal Error" });
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
        res.status(200).json({message: "Logout successful"});
    }
    catch (err)
    {
        res.status(500).json({message: "Logout unsuccessful"});
    }
}

const editProfile = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const {name, email} = req.body;

        const user = await User.findOneAndUpdate({_id: userId}, {name, email}, {new: true});
        if(user)
        {
            res.status(200).json({user: user._id});
        }
        else 
        {
            res.status(404).json({message: "User not found"});
        }
    }
    catch (err)
    {
        res.status(500).json({message: "Couldnt edit user profile"});
    }
}

const editPassword = async (req, res) =>
{
    try 
    {
        const userId = req.userId;
        const user = await User.findById(userId);
        const {oldPassword, newPassword} = req.body;
        if(user)
        {
            const auth = await bcrypt.compare(oldPassword, user.password);
            if(auth)
            {
                user.password = newPassword;
                await user.save();
                res.status(200).json({ message: "Password updated successfully" });
            }
            else 
            {
                return res.status(401).json({ message: "Current password incorrect" });
            }
        }
        else 
        {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (err)
    {
        res.status(500).json({ message: "Could not update password" });
    }
}

const getMe = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message || "Could not fetch user" });
    }
}

export {post_signup, post_login, get_logout, editProfile, editPassword, getMe};
