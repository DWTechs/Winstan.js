import { formatMisc } from '../../src/format/misc.js';

describe('format/misc', () => {

  it('returns empty string for empty context', () => {
    expect(formatMisc({})).toBe('');
  });

  it('formats a single string field', () => {
    expect(formatMisc({ userId: 'abc' })).toBe('userId=abc');
  });

  it('formats a single number field', () => {
    expect(formatMisc({ count: 42 })).toBe('count=42');
  });

  it('formats multiple fields separated by spaces', () => {
    expect(formatMisc({ a: 1, b: 'x' })).toBe('a=1 b=x');
  });

  it('skips the reserved "message" key', () => {
    expect(formatMisc({ message: 'skip', id: 1 })).toBe('id=1');
  });

  it('skips the reserved "level" key', () => {
    expect(formatMisc({ level: 'info', id: 1 })).toBe('id=1');
  });

  it('skips empty strings', () => {
    expect(formatMisc({ a: '' })).toBe('');
  });

  it('formats array fields', () => {
    expect(formatMisc({ tags: ['x', 'y'] })).toBe('tags=["x","y"]');
  });

  it('does not include a trailing space', () => {
    const result = formatMisc({ a: 1, b: 2 });
    expect(result).not.toMatch(/ $/);
  });

  it('quotes field values that contain spaces', () => {
    expect(formatMisc({ name: 'John Doe' })).toBe('name="John Doe"');
  });

});
