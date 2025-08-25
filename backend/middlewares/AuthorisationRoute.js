// middlewares/AuthorisationRoute.js

const AuthorisationRoute = (...allowedRoles) => {
    return (req, res, next) => {
    
        const user = req.user;

        if (!user || !user.role) {
            return res.status(403).json({
                message: "Forbidden: User role not found.",
                success: false
            });
        }
        
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to access this route.",
                success: false
            });
        }
        next();
    };
}

export default AuthorisationRoute;