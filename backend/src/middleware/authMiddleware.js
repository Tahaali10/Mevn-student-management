const jwt = require('jsonwebtoken');
const authModel = require('../model/authModel');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).send({ status: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await authModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({ status: false, message: "Failed to authenticate token", error });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ status: false, message: "Admin role required" });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
