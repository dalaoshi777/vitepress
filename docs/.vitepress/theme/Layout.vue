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

.site-main {
  flex: 1;
  background-color: #f6f8fa;
}

.article-container {
  min-height: 100%;
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
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