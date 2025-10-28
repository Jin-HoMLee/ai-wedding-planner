// backend/src/utils/chatProvider.test.js
// Unit tests for mock chat provider

const { MockChatProvider, getChatProvider } = require('./chatProvider');

describe('MockChatProvider', () => {
  let provider;

  beforeEach(() => {
    provider = new MockChatProvider();
  });

  describe('generateResponse', () => {
    it('should return a response object with reply and tokenUsage', async () => {
      const response = await provider.generateResponse('Hello');
      
      expect(response).toHaveProperty('reply');
      expect(response).toHaveProperty('tokenUsage');
      expect(typeof response.reply).toBe('string');
      expect(response.reply.length).toBeGreaterThan(0);
    });

    it('should return venue-related response for venue query', async () => {
      const response = await provider.generateResponse('What about wedding venues?');
      
      expect(response.reply.toLowerCase()).toContain('venue');
    });

    it('should return budget-related response for budget query', async () => {
      const response = await provider.generateResponse('How much does a wedding budget cost?');
      
      expect(response.reply.toLowerCase()).toContain('budget');
    });

    it('should return photographer-related response for photography query', async () => {
      const response = await provider.generateResponse('Tell me about wedding photographers');
      
      expect(response.reply.toLowerCase()).toContain('photographer');
    });

    it('should return guest list response for guest query', async () => {
      const response = await provider.generateResponse('How many guests should I invite?');
      
      expect(response.reply.toLowerCase()).toContain('guest');
    });

    it('should return timeline response for timeline query', async () => {
      const response = await provider.generateResponse('What is the wedding planning timeline?');
      
      expect(response.reply.toLowerCase()).toContain('timeline');
    });

    it('should return greeting for hello query', async () => {
      const response = await provider.generateResponse('Hello');
      
      expect(response.reply.toLowerCase()).toContain('hello');
    });

    it('should return default response for unmatched query', async () => {
      const response = await provider.generateResponse('Random unrelated question');
      
      expect(response.reply).toBeTruthy();
      expect(response.reply.length).toBeGreaterThan(0);
    });

    it('should include token usage with input, output, and total', async () => {
      const response = await provider.generateResponse('Test query');
      
      expect(response.tokenUsage).toHaveProperty('input');
      expect(response.tokenUsage).toHaveProperty('output');
      expect(response.tokenUsage).toHaveProperty('total');
      expect(response.tokenUsage.input).toBeGreaterThan(0);
      expect(response.tokenUsage.output).toBeGreaterThan(0);
      expect(response.tokenUsage.total).toBeGreaterThan(0);
      expect(response.tokenUsage.total).toBe(response.tokenUsage.input + response.tokenUsage.output);
    });

    it('should calculate token usage based on text length', async () => {
      const shortQuery = 'Hi';
      const longQuery = 'This is a much longer query that should have more tokens';
      
      const shortResponse = await provider.generateResponse(shortQuery);
      const longResponse = await provider.generateResponse(longQuery);
      
      expect(longResponse.tokenUsage.input).toBeGreaterThan(shortResponse.tokenUsage.input);
    });

    it('should simulate processing delay', async () => {
      const startTime = Date.now();
      await provider.generateResponse('Test');
      const endTime = Date.now();
      
      // Should take at least 100ms due to simulated delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(95); // Allow small margin
    });
  });
});

describe('getChatProvider', () => {
  it('should return a MockChatProvider instance', () => {
    const provider = getChatProvider();
    expect(provider).toBeInstanceOf(MockChatProvider);
  });

  it('should return a provider with generateResponse method', () => {
    const provider = getChatProvider();
    expect(typeof provider.generateResponse).toBe('function');
  });
});
