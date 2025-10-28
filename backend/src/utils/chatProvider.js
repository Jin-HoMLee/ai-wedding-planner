// backend/src/utils/chatProvider.js
// Mock chat provider adapter - returns canned responses based on input

/**
 * Mock chat provider that returns canned responses
 * This simulates an AI provider without making external API calls
 */
class MockChatProvider {
  /**
   * Generate a response based on user query
   * @param {string} query - User's question/message
   * @returns {Promise<Object>} - Response object with reply and token usage
   */
  async generateResponse(query) {
    // Simulate some processing time
    await this._simulateDelay(100);

    const lowerQuery = query.toLowerCase();
    let reply = '';
    
    // Pattern matching for wedding-related queries
    if (lowerQuery.includes('venue')) {
      reply = "For venue selection, consider factors like capacity, location accessibility, catering options, and ambiance. Popular venue types include banquet halls, gardens, beaches, and historic estates.";
    } else if (lowerQuery.includes('budget')) {
      reply = "Wedding budgets typically range from $20,000 to $35,000 on average. Key cost areas include venue (30-40%), catering (30%), photography (10-15%), and attire (5-10%). Start by prioritizing your must-haves.";
    } else if (lowerQuery.includes('photographer') || lowerQuery.includes('photography')) {
      reply = "When choosing a wedding photographer, review their portfolio, check reviews, ensure their style matches your vision, and verify they're available on your date. Book 8-12 months in advance.";
    } else if (lowerQuery.includes('guest list') || lowerQuery.includes('guests')) {
      reply = "Start your guest list by categorizing: immediate family, extended family, friends, and colleagues. Consider your budget and venue capacity. A typical guest list ranges from 100-150 people.";
    } else if (lowerQuery.includes('timeline') || lowerQuery.includes('checklist')) {
      reply = "A typical wedding planning timeline: 12 months before - book venue and vendors; 6 months - send invitations; 3 months - finalize details; 1 month - confirm final counts. Start as early as possible!";
    } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      reply = "Hello! I'm your AI wedding planning assistant. I can help you with venue selection, budget planning, vendor recommendations, guest management, and creating your wedding timeline. What would you like to know?";
    } else {
      // Default response for unmatched queries
      reply = "I'm here to help with your wedding planning! I can assist with venue selection, budget management, vendor recommendations, guest lists, and timelines. Please ask me a specific question about any of these topics.";
    }

    // Calculate token usage (rough approximation)
    // Approximate 1 token ≈ 4 characters (common heuristic for English text)
    const inputTokens = Math.ceil(query.length / 4);
    const outputTokens = Math.ceil(reply.length / 4);

    return {
      reply,
      tokenUsage: {
        input: inputTokens,
        output: outputTokens,
        total: inputTokens + outputTokens
      }
    };
  }

  /**
   * Simulate network delay
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>}
   */
  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Factory function to get chat provider instance
 * In the future, this could switch between mock and real providers
 * @returns {MockChatProvider} - Provider instance
 */
function getChatProvider() {
  // For now, always return mock provider
  // In the future, check env var to determine which provider to use
  return new MockChatProvider();
}

module.exports = {
  MockChatProvider,
  getChatProvider
};
