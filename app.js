import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import errorHandler from './errorHandler.js'; // .js extension needed
import setsRoutes from './routes/sets.js'; // .js extension needed
import cardsRoutes from './routes/cards.js'; // .js extension needed
import indexRoutes from './routes/index.js'; // .js extension needed

dotenv.config();

const requiredEnvVars = ['PORT', 'RATE_LIMIT', 'TIMEOUT'];
requiredEnvVars.forEach(key => {
    if (!process.env[key]) {
        console.error(`Error: Missing environment variable ${key}`);
        process.exit(1);
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined')); 
}
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: process.env.TIMEOUT, // 15 minutes
    max: process.env.RATE_LIMIT, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/v2', indexRoutes);
app.use('/api/v2/sets', setsRoutes);
app.use('/api/v2/cards', cardsRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api/v2/`);
});