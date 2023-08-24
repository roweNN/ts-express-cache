import supertest from 'supertest';
import { expect } from '@jest/globals';
import { createServer } from '../src/app';
import { connect } from '@config/mongoose';

beforeAll(async () => {
  await connect()
});

describe('Server health 200', () => {
  it('should pass', async () => {
    const app = createServer();

    const response = await supertest(app).get('/heal');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status')
  });
});

describe('GET /request expect need token', () => {
  it('should pass', async () => {
    const app = createServer();
    const response = await supertest(app).get('/request');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'No auth token' });
  });
})