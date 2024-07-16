// routes/sets.js
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const { findSet, findCard, setsMap, cardsMap } = require('../utils/find');

router.get('/', (req, res) => { 
    res.json(setsMap); 
});

router.get('/:setCode', [param('setCode').isString().notEmpty()], (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
        res.json(setDetails);
    } else {
        res.status(404).json({ error: 'Set ' + req.params.setCode + ' not found' });
    } 
});

router.get('/:setCode/cards', [param('setCode').isString().notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
        res.json(setDetails.cards.map(cardId => cardsMap[cardId]));
    } else {
        res.status(404).json({ error: 'Set ' + req.params.setCode + ' not found' });
    }
});

router.get('/:setCode/:cardCode', [
    param('setCode').isString().notEmpty(),
    param('cardCode').isString().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);
    const cardDetails = findCard(req.params.cardCode);

    if (setDetails && cardDetails && setDetails.cards.includes(cardDetails.id)) {
        res.json(cardDetails);
    } else {
        res.status(404).json({ error: 'Card not found' });
    }
});

module.exports = router;