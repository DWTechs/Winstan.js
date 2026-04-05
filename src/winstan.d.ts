export type Level = 'error' | 'warn' | 'info' | 'debug';

declare const log: {
  error: (txt: string | (() => string), ctx?: Record<string, string | number | string[] | number[]>) => void;
  warn: (txt: string | (() => string), ctx?: Record<string, string | number | string[] | number[]>) => void;
  info: (txt: string | (() => string), ctx?: Record<string, string | number | string[] | number[]>) => void;
  debug: (txt: string | (() => string), ctx?: Record<string, string | number | string[] | number[]>) => void;
};

declare function isLevelEnabled(lvl: Level): boolean;

declare function setColors(newColors: Partial<Record<Level, string>>): Record<Level, string>;
declare function setColorize(clr: boolean): boolean;
declare function setService(srv: string | undefined): string;
declare function setTimeZone(tz: string): string;
declare function setLocale(loc: string): string;
declare function setLevel(lvl: Level): Level;

export { 
  log,
  isLevelEnabled,
  setService,
  setTimeZone,
  setLocale,
  setLevel,
  setColors,
  setColorize,
};
