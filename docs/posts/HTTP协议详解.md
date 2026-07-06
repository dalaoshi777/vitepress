---
title: HTTP 协议详解
date: 2026-07-06T10:00:00+08:00
lastmod: 2026-07-06T10:00:00+08:00
tags:
  - 'HTTP'
  - '前端'
---

## HTTP 协议详解

HTTP（HyperText Transfer Protocol）是前端开发中最基础的协议。每次你访问网页、调用 API、加载资源，背后都是 HTTP 请求。理解 HTTP 的工作原理，能帮助你更好地调试网络问题、优化性能、设计 API。

## HTTP 是什么

HTTP 是一个基于**请求-响应**模型的应用层协议。客户端（浏览器）发送请求，服务器返回响应。

```
客户端                    服务器
  |                         |
  |------  HTTP 请求 ------->|
  |<----- HTTP 响应 ---------|
  |                         |
```

## HTTP 请求

一个 HTTP 请求由三部分组成：

### 请求行

```
GET /api/users?page=1 HTTP/1.1
```

- **请求方法**：`GET`、`POST`、`PUT`、`DELETE` 等
- **请求路径**：`/api/users?page=1`
- **协议版本**：`HTTP/1.1`

### 请求头（Headers）

```
Host: example.com
Authorization: Bearer token123
Content-Type: application/json
```

### 请求体（Body）

```
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

> `GET` 请求通常没有请求体，`POST`、`PUT` 等方法才携带请求体。

## HTTP 响应

### 状态行

```
HTTP/1.1 200 OK
```

- **协议版本**：`HTTP/1.1`
- **状态码**：`200`
- **状态文本**：`OK`

### 响应头（Headers）

```
Content-Type: application/json
Cache-Control: max-age=3600
Set-Cookie: session=abc123
```

### 响应体（Body）

```json
{
  "id": 1,
  "name": "Alice"
}
```

## HTTP 方法

| 方法 | 用途 | 有请求体 | 幂等 |
|------|------|---------|------|
| GET | 获取资源 | 否 | 是 |
| POST | 创建资源 | 是 | 否 |
| PUT | 更新资源（全量） | 是 | 是 |
| PATCH | 更新资源（部分） | 是 | 否 |
| DELETE | 删除资源 | 否 | 是 |

**幂等**指多次请求效果相同。例如 `GET /users/1` 无论调多少次，结果都一样。

## 常见状态码

### 2xx 成功

| 状态码 | 含义 |
|--------|------|
| 200 OK | 请求成功 |
| 201 Created | 资源创建成功 |
| 204 No Content | 成功但无返回内容 |

### 3xx 重定向

| 状态码 | 含义 |
|--------|------|
| 301 Moved Permanently | 永久重定向 |
| 302 Found | 临时重定向 |
| 304 Not Modified | 缓存可用，无需重新请求 |

### 4xx 客户端错误

| 状态码 | 含义 |
|--------|------|
| 400 Bad Request | 请求格式错误 |
| 401 Unauthorized | 未认证（未登录） |
| 403 Forbidden | 无权限访问 |
| 404 Not Found | 资源不存在 |
| 429 Too Many Requests | 请求过于频繁 |

### 5xx 服务器错误

| 状态码 | 含义 |
|--------|------|
| 500 Internal Server Error | 服务器内部错误 |
| 502 Bad Gateway | 网关错误 |
| 503 Service Unavailable | 服务不可用 |

## HTTP/1.0 vs HTTP/1.1 vs HTTP/2

### HTTP/1.0

- 每个请求需要单独建立 TCP 连接
- 无法复用连接，性能较差

### HTTP/1.1（最常用）

- 支持**持久连接**（Keep-Alive），默认复用 TCP 连接
- 支持**管道化**（Pipelining），但存在队头阻塞问题
- 增加了 `Host`、`Content-Length` 等重要头字段

### HTTP/2

- **多路复用**：一个连接上并行处理多个请求，解决了队头阻塞
- **头部压缩**：使用 HPACK 算法压缩请求头，减少传输体积
- **服务器推送**：服务器可以主动推送资源
- **二进制分帧**：使用二进制格式传输数据，效率更高

## HTTPS

HTTPS = HTTP + TLS/SSL。TLS 为 HTTP 提供了：

- **加密**：数据传输使用对称加密，防止窃听
- **身份验证**：通过证书验证服务器身份，防止中间人攻击
- **完整性**：数据在传输过程中不会被篡改

HTTPS 默认端口 443，HTTP 默认端口 80。

## CORS（跨域资源共享）

浏览器的同源策略限制不同源之间的请求。CORS 是解决跨域的标准方案。

### 简单请求

满足以下条件的请求会被浏览器自动处理：

- 方法：`GET`、`POST`、`HEAD`
- 头字段：`Accept`、`Content-Type`（仅限 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`）

### 预检请求（Preflight）

不满足简单请求条件时，浏览器会先发送 `OPTIONS` 请求询问服务器是否允许：

```
OPTIONS /api/users
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
```

服务器返回：

```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

## 浏览器缓存

HTTP 缓存通过响应头控制：

### Cache-Control

```
Cache-Control: no-cache        # 每次向服务器验证
Cache-Control: no-store        # 完全不缓存
Cache-Control: max-age=3600    # 缓存 1 小时
Cache-Control: public          # 允许任何中间节点缓存
Cache-Control: private         # 仅允许浏览器缓存
```

### ETag 与 If-None-Match

```
# 首次请求
ETag: "abc123"

# 再次请求
If-None-Match: "abc123"

# 服务器返回 304 Not Modified 表示缓存有效
```

## fetch API 示例

```javascript
// GET 请求
const res = await fetch('/api/users?page=1')
const data = await res.json()

// POST 请求
const res = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com'
  })
})
```

## 小结

| 概念 | 要点 |
|------|------|
| 请求方法 | GET 获取、POST 创建、PUT 更新、DELETE 删除 |
| 状态码 | 2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务端错误 |
| HTTP/2 | 多路复用、头部压缩、二进制分帧 |
| HTTPS | HTTP + TLS，加密+认证+完整性 |
| CORS | 跨域请求通过预检请求验证权限 |
| 缓存 | Cache-Control 控制缓存策略，ETag 实现验证 |

HTTP 是 Web 的基石，深入理解它能让你在开发中更游刃有余。如果想进一步学习，推荐阅读 [MDN HTTP 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)。
