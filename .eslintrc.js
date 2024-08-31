const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolve': {
      webpack: {
        config: path.join(__dirname, 'webpack.config.js'),
      },
    },
  },
  globals: {
    __webpack_public_path__: 'readonly',
  },
  rules: {
    // This is a reasonable pattern...
    'no-restricted-exports': 'off',
    // Ignore webpack global vars
    camelcase: ['warn', { ignoreGlobals: true }],
  },
};
