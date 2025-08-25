const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: format.combine(
		format.timestamp(),
		format.errors({ stack: true }),
		format.json()
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.printf(({ level, message, timestamp, ...meta }) => {
					const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
					return `[${timestamp}] ${level}: ${message}${rest}`;
				})
			),
		}),
	],
});

module.exports = { logger };

