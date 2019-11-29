module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    "no-eslint-disable": 2,
    "eslint-disable-line": 2,
    "eslint-disable-next-line" : 2
  },
  rules: {
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id",
        ]
      }
    ],
    "linebreak-style": 0,
  },
};
