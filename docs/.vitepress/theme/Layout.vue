<script setup lang="ts">
import { useData } from 'vitepress'
import Nav from './components/Nav.vue'
import Home from './components/Home.vue'
import Archives from './components/Archives.vue'
import NotFound from './components/NotFound.vue'
import Fridens from './components/Fridens.vue'
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
      <Fridens v-else-if="frontmatter.layout === 'fridens'" />
      <Archives v-else-if="frontmatter.layout === 'archives'" />
      <div v-else class="article-container">
        <article class="markdown-body">
          <h1 v-if="frontmatter.title" class="article-title">{{ frontmatter.title }}</h1>
          <p v-if="frontmatter.description" class="article-description">{{ frontmatter.description }}</p>
          <p v-if="frontmatter.date" class="article-date">📅{{ frontmatter.date }}</p>
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
  background-color: rgba(255, 255, 255, 0.7) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  backdrop-filter: blur(8px) !important;
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
  margin: 0;
  text-align: center;
}

.site-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #eee;
  color: #999;
}
</style>