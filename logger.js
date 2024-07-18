import winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.printf(
  ({ timestamp, level, message, meta }) => {
    return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
  },
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  }),
];

// Production-specific transports (if needed)
if (process.env.NODE_ENV === 'production') {
  // Add transports for external logging services here
  // Example:
  // transports.push(new winston.transports.Http({
  //   host: 'logs.example.com',
  //   path: '/logs',
  //   auth: { username: 'user', password: 'pass' },
  // }));
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports,
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

// Create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message) {
    // Remove the newline at the end of the message imposed by `morgan`
    logger.info(message.trim());
  },
};

export default logger;
