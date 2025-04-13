const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied: Insufficient role' });
        }
        next();
    };
};

module.exports = roleMiddleware;

