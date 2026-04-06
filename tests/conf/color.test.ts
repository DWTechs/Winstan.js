import { getColor, setColors } from '../../src/conf/color.js';

const DEFAULT_COLORS = {
  error: '\x1b[31m',
  warn:  '\x1b[33m',
  info:  '\x1b[34m',
  debug: '\x1b[32m',
};

// checkard's isAnsiEscapeCode validates the string-form '\x1b[...]m'
// (literal chars \, x, 1, b) — NOT the actual ESC byte used in the defaults.
// setColors() with real ESC bytes is silently rejected by the validator.
// Only the 8-char string representation (e.g. String.raw`\x1b[91m`) passes.
const VALID_ANSI_91 = String.raw`\x1b[91m`;
const VALID_ANSI_93 = String.raw`\x1b[93m`;
const VALID_ANSI_36 = String.raw`\x1b[36m`;

describe('conf/color', () => {

  describe('getColor', () => {
    it('returns the default ANSI code for each level', () => {
      expect(getColor('error')).toBe(DEFAULT_COLORS.error);
      expect(getColor('warn')).toBe(DEFAULT_COLORS.warn);
      expect(getColor('info')).toBe(DEFAULT_COLORS.info);
      expect(getColor('debug')).toBe(DEFAULT_COLORS.debug);
    });

    it('returns empty string for an unknown level', () => {
      expect(getColor('unknown' as never)).toBe('');
    });
  });

  describe('setColors', () => {
    it('updates a level with a valid ANSI string-form code', () => {
      const result = setColors({ error: VALID_ANSI_91 });
      expect(result.error).toBe(VALID_ANSI_91);
      expect(getColor('error')).toBe(VALID_ANSI_91);
    });

    it('rejects actual ESC-byte ANSI codes and leaves color unchanged', () => {
      const before = getColor('warn');
      setColors({ warn: '\x1b[93m' });
      expect(getColor('warn')).toBe(before);
    });

    it('ignores a plain colour name', () => {
      const before = getColor('debug');
      setColors({ debug: 'green' });
      expect(getColor('debug')).toBe(before);
    });

    it('ignores an invalid level key', () => {
      const before = getColor('info');
      setColors({ unknown: VALID_ANSI_91 } as never);
      expect(getColor('info')).toBe(before);
    });

    it('returns current colors unchanged for null input', () => {
      const result = setColors(null as never);
      expect(typeof result).toBe('object');
      expect(result.info).toBeDefined();
    });

    it('returns current colors unchanged for non-object input', () => {
      const result = setColors('red' as never);
      expect(typeof result).toBe('object');
    });

    it('updates multiple levels at once with valid string-form codes', () => {
      const result = setColors({ warn: VALID_ANSI_93, info: VALID_ANSI_36 });
      expect(result.warn).toBe(VALID_ANSI_93);
      expect(result.info).toBe(VALID_ANSI_36);
    });
  });

});
