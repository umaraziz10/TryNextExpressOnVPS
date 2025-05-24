const jwt = require("jsonwebtoken")

const authMiddleware = ( req, res, next ) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({success: false, message:"JANGAN NAKAL AKU GASUKA"});
    }

    try{
        const decoded = jwt.verify(token,"RAHASIA");
        console.log("TOKEN DECODED:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({success: false, message:"KAMU JANGAN NAKAL AKU GASUKA YA"})
    }
};

module.exports = authMiddleware;