---
title: TypeScript 入门指南
date: 2026-07-05T20:00:00+08:00
lastmod: 2026-07-05T20:00:00+08:00
tags:
  - 'TypeScript'
  - '前端'
---
## TypeScript 入门指南

TypeScript 是 JavaScript 的超集，由微软开发并开源。它在 JavaScript 的基础上增加了静态类型系统，能在编译阶段发现潜在错误，是大型项目开发的利器。本文介绍 TypeScript 最核心的基础用法。

## 基础类型

TypeScript 为 JavaScript 的每种值都提供了对应的类型标注：

```typescript
let username: string = 'Alice';
let age: number = 18;
let isActive: boolean = true;
let empty: null = null;
let nothing: undefined = undefined;
```

数组的两种写法：

```typescript
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ['a', 'b'];
```

## 类型推断

如果没有显式标注类型，TypeScript 会根据初始值自动推断：

```typescript
let count = 10;        // 推断为 number
let name = 'Tom';      // 推断为 string
name = 100;            // ❌ 报错：不能将 number 赋给 string
```

> 💡 建议：能推断出来的类型无需手动标注，避免冗余代码。

## 接口（Interface）

接口用于描述对象的形状，是 TypeScript 中最常用的类型定义方式：

```typescript
interface User {
  name: string;
  age: number;
  email?: string;          // 可选属性
  readonly id: number;     // 只读属性
}

const user: User = {
  id: 1,
  name: 'Alice',
  age: 20,
};

user.id = 2;              // ❌ 报错：只读属性不可修改
```

接口还支持继承，便于复用：

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}
```

## 类型别名（Type Alias）

`type` 与 `interface` 功能相似，但更适合定义联合类型和交叉类型：

```typescript
type ID = string | number;
type Point = { x: number; y: number };

const id: ID = 1001;
const p: Point = { x: 1, y: 2 };
```

> `interface` 与 `type` 在描述对象时可互换，开发中保持团队统一即可。

## 函数

可以为函数的参数和返回值标注类型：

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// 箭头函数写法
const greet = (name: string): string => `Hello, ${name}`;
```

可选参数与默认参数：

```typescript
function create_user(name: string, age?: number): void {
  console.log(name, age);
}

function greet_user(name: string, greeting = 'Hi'): void {
  console.log(`${greeting}, ${name}`);
}

greet_user('Bob');              // Hi, Bob
greet_user('Bob', 'Hey');       // Hey, Bob
```

> ⚠️ 可选参数必须位于必填参数之后。

## 联合类型与交叉类型

联合类型表示「或」，交叉类型表示「且」：

```typescript
// 联合类型：值可以是多种类型之一
type Status = 'success' | 'fail' | 'pending';

function log(status: Status): void {
  console.log(status);
}

// 交叉类型：合并多个类型
type WithName = { name: string };
type WithAge = { age: number };
type Person = WithName & WithAge;

const p: Person = { name: 'Alice', age: 20 };
```

## 泛型（Generics）

泛型让函数和类型可以复用，在使用时再指定具体类型：

```typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello');   // 显式指定
identity(100);                // 推断为 number
```

泛型常用于工具函数和容器类型：

```typescript
interface Box<T> {
  value: T;
}

const numBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: 'hi' };
```

## 类型断言

当明确知道值的类型时，可以手动断言：

```typescript
// 两种写法等价
const input = document.getElementById('name') as HTMLInputElement;
const input2 = <HTMLInputElement>document.getElementById('name');

input.value = 'Alice';
```

> ⚠️ 类型断言会绕过类型检查，请确保断言正确，否则可能引入运行时错误。

## 枚举（Enum）

枚举用于定义一组命名常量：

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const move = (dir: Direction): void => {
  console.log(dir);
};

move(Direction.Up);   // 0
```

字符串枚举更利于调试：

```typescript
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}
```

## 小结

| 特性 | 用途 |
|------|------|
| 基础类型 | 标注变量类型 |
| 接口 | 描述对象结构 |
| 类型别名 | 定义联合 / 交叉类型 |
| 泛型 | 编写可复用代码 |
| 联合类型 | 表示「或」关系 |
| 交叉类型 | 合并多个类型 |
| 类型断言 | 手动指定类型 |
| 枚举 | 管理命名常量 |

TypeScript 的核心价值在于「静态类型检查 + 提前发现错误」，掌握以上概念即可应对大多数日常开发场景。更多内容可参考 [TypeScript 官方文档](https://www.typescriptlang.org/zh/docs/)。
