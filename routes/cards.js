// routes/cards.js
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const { findCard, findCardsByFilter, cardsMap } = require('../utils/find');

router.get('/', (req, res) => { 
    res.json(cardsMap); 
});

router.get('/:cardCode', [param('cardCode').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const cardDetails = findCard(req.params.cardCode);

    if (cardDetails) {
        res.json(cardDetails);
    } else {
        res.status(404).json({ error: 'Card '+cardCode+' not found' });
    }
});

router.get('/filter/:filter', [param('filter').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filteredCards = findCardsByFilter(req.params.filter);
    res.json({ cards: filteredCards });
});

module.exports = router;