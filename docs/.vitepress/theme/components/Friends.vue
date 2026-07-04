<script lang="ts" setup>
import Card from './Card.vue'

interface FriendLink {
  name: string
  url: string
  avatar: string
  description: string
}

const friends: FriendLink[] = [
  {
    name: 'VitePress',
    url: 'https://vitepress.dev',
    avatar: 'https://vitepress.dev/vitepress-logo-mini.svg',
    description: '由 Vite 和 Vue 驱动的静态站点生成器'
  }
]
</script>

<template>
  <div class="min-h-full max-w-4xl mx-auto my-10 px-6 flex justify-center">
    <Card title="友情链接" class="w-full">
      <div v-if="friends.length === 0" class="text-center py-10 text-slate-400">
        📭 暂无友链，欢迎交换链接！
      </div>

      <div v-else class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        <a v-for="friend in friends" :key="friend.url" :href="friend.url" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white no-underline transition-all duration-200 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-green-500 dark:hover:bg-slate-700">
          <img :src="friend.avatar" :alt="friend.name" class="w-12 h-12 rounded-full object-cover flex-shrink-0"
            loading="lazy" @error="(e: Event) => (e.target as HTMLImageElement).style.display = 'none'" />
          <div class="flex flex-col gap-1 overflow-hidden">
            <span class="text-base font-semibold text-slate-800 dark:text-slate-200 truncate">{{ friend.name }}</span>
            <span class="text-sm text-slate-400 dark:text-slate-500 truncate">{{ friend.description }}</span>
          </div>
        </a>
      </div>
    </Card>
  </div>
</template>
