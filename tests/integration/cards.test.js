import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v2/cards', () => {
  test('should return a list of all cards', async () => {
    const response = await request(app).get('/api/v2/cards');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/v2/cards/:cardCode', () => {
  test('should return details of a specific card', async () => {
    const cardCode = 'OP02-039';
    const response = await request(app).get(`/api/v2/cards/${cardCode}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('code', 'OP02-039');
  });

  test('should return 404 for a non-existent card', async () => {
    const response = await request(app).get('/api/v2/cards/InvalidCode');
    expect(response.status).toBe(404);
  });
});

describe('GET /api/v2/cards/filter/:filter', () => {
  test('should return filtered cards that match the filter criteria', async () => {
    const filter = 'FILM';
    const response = await request(app).get(`/api/v2/cards/filter/${filter}`);
    expect(response.status).toBe(200);
    expect(response.body.cards).toBeInstanceOf(Array);
  });

  test('should return an empty array for an unmatched filter criteria', async () => {
    const filter = 'NonExistingFeature';
    const response = await request(app).get(`/api/v2/cards/filter/${filter}`);
    expect(response.status).toBe(200);
    expect(response.body.cards).toHaveLength(0);
  });
});