// utils/findSet.js
import collectionData from '../collection.v3.json' with { type: 'json' };

// Optimized data structures for fast lookup
const setsMap = Object.keys(collectionData.sets).reduce((acc, setId) => {
  const set = collectionData.sets[setId];
  acc[set.code.replace('-', '').toUpperCase()] = set;
  return acc;
}, {});

const cardsMap = Object.keys(collectionData.cards).reduce((acc, cardId) => {
  const card = collectionData.cards[cardId];
  acc[card.id.toUpperCase()] = card;
  return acc;
}, {});

const findSet = (setCode) => {
  setCode = setCode.toUpperCase();

  return setsMap[setCode] || null;
};

const findCard = (cardId) => {
  cardId = cardId.toUpperCase();
  return cardsMap[cardId] || null;
};

const checkArrayOrStringMatch = (input, filter) => {
  console.log('input', input);
  console.log('filter', filter);
  if (Array.isArray(input)) {
    return input.some((item) => item.toLowerCase().includes(filter));
  } else if (typeof input === 'string') {
    return input.toLowerCase().includes(filter);
  }
  return false;
};

const findCardsByFilter = (filterString) => {
  // Split the filter string into individual criteria based on a delimiter, e.g., ";"
  const filters = filterString
    .split(';')
    .map((filter) => filter.trim().toLowerCase());

  return Object.values(cardsMap).filter((card) => {
    // Check each filter criterion
    return filters.every((filter) => {
      // Example criteria: "color:black", "type:rush", "counter:2000"
      const [key, value] = filter
        .split(':')
        .map((part) => part.trim().toLowerCase());

      const featureMatch = checkArrayOrStringMatch(card.feature, value);
      const keywordsMatch = checkArrayOrStringMatch(card.keywords, value);

      switch (key) {
        case 'id':
          return card.id.toString() === value;
        case 'name':
          return card.name.toLowerCase().includes(value);
        case 'code':
          return card.code.toLowerCase().includes(value);
        case 'color':
          return card.color && card.color.toLowerCase() === value;
        case 'type':
          return card.type && card.type.toLowerCase().includes(value);
        case 'counter':
          return card.counter && card.counter.toString() === value;
        case 'feature':
          return featureMatch;
        case 'keyword':
          return keywordsMatch;
        default:
          // Implement additional cases as needed
          return false;
      }
    });
  });
};

export { findSet, findCard, findCardsByFilter, cardsMap, setsMap };
