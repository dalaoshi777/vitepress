<script lang="ts" setup>
import { title } from 'node:process';
import { useData } from 'vitepress'
const { page } = useData()
const { isDark } = useData()
function toggleTheme() {
  isDark.value = !isDark.value
}
const navItems = [
  { text: '首页', link: '/', path: 'index.md' },
  { text: '归档', link: '/archives/', path: 'archives.md' },
  { text: '关于', link: '/about/', path: 'about.md' },
  { text: '友链', link: '/friends/', path: 'friends.md' }
]
</script>

<template>
  <nav class="site-nav w-full">
    <div class="nav-content max-w-4xl h-16 flex justify-center md:justify-between items-center px-6 mx-auto ">
      <div class="nav-logo text-2xl font-bold hidden md:block dark:text-white">
        Megumin's Blog
      </div>
      <div class="nav-links flex gap-2">
        <a v-for="item in navItems" :key="item.path" :href="item.link"
          class="py-1.5 px-3.5 text-black hover:bg-gray-100 rounded-md active:translate-y-0.5 transition-all duration-100 ease-out dark:text-white dark:hover:bg-gray-50/10"
          :class="{ 'text-white bg-green-500 hover:bg-green-600 font-semibold dark:bg-white/10': page.relativePath === item.path }">
          {{ item.text }}
        </a>

        <button
          class="theme-toggle-btn flex justify-center items-center w-9 h-auto hover:bg-gray-100 active:scale-90 rounded-lg transition-all duration-200 ease-in-out cursor-pointer dark:hover:bg-gray-50/10 dark:text-white"
          @click="toggleTheme">
          <!-- 太阳图标 -->
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun"
            aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>

          <!-- 月亮图标 -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-moon"
            aria-hidden="true">
            <path
              d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401">
            </path>
          </svg>
        </button>
      </div>

    </div>
  </nav>
</template>

<style scoped></style>