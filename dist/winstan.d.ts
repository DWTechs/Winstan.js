/*
MIT License

Copyright (c) 2020 DWTechs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/DWTechs/Winstan.js
*/

export type Level = 'error' | 'warn' | 'info' | 'debug';

declare const log: {
  error: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  warn: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  info: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
  debug: (msg: string, info?: Record<string, string | number | string[] | number[]>) => void;
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
