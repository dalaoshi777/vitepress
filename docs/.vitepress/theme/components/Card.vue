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
    <header
      class="card-header text-xl font-bold px-4 py-2 text-black border-b border-b-black/10 dark:text-white dark:border-b-zinc-800">
      <span>{{ title }}</span>
      <slot name="header" />
    </header>
    <main class="card-main p-4">
      <slot />
    </main>
    <footer v-if="$slots.footer" class="card-footer pb-4">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped></style>