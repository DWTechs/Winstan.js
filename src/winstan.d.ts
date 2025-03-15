export type Levels = 'error' | 'warn' | 'info' | 'debug';

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): void;
declare const log: {
  error: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  warn: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  info: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  debug: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
};

export { 
  init,
  log,
};
