<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Nav from './components/Nav.vue'
import Home from './components/Home.vue'
import Archives from './components/Archives.vue'
import NotFound from './components/NotFound.vue'
import Friends from './components/Friends.vue'
import DocToc from './components/DocToc.vue'

const { page, frontmatter } = useData()
const route = useRoute()

// 返回顶部按钮
const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 路由切换时重置滚动位置
watch(route, () => {
  window.scrollTo({ top: 0 })
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="fixed top-0 left-0 w-full z-[100] bg-white dark:bg-[#1E2022]">
      <Nav />
    </header>
    <main class="flex-1 bg-gray-50 pt-16 dark:bg-[#17181A]">
      <Home v-if="frontmatter.layout === 'home'" />
      <NotFound v-else-if="page.isNotFound" />
      <Friends v-else-if="frontmatter.layout === 'friends'" />
      <Archives v-else-if="frontmatter.layout === 'archives'" />
      <div v-else class="flex justify-center min-h-full max-w-6xl mx-auto my-10 px-6">
        <div class="flex gap-8 w-full max-w-4xl">
          <article class="markdown-body flex-1 min-w-0">
            <h1 v-if="frontmatter.title" class="m-0 text-center">{{ frontmatter.title }}</h1>
            <p v-if="frontmatter.description" class="text-center text-slate-500 dark:text-slate-400">{{
              frontmatter.description }}</p>
            <p v-if="frontmatter.date" class="text-center text-sm text-slate-400">📅{{ frontmatter.date }}</p>
            <Content />
          </article>
          <aside class="hidden lg:block shrink-0">
            <DocToc />
          </aside>
        </div>
      </div>
    </main>
    <footer class="p-4 flex justify-center items-center text-black dark:text-white bg-gray-50 dark:bg-[#17181A]">
      © 2026 dalaoshi777. Powered by VitePress
    </footer>

    <!-- 返回顶部按钮 -->
    <Transition enter-active-class="transition-all duration-300 ease"
      leave-active-class="transition-all duration-300 ease" enter-from-class="opacity-0 translate-y-5"
      leave-to-class="opacity-0 translate-y-5">
      <button v-if="showBackToTop"
        class="fixed bottom-8 right-8 w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white text-green-500 cursor-pointer z-[100] shadow-md transition-all duration-200 hover:bg-green-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg dark:bg-[#1E2022] dark:border-[#2d333b] dark:hover:bg-green-500 dark:hover:text-white"
        @click="scrollToTop" aria-label="返回顶部">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </Transition>
  </div>
</template>
