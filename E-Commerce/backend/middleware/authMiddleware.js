const jwt = require("jsonwebtoken")
const requireAuth = (req, res, next) => 
{
      const token = req.cookies.jwt;

      if (!token) 
      {
        return res.status(401).json({ errors: { general: "Unauthorized User! Please login/signup!" } });
      }

      try 
      {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
      } 
      catch (err) 
      {
        res.clearCookie("jwt");
        return res.status(401).json({ errors: { general: "Unauthorized User! Please login/signup!" } });
      }
};

module.exports = requireAuth;
