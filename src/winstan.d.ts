export type Levels = 'error' | 'warn' | 'info' | 'debug';

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): void;
declare const log: {
    error: (msg: string, info?: Record<string, unknown>) => void;
    warn: (msg: string, info?: Record<string, unknown>) => void;
    info: (msg: string, info?: Record<string, unknown>) => void;
    debug: (msg: string, info?: Record<string, unknown>) => void;
};

export { 
  init,
  log,
};
