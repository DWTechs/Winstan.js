import { formatColor, setColorize } from '../../src/format/color.js';

describe('format/color', () => {

  afterEach(() => {
    setColorize(true);
  });

  describe('formatColor', () => {
    it('wraps text with ANSI escape codes when colorize is enabled', () => {
      setColorize(true);
      const result = formatColor('info', 'hello');
      expect(result).toContain('\x1b[');
      expect(result).toContain('hello');
      expect(result).toContain('\x1b[0m');
    });

    it('returns plain text when colorize is disabled', () => {
      setColorize(false);
      expect(formatColor('info', 'hello')).toBe('hello');
      expect(formatColor('error', 'oops')).toBe('oops');
    });

    it('applies the correct color code per level', () => {
      setColorize(true);
      expect(formatColor('error', 'x')).toContain('\x1b[31m'); // red
      expect(formatColor('warn',  'x')).toContain('\x1b[33m'); // yellow
      expect(formatColor('info',  'x')).toContain('\x1b[34m'); // blue
      expect(formatColor('debug', 'x')).toContain('\x1b[32m'); // green
    });
  });

  describe('setColorize', () => {
    it('returns false when set to false', () => {
      expect(setColorize(false)).toBe(false);
    });

    it('returns true when set to true', () => {
      expect(setColorize(true)).toBe(true);
    });
  });

});
