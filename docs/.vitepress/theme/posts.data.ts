// docs/.vitepress/theme/posts.data.ts
import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: string
  tags?: string[]
  description?: string
}

declare const data: Post[]
export { data }

// 💡 createContentLoader 是 VitePress 的核心大招
// 它会自动扫描指定目录下的所有 .md 文件，并提取它们的 frontmatter
export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '无题',
        url,
        // 格式化时间，如果 md 里没写时间，就用当前时间
        date: formatDate(frontmatter.date),
        tags: frontmatter.tags,
        description: frontmatter.description
      }))
      /* 💡 规范：按发布时间倒序排列（最新的文章在最前面） */
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})

function formatDate(raw: any): string {
  // 处理 undefined / null / 空字符串等无效输入
  if (!raw) return new Date().toISOString().slice(0, 10)
  const date = raw instanceof Date ? raw : new Date(raw)
  if (isNaN(date.getTime())) return new Date().toISOString().slice(0, 10)
  return date.toISOString().slice(0, 10) // 返回 YYYY-MM-DD 格式
}