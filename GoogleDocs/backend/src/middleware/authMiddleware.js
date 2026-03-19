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
            res.clearCookie("jwt"); // removes jwt cookie from the browser 
            return res.status(401).json({ message: "Please login/ signup!"});
        }
    }
    else 
    {
        return res.status(401).json({ message : "Please login/ signup!" });
    }
}

export default requireAuth;
