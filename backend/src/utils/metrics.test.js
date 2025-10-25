// backend/src/utils/metrics.test.js
// Unit tests for metrics utility

const { logChatRequest, getMetrics, resetMetrics } = require('./metrics');

describe('Metrics', () => {
  beforeEach(() => {
    resetMetrics();
  });

  describe('logChatRequest', () => {
    it('should increment total requests for any status', () => {
      logChatRequest('success');
      const metrics = getMetrics();
      expect(metrics.requests.total).toBe(1);
    });

    it('should track successful requests', () => {
      logChatRequest('success');
      const metrics = getMetrics();
      expect(metrics.requests.success).toBe(1);
    });

    it('should track rate limit events', () => {
      logChatRequest('rate_limit');
      const metrics = getMetrics();
      expect(metrics.requests.rateLimit).toBe(1);
    });

    it('should track moderation events', () => {
      logChatRequest('moderation');
      const metrics = getMetrics();
      expect(metrics.requests.moderation).toBe(1);
    });

    it('should track error events', () => {
      logChatRequest('error');
      const metrics = getMetrics();
      expect(metrics.requests.errors).toBe(1);
    });

    it('should track token usage for successful requests', () => {
      const tokenUsage = { input: 10, output: 20, total: 30 };
      logChatRequest('success', tokenUsage);
      
      const metrics = getMetrics();
      expect(metrics.tokens.input).toBe(10);
      expect(metrics.tokens.output).toBe(20);
      expect(metrics.tokens.total).toBe(30);
    });

    it('should accumulate token usage across multiple requests', () => {
      logChatRequest('success', { input: 10, output: 20, total: 30 });
      logChatRequest('success', { input: 15, output: 25, total: 40 });
      
      const metrics = getMetrics();
      expect(metrics.tokens.input).toBe(25);
      expect(metrics.tokens.output).toBe(45);
      expect(metrics.tokens.total).toBe(70);
    });

    it('should not track tokens for non-success statuses', () => {
      logChatRequest('rate_limit', { input: 10, output: 20, total: 30 });
      logChatRequest('moderation', { input: 10, output: 20, total: 30 });
      logChatRequest('error', { input: 10, output: 20, total: 30 });
      
      const metrics = getMetrics();
      expect(metrics.tokens.input).toBe(0);
      expect(metrics.tokens.output).toBe(0);
      expect(metrics.tokens.total).toBe(0);
    });

    it('should handle success without token usage', () => {
      logChatRequest('success');
      const metrics = getMetrics();
      expect(metrics.requests.success).toBe(1);
      expect(metrics.tokens.total).toBe(0);
    });
  });

  describe('getMetrics', () => {
    it('should return current metrics', () => {
      logChatRequest('success');
      logChatRequest('moderation');
      
      const metrics = getMetrics();
      expect(metrics).toHaveProperty('requests');
      expect(metrics).toHaveProperty('tokens');
      expect(metrics.requests.total).toBe(2);
    });

    it('should return a copy of metrics', () => {
      const metrics1 = getMetrics();
      metrics1.requests.total = 999;
      
      const metrics2 = getMetrics();
      expect(metrics2.requests.total).toBe(0);
    });
  });

  describe('resetMetrics', () => {
    it('should reset all metrics to zero', () => {
      logChatRequest('success', { input: 10, output: 20, total: 30 });
      logChatRequest('rate_limit');
      logChatRequest('moderation');
      
      resetMetrics();
      
      const metrics = getMetrics();
      expect(metrics.requests.total).toBe(0);
      expect(metrics.requests.success).toBe(0);
      expect(metrics.requests.rateLimit).toBe(0);
      expect(metrics.requests.moderation).toBe(0);
      expect(metrics.requests.errors).toBe(0);
      expect(metrics.tokens.input).toBe(0);
      expect(metrics.tokens.output).toBe(0);
      expect(metrics.tokens.total).toBe(0);
    });
  });

  describe('PII protection', () => {
    it('should not store any message content', () => {
      const personalInfo = 'John Doe, email: john@example.com, phone: 555-1234';
      logChatRequest('success', { input: 10, output: 20, total: 30 });
      
      const metrics = getMetrics();
      const metricsString = JSON.stringify(metrics);
      
      expect(metricsString).not.toContain('John Doe');
      expect(metricsString).not.toContain('john@example.com');
      expect(metricsString).not.toContain('555-1234');
    });

    it('should only contain aggregate numbers', () => {
      logChatRequest('success', { input: 10, output: 20, total: 30 });
      
      const metrics = getMetrics();
      
      // Verify all values are numbers
      expect(typeof metrics.requests.total).toBe('number');
      expect(typeof metrics.requests.success).toBe('number');
      expect(typeof metrics.tokens.total).toBe('number');
    });
  });
});
