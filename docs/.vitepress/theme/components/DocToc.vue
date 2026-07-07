<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'

interface TocItem {
  id: string
  text: string
  level: number
}

const route = useRoute()
const headers = ref<TocItem[]>([])
const activeId = ref('')
const containerRef = ref<HTMLElement | null>(null)

// 从文章内容中提取标题
const extractHeaders = () => {
  headers.value = []
  const article = document.querySelector('.markdown-body')
  if (!article) return

  const headings = article.querySelectorAll('h2, h3, h4')
  headings.forEach((h, index) => {
    const level = parseInt(h.tagName.substring(1))
    // 若无 id，则生成一个
    if (!h.id) {
      h.id = `toc-${index}-${Date.now()}`
    }
    headers.value.push({
      id: h.id,
      text: (h.textContent || '').replace(/[#`]/g, '').trim(),
      level,
    })
  })
}

// 点击跳转
const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
    activeId.value = id
  }
}

// 监听滚动，高亮当前章节
const handleScroll = () => {
  if (headers.value.length === 0) return
  const scrollY = window.scrollY + 100
  let current = headers.value[0].id
  for (const item of headers.value) {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
      current = item.id
    }
  }
  activeId.value = current
}

watch(
  () => route.path,
  () => {
    nextTick(() => {
      extractHeaders()
      handleScroll()
    })
  }
)

onMounted(() => {
  nextTick(() => {
    extractHeaders()
    handleScroll()
  })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav v-if="headers.length > 0" ref="containerRef" class="doc-toc">
    <div class="toc-title">目录</div>
    <ul class="toc-list">
      <li
        v-for="item in headers"
        :key="item.id"
        :class="['toc-item', `toc-level-${item.level}`, { active: activeId === item.id }]"
        @click="scrollTo(item.id)"
      >
        {{ item.text }}
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.doc-toc {
  position: sticky;
  top: 88px;
  width: 220px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 16px 0 16px 18px;
  border-left: 1px solid #e2e8f0;
  font-size: 13px;
}

:global(.dark) .doc-toc {
  border-left-color: #2d333b;
}

.toc-title {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

:global(.dark) .toc-title {
  color: #94a3b8;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  padding: 5px 0 5px 10px;
  color: #64748b;
  cursor: pointer;
  border-left: 2px solid transparent;
  margin-left: -2px;
  line-height: 1.5;
  transition: all 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:global(.dark) .toc-item {
  color: #94a3b8;
}

.toc-item:hover {
  color: #3eaf7c;
}

.toc-item.active {
  color: #3eaf7c;
  font-weight: 600;
  border-left-color: #3eaf7c;
}

.toc-level-3 {
  padding-left: 22px;
  font-size: 12.5px;
}

.toc-level-4 {
  padding-left: 34px;
  font-size: 12px;
  color: #94a3b8;
}

/* 滚动条样式 */
.doc-toc::-webkit-scrollbar {
  width: 4px;
}

.doc-toc::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

:global(.dark) .doc-toc::-webkit-scrollbar-thumb {
  background: #2d333b;
}
</style>
