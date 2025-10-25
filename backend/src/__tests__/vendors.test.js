const request = require('supertest');
const app = require('../app');

describe('Vendor API', () => {
  let vendorId;

  it('GET /api/vendors - should return all vendors', async () => {
    const res = await request(app).get('/api/vendors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/vendors - should create a vendor', async () => {
    const vendorData = {
      name: 'Test Vendor',
      service: 'Photography'
    };
    const res = await request(app)
      .post('/api/vendors')
      .send(vendorData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(vendorData.name);
    vendorId = res.body._id;
  });

  it('GET /api/vendors/:id - should get a vendor by id', async () => {
    const res = await request(app).get(`/api/vendors/${vendorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(vendorId);
  });

    it('PUT /api/vendors/:id - should update a vendor', async () => {
    const res = await request(app)
        .put(`/api/vendors/${vendorId}`)
        .send({ name: 'Test Vendor', service: 'Videography' }); // include name!
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe('Videography');
    });

  it('DELETE /api/vendors/:id - should delete a vendor', async () => {
    const res = await request(app).delete(`/api/vendors/${vendorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Vendor deleted');
  });
});

// Close DB connection after all tests
afterAll(async () => {
  // If using mongoose
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});