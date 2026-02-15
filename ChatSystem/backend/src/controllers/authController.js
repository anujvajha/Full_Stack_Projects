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
            res.status(400).json({ errors: { general: "Signup failed!" } });
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

            return res.status(400).json({ errors});
        }
        if (err.code === 11000)
        {
            return res.status(400).json(
            {
                errors: { email: "Email already exists!" }
            });
        }
        res.status(500).json({ errors: { general: "Internal Error!" } });
    }

}

const post_login = async (req, res) =>
{
    try 
    {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!email || !password) return res.status(400).json({errors: { general: "All fields are required!" }});

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
                res.status(401).json({ errors: { password: "Wrong password!" } });
            }
        }
        else 
        {
            res.status(401).json({ errors: { email: "Wrong email!" } });
        }
    }
    catch (err)
    {
        res.status(500).json({ errors: { general:"Internal Error!" } });
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
        res.status(500).json({errors: {general: "Logout Unsuccessful!"}});
    }
}

const getMe = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ errors: { general: "User not found!" } });
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(500).json({ errors: { general: err.message || "Could not fetch user!" } });
    }
}

export {post_signup, post_login, get_logout, getMe};
