const request = require('supertest');
const app = require('../app');

describe('Chat API', () => {
  beforeEach(() => {
    // Reset metrics before each test
    app.locals.metrics.resetMetrics();
  });

  describe('POST /api/chat - Success cases', () => {
    it('should return a response for a valid query', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'What should I consider when choosing a venue?' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('reply');
      expect(res.body).toHaveProperty('tokenUsage');
      expect(typeof res.body.reply).toBe('string');
      expect(res.body.reply.length).toBeGreaterThan(0);
    });

    it('should return venue-related advice for venue query', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Tell me about wedding venues' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.reply).toContain('venue');
    });

    it('should return budget advice for budget query', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'How much does a wedding cost?' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.reply.toLowerCase()).toContain('budget');
    });

    it('should return default response for unmatched query', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Random unrelated question' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.reply).toBeTruthy();
    });

    it('should include token usage information', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Hello' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.tokenUsage).toHaveProperty('input');
      expect(res.body.tokenUsage).toHaveProperty('output');
      expect(res.body.tokenUsage).toHaveProperty('total');
      expect(res.body.tokenUsage.total).toBeGreaterThan(0);
    });
  });

  describe('POST /api/chat - Validation errors', () => {
    it('should return 400 if query is missing', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.message).toContain('Missing required field');
    });

    it('should return 400 if query is not a string', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 123 });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('must be a string');
    });

    it('should return 400 if query is empty', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: '   ' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('cannot be empty');
    });

    it('should return 400 if query exceeds token limit', async () => {
      // Create a very long query (>2048 chars = 512 tokens)
      const longQuery = 'a'.repeat(3000);
      const res = await request(app)
        .post('/api/chat')
        .send({ query: longQuery });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('exceeds maximum length');
    });
  });

  describe('POST /api/chat - Content moderation', () => {
    it('should block query with "abuse" keyword', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'This message contains abuse language' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('flagged', true);
      expect(res.body.message).toContain('cannot process that request');
    });

    it('should block query with "credit card" keyword', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Here is my credit card number' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('flagged', true);
    });

    it('should block query with "password" keyword', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'My password is 12345' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('flagged', true);
    });

    it('should block query with "ssn" keyword', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'My SSN is 123-45-6789' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('flagged', true);
    });

    it('should log moderation events in metrics', async () => {
      await request(app)
        .post('/api/chat')
        .send({ query: 'This contains abuse' });
      
      const metrics = app.locals.metrics.getMetrics();
      expect(metrics.requests.moderation).toBe(1);
    });
  });

  describe('POST /api/chat - Metrics tracking', () => {
    it('should track successful requests', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Test query' });

      expect(res.statusCode).toBe(200);
      // Check both res.headers and res.header for x-metrics
      const metricsHeader = res.headers['x-metrics'] || res.header['x-metrics'];
      expect(metricsHeader).toBeDefined();
      const metrics = JSON.parse(metricsHeader);
      expect(metrics.requests.total).toBeGreaterThan(0);
      expect(metrics.requests.success).toBeGreaterThan(0);
      expect(metrics.tokens.total).toBeGreaterThan(0);
    });

    it('should track token usage across requests', async () => {
      await request(app)
        .post('/api/chat')
        .send({ query: 'First query' });

      const res = await request(app)
        .post('/api/chat')
        .send({ query: 'Second query' });

      expect(res.statusCode).toBe(200);
      // Check both res.headers and res.header for x-metrics
      const metricsHeader = res.headers['x-metrics'] || res.header['x-metrics'];
      expect(metricsHeader).toBeDefined();
      const metrics = JSON.parse(metricsHeader);
      expect(metrics.requests.success).toBe(2);
      expect(metrics.tokens.input).toBeGreaterThan(0);
      expect(metrics.tokens.output).toBeGreaterThan(0);
    });

    it('should not log PII in metrics', async () => {
      const personalQuery = 'My name is John Doe and my email is john@example.com';
      await request(app)
        .post('/api/chat')
        .send({ query: personalQuery });
      
      const metrics = app.locals.metrics.getMetrics();
      // Verify metrics only contain aggregated numbers, no PII
      expect(JSON.stringify(metrics)).not.toContain('John Doe');
      expect(JSON.stringify(metrics)).not.toContain('john@example.com');
    });
  });

  describe('POST /api/chat - Rate limiting', () => {
    it('should allow requests within rate limit', async () => {
      // Send 5 requests (well below the limit)
      for (let i = 0; i < 5; i++) {
        const res = await request(app)
          .post('/api/chat')
          .send({ query: `Query ${i}` });
        expect(res.statusCode).toBe(200);
      }
    });

    it('should return 429 when rate limit exceeded', async () => {
      // Send 31 requests (exceeding the default limit of 30)
      const requests = [];
      for (let i = 0; i < 31; i++) {
        requests.push(
          request(app)
            .post('/api/chat')
            .send({ query: `Query ${i}` })
        );
      }
      
      const results = await Promise.all(requests);
      const rateLimitedResponse = results.find(res => res.statusCode === 429);
      
      expect(rateLimitedResponse).toBeDefined();
      expect(rateLimitedResponse.body.error).toBe('Too many requests');
      expect(rateLimitedResponse.body).toHaveProperty('retryAfter');
    }, 15000); // Increase timeout for this test
  });
});

// Close DB connection after all tests
afterAll(async () => {
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});
