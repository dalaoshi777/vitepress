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
    <footer class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;

  .card-header {
    padding: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1.25em;
    font-weight: bold;
  }

  .card-main {
    padding: 0.75rem;
  }
}
</style>