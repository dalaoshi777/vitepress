---
title: Git 常用命令
date: 2026-07-05T14:00:00+08:00
lastmod: 2026-07-05T14:00:00+08:00
tags:
  - 'Git'
  - '工具'
---
## Git 常用命令

Git 是目前最流行的版本控制工具，掌握常用命令能大幅提升开发效率。本文整理日常开发中最常用的 Git 命令。

## 配置

首次使用 Git 需要配置用户信息：

```bash
# 设置全局用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 查看所有配置
git config --list
```

## 基础操作

```bash
# 初始化仓库
git init

# 克隆远程仓库
git clone <url>

# 查看当前状态
git status

# 添加文件到暂存区
git add .              # 添加所有文件
git add README.md      # 添加指定文件

# 提交到本地仓库
git commit -m "提交信息"

# 查看提交历史
git log --oneline
```

## 分支管理

```bash
# 查看分支
git branch             # 查看本地分支
git branch -a          # 查看所有分支（含远程）

# 创建并切换分支
git checkout -b dev
# 等价于
git switch -c dev

# 切换分支
git checkout main
git switch main

# 删除分支
git branch -d dev      # 安全删除（已合并）
git branch -D dev      # 强制删除

# 合并分支
git merge dev          # 将 dev 合并到当前分支
```

## 远程操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <url>

# 拉取代码
git pull origin main   # 拉取并合并

# 推送代码
git push origin main   # 推送到远程 main 分支
git push -u origin dev # 首次推送并建立关联
```

## 撤销操作

```bash
# 撤销工作区的修改（未 add）
git checkout -- <file>

# 撤销暂存区的文件（已 add，未 commit）
git reset HEAD <file>

# 撤销提交（保留修改）
git reset --soft HEAD^      # 撤销上次 commit，保留暂存
git reset --mixed HEAD^     # 撤销上次 commit 和 add

# 撤销提交（丢弃修改，慎用）
git reset --hard HEAD^
```

## 储藏（Stash）

当需要临时切换分支但不想提交当前修改时：

```bash
# 保存当前工作区
git stash

# 查看储藏列表
git stash list

# 恢复最近的储藏（并删除）
git stash pop

# 恢复指定储藏（不删除）
git stash apply stash@{0}
```

## 常用技巧

### 修改最近一次提交信息

```bash
git commit --amend -m "新的提交信息"
```

### 查看某次提交的改动

```bash
git show <commit-id>
```

### 打标签

```bash
git tag v1.0.0              # 轻量标签
git tag -a v1.0.0 -m "说明" # 附注标签
git push origin v1.0.0      # 推送标签到远程
```

## 小结

| 场景 | 命令 |
|------|------|
| 查看状态 | `git status` |
| 提交代码 | `git add . && git commit -m "msg"` |
| 推送代码 | `git push` |
| 拉取代码 | `git pull` |
| 切换分支 | `git switch <branch>` |
| 合并分支 | `git merge <branch>` |
| 临时保存 | `git stash` |

掌握这些命令，日常开发基本就够用了。更多用法可以查看 [Git 官方文档](https://git-scm.com/docs)。
