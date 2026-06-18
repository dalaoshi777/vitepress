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
</script>

<template>
  <div class="home-container">
    <Card v-if="allTags.length > 0" title="标签云" class="post-card">
      <div class="tag-cloud-wrapper">
        <div class="tag-cloud__list">
          <button v-for="tag in allTags" :key="tag"
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

      <div v-else class="posts-list">
        <a v-for="post in filteredPosts" :key="post.url" :href="post.url" class="post-item">

          <span class="post-item__title">{{ post.title }}</span>

          <div v-if="post.tags && post.tags.length" class="post-item__tags">
            <span v-for="tag in post.tags" :key="tag" class="tag-badge">#{{ tag }}</span>
          </div>
          <div v-else class="post-item__tags">
            <span class="tag-badge tag-badge--none">#无标签</span>
          </div>

          <time class="post-item__date">{{ post.date }}</time>

        </a>
      </div>

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

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.post-item {
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #000;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    transform: scale(0.98);
  }
}

.post-item__title {
  font-size: 16px;
  font-weight: bold;
}

.post-item__date {
  font-size: 14px;
  color: #94a3b8;
  font-weight: normal;
}

.post-item__tags {
  display: flex;
  gap: 8px;
}

.tag-badge {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #e0e0e0;
  color: #333;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid rgb(209, 237, 196);


  &:hover {
    background-color: #c0c0c0;
  }
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
</style>