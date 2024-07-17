import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v2/sets', () => {
  test('should return a list of all sets', async () => {
    const response = await request(app).get('/api/v2/sets');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/v2/sets/:setCode', () => {
  test('should return details of a specific set', async () => {
    const response = await request(app).get('/api/v2/sets/ST11');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('code', 'ST11');
  });

  test('should return 404 for a non-existent set', async () => {
    const response = await request(app).get('/api/v2/sets/InvalidCode');
    expect(response.status).toBe(404);
  });
});

describe('GET /api/v2/sets/:setCode/cards', () => {
  test('should return a list of cards in the specified set', async () => {
    const response = await request(app).get('/api/v2/sets/ST11/cards');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should return 404 if the set does not exist', async () => {
    const response = await request(app).get('/api/v2/sets/InvalidCode/cards');
    expect(response.status).toBe(404);
  });
});