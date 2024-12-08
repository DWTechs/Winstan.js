const config =  {
  input: "build/es6/winstan.js",
  output: {
    name: "winstan",
    file: "build/winstan.mjs",
    format: "es"
  },
  external: [
    "@dwtechs/checkard",
    "winston",
  ],
  plugins: []
};

export default config;
