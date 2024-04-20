<!-- @format -->

# @hankliu/fabric

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/fabric.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@hankliu/fabric
[travis-image]: https://img.shields.io/travis/hankliu62/fabric/master?style=flat-square
[github-actions-image]: https://github.com/hankliu62/fabric/workflows/CI/badge.svg
[github-actions-url]: https://github.com/hankliu62/fabric/actions
[download-image]: https://img.shields.io/npm/dm/@hankliu/fabric.svg?style=flat-square
[download-url]: https://npmjs.org/package/@hankliu/fabric
[bundlephobia-url]: https://bundlephobia.com/package/@hankliu/fabric
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@hankliu/fabric
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square

一个包含最新的 prettier，eslint，stylelint 的配置文件合集

## 安装

```bash
npm install @hankliu/fabric --save
```

or

```bash
yarn add @hankliu/fabric
```

or

```bash
pnpm install @hankliu/fabric
```

## 使用

in `.eslintrc.js`，注意 `eslint` 版本大于等于 `9`

```js
const fabric = require('@hankliu/fabric');

module.exports = [
  fabric.eslint,
  {
    rules: {
      // your rules
    },
  },
];
```

in `.stylelintrc.js`

```js
const fabric = require('@hankliu/fabric');

module.exports = {
  ...fabric.stylelint,
};
```

in `.prettierrc.js`

```js
const fabric = require('@hankliu/fabric');

module.exports = {
  ...fabric.prettier,
};
```

## 案例

`npm start` 然后打开 http://localhost:8000/examples/

线上案例: https://hankliu62.github.io/rc-footer

## 测试

```
npm run test
```

## License

@hankliu/rc-fabric is released under the MIT license.
