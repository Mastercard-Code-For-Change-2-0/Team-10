const jwt = require('jsonwebtoken');

function auth(required = false) {
	return (req, res, next) => {
		const header = req.headers['authorization'] || '';
		const token = header.startsWith('Bearer ') ? header.slice(7) : null;
		if (!token) {
			if (required) return res.status(401).json({ message: 'Unauthorized' });
			return next();
		}
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
			req.user = payload;
			return next();
		} catch (e) {
			return res.status(401).json({ message: 'Invalid token' });
		}
	};
}

function allowRoles(...roles) {
	return (req, res, next) => {
		if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
		next();
	}
}

module.exports = { auth, allowRoles };
