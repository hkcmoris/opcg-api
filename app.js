require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./errorHandler');
const setsRoutes = require('./routes/sets');
const cardsRoutes = require('./routes/cards');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT || 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/v1/sets', setsRoutes);
app.use('/api/v1/cards', cardsRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});