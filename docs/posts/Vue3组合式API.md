---
title: Vue 3 组合式 API
date: 2026-07-05T22:00:00+08:00
lastmod: 2026-07-05T22:00:00+08:00
tags:
  - 'Vue'
  - '前端'
---

## Vue 3 组合式 API

Vue 3 引入了组合式 API（Composition API），提供了一套更灵活、可复用的逻辑组织方式。与选项式 API（Options API）相比，组合式 API 将相关逻辑聚合在一起，更适合复杂组件的开发。

## setup

组合式 API 的入口是 `setup` 函数，它在组件创建之前执行：

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}
</script>
```

Vue 3.2+ 推荐使用 `<script setup>` 语法糖，更简洁：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

在 `<script setup>` 中，顶部导入和声明的变量/函数可以直接在模板中使用，无需 `return`。

## ref 与 reactive

### ref

`ref` 用于定义响应式数据，支持基本类型和对象类型：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')

function increment() {
  count.value++   // 操作时需要 .value
}
</script>

<template>
  <p>{{ count }}</p>
  <button @click="increment">+1</button>
</template>
```

> 在模板中使用时，`ref` 会自动解包，无需写 `.value`。

### reactive

`reactive` 只能处理对象类型，操作时不需要 `.value`：

```vue
<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: 'Alice',
  age: 20
})

function grow() {
  user.age++
}
</script>

<template>
  <p>{{ user.name }} - {{ user.age }}</p>
  <button @click="grow">长大一岁</button>
</template>
```

### ref 与 reactive 如何选择

| ref | reactive |
|-----|----------|
| 支持所有类型 | 仅支持对象类型 |
| 访问需 `.value` | 直接访问属性 |
| 可重新赋值 | 不可重新赋值（会丢失响应） |
| 推荐作为默认选择 | 适合深层嵌套对象 |

## computed

`computed` 用于定义基于其他响应式数据的派生值：

```vue
<script setup>
import { ref, computed } from 'vue'

const price = ref(100)
const quantity = ref(2)
const total = computed(() => price.value * quantity.value)
</script>

<template>
  <p>总价：{{ total }}</p>
</template>
```

`computed` 是只读的，如果需要可写计算属性，可以传入包含 `get` 和 `set` 的对象：

```javascript
const fullName = computed({
  get: () => firstName.value + ' ' + lastName.value,
  set: (val) => {
    const [first, last] = val.split(' ')
    firstName.value = first
    lastName.value = last
  }
})
```

## watch

`watch` 用于监听响应式数据的变化并执行副作用：

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`从 ${oldVal} 变为 ${newVal}`)
})
</script>
```

监听多个数据源：

```javascript
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count 或 name 已变化')
})
```

`watchEffect` 自动追踪其内部用到的所有响应式数据：

```javascript
watchEffect(() => {
  console.log(`count 当前为：${count.value}`)
})
```

> `watch` 是惰性的 —— 只在数据变化时触发；`watchEffect` 立即执行一次并自动收集依赖。

## 生命周期钩子

组合式 API 中的生命周期钩子以 `on` 开头：

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
</script>
```

常用钩子对照：

| 选项式 API | 组合式 API |
|------------|-----------|
| `mounted` | `onMounted` |
| `updated` | `onUpdated` |
| `unmounted` | `onUnmounted` |
| `beforeMount` | `onBeforeMount` |
| `beforeUpdate` | `onBeforeUpdate` |
| `beforeUnmount` | `onBeforeUnmount` |

## 组件通信

### defineProps 与 defineEmits

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 }
})

const emit = defineEmits(['update'])
emit('update', 1)
</script>
```

```vue
<!-- Parent.vue -->
<template>
  <Child :title="msg" @update="handleUpdate" />
</template>
```

### provide / inject

用于跨层级传递数据：

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>
```

## 自定义 Hook

组合式 API 最大的优势是逻辑复用 —— 将相关功能封装成函数：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const double = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset()    { count.value = initial }

  return { count, double, increment, decrement, reset }
}
```

在组件中使用：

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, double, increment, reset } = useCounter(10)
</script>

<template>
  <p>{{ count }} (翻倍: {{ double }})</p>
  <button @click="increment">+</button>
  <button @click="reset">重置</button>
</template>
```

## 小结

| 特性 | 作用 |
|------|------|
| `ref` / `reactive` | 定义响应式数据 |
| `computed` | 定义派生值 |
| `watch` / `watchEffect` | 监听数据变化 |
| 生命周期钩子 | 管理组件生命周期 |
| `defineProps` / `defineEmits` | 父子组件通信 |
| `provide` / `inject` | 跨层级数据传递 |
| 自定义 Hook | 抽取复用逻辑 |

组合式 API 让 Vue 组件的逻辑组织更加灵活，配合 `<script setup>` 语法，开发体验大幅提升。推荐在 Vue 3 新项目中默认使用组合式 API。