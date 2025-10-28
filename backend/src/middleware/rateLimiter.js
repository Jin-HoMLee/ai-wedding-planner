// backend/src/middleware/rateLimiter.js
// Rate limiting middleware for chat API

const rateLimit = require('express-rate-limit'); // function to create rate limiters. Handles next() internally. 
/**
 * Create rate limiter for chat endpoint
 * Configurable via environment variables
 * @returns {Function} - Express rate limiter middleware
 */
function createChatRateLimiter() {
  // Get config from environment or use defaults
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000; // 5 minutes default
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 30; // 30 requests default

  // Create and return the rate limiter middleware
  return rateLimit({
    windowMs: windowMs,
    max: maxRequests,
    message: {
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil(windowMs / 1000) // seconds
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
      // Custom handler to log rate limit events
      req.app.locals.metrics.logChatRequest('rate_limit');
      
      res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
}

module.exports = {
  createChatRateLimiter
};
