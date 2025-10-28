// backend/src/controllers/chatController.js
// Controller for handling chat API requests
// Implements content moderation, interacts with chat provider, and logs metrics

const { getChatProvider } = require('../utils/chatProvider');
const { moderateContent, getSafeFallbackMessage } = require('../utils/moderation');
const { logChatRequest } = require('../utils/metrics');

/**
 * Handle POST /api/chat request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleChatRequest(req, res) {
  try {
    const { query } = req.body;

    // Step 1: Content moderation
    const moderationResult = moderateContent(query);
    
    if (moderationResult.flagged) { // If query is flagged e.g., inappropriate
      // Log moderation event
      logChatRequest('moderation');
      
      // Return safe fallback message with 400 status
      return res.status(400).json({
        error: 'Content Moderation',
        message: getSafeFallbackMessage(),
        flagged: true
      });
    }

    // Step 2: Get chat provider and generate response
    const provider = getChatProvider();
    const response = await provider.generateResponse(query);

    // Step 3: Log successful request with token usage
    logChatRequest('success', response.tokenUsage);

    // Step 4: Return response
    return res.status(200).json({
      reply: response.reply,
      tokenUsage: response.tokenUsage
    });

  } catch (error) {
    // Log error
    console.error('Error processing chat request:', error);
    logChatRequest('error');

    // Return 503 Service Unavailable
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

module.exports = {
  handleChatRequest
};
