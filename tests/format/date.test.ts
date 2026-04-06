import { formatDate } from '../../src/format/date.js';

describe('format/date', () => {

  it('returns a string starting with "time="', () => {
    expect(formatDate()).toMatch(/^time=/);
  });

  it('ends with milliseconds padded to 3 digits', () => {
    expect(formatDate()).toMatch(/:\d{3}$/);
  });

  it('returns a non-trivially short string', () => {
    expect(formatDate().length).toBeGreaterThan(10);
  });

  it('returns a different (or equal) value on consecutive calls', () => {
    // Just verify it doesn't throw and produces a consistent format
    const a = formatDate();
    const b = formatDate();
    expect(a).toMatch(/^time=/);
    expect(b).toMatch(/^time=/);
  });

});
