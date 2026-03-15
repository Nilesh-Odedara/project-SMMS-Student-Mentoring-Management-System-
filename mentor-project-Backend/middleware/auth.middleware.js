const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(400).json({ message: "authentication required" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded) {
            next();
        }
        else {
            res.status(401).json({ message: "invalid authentication" })
        }
    } catch (err) {
        console.error("Auth Error:", err);
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}

module.exports = authMiddleware