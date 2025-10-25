export type Level = 'error' | 'warn' | 'info' | 'debug';

declare const log: {
  error: (txt: string, ctx?: Record<string, string | number | string[] | number[]>) => void;
  warn: (txt: string, ctx?: Record<string, string | number | string[] | number[]>) => void;
  info: (txt: string, ctx?: Record<string, string | number | string[] | number[]>) => void;
  debug: (txt: string, ctx?: Record<string, string | number | string[] | number[]>) => void;
};

declare function setColors(newColors: Partial<Record<Level, string>> | null): void;
declare function setService(srv: string | undefined): string;
declare function setTimeZone(tz: string): string;
declare function setLocale(loc: string): string;
declare function setLevel(lvl: Level): Level;

export { 
  log,
  setService,
  setTimeZone,
  setLocale,
  setLevel,
  setColors,
};
