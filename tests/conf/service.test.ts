import { setService, getService } from '../../src/conf/service.js';

describe('conf/service', () => {

  beforeEach(() => {
    setService('__reset__');
  });

  it('sets a valid service name', () => {
    expect(setService('my-api')).toBe('my-api');
    expect(getService()).toBe('my-api');
  });

  it('ignores an empty string', () => {
    setService('my-api');
    setService('');
    expect(getService()).toBe('my-api');
  });

  it('ignores undefined', () => {
    setService('my-api');
    setService(undefined);
    expect(getService()).toBe('my-api');
  });

  it('ignores a string longer than 99 characters', () => {
    setService('my-api');
    setService('a'.repeat(100));
    expect(getService()).toBe('my-api');
  });

  it('accepts exactly 1 character', () => {
    expect(setService('x')).toBe('x');
  });

  it('accepts exactly 99 characters', () => {
    const name = 'a'.repeat(99);
    expect(setService(name)).toBe(name);
  });

  it('allows updating the service name', () => {
    setService('api-v1');
    setService('api-v2');
    expect(getService()).toBe('api-v2');
  });

});
