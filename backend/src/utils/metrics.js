// backend/src/utils/metrics.js
// Metrics and logging utility for chat API
// Aggregates stats without logging PII or message content

/**
 * In-memory metrics store
 * In production, this should be replaced with a proper metrics service (e.g., Prometheus, CloudWatch)
 */
const metrics = {
  requests: {
    total: 0,
    success: 0,
    rateLimit: 0,
    moderation: 0,
    errors: 0
  },
  tokens: {
    input: 0,
    output: 0,
    total: 0
  }
};

/**
 * Log a chat request metric
 * @param {string} status - Request status: 'success', 'rate_limit', 'moderation', 'error'
 * @param {Object} tokenUsage - Optional token usage data to track how many tokens were used during a chat request
 */
function logChatRequest(status, tokenUsage = null) {
  metrics.requests.total++;
  
  switch (status) {
    case 'success':
      metrics.requests.success++;
      if (tokenUsage) {
        metrics.tokens.input += tokenUsage.input || 0;
        metrics.tokens.output += tokenUsage.output || 0;
        metrics.tokens.total += tokenUsage.total || 0;
      }
      break;
    case 'rate_limit':
      metrics.requests.rateLimit++;
      break;
    case 'moderation':
      metrics.requests.moderation++;
      break;
    case 'error':
      metrics.requests.errors++;
      break;
    default:
      console.warn(`Unknown chat request status: ${status}`);
  }
}

/**
 * Get current metrics snapshot
 * @returns {Object} - Current metrics
 */
function getMetrics() {
  return {
    requests: { ...metrics.requests },
    tokens: { ...metrics.tokens }
  };
}

/**
 * Reset all metrics (useful for testing)
 */
function resetMetrics() {
  metrics.requests.total = 0;
  metrics.requests.success = 0;
  metrics.requests.rateLimit = 0;
  metrics.requests.moderation = 0;
  metrics.requests.errors = 0;
  metrics.tokens.input = 0;
  metrics.tokens.output = 0;
  metrics.tokens.total = 0;
}

/**
 * Log metrics to console (for monitoring)
 * This should be called periodically or on demand
 */
function printMetrics() {
  console.log('=== Chat API Metrics ===');
  console.log('Requests:', metrics.requests);
  console.log('Token Usage:', metrics.tokens);
  console.log('=======================');
}

module.exports = {
  logChatRequest,
  getMetrics,
  resetMetrics,
  printMetrics
};
