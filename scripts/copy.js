
const fs      = require('fs');

const mail    = 'https://github.com/DWTechs/Winstan.js';
const CRLF    = '\r\n';
const rel     = './';
const src     = `${rel}build/`;
const dest    = `${rel}dist/`; 
const files   = [
  {
    src:  `${rel}src/winstan.d.ts`,
    dest: `${dest}winstan.d.ts`
  },
  {
    src:  `${src}winstan.cjs.js`,
    dest: `${dest}winstan.cjs.js`
  },
  {
    src:  `${src}winstan.mjs`,
    dest: `${dest}winstan.mjs`
  },
];

fs.mkdir(dest, { recursive: false },(err) => {
  if (err) throw err;
  fs.readFile(`${rel}LICENSE`, (err, license) => {
    if (err) throw err;
    for (const file of files) {
      fs.readFile(file.src, (err, fileContent) => {
        if (err) throw err;
        fs.writeFile(file.dest, `/*${CRLF}${license}${CRLF}${mail}${CRLF}*/${CRLF}${CRLF}${fileContent}`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});