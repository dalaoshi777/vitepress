---
title: JavaScript 异步编程
date: 2026-07-05T11:00:00+08:00
lastmod: 2026-07-05T11:00:00+08:00
tags:
  - 'JavaScript'
  - '异步编程'
---
## JavaScript 异步编程

JavaScript 是一门单线程语言，为了避免耗时操作阻塞主线程，异步编程显得尤为重要。本文介绍三种常见的异步解决方案。

## 回调函数（Callback）

最原始的异步方式，通过将回调函数作为参数传入，在操作完成后执行。

```javascript
setTimeout(() => {
  console.log('1 秒后执行');
}, 1000);
```

回调函数的缺点是容易产生「回调地狱」，代码层层嵌套，难以阅读和维护。

```javascript
// 回调地狱示例
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      console.log(c);
    });
  });
});
```

## Promise

Promise 通过链式调用解决了回调地狱的问题，它有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。

```javascript
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据获取成功');
    }, 1000);
  });
}

getData()
  .then((res) => {
    console.log(res);
    return '继续处理';
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

## async / await

`async / await` 是基于 Promise 的语法糖，让异步代码看起来像同步代码，更加直观。

```javascript
async function fetchData() {
  try {
    const res = await getData();
    console.log(res);
    const more = await getMoreData(res);
    console.log(more);
  } catch (err) {
    console.error(err);
  }
}

fetchData();
```

## 并发请求

当需要同时发起多个请求时，可以使用 `Promise.all` 或 `Promise.allSettled`。

```javascript
// 所有请求都成功才返回，任一失败则整体失败
const [res1, res2] = await Promise.all([
  fetch('/api/1'),
  fetch('/api/2'),
]);

// 等待所有请求完成，无论成功或失败
const results = await Promise.allSettled([
  fetch('/api/1'),
  fetch('/api/2'),
]);
```

## 小结

| 方式 | 优点 | 缺点 |
|------|------|------|
| 回调函数 | 简单易懂 | 回调地狱 |
| Promise | 链式调用，便于错误处理 | 语义不够直观 |
| async/await | 语法清晰，接近同步写法 | 需理解 Promise 原理 |

实际开发中推荐使用 `async / await`，它让异步代码更加清晰易读，同时配合 `try / catch` 可以方便地处理错误。
