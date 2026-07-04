import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss() as any
    ]
  },
  title: "Megumin的博客",
  description: "Megumin的个人技术博客，分享前端开发、工具美化等学习笔记",
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    theme: 'github-light',
    lineNumbers: false,
  },
  head: [
    // 添加网站标签页的 favicon 图标
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  sitemap: {
    hostname: 'https://example.com'
  },
})
