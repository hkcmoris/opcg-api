// routes/sets.js
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { findSet, findCard } = require('../utils/find');

const collectionData = require('../collection.json');


router.get('/', (req, res) => { 
    res.json(collectionData); 
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

// // Define the /api/cards/:cardId endpoint
// app.get('/api/cards/:cardId', [param('cardId').isString().notEmpty()], (req, res) => {
//     const cardId = req.params.cardId.toUpperCase();
//     const cardDetails = [];
    
//     Object.values(cardsMap).forEach(card => {
//         if (card.code && card.code.toUpperCase().includes(cardId)) {
//             cardDetails.push(card);
//         }
//     });

//     if (cardDetails.length > 0) {
//         res.json({cards: cardDetails});
//     } else {
//         res.status(404).json({ error: 'Card not found' });
//     }
// });

// // Define the /api/cards/filter/:filter endpoint
// app.get('/api/cards/filter/:filter', [param('filter').isString().notEmpty()], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const filter = req.params.filter.toLowerCase();
//     const filteredCards = [];

//     Object.values(cardsMap).forEach(card => {
//         let featureMatch = false;
//         if (Array.isArray(card.feature)) {
//             featureMatch = card.feature.some(f => f.toLowerCase().includes(filter));
//         } else if (typeof card.feature === 'string') {
//             featureMatch = card.feature.toLowerCase().includes(filter);
//         }

//         if ((card.type && card.type.toLowerCase().includes(filter)) ||
//             featureMatch ||
//             (card.name && card.name.toLowerCase().includes(filter)) ||
//             (card.code && card.code.toUpperCase().includes(filter))) {
//             filteredCards.push(card);
//         }
//     });

//     res.json({ cards: filteredCards });
// });

// // Define the /api/sets/:setId/cards/filter/:filter endpoint
// app.get('/api/sets/:setId/cards/filter/:filter', [
//     param('setId').isString().notEmpty(),
//     param('filter').isString().notEmpty()
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const setDetails = findSet(req.params.setId);
//     const filter = req.params.filter.toLowerCase();

//     if (!setDetails) {
//         return res.status(404).json({ error: 'Set not found' });
//     }

//     const filteredCards = [];

//     Object.values(setDetails.cards).forEach(card => {
//         let featureMatch = false;
//         if (Array.isArray(card.feature)) {
//             featureMatch = card.feature.some(f => f.toLowerCase().includes(filter));
//         } else if (typeof card.feature === 'string') {
//             featureMatch = card.feature.toLowerCase().includes(filter);
//         }

//         if ((card.type && card.type.toLowerCase().includes(filter)) ||
//             featureMatch ||
//             (card.name && card.name.toLowerCase().includes(filter))) {
//             filteredCards.push(card);
//         }
//     });

//     res.json({ cards: filteredCards });
// });
// // other endpoints...

module.exports = router;