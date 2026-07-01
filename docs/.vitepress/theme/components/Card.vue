<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Card Title'
  }
})
</script>

<template>
  <div class="card w-full ring-1 ring-black/10 dark:ring-white/10 rounded-xl bg-white dark:bg-zinc-800/50">
    <header class="card-header text-black border-b border-b-black/10 dark:text-white dark:border-b-zinc-800">
      <span>{{ title }}</span>
      <slot name="header" />
    </header>
    <main class="card-main">
      <slot />
    </main>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.card {

  .card-header {
    padding: 1rem 1.25rem;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .card-main {
    padding: 1.25rem;
  }

  /* 🌟 核心增加：优雅的分页页脚边框与间距 */
  .card-footer {
    padding: 1rem 1.25rem;
    border-top: 1px solid #e2e8f0;
    /* 给分页加上上边框分割线 */
    background-color: #f8fafc;
    /* 页脚给一层浅灰底色，极具结构感 */
    border-bottom-left-radius: 12px;
    /* 别忘了卡片底部的圆角也要跟卡片本体契合 */
    border-bottom-right-radius: 12px;
  }
}
</style>