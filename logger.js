import winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.printf(
  ({ timestamp, level, message, meta }) => {
    return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
  },
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
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
