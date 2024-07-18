import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import babelEslint from '@babel/eslint-parser';

export default [
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      parser: {
        parse: babelEslint.parse,
        parseForESLint: babelEslint.parseForESLint,
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-import-attributes'],
        },
        sourceType: 'module',
        ecmaVersion: 2021,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
