import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss() as any
    ]
  },
  title: "Megumin的博客",
  description: "A VitePress Site",
  markdown: {
    theme: 'github-light',
    lineNumbers: false,
  },
  head: [
    // 添加网站标签页的 favicon 图标
    ['link', { rel: 'icon', href: '/logo.png' }]

    // 如果你用的是 png 格式，写下面这行：
    // ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]
  ],
})
