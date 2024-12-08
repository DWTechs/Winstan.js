import resolve from "@rollup/plugin-node-resolve";

const config =  {
  input: "build/es6/winstan.js",
  output: {
    name: "winstan",
    file: "build/winstan.cjs.js",
    format: "cjs"
  },
  external: [
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main']
    }),
  ]
};

export default config;