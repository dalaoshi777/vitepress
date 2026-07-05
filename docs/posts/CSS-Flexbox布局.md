---
title: CSS Flexbox 布局
date: 2026-07-05T15:00:00+08:00
lastmod: 2026-07-05T15:00:00+08:00
tags:
  - 'CSS'
  - '前端'
---
## CSS Flexbox 布局

Flexbox（弹性盒子）是 CSS 中强大的布局方式，专门用于解决一维布局问题。它让元素的排列、对齐和分布变得简单直观。

## 基本概念

使用 Flexbox 只需将容器的 `display` 设置为 `flex`：

```css
.container {
  display: flex;
}
```

- **容器（flex container）**：设置了 `display: flex` 的元素
- **项目（flex item）**：容器内的直接子元素

Flexbox 有两根轴：
- **主轴（main axis）**：默认水平方向
- **交叉轴（cross axis）**：默认垂直方向

## 容器属性

### flex-direction（主轴方向）

```css
.container {
  flex-direction: row;            /* 水平（默认） */
  flex-direction: row-reverse;    /* 水平反向 */
  flex-direction: column;         /* 垂直 */
  flex-direction: column-reverse;/* 垂直反向 */
}
```

### justify-content（主轴对齐）

```css
.container {
  justify-content: flex-start;    /* 起点对齐（默认） */
  justify-content: center;        /* 居中 */
  justify-content: flex-end;      /* 终点对齐 */
  justify-content: space-between; /* 两端对齐，间距相等 */
  justify-content: space-around;  /* 每个项目两侧间距相等 */
  justify-content: space-evenly;  /* 所有间距完全相等 */
}
```

### align-items（交叉轴对齐）

```css
.container {
  align-items: stretch;       /* 拉伸填满（默认） */
  align-items: flex-start;    /* 交叉轴起点对齐 */
  align-items: center;        /* 交叉轴居中 */
  align-items: flex-end;      /* 交叉轴终点对齐 */
  align-items: baseline;      /* 基线对齐 */
}
```

### flex-wrap（换行）

```css
.container {
  flex-wrap: nowrap;   /* 不换行（默认） */
  flex-wrap: wrap;     /* 换行 */
  flex-wrap: wrap-reverse; /* 反向换行 */
}
```

### gap（间距）

```css
.container {
  gap: 10px;           /* 行和列间距都是 10px */
  gap: 10px 20px;      /* 行间距 10px，列间距 20px */
}
```

## 项目属性

### flex（弹性伸缩）

`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写：

```css
.item {
  flex: 1;            /* 等分剩余空间 */
  flex: 0 1 auto;     /* 默认值 */
  flex: none;         /* 不伸缩 */
}
```

- **flex-grow**：放大比例（0 = 不放大）
- **flex-shrink**：缩小比例（1 = 可缩小）
- **flex-basis**：初始大小（auto = 根据内容）

### align-self（单独对齐）

```css
.item {
  align-self: center;  /* 单独设置交叉轴对齐 */
}
```

### order（排序）

```css
.item {
  order: -1;  /* 数值越小越靠前，默认为 0 */
}
```

## 常用布局示例

### 水平垂直居中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 两栏布局（左侧固定，右侧自适应）

```css
.container {
  display: flex;
}
.left {
  width: 200px;   /* 固定宽度 */
}
.right {
  flex: 1;        /* 占据剩余空间 */
}
```

### 导航栏（两端对齐）

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 卡片网格（自动换行）

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 0 1 calc(33.333% - 16px); /* 三列布局 */
}
```

## 小结

| 需求 | 属性 |
|------|------|
| 水平居中 | `justify-content: center` |
| 垂直居中 | `align-items: center` |
| 两端对齐 | `justify-content: space-between` |
| 等分空间 | `flex: 1` |
| 换行 | `flex-wrap: wrap` |
| 间距 | `gap: 10px` |

Flexbox 是前端开发的必备技能，掌握它能让布局工作事半功倍。对于二维布局（行和列同时控制），可以进一步学习 [CSS Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout)。
