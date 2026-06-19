<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Card Title'
  }
})
</script>

<template>
  <div class="card">
    <header class="card-header">
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
  width: 100%;
  /* 🌟 删掉死板的 max-width: 400px，改用 100% 自适应外部父级容器 */
  border: 1px solid #e2e8f0;
  /* 换成更细腻的现代淡灰边框 */
  border-radius: 12px;
  /* 稍微大一点的圆角，更大气 */
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04);
  /* 淡淡的卡片浮空阴影 */

  .card-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    font-size: 1.15rem;
    font-weight: 600;
    color: #1e293b;
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