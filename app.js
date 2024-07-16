require('dotenv').config();
const requiredEnvVars = ['PORT', 'RATE_LIMIT', 'TIMEOUT'];
requiredEnvVars.forEach(key => {
    if (!process.env[key]) {
        console.error(`Error: Missing environment variable ${key}`);
        process.exit(1);
    }
});
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./errorHandler');
const setsRoutes = require('./routes/sets');
const cardsRoutes = require('./routes/cards');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined')); // Setting up Morgan middleware as a logger
}
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: process.env.TIMEOUT, // 15 minutes
    max: process.env.RATE_LIMIT, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/v2/sets', setsRoutes);
app.use('/api/v2/cards', cardsRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api/v2/`);
});