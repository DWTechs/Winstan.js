
[![License: MIT](https://img.shields.io/npm/l/@dwtechs/sparray.svg?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40dwtechs%2Fsparray.svg)](https://www.npmjs.com/package/@dwtechs/sparray)
[![last version release date](https://img.shields.io/github/release-date/DWTechs/Sparray.js)](https://www.npmjs.com/package/@dwtechs/sparray)
[![minified size](https://img.shields.io/bundlephobia/min/@dwtechs/sparray?color=brightgreen)](https://www.npmjs.com/package/@dwtechs/sparray)

- [Synopsis](#synopsis)
- [Support](#support)
- [Installation](#installation)
- [Usage](#usage)
  - [ES6](#es6)
  - [CommonJS](#commonjs)
- [API Reference](#api-reference)
- [Contributors](#contributors)
- [Stack](#stack)


## Synopsis

**[Winstan.js](https://github.com/DWTechs/Winstan.js)** is an Open source arrays toolkit library for Javascript.

- Only 1 small dependency to check inputs variables
- Very lightweight
- Thoroughly tested
- Works in Javascript, Typescript and Node.js
- Can be used as CommonJS or EcmaScrypt module
- Written in Typescript


## Support

- node: 16

This is the oldest targeted versions. The library should work properly on older versions of Node.js but we do not support it officially.  


## Installation

```bash
$ npm i @dwtechs/winstan
```


## Usage


### ES6 / TypeScript

```javascript
import { chunk } from "@dwtechs/winstan";

function chunkArray(req, res, next) {
  req.chunks = chunk(req.body.rows, null);
  next();
}

export {
  chunkArray,
};

```


### CommonJS

```javascript

const sp = require("@dwtechs/winstan");

function chunk(req, res, next) {
  req.chunks = sp.chunk(req.body.rows, null);
  next();
}

module.exports = {
  chunk,
};

```


## API Reference


```javascript

init(timeZone: string, serviceName: string, nodeEnv: string): void {}

log(size: number): number {}

```

## Contributors

Winstan.js is still in development and we would be glad to get all the help you can provide.
To contribute please read **[contributor.md](https://github.com/DWTechs/Winstan.js/blob/main/contributor.md)** for detailed installation guide.


## Stack

| Purpose         |                    Choice                    |                                                     Motivation |
| :-------------- | :------------------------------------------: | -------------------------------------------------------------: |
| repository      |        [Github](https://github.com/)         |     hosting for software development version control using Git |
| package manager |     [npm](https://www.npmjs.com/get-npm)     |                                default node.js package manager |
| language        | [TypeScript](https://www.typescriptlang.org) | static type checking along with the latest ECMAScript features |
| module bundler  |      [Rollup](https://rollupjs.org)          |                        advanced module bundler for ES6 modules |
| unit testing    |          [Jest](https://jestjs.io/)          |                  delightful testing with a focus on simplicity |
