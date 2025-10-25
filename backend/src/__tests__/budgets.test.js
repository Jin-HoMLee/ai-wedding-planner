const request = require('supertest');
const app = require('../app');

describe('Budget API', () => {
  let budgetId;

  it('GET /api/budgets - should return all budgets', async () => {
    const res = await request(app).get('/api/budgets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/budgets - should create a budget', async () => {
    const budgetData = {
      category: 'Venue',
      amount: 5000,
      notes: 'Deposit paid'
    };
    const res = await request(app)
      .post('/api/budgets')
      .send(budgetData);
    expect(res.statusCode).toBe(201);
    expect(res.body.category).toBe(budgetData.category);
    budgetId = res.body._id;
  });

  it('GET /api/budgets/:id - should get a budget by id', async () => {
    const res = await request(app).get(`/api/budgets/${budgetId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(budgetId);
  });

  it('PUT /api/budgets/:id - should update a budget', async () => {
    const res = await request(app)
      .put(`/api/budgets/${budgetId}`)
      .send({ category: 'Venue', amount: 6000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(6000);
  });

  it('DELETE /api/budgets/:id - should delete a budget', async () => {
    const res = await request(app).delete(`/api/budgets/${budgetId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Budget deleted');
  });
});

// Close DB connection after all tests
afterAll(async () => {
  // If using mongoose
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});