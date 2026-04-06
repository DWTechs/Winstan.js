import { jest } from '@jest/globals';
import { log, isLevelEnabled } from '../src/logger.js';
import { setLevel } from '../src/conf/level.js';
import { setColorize } from '../src/format/color.js';
import { setService } from '../src/conf/service.js';

describe('logger', () => {

  beforeEach(() => {
    setLevel('debug');
    setColorize(false);
    jest.spyOn(console, 'log').mockImplementation(() => { /* noop */ });
    jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */ });
    jest.spyOn(console, 'error').mockImplementation(() => { /* noop */ });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    setLevel('debug');
    setColorize(false);
  });

  describe('console routing', () => {
    it('log.error calls console.error', () => {
      log.error('boom');
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.log).not.toHaveBeenCalled();
    });

    it('log.warn calls console.warn', () => {
      log.warn('watch out');
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.log).not.toHaveBeenCalled();
    });

    it('log.info calls console.log', () => {
      log.info('started');
      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('log.debug calls console.log', () => {
      log.debug('details');
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe('message format', () => {
    it('contains level=error for log.error', () => {
      log.error('test');
      const msg = (console.error as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('level=error');
    });

    it('contains level=info for log.info', () => {
      log.info('test');
      const msg = (console.log as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('level=info');
    });

    it('contains msg= field', () => {
      log.info('hello');
      const msg = (console.log as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('msg=');
    });

    it('contains time= field', () => {
      log.info('hello');
      const msg = (console.log as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('time=');
    });

    it('includes context fields in the message', () => {
      log.info('req', { requestId: 123, userId: 'abc' });
      const msg = (console.log as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('requestId=123');
      expect(msg).toContain('userId=abc');
    });

    it('includes service= when a service name is configured', () => {
      setService('my-svc');
      log.info('test');
      const msg = (console.log as jest.Mock).mock.calls[0][0] as string;
      expect(msg).toContain('service=my-svc');
    });
  });

  describe('level filtering', () => {
    it('suppresses debug when level=info', () => {
      setLevel('info');
      log.debug('filtered');
      expect(console.log).not.toHaveBeenCalled();
    });

    it('suppresses info/debug when level=warn', () => {
      setLevel('warn');
      log.info('filtered');
      log.debug('filtered');
      expect(console.log).not.toHaveBeenCalled();
    });

    it('still logs error when level=warn', () => {
      setLevel('warn');
      log.error('serious');
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('suppresses everything below error when level=error', () => {
      setLevel('error');
      log.warn('w');
      log.info('i');
      log.debug('d');
      expect(console.warn).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('lazy evaluation', () => {
    it('calls the function when the level is enabled', () => {
      const fn = jest.fn(() => 'lazy message');
      log.info(fn);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('does not call the function when the level is filtered', () => {
      setLevel('error');
      const fn = jest.fn(() => 'lazy message');
      log.debug(fn);
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('isLevelEnabled', () => {
    it('returns true when the level passes the filter', () => {
      setLevel('debug');
      expect(isLevelEnabled('debug')).toBe(true);
      expect(isLevelEnabled('error')).toBe(true);
    });

    it('returns false when the level is filtered out', () => {
      setLevel('error');
      expect(isLevelEnabled('debug')).toBe(false);
      expect(isLevelEnabled('info')).toBe(false);
      expect(isLevelEnabled('warn')).toBe(false);
    });
  });

  describe('invalid input', () => {
    it('does not log when txt is an empty string', () => {
      log.info('');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

});
