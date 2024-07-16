// routes/sets.js
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { findSet, findCard, setsMap } = require('../utils/find');

router.get('/', (req, res) => { 
    res.json(setsMap); 
});

router.get('/:setId', [param('setId').isString().notEmpty()], (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const setDetails = findSet(req.params.setId);

    if (setDetails) {
        const { cards, ...detailsWithoutCards } = setDetails;
        res.json(detailsWithoutCards);
    } else {
        res.status(404).json({ error: 'Set not found' });
    } 
});

router.get('/:setId/cards', [param('setId').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setId);

    if (setDetails) {
        res.json(setDetails);
    } else {
        res.status(404).json({ error: 'Set not found' });
    }
});

router.get('/:setId/:cardId', [
    param('setId').isString().notEmpty(),
    param('cardId').isString().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setId);
    const cardDetails = findCard(req.params.cardId);

    if (cardDetails && setDetails && setDetails.cards[cardDetails.code] === cardDetails) {
        res.json(cardDetails);
    } else {
        res.status(404).json({ error: 'Card not found' });
    }
});

module.exports = router;