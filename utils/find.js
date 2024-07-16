// utils/findSet.js
const collectionData = require('../collection.v1.json');

// Optimized data structure for fast lookup

const setsMap = {};
Object.keys(collectionData.sets).forEach(setId => {
    setsMap[collectionData.sets[setId].code.replace('-', '').toUpperCase()] = collectionData.sets[setId];
});

const cardsMap = {};
Object.keys(collectionData.sets).forEach(setId => {
    Object.assign(cardsMap, collectionData.sets[setId.toUpperCase()].cards);
});

const findSet = (setId) => {
    setId = setId.toUpperCase();
    let setDetails = collectionData.sets[setId];
    if (!setDetails) {
        if (setId.includes('-')) {
            setId = setId.replace('-', '');
        }
        // try to find by code
        setDetails = setsMap[setId];
    }
    return setDetails;
};

const findCard = (cardId) => {
    return cardsMap[cardId.toUpperCase()];
}

const findCards = (cardCode) => {
    const cardDetails = [];
    Object.values(cardsMap).forEach(card => {
        if (card.code && card.code.toUpperCase().includes(cardCode)) {
            cardDetails.push(card);
        }
    });
    return cardDetails;
}

module.exports = { findSet, findCard, findCards, cardsMap, setsMap };