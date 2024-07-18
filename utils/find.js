// utils/findSet.js
import collectionData from '../collection.v2.json' with { type: 'json' };

// Optimized data structures for fast lookup
const setsMap = Object.keys(collectionData.sets).reduce((acc, setId) => {
  const set = collectionData.sets[setId];
  acc[set.code.replace('-', '').toUpperCase()] = set;
  return acc;
}, {});

const cardsMap = Object.keys(collectionData.cards).reduce((acc, cardId) => {
  const card = collectionData.cards[cardId];
  acc[card.code.toUpperCase()] = card;
  return acc;
}, {});

const findSet = (setCode) => {
  setCode = setCode.toUpperCase();

  return setsMap[setCode] || null;
};

const findCard = (cardCode) => {
  cardCode = cardCode.toUpperCase();
  return cardsMap[cardCode] || null;
};

const findCardsByFilter = (filter) => {
  filter = filter.toLowerCase();
  return Object.values(cardsMap).filter((card) => {
    let featureMatch = false;
    // feature is either a string or an array of strings
    if (Array.isArray(card.feature)) {
      featureMatch = card.feature.some((f) => f.toLowerCase().includes(filter));
    } else if (typeof card.feature === 'string') {
      featureMatch = card.feature.toLowerCase().includes(filter);
    }
    return (
      card.type.toLowerCase().includes(filter) ||
      featureMatch ||
      card.name.toLowerCase().includes(filter) ||
      card.code.toLowerCase().includes(filter)
    );
  });
};

export { findSet, findCard, findCardsByFilter, cardsMap, setsMap };
