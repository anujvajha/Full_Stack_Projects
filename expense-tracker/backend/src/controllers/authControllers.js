import User from "../models/userModel";
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
            res.status(400).json({error: "Signup failed"});
        }
    }
    catch (err)
    {
        res.status(400).json({error: "Signup failed"});
    }
}

const post_login = async (req, res) =>
{
    try 
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
                    maxAge: maxage * 1000,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
                res.status(200).json({user: user._id});
            }
            else 
            {
                res.status(401).json({error: "Wrong password"});
            }
        }
        else 
        {
            res.status(401).json({error: "Wrong email"});
        }
    }
    catch (err)
    {
        res.status(401).json({error: "Login failed"});
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
        res.status(500).json({error: "Logout unsuccessful"});
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
            res.status(404).json({error: "Couldnt edit user profile"});
        }
    }
    catch (err)
    {
        res.status(500).json({error: "Couldnt edit user profile"});
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
                return res.status(401).json({ error: "Current password incorrect" });
            }
        }
        else 
        {
            return res.status(404).json({ error: "User not found" });
        }
    }
    catch (err)
    {
        res.status(500).json({ error: "Could not update password" });
    }
}


export {post_signup, post_login, get_logout, editProfile, editPassword};