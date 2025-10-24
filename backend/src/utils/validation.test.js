// backend/src/utils/validation.test.js
const { EMAIL_REGEX } = require('./validation');

describe('EMAIL_REGEX', () => {
  it('matches valid emails', () => {
    expect(EMAIL_REGEX.test('user@example.com')).toBe(true);
    expect(EMAIL_REGEX.test('user.name+tag@sub.domain.com')).toBe(true);
    expect(EMAIL_REGEX.test('user@123.123.123.123')).toBe(false);
    expect(EMAIL_REGEX.test('user@domain.co.uk')).toBe(true);
    expect(EMAIL_REGEX.test('user@[123.123.123.123]')).toBe(true);
    expect(EMAIL_REGEX.test('"user@domain"@example.com')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(EMAIL_REGEX.test('invalid-email')).toBe(false);
    expect(EMAIL_REGEX.test('user@.com')).toBe(false);
    expect(EMAIL_REGEX.test('user@domain')).toBe(false);
    expect(EMAIL_REGEX.test('user@domain..com')).toBe(false);
  });
});
