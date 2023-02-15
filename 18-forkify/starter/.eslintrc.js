module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: ['alloy', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    // enable additional rules
    // semi: ['error', 'never'],

    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],

    // disable rules from base configurations
    'for-direction': 'off',
    'no-console': 'off',
  },
};
