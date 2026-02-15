import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => 
{
    const token = req.cookies.jwt;

    if(token)
    {
        try 
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        }
        catch (err)
        {
            res.clearCookie("jwt");
            return res.status(401).json({ success: false, message: "Please login/ signup!" });
        }
    }
    else 
    {
        return res.status(401).json({ success: false, message: "Please login/ signup!" });
    }
}

export default requireAuth;