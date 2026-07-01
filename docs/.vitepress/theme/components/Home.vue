<script lang="ts" setup>
import Card from './Card.vue'
import { data as posts } from '../posts.data'
import { ref, computed } from 'vue'

const allTags = computed(() => {
  const tagsSet = new Set<string>()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  return Array.from(tagsSet)
})

// 2. 选中的标签响应式状态
const selectedTags = ref<string[]>([])

// 3. 点击切换标签选中状态
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 4. ✨ 实时动态过滤文章（源头使用你的 posts）
const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) {
    return posts
  }
  return posts.filter(post => {
    if (!post.tags) return false
    return selectedTags.value.every(tag => post.tags.includes(tag))
  })
})

const currentPage = ref(1) // 当前页码，默认第一页
const pageSize = ref(4)    // 每页显示 5 篇文章（可以根据需要调整）

// 当切换标签导致过滤后的文章总数变少时，重置当前页码到第一页，防止页码溢出
import { watch } from 'vue'
watch(filteredPosts, () => {
  currentPage.value = 1
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize.value) || 1
})

// ✨ 最终渲染到当前页面的文章切片
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

// 页码切换方法
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // 可选：切换页面时自动平滑滚动回顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home-container">
    <Card v-if="allTags.length > 0" title="标签云" class="post-card">
      <div class="tag-cloud-wrapper">
        <div class="tag-cloud__list">
          <button v-for="tag in allTags" :key="tag" class="bg-white text-black dark:bg-black dark:text-white"
            :class="['tag-cloud__item', { 'is-active': selectedTags.includes(tag) }]" @click="toggleTag(tag)">
            #{{ tag }}
          </button>
        </div>
      </div>
    </Card>

    <Card title="文章列表" class="post-card">

      <div v-if="filteredPosts.length === 0" class="no-posts">
        📭 暂无文章发布
      </div>

      <div v-else class="posts-list flex flex-col gap-2">
        <a v-for="post in paginatedPosts" :key="post.url" :href="post.url"
          class="post-item flex flex-col p-3 gap-3 rounded-lg bg-gray-100 dark:bg-[#17181A] hover:bg-gray-200/80 dark:hover:bg-white/5">

          <span class="post-item__title text-xl font-bold text-black dark:text-white">{{ post.title }}</span>

          <div v-if="post.tags && post.tags.length" class="post-item__tags flex gap-2">
            <span v-for="tag in post.tags" :key="tag"
              class="tag-badge inline-flex items-center text-sm font-normal px-3 py-1 rounded bg-green-700 text-white">#{{
                tag
              }}</span>
          </div>
          <div v-else class="post-item__tags">
            <span
              class="tag-badge tag-badge--none inline-flex items-center text-sm font-normal px-3 py-1 rounded bg-green-700 text-white">#无标签</span>
          </div>

          <time class="post-item__date">{{ post.date }}</time>

        </a>
      </div>
      <template v-if="filteredPosts.length > pageSize" #footer>
        <div class="pagination">
          <button class="pagination__btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            &lt; 上一页
          </button>

          <span class="pagination__info">
            {{ currentPage }} / {{ totalPages }} 页
          </span>

          <button class="pagination__btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
            下一页 &gt;
          </button>
        </div>
      </template>

    </Card>
  </div>
</template>


<style scoped>
.home-container {
  min-height: 100%;
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
}

.post-card {
  width: 100%;
  max-width: 960px;
}

.post-item__date {
  font-size: 14px;
  color: #94a3b8;
  font-weight: normal;
}


.tag-cloud-wrapper {
  padding: 4px 0;
}

.tag-cloud__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-cloud__item {
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  color: #475569;
  padding: 6px 14px;
  font-size: 0.85rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #3eaf7c;
    color: #3eaf7c;
    transform: translateY(-1px);
  }
}

.tag-cloud__item.is-active {
  background-color: #3eaf7c;
  border-color: #3eaf7c;
  color: #fff;
  box-shadow: 0 4px 12px rgba(62, 175, 124, 0.25);
}


/* ==========================================
   6. 分页控件样式
   ========================================== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  width: 100%;
}

.pagination__info {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.pagination__btn {
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  color: #475569;
  padding: 6px 14px;
  font-size: 0.85rem;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover:not(:disabled) {
    border-color: #3eaf7c;
    color: #3eaf7c;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  /* 禁用状态（比如第一页时的上一页） */
  &:disabled {
    cursor: not-allowed;
    background-color: #f1f5f9;
    color: #cbd5e1;
    border-color: #e2e8f0;
  }
}
</style>