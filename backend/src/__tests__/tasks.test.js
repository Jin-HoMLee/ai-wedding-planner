const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
  let taskId;

  it('GET /api/tasks - should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks - should create a task', async () => {
    const taskData = {
      title: 'Book florist',
      completed: false,
      dueDate: '2025-10-15',
      notes: 'Check with three vendors'
    };
    const res = await request(app)
      .post('/api/tasks')
      .send(taskData);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(taskData.title);
    taskId = res.body._id;
  });

  it('GET /api/tasks/:id - should get a task by id', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(taskId);
  });

  it('PUT /api/tasks/:id - should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Book florist', completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('DELETE /api/tasks/:id - should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });
});

// Close DB connection after all tests
afterAll(async () => {
  // If using mongoose
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});