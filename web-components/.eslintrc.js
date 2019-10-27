module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb",
    // 'eslint-config-airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    // 'react',
  ],
  rules: {
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],

    'no-underscore-dangle': "warn",

  },
};
