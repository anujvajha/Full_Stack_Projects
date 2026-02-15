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
            res.status(201).json({success: true, data: {user: user._id}});
        }
        else 
        {
            res.status(500).json({success: false, message: "Signup failed!"});
        }
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

            return res.status(400).json({success: false, errors});
        }
        if (err.code === 11000)
        {
            return res.status(400).json(
            {
                success: false,
                errors: { email: "Email already exists!" }
            });
        }
        res.status(500).json({success: false, message: "Internal Error!"});
    }

}

const post_login = async (req, res) =>
{
    try 
    {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({success: false, message: "All fields are required!" });

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
                res.status(200).json({success: true, data: {user: user._id}});
            }
            else 
            {
                res.status(401).json({success: false, message: "Wrong password!" });
            }
        }
        else 
        {
            res.status(401).json({success: false, message: "Wrong email!" });
        }
    }
    catch (err)
    {
        res.status(500).json({success: false, message:"Internal Error!" });
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
        res.status(200).json({success: true, message: "Logout Successful!"});
    }
    catch (err)
    {
        res.status(500).json({success: false, message: "Logout Unsuccessful!"});
    }
}

const getMe = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({success: false, message: "User not found!" });
        res.status(200).json({success: true, data: user});
    }
    catch (err)
    {
        res.status(500).json({success: false, message: err.message || "Could not fetch user!" });
    }
}

export {post_signup, post_login, get_logout, getMe};