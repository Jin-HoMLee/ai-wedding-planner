const request = require('supertest');
const app = require('../app');

describe('Guest API', () => {
  let guestId;

  it('GET /api/guests - should return all guests', async () => {
    const res = await request(app).get('/api/guests');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/guests - should create a guest', async () => {
    const guestData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-5678',
      rsvp: true,
      notes: 'Vegetarian'
    };
    const res = await request(app)
      .post('/api/guests')
      .send(guestData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(guestData.name);
    guestId = res.body._id;
  });

  it('GET /api/guests/:id - should get a guest by id', async () => {
    const res = await request(app).get(`/api/guests/${guestId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(guestId);
  });

  it('PUT /api/guests/:id - should update a guest', async () => {
    const res = await request(app)
      .put(`/api/guests/${guestId}`)
      .send({ name: 'Jane Smith', rsvp: false });
    expect(res.statusCode).toBe(200);
    expect(res.body.rsvp).toBe(false);
  });

  it('DELETE /api/guests/:id - should delete a guest', async () => {
    const res = await request(app).delete(`/api/guests/${guestId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Guest deleted');
  });
});

// Close DB connection after all tests
afterAll(async () => {
  // If using mongoose
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});