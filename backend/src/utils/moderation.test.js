// backend/src/utils/moderation.test.js
// Unit tests for content moderation utility

const { moderateContent, getSafeFallbackMessage, MODERATION_KEYWORDS } = require('./moderation');

describe('Content Moderation', () => {
  describe('moderateContent', () => {
    it('should flag content with "abuse" keyword', () => {
      const result = moderateContent('This message contains abuse');
      expect(result.flagged).toBe(true);
      expect(result.reason).toContain('prohibited keyword');
    });

    it('should flag content with "credit card" keyword', () => {
      const result = moderateContent('Here is my credit card number');
      expect(result.flagged).toBe(true);
      expect(result.reason).toContain('prohibited keyword');
    });

    it('should flag content with "password" keyword', () => {
      const result = moderateContent('My password is 12345');
      expect(result.flagged).toBe(true);
      expect(result.reason).toBeTruthy();
    });

    it('should flag content with "ssn" keyword', () => {
      const result = moderateContent('My SSN is 123-45-6789');
      expect(result.flagged).toBe(true);
      expect(result.reason).toBeTruthy();
    });

    it('should flag content with "social security" keyword', () => {
      const result = moderateContent('my social security number');
      expect(result.flagged).toBe(true);
    });

    it('should be case-insensitive', () => {
      const result1 = moderateContent('ABUSE in caps');
      const result2 = moderateContent('abuse in lowercase');
      const result3 = moderateContent('AbUsE in mixed case');
      
      expect(result1.flagged).toBe(true);
      expect(result2.flagged).toBe(true);
      expect(result3.flagged).toBe(true);
    });

    it('should not flag safe content', () => {
      const result = moderateContent('What are good wedding venues?');
      expect(result.flagged).toBe(false);
      expect(result.reason).toBeNull();
    });

    it('should handle empty or invalid input', () => {
      expect(moderateContent('').flagged).toBe(false);
      expect(moderateContent(null).flagged).toBe(false);
      expect(moderateContent(undefined).flagged).toBe(false);
      expect(moderateContent(123).flagged).toBe(false);
    });

    it('should detect keywords within larger text', () => {
      const result = moderateContent('I need help with wedding planning but this contains abuse language');
      expect(result.flagged).toBe(true);
    });
  });

  describe('getSafeFallbackMessage', () => {
    it('should return a safe fallback message', () => {
      const message = getSafeFallbackMessage();
      expect(typeof message).toBe('string');
      expect(message.length).toBeGreaterThan(0);
      expect(message.toLowerCase()).toContain('cannot process');
    });
  });

  describe('MODERATION_KEYWORDS', () => {
    it('should export moderation keywords array', () => {
      expect(Array.isArray(MODERATION_KEYWORDS)).toBe(true);
      expect(MODERATION_KEYWORDS.length).toBeGreaterThan(0);
    });

    it('should contain expected keywords', () => {
      expect(MODERATION_KEYWORDS).toContain('abuse');
      expect(MODERATION_KEYWORDS).toContain('credit card');
      expect(MODERATION_KEYWORDS).toContain('password');
      expect(MODERATION_KEYWORDS).toContain('ssn');
    });
  });
});
