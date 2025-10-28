// backend/src/routes/chat.js
// Chat API route

const express = require('express');
const router = express.Router();
const { handleChatRequest } = require('../controllers/chatController');
const { createChatRateLimiter } = require('../middleware/rateLimiter');
const { validateChatRequest } = require('../middleware/requestValidation');

// Apply rate limiting to all chat routes
const chatRateLimiter = createChatRateLimiter();

/**
 * POST /api/chat
 * Main chat endpoint
 * - Rate limited
 * - Request validation
 * - Content moderation
 * - Returns mock responses (no external API calls)
 */
router.post('/', chatRateLimiter, validateChatRequest(), handleChatRequest);

module.exports = router;
