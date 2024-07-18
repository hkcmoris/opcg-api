// errorHandler.js
import logger from './logger.js';

const errorHandler = (err, req, res) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    status: statusCode,
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user || 'Unauthenticated',
  });
  res.json({
    status: 'error',
    statusCode: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
