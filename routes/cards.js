// routes/sets.js
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { findSet, findCard, findCards, cardsMap } = require('../utils/find');

const collectionData = require('../collection.json');


router.get('/', (req, res) => { 
    res.json(cardsMap); 
});

router.get('/:cardCode', [param('cardCode').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const cardDetails = findCards(req.params.cardCode);

    if (cardDetails.length > 0) {
        res.json({cards: cardDetails});
    } else {
        res.status(404).json({ error: 'Card not found' });
    }
});

router.get('/api/cards/filter/:filter', [param('filter').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filter = req.params.filter.toLowerCase();
    const filteredCards = [];

    Object.values(cardsMap).forEach(card => {
        let featureMatch = false;
        if (Array.isArray(card.feature)) {
            featureMatch = card.feature.some(f => f.toLowerCase().includes(filter));
        } else if (typeof card.feature === 'string') {
            featureMatch = card.feature.toLowerCase().includes(filter);
        }

        if ((card.type && card.type.toLowerCase().includes(filter)) ||
            featureMatch ||
            (card.name && card.name.toLowerCase().includes(filter)) ||
            (card.code && card.code.toUpperCase().includes(filter))) {
            filteredCards.push(card);
        }
    });

    res.json({ cards: filteredCards });
});

module.exports = router;