const { logger } = require('../utils/logger');

function notFound(req, res, next) {
	res.status(404);
	res.json({ message: 'Not Found' });
}

function errorHandler(err, req, res, next) {
	const status = err.status || err.statusCode || 500;
	const payload = {
		message: err.message || 'Internal Server Error',
	};
	if (process.env.NODE_ENV !== 'production' && err.stack) {
		payload.stack = err.stack;
	}
	logger.error('Request error', { status, message: payload.message });
	res.status(status).json(payload);
}

module.exports = { notFound, errorHandler };

// placeholder
