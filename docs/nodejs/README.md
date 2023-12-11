# Node.js 是什么

Node.js® is an open-source, cross-platform JavaScript runtime environment.

翻译：Node.js 是一个开源的，跨平台的 JavaScript 运行环境

通俗来讲：Node.js 就是一款应用程序，是一款软件，它可以运行 JavaScript

# Node.js 的作用
1. 开发服务器应用
2. 开发工具类应用
3. 开发桌面端应用

# Node.js 注意点
1. Node.js 中不能使用 BOM 和 DOM 的 API，可以使用 console 和定时器 API
2. Node.js 中的顶级对象为 global，也可以用 globalThis 访问顶级对象

```js
console.log(global === globalThis); // true
```
