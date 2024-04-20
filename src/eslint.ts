const fs = require('fs');
const path = require('path');

// Parser
const eslintParser = require('@babel/eslint-parser');
const typescriptParser = require('@typescript-eslint/parser');

// 插件
const jestPlugin = require('eslint-plugin-jest');
const jestDomPlugin = require('eslint-plugin-jest-dom');
const prettierPlugin = require('eslint-plugin-prettier');
const promisePlugin = require('eslint-plugin-promise');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const unicornPlugin = require('eslint-plugin-unicorn');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

const tsEslintConfig = require('./tsEslintConfig');

const isTypeAwareEnabled: boolean = process.env.DISABLE_TYPE_AWARE === undefined;

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  },
  requireConfigFile: false,
  project: isTypeAwareEnabled ? './tsconfig.json' : undefined,
};

const isJsMoreTs = async (pathName = 'src') => {
  const fg = require('fast-glob');
  const jsFiles = await fg(`${pathName}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${pathName}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

// 判断是否是TypeScript项目
const isTsProject = fs.existsSync(path.join(process.cwd() || '.', './tsconfig.json'));

if (isTsProject) {
  try {
    isJsMoreTs(process.cwd()).then((jsMoreTs) => {
      if (!jsMoreTs) return;
      console.log('这是一个 TypeScript 项目，如果不是请删除 tsconfig.json');
    });
  } catch (e) {
    console.log(e);
  }
}

const globalsOptions = {
  ...globals.browser,
  ...globals.node,
  ...globals.mocha,
  ...globals.jest,
  ...globals.jasmine,
};

const settings = {
  // support import modules from TypeScript files in JavaScript files
  'import/resolver': {
    node: {
      extensions: isTsProject ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts'] : ['.js', '.jsx'],
    },
  },
  'import/parsers': {
    '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
  },
  'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
  'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  react: {
    pragma: 'React',
    version: 'detect',
  },
};

module.exports = {
  settings,
  plugins: {
    jestPlugin,
    react: reactPlugin,
    'jest-dom': jestDomPlugin,
    prettier: prettierPlugin,
    promise: promisePlugin,
    'simple-import-sort': simpleImportSortPlugin,
    'testing-library': testingLibraryPlugin,
    unicorn: unicornPlugin,
    '@typescript-eslint': typescriptPlugin,
    'jsx-a11y': jsxA11yPlugin,
    'react-hooks': reactHooksPlugin,
    import: importPlugin,
  },
  languageOptions: {
    parser: isTsProject ? typescriptParser : eslintParser,
    globals: globalsOptions,
    parserOptions: parserOptions,
  },
  rules: isTsProject
    ? tsEslintConfig
    : {
        // strict: ['error', 'never'],
        'react/display-name': 0,
        'react/jsx-props-no-spreading': 0,
        'react/state-in-constructor': 0,
        'react/static-property-placement': 0,
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': 'off',
        // 'react/no-array-index-key': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/require-default-props': 0,
        'react/jsx-fragments': 0,
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/sort-comp': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-one-expression-per-line': 0,
        'generator-star-spacing': 0,
        'function-paren-newline': 0,
        'sort-imports': 0,
        'class-methods-use-this': 0,
        'no-confusing-arrow': 0,
        'linebreak-style': 0,
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        'no-prototype-builtins': 'off',
        'unicorn/prevent-abbreviations': 'off',
        // Conflict with prettier
        'arrow-body-style': 0,
        'arrow-parens': 0,
        'object-curly-newline': 0,
        'implicit-arrow-linebreak': 0,
        'operator-linebreak': 0,
        'no-param-reassign': 2,
        'space-before-function-paren': 0,
        'react/self-closing-comp': 1,
        'react/jsx-key': 1,
      },
  files: [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.js',
    'src/**/*.jsx',
    'tests/**/*.ts',
    'tests/**/*.js',
  ],
};
