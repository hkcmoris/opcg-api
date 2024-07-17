import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { 
    const response = {
        message: 'Hello from the API',
        version: '2.0.0',
        hint: 'You can view these routes: http://localhost:3000/api/v2/sets and http://localhost:3000/api/v2/cards'
    };
    res.json(response);
});

export default router;