export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Infos = {
    id: string | number;
    user: string | number;
    tags: string[] | number[];
};

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): void;
declare const log: {
    error: (msg: string, infos: Infos) => void;
    warn: (msg: string, infos: Infos) => void;
    info: (msg: string, infos: Infos) => void;
    debug: (msg: string, infos: Infos) => void;
};

export { 
  init,
  log,
};
