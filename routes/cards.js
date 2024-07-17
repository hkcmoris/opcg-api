// routes/cards.js
import express from 'express';
import { param, validationResult } from 'express-validator';
import { findCard, findCardsByFilter, cardsMap } from '../utils/find.js';

const router = express.Router();

router.get('/', (req, res) => { 
    res.json(cardsMap); 
});

router.get('/:cardCode', [param('cardCode').isString().notEmpty().withMessage('cardCode must be a non-empty string').trim().escape()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const cardDetails = findCard(req.params.cardCode);

    if (cardDetails) {
        res.json(cardDetails);
    } else {
        res.status(404).json({ error: `Card ${req.params.cardCode} not found` });
    }
});

router.get('/filter/:filter', [param('filter').isString().notEmpty().withMessage('filter must be a non-empty string').trim().escape()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filteredCards = findCardsByFilter(req.params.filter);
    res.json({ cards: filteredCards });
});

export default router;