const path = require('path');

console.log(require.resolve(path.join(__dirname, '../', 'dist/eslint')));
const fabric = require(require.resolve(path.join(__dirname, '../', 'dist/index')));
module.exports = [
  fabric.eslint,
  {
    ignores: ['**/App.tsx', '/lambda/*', '/scripts/*', '/config/*', '.history'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
