import {
  findSet,
  findCard,
  findCardsByFilter,
  cardsMap,
} from './../../utils/find.js';
import collectionData from '../../collection.v2.json' with { type: 'json' };

describe('findSet', () => {
  test('should find and return the set details for a valid set code', () => {
    const setCode = 'ST11';
    const result = findSet(setCode);
    expect(result).toEqual(collectionData.sets['569011']);
  });

  test('should return null for an invalid set code', () => {
    const setCode = 'InvalidCode';
    const result = findSet(setCode);
    expect(result).toBeNull();
  });
});

describe('findCard', () => {
  test('should find and return the card details for a valid card code', () => {
    const cardCode = 'OP02-039'.toUpperCase();
    const result = findCard(cardCode);
    expect(result).toEqual(cardsMap[cardCode]);
  });

  test('should return null for an invalid card code', () => {
    const cardCode = 'InvalidCode';
    const result = findCard(cardCode.toUpperCase());
    expect(result).toBeNull();
  });
});

describe('findCardsByFilter', () => {
  test('should return filtered cards that match the filter criteria', () => {
    const filter = 'FILM';
    const filteredCards = findCardsByFilter(filter);
    expect(filteredCards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ feature: expect.arrayContaining([filter]) }),
      ]),
    );
  });

  test('should return an empty array for an unmatched filter criteria', () => {
    const filter = 'NonExistingFeature';
    const filteredCards = findCardsByFilter(filter);
    expect(filteredCards).toHaveLength(0);
  });
});
