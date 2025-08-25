// Core server bootstrap for Seva Sahayog API
// Initializes env, sets up Express with common middleware, and exposes a basic healthcheck.

// Load environment variables ASAP
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const { logger } = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { connectMongo } = require('./utils/db');

const app = express();

// Basic security and parsing
app.use(helmet());
// CORS: allow configured client URL with credentials; otherwise allow all without credentials
const clientUrl = process.env.CLIENT_URL;
app.use(
	cors({
		origin: clientUrl || true,
		credentials: true,
	})
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));

// Routers (mount under /api)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/requests', require('./routes/requests'));
try {
	app.use('/api/matches', require('./routes/matches'));
} catch {}
try {
	app.use('/api/notifications', require('./routes/notifications'));
} catch {}
try {
	app.use('/api/admin', require('./routes/admin'));
} catch {}
try {
	app.use('/api/upload', require('./routes/upload'));
} catch {}

// Healthcheck
app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		env: process.env.NODE_ENV || 'development',
		time: new Date().toISOString(),
	});
});

// Placeholder API root
app.get('/', (req, res) => {
	res.json({ name: 'Seva Sahayog API', version: '1.0.0' });
});

// 404 + error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

// Start server
// Connect DB if configured (support both MONGODB_URI and MONGO_URI)
connectMongo(process.env.MONGODB_URI || process.env.MONGO_URI);

const server = app.listen(PORT, () => {
	logger.info(`Server listening on port ${PORT}`);
});

// Graceful shutdown
const shutdown = (signal) => {
	logger.info(`${signal} received, shutting down gracefully...`);
	server.close(() => {
		logger.info('HTTP server closed. Bye!');
		process.exit(0);
	});
	// Force exit if not closed in time
	setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception', { message: err.message, stack: err.stack });
});
process.on('unhandledRejection', (reason) => {
	logger.error('Unhandled Rejection', { reason });
});

