// routes/sets.js
import express from 'express';
import { param, validationResult } from 'express-validator';
import { findSet, findCard, setsMap, cardsMap } from '../utils/find.js';

const router = express.Router();

router.get('/', (req, res) => { 
    res.json(setsMap); 
});

router.get('/:setCode', [param('setCode').isString().notEmpty().withMessage('setCode must be a non-empty string').trim().escape()], (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
        res.json(setDetails);
    } else {
        res.status(404).json({ error: `Set ${req.params.setCode} not found` });
    } 
});

router.get('/:setCode/cards', [param('setCode').isString().notEmpty().withMessage('setCode must be a non-empty string').trim().escape()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
        res.json(setDetails.cards.map(cardId => cardsMap[cardId]));
    } else {
        res.status(404).json({ error: `Set ${req.params.setCode} not found` });
    }
});

router.get('/:setCode/:cardCode', [
    param('setCode').isString().notEmpty().withMessage('setCode must be a non-empty string').trim().escape(),
    param('cardCode').isString().notEmpty().withMessage('cardCode must be a non-empty string').trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);
    const cardDetails = findCard(req.params.cardCode);

    if (!setDetails) {
        res.status(404).json({ error: `Set ${req.params.setCode} not found` });
    } else if (!cardDetails) {
        res.status(404).json({ error: `Card ${req.params.cardCode} not found` });
    } else if (!setDetails.cards.includes(cardDetails.id)) {
        res.status(404).json({ error: `Card ${req.params.cardCode} not found in set ${req.params.setCode}` });
    } else {
        res.json(cardDetails);
    }
});

export default router;