import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import errorHandler from './errorHandler.js';
import setsRoutes from './routes/sets.js';
import cardsRoutes from './routes/cards.js';
import indexRoutes from './routes/index.js';
import setupSwagger from './swagger.js';

dotenv.config();

const requiredEnvVars = ['PORT', 'RATE_LIMIT', 'TIMEOUT'];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: Missing environment variable ${key}`);
    process.exit(1);
  }
});

const app = express();
const port = process.env.PORT || 3000;

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy:
      process.env.NODE_ENV === 'production' ? true : false,
  }),
);

// default Morgan dev format without colors
const morganDevFormat =
  ':method :url :status :response-time ms - :res[content-length]';
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(morganDevFormat, { stream: logger.stream }));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://devground.cz'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

const limiter = rateLimit({
  windowMs: process.env.TIMEOUT || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.secure) {
      return next();
    }
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

setupSwagger(app);

app.use('/api/v2', indexRoutes);
app.use('/api/v2/sets', setsRoutes);
app.use('/api/v2/cards', cardsRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  errorHandler(err, req, res, next);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}/api/v2/`);
  });
}

export { app };
