import { setLocale } from '../../src/conf/locale.js';

describe('conf/locale', () => {

  afterEach(() => {
    setLocale('fr-FR');
  });

  it('sets a valid locale and returns it', () => {
    expect(setLocale('en-US')).toBe('en-US');
  });

  it('sets multiple valid locales', () => {
    expect(setLocale('de-DE')).toBe('de-DE');
    expect(setLocale('ja-JP')).toBe('ja-JP');
    expect(setLocale('pt-BR')).toBe('pt-BR');
  });

  it('ignores an invalid locale and returns the current one', () => {
    setLocale('en-US');
    expect(setLocale('not-a-locale')).toBe('en-US');
  });

  it('ignores an empty string', () => {
    setLocale('en-US');
    expect(setLocale('')).toBe('en-US');
  });

});
