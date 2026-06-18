---
title: Object.freeze()方法
date: 2026-06-15T16:01:22+08:00
lastmod: 2026-06-15T16:06:10+08:00
---

作用：**冻结对象**，让对象**无法增、删、改属性**，成为只读状态。

## 浅冻结

只冻结**第一层**，**嵌套对象 / 数组不受影响**，内层依然可以修改：

```javascript
const obj = {
  a: 1,
  inner: { b: 2 }
};
Object.freeze(obj);

obj.a = 99;       // 失败
obj.inner.b = 99; // ✅ 成功！内层可修改
console.log(obj.inner.b); // 99
```

‍
