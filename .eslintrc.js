module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-shadow': 0,
    'no-console': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
  },
};
