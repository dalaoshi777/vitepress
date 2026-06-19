<script setup lang="ts">
import { useData } from 'vitepress'
import Nav from './components/Nav.vue'
import Home from './components/Home.vue'
import Archives from './components/Archives.vue'
import NotFound from './components/NotFound.vue'
const { page, frontmatter } = useData()
</script>

<template>
  <div class="site-wrapper">
    <header class="site-header">
      <Nav />
    </header>
    <main class="site-main">
      <Home v-if="frontmatter.layout === 'home'" />
      <NotFound v-else-if="page.isNotFound" />
      <Archives v-else-if="frontmatter.layout === 'archives'" />
      <div v-else class="article-container">
        <article class="markdown-body">
          <h1 v-if="frontmatter.title" class="article-title">{{ frontmatter.title }}</h1>
          <p v-if="frontmatter.description" class="article-description">{{ frontmatter.description }}</p>
          <p v-if="frontmatter.date" class="article-date">📅 {{ frontmatter.date }}</p>
          <Content />
        </article>
      </div>
    </main>
    <footer class="site-footer">
      <p>© 2026 dalaoshi777. Powered by VitePress</p>
    </footer>
  </div>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 100 !important;

  /* 🌟 核心：半透明背景色 + 毛玻璃虚化滤镜 */
  background-color: rgba(255, 255, 255, 0.7) !important;
  /* 使用 rgba，让背景留有 70% 的透明度 */
  -webkit-backdrop-filter: blur(8px) !important;
  /* 兼容 Safari 浏览器的毛玻璃 */
  backdrop-filter: blur(8px) !important;
  /* 现代浏览器的核心虚化滤镜（8px 效果最细腻） */

  /* 精细的边框与微阴影，增强立体感 */
  border-bottom: 1px solid rgba(226, 232, 240, 0.8) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01) !important;
}

.site-main {
  flex: 1;
  background-color: #f6f8fa;
  padding-top: 60px;
}

.article-container {
  display: flex;
  justify-content: center;
  min-height: 100%;
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
}

.article-title {
  margin-top: 0;
  text-align: center;
}

.markdown-body {
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.site-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #eee;
  color: #999;
}
</style>