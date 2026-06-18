<script lang="ts" setup>
import { useData } from 'vitepress'
const { page } = useData()  
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
    }
  }

  .nav-links {
    display: flex;
    gap: 16px;

    a {
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: all 0.2s ease-in-out;
    }

    a:hover {
      background-color: #f0f0f0;
    }

    a:active {
      transform: scale(0.96);
    }

    .is-active {
      color: #3eaf7c;
      background-color: #eefaf4;
      font-weight: 600;
    }
  }
}
</style>