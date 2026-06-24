<script lang="ts" setup>
import { useData } from 'vitepress'
const { page } = useData()
const { isDark } = useData()
function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <nav class="site-nav">
    <div class="nav-content">
      <div class="nav-logo">
        Megumin's Blog
      </div>
      <div class="nav-links">
        <a href="/" :class="{ 'is-active': page.relativePath === 'index.md' }">首页</a>
        <a href="/archives/ " :class="{ 'is-active': page.relativePath === 'archives.md' }">归档</a>
        <a href="/about/" :class="{ 'is-active': page.relativePath === 'about.md' }">关于</a>
        <a href="/friends/" :class="{ 'is-active': page.relativePath === 'friends.md' }">友链</a>
        <button class="theme-toggle-btn" @click="toggleTheme">
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

<style scoped>
.site-nav {
  width: 100%;
  border-bottom: 1px solid #f0f0f0;

  .nav-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-logo {
      font-size: 1.5em;
      font-weight: bold;
      color: var(--text-color);
    }
  }

  .nav-links {
    display: flex;
    gap: 16px;

    a {
      padding: 6px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
      transition: all 0.2s ease-in-out;
    }

    a:hover {
      background-color: var(--nav-hover-bg-color);
      color: var(--nav-light-color);

    }

    a:active {
      transform: scale(0.96);
    }

    .is-active {
      color: var(--nav-light-color);
      background-color: var(--nav-light-bg-color);
      font-weight: 600;
    }
  }

  .theme-toggle-btn {
    color: var(--text-color);
    display: flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f0f0f0;
      color: var(--nav-light-color);
    }

    &:active {
      transform: scale(0.96);
    }
  }
}
</style>