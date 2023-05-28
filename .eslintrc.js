module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  overrides: [
    { files: ['src/**/*.js', 'geektime/**/*.js'] },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/no-unresolved': 'warn',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
  },
};
