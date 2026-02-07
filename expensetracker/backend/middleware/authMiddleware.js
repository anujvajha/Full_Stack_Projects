const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => 
{
      const token = req.cookies.jwt;

      if (!token) 
      {
        return res.status(401).json({ error: "Unauthorized" });
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
        return res.status(401).json({ error: "Unauthorized" });
      }
};

module.exports = requireAuth;



