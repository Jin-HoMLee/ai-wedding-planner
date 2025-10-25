// backend/src/utils/moderation.js
// Content moderation utility to filter unsafe or abusive input

/**
 * List of keywords that trigger moderation
 * These are testable keywords for development
 */
const MODERATION_KEYWORDS = [
  'abuse',
  'credit card',
  'password',
  'ssn',
  'social security',
  'violent',
  'hate',
  'threat',
  'illegal'
];

/**
 * Check if text contains any moderation keywords
 * @param {string} text - Text to check
 * @returns {Object} - { flagged: boolean, reason: string|null }
 */
function moderateContent(text) {
  if (!text || typeof text !== 'string') {
    return { flagged: false, reason: null };
  }

  const lowerText = text.toLowerCase();
  
  for (const keyword of MODERATION_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return {
        flagged: true,
        reason: `Content flagged for moderation: contains prohibited keyword`
      };
    }
  }

  return { flagged: false, reason: null };
}

/**
 * Get a safe fallback message for moderated content
 * @returns {string} - Safe fallback message
 */
function getSafeFallbackMessage() {
  return "I apologize, but I cannot process that request. Please ensure your message is appropriate and doesn't contain sensitive information.";
}

module.exports = {
  moderateContent,
  getSafeFallbackMessage,
  MODERATION_KEYWORDS // Export for testing
};
