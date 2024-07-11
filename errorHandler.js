// errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
    }
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

module.exports = errorHandler;