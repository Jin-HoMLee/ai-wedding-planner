// backend/src/middleware/requestValidation.js
// Request validation middleware for size/token limits

/**
 * Validate request size and token limits
 * @returns {Function} - Express middleware
 */
function validateChatRequest() {
  return (req, res, next) => {
    const { query } = req.body;

    // Check if query exists
    if (!query) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required field: query'
      });
    }

    // Check if query is a string
    if (typeof query !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Field "query" must be a string'
      });
    }

    // Check token/character limit
    const maxTokens = parseInt(process.env.MAX_QUERY_TOKENS) || 512;
    // Rough approximation: 1 token ≈ 4 characters
    const maxChars = maxTokens * 4;
    
    if (query.length > maxChars) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `Query exceeds maximum length of ${maxTokens} tokens (approximately ${maxChars} characters)`
      });
    }

    // Check minimum length
    if (query.trim().length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Query cannot be empty'
      });
    }

    next();
  };
}

module.exports = {
  validateChatRequest
};
