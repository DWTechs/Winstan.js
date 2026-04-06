import { getLevel, setLevel, shouldLog } from '../../src/conf/level.js';

describe('conf/level', () => {

  afterEach(() => {
    setLevel('debug');
  });

  describe('setLevel', () => {
    it('sets a valid level and returns it', () => {
      expect(setLevel('warn')).toBe('warn');
      expect(getLevel()).toBe('warn');
    });

    it('ignores an invalid level and returns the current one', () => {
      setLevel('info');
      expect(setLevel('invalid' as never)).toBe('info');
      expect(getLevel()).toBe('info');
    });

    it('sets every valid level', () => {
      for (const lvl of ['error', 'warn', 'info', 'debug'] as const) {
        expect(setLevel(lvl)).toBe(lvl);
      }
    });
  });

  describe('shouldLog', () => {
    it('allows all levels when level=debug', () => {
      setLevel('debug');
      expect(shouldLog('error')).toBe(true);
      expect(shouldLog('warn')).toBe(true);
      expect(shouldLog('info')).toBe(true);
      expect(shouldLog('debug')).toBe(true);
    });

    it('blocks debug when level=info', () => {
      setLevel('info');
      expect(shouldLog('error')).toBe(true);
      expect(shouldLog('warn')).toBe(true);
      expect(shouldLog('info')).toBe(true);
      expect(shouldLog('debug')).toBe(false);
    });

    it('blocks warn/info/debug when level=error', () => {
      setLevel('error');
      expect(shouldLog('error')).toBe(true);
      expect(shouldLog('warn')).toBe(false);
      expect(shouldLog('info')).toBe(false);
      expect(shouldLog('debug')).toBe(false);
    });
  });

});
