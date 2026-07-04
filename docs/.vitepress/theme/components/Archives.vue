<script lang="ts" setup>
import { computed } from 'vue'
import Card from './Card.vue'
import { data as posts } from '../posts.data'

const archiveData = computed(() => {
  const groups: Record<string, typeof posts> = {}

  posts.forEach(post => {
    if (!post.date) return
    const year = new Date(post.date).getFullYear().toString() || '其他'

    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
  })

  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map(year => ({
      year,
      list: groups[year]
    }))
})

const formatMD = (dateStr: string) => {
  try {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}-${day}`
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="min-h-full max-w-4xl mx-auto my-10 px-6 flex justify-center">
    <Card title="文章归档" class="w-full">
      <div v-if="archiveData.length === 0" class="text-center py-10 text-slate-400">
        📭 暂无归档文章
      </div>

      <div v-else class="flex flex-col gap-7">
        <div v-for="group in archiveData" :key="group.year" class="flex flex-col">
          <h2
            class="text-xl font-bold text-slate-800 mb-3 pb-1.5 border-b border-dashed border-slate-200 dark:text-slate-200 dark:border-slate-700">
            {{ group.year }}
          </h2>

          <div class="flex flex-col gap-1">
            <a v-for="post in group.list" :key="post.url" :href="post.url"
              class="group flex items-center gap-5 no-underline py-2 px-1 rounded transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-[#1c1e21]">
              <span class="text-sm text-slate-400 font-mono min-w-[45px]">{{ formatMD(post.date) }}</span>
              <span
                class="text-[15px] text-slate-700 transition-colors duration-150 group-hover:text-green-500 dark:text-slate-300 dark:group-hover:text-green-500">
                {{ post.title }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
