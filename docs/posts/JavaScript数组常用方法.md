---
title: JavaScript 数组常用方法
date: 2026-07-05T16:00:00+08:00
lastmod: 2026-07-05T16:00:00+08:00
tags:
  - 'JavaScript'
---
## JavaScript 数组常用方法

数组是 JavaScript 中最常用的数据结构之一。本文整理日常开发中最常用的数组方法，按功能分类介绍。

## 增删元素

### push() / pop()

在数组末尾添加或删除元素：

```javascript
const arr = [1, 2, 3];
arr.push(4);        // [1, 2, 3, 4]
arr.pop();          // [1, 2, 3]
```

### unshift() / shift()

在数组开头添加或删除元素：

```javascript
const arr = [1, 2, 3];
arr.unshift(0);     // [0, 1, 2, 3]
arr.shift();        // [1, 2, 3]
```

### splice()

万能增删改方法：

```javascript
const arr = ['a', 'b', 'c', 'd'];

arr.splice(1, 2);         // 删除：['a', 'd']
arr.splice(1, 0, 'x');    // 插入：['a', 'x', 'b', 'c', 'd']
arr.splice(1, 1, 'x');    // 替换：['a', 'x', 'c', 'd']
```

## 遍历方法

### forEach()

遍历数组，无返回值：

```javascript
const arr = [1, 2, 3];
arr.forEach((item, index) => {
  console.log(index, item);
});
```

### map()

遍历并返回新数组：

```javascript
const arr = [1, 2, 3];
const doubled = arr.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

## 过滤与查找

### filter()

过滤符合条件的元素：

```javascript
const arr = [1, 2, 3, 4, 5];
const evens = arr.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

### find() / findIndex()

查找第一个符合条件的元素 / 索引：

```javascript
const users = [
  { name: '张三', age: 20 },
  { name: '李四', age: 25 },
];

const user = users.find(u => u.age > 22);
console.log(user); // { name: '李四', age: 25 }

const index = users.findIndex(u => u.age > 22);
console.log(index); // 1
```

### includes()

判断数组是否包含某个值：

```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
```

## 聚合与判断

### reduce()

将数组归约为单个值：

```javascript
const arr = [1, 2, 3, 4];

// 求和
const sum = arr.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10

// 求最大值
const max = arr.reduce((acc, cur) => Math.max(acc, cur));
console.log(max); // 4
```

### some() / every()

判断是否满足条件：

```javascript
const arr = [1, 2, 3, 4];

// 是否有元素大于 3
console.log(arr.some(n => n > 3));  // true

// 是否所有元素都大于 0
console.log(arr.every(n => n > 0)); // true
```

## 排序与反转

### sort()

排序（默认按 Unicode 排序，数字需传比较函数）：

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 升序
arr.sort((a, b) => a - b);
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序
arr.sort((a, b) => b - a);
console.log(arr); // [9, 6, 5, 4, 3, 2, 1, 1]
```

### reverse()

反转数组：

```javascript
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

## 拼接与展开

### concat()

合并数组：

```javascript
const a = [1, 2];
const b = [3, 4];
const merged = a.concat(b);
console.log(merged); // [1, 2, 3, 4]
```

### 扩展运算符 `...`

更简洁的合并方式：

```javascript
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4]
```

## 转换方法

### join()

数组转字符串：

```javascript
const arr = ['Hello', 'World'];
console.log(arr.join(' ')); // "Hello World"
console.log(arr.join(',')); // "Hello,World"
```

### Array.from()

将类数组或可迭代对象转为数组：

```javascript
const str = 'hello';
const arr = Array.from(str);
console.log(arr); // ['h', 'e', 'l', 'l', 'o']
```

## 小结

| 需求 | 方法 |
|------|------|
| 遍历 | `forEach` / `map` |
| 过滤 | `filter` |
| 查找 | `find` / `findIndex` / `includes` |
| 归约 | `reduce` |
| 判断 | `some` / `every` |
| 排序 | `sort` / `reverse` |
| 合并 | `concat` / `...` |
| 转换 | `join` / `Array.from` |

> ⚠️ 注意：`push`、`pop`、`splice`、`sort`、`reverse` 会**修改原数组**，而 `map`、`filter`、`concat` 等会**返回新数组**，使用时需注意区分。

更多方法可参考 [MDN Array 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)。
