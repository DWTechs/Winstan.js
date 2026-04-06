import { formatTxt } from '../../src/format/txt.js';

describe('format/txt', () => {

  describe('string input', () => {
    it('returns a plain word as-is', () => {
      expect(formatTxt('hello')).toBe('hello');
    });

    it('quotes a string containing spaces', () => {
      expect(formatTxt('hello world')).toBe('"hello world"');
    });

    it('quotes a string containing equals sign', () => {
      expect(formatTxt('key=value')).toBe('"key=value"');
    });

    it('quotes a string containing single quotes', () => {
      expect(formatTxt("it's")).toBe('"it\'s"');
    });

    it('escapes backslashes and quotes the result', () => {
      expect(formatTxt('a\\b')).toBe('"a\\\\b"');
    });

    it('escapes double quotes and quotes the result', () => {
      expect(formatTxt('say "hi"')).toBe('"say \\"hi\\""');
    });

    it('escapes newlines', () => {
      expect(formatTxt('line1\nline2')).toBe('"line1\\nline2"');
    });

    it('escapes carriage returns', () => {
      expect(formatTxt('line1\rline2')).toBe('"line1\\rline2"');
    });

    it('escapes tabs', () => {
      expect(formatTxt('col1\tcol2')).toBe('"col1\\tcol2"');
    });
  });

  describe('number input', () => {
    it('converts an integer to string', () => {
      expect(formatTxt(42)).toBe('42');
    });

    it('converts a float to string', () => {
      expect(formatTxt(3.14)).toBe('3.14');
    });

    it('converts zero to string', () => {
      expect(formatTxt(0)).toBe('0');
    });

    it('converts negative number to string', () => {
      expect(formatTxt(-7)).toBe('-7');
    });
  });

  describe('array input', () => {
    it('formats a string array', () => {
      expect(formatTxt(['a', 'b'])).toBe('["a","b"]');
    });

    it('formats a number array', () => {
      expect(formatTxt([1, 2, 3])).toBe('[1,2,3]');
    });

    it('formats a single-element string array', () => {
      expect(formatTxt(['only'])).toBe('["only"]');
    });

    it('escapes double quotes inside array string items', () => {
      expect(formatTxt(['say "hi"'])).toBe('["say \\"hi\\""]');
    });
  });

});
