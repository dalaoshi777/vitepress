<script lang="ts" setup>
import Card from './Card.vue'
import { data as posts } from '../posts.data'
import { ref, computed, watch } from 'vue'

const allTags = computed(() => {
  const tagsSet = new Set<string>()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  return Array.from(tagsSet)
})

const selectedTags = ref<string[]>([])

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) {
    return posts
  }
  return posts.filter(post => {
    if (!post.tags) return false
    return selectedTags.value.every(tag => post.tags.includes(tag))
  })
})

const currentPage = ref(1)
const pageSize = ref(4)

watch(filteredPosts, () => {
  currentPage.value = 1
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize.value) || 1
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-full max-w-4xl mx-auto my-10 px-6 flex flex-col justify-center gap-6">
    <Card v-if="allTags.length > 0" title="标签云">
      <div class="py-1">
        <div class="flex flex-wrap gap-2.5">
          <button v-for="tag in allTags" :key="tag"
            class="cursor-pointer px-3.5 py-1.5 text-sm rounded-lg transition-all duration-200"
            :class="selectedTags.includes(tag)
              ? 'border border-green-500 bg-green-500 text-white shadow-md shadow-green-500/25'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-500 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-green-500 dark:hover:text-green-500'"
            @click="toggleTag(tag)">
            #{{ tag }}
          </button>
        </div>
      </div>
    </Card>

    <Card title="文章列表">
      <div v-if="filteredPosts.length === 0" class="text-center py-10 text-slate-400">
        📭 暂无文章发布
      </div>

      <div v-else class="flex flex-col gap-2">
        <a v-for="post in paginatedPosts" :key="post.url" :href="post.url"
          class="flex flex-col p-3 gap-3 rounded-lg bg-gray-100 hover:bg-gray-200/80 dark:bg-[#17181A] dark:hover:bg-white/5">
          <span class="text-xl font-bold text-black dark:text-white">{{ post.title }}</span>

          <div v-if="post.tags && post.tags.length" class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag"
              class="inline-flex items-center text-sm font-semibold px-2 py-1 rounded bg-green-500 text-white">{{ tag
              }}</span>
          </div>
          <div v-else class="flex gap-2">
            <span
              class="inline-flex items-center text-sm font-semibold px-2 py-1 rounded bg-green-500 text-white">无标签</span>
          </div>

          <time class="text-sm text-slate-400 font-normal">{{ post.date }}</time>
        </a>
      </div>

      <template v-if="filteredPosts.length > pageSize" #footer>
        <div class="flex justify-center items-center gap-4">
          <button
            class="text-sm inline-flex justify-center items-center px-4 py-2 rounded-md shadow-xs border border-gray-300 transition-all active:scale-95 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 dark:hover:bg-gray-50/10 dark:text-white dark:disabled:bg-slate-800 dark:disabled:text-slate-600 dark:disabled:border-slate-700"
            :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            上一页
          </button>

          <span class="text-black dark:text-white">
            {{ currentPage }} / {{ totalPages }} 页
          </span>

          <button
            class="text-sm inline-flex justify-center items-center px-4 py-2 rounded-md shadow-xs border border-gray-300 transition-all active:scale-95 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 dark:hover:bg-gray-50/10 dark:text-white dark:disabled:bg-slate-800 dark:disabled:text-slate-600 dark:disabled:border-slate-700"
            :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
            下一页
          </button>
        </div>
      </template>
    </Card>
  </div>
</template>
