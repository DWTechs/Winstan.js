import { setTimeZone } from '../../src/conf/tz.js';

describe('conf/tz', () => {

  afterEach(() => {
    setTimeZone('Europe/Paris');
  });

  it('sets a valid timezone and returns it', () => {
    expect(setTimeZone('America/New_York')).toBe('America/New_York');
  });

  it('sets multiple valid timezones', () => {
    expect(setTimeZone('Europe/London')).toBe('Europe/London');
    expect(setTimeZone('Asia/Tokyo')).toBe('Asia/Tokyo');
  });

  it('ignores an invalid timezone and returns the current one', () => {
    setTimeZone('America/New_York');
    expect(setTimeZone('europe/paris')).toBe('America/New_York'); // lowercase — fails regex
  });

  it('ignores an empty string', () => {
    setTimeZone('America/New_York');
    expect(setTimeZone('')).toBe('America/New_York');
  });

});
