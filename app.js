const express = require('express');
const app = express();
const port = 3000;

const collectionData = require('./collection.json');

// Define the /api/sets endpoint
app.get('/api/sets', (req, res) => {
    res.json(collectionData);
});

// Define the /api/sets/:setId endpoint
app.get('/api/sets/:setId', (req, res) => {
    const setId = req.params.setId;
    const setDetails = collectionData.sets[setId];

    if (setDetails) {
        res.json(setDetails);
    } else {
        res.status(404).json({ error: 'Set not found' });
    }
});

// Define the /api/sets/:setId endpoint
app.get('/api/cards/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    let cardDetails = null;

    for (const setId in collectionData.sets) {
        const cards = collectionData.sets[setId].cards;
        
        if (cards[cardId]) {
            cardDetails = cards[cardId];
            break;
        }
    }

    if (cardDetails) {
        res.json(cardDetails);
    } else {
        res.status(404).json({ error: 'Card not found' });
    }
});

// Define the /api/cards/filter/:filter endpoint
app.get('/api/cards/filter/:filter', (req, res) => {
    const filter = req.params.filter.toLowerCase();
    const filteredCards = [];

    // Iterate over the sets and their cards to filter cards based on the filter
    for (const setId in collectionData.sets) {
        const cards = collectionData.sets[setId].cards;
        
        for (const cardId in cards) {
            const card = cards[cardId];

            let featureMatch = false;
            if (Array.isArray(card.feature)) {
                featureMatch = card.feature.some(f => f.toLowerCase().includes(filter));
            } else if (typeof card.feature === 'string') {
                featureMatch = card.feature.toLowerCase().includes(filter);
            }

            // Sample filter conditions: you can improve this logic based on your actual card structure
            if ((card.type && card.type.toLowerCase().includes(filter)) ||
                featureMatch ||
                (card.name && card.name.toLowerCase().includes(filter))) {
                filteredCards.push(card);
            }
        }
    }

    if (filteredCards.length > 0) {
        res.json({ cards: filteredCards });
    } else {
        res.status(404).json({ error: 'No cards match the filter' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});