export type Levels = 'error'|'warn'|'info'|'debug';
export type Options = {
  timeZone: string;
  locale: string;
  service: string;
  level: Levels;
};