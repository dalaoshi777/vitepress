<script lang="ts" setup>
import { computed } from 'vue'
import Card from './Card.vue'
import { data as posts } from '../posts.data'

// 1. 自动按年份归类文章
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

// 2. 格式化月日（06-15）
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
  <div class="archive-container">
    <Card title="文章归档" class="archive-card">

      <div v-if="archiveData.length === 0" class="no-archives">
        📭 暂无归档文章
      </div>

      <div v-else class="archive-list">
        <div v-for="group in archiveData" :key="group.year" class="archive-year-section">

          <h2 class="archive-year-title">{{ group.year }}</h2>

          <div class="archive-posts-list">
            <a v-for="post in group.list" :key="post.url" :href="post.url" class="archive-post-item">
              <span class="archive-post-item__date">{{ formatMD(post.date) }}</span>
              <span class="archive-post-item__title">{{ post.title }}</span>
            </a>
          </div>

        </div>
      </div>

    </Card>
  </div>
</template>

<style scoped>
.archive-container {
  min-height: 100%;
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
}

.archive-card {
  width: 100%;
  max-width: 960px;
}

.archive-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  /* 年份区块之间的间距 */
}

.archive-year-section {
  display: flex;
  flex-direction: column;
}

/* 干净的纯文字年份 */
.archive-year-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1e293b;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 1px dashed #e2e8f0;
}

.archive-posts-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.archive-post-item {
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  padding: 8px 4px;
  border-radius: 4px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f8fafc;

    .archive-post-item__title {
      color: #3eaf7c;
    }
  }
}

.archive-post-item__date {
  font-size: 14px;
  color: #94a3b8;
  font-family: monospace;
  min-width: 45px;
}

/* 标题 */
.archive-post-item__title {
  font-size: 15px;
  color: #334155;
  transition: color 0.15s ease;
}

.no-archives {
  text-align: center;
  padding: 40px 0;
  color: #94a3b8;
}
</style>