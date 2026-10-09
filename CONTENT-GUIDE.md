# 吴鹏个人官网：内容维护

本站基于 AstroWind（MIT）定制。文章保存为 Markdown，构建后输出静态网页，无需文章数据库。

## 当前状态

- 首页、关于、文章列表、文章详情、实践和联系页面已建立。
- 两篇开站文章是根据讨论起草的文案，请在面向公众发布前核对。
- 照片来自你在原对话中提供的本人照片。
- 公开联系方式尚未提供；联系页会如实说明，未设置虚假的提交表单。
- 原 Sites 链接为私有预览，外部搜索引擎不能抓取。网站源码使用 GitHub 仓库 `fjwupeng/blog`；自动发布需要托管平台完成一次仓库连接。

## 新增文章

在 `src/data/post/` 新增英文短名的 `.md` 文件。文件名构成永久地址，例如 `my-note.md` 对应 `/articles/my-note`。

```yaml
---
title: '文章标题'
publishDate: 2026-10-08T08:00:00Z
excerpt: '简短摘要'
category: '实践笔记'
tags: ['AI 应用']
author: '吴鹏'
draft: true
---
```

在文件下方写正文。审阅后将 `draft` 改为 `false` 并提交，文章会在下次构建时进入首页、文章列表、RSS 和站点地图。`draft: true` 的文章不会生成公开文章页。当前没有定时发布功能。

配图放入 `public/images/`，正文使用 `![图片说明](/images/文件名.jpg)`。

## 本地运行

Node.js 版本遵循 `package.json`。首次安装运行 `npm ci`，预览运行 `npm run dev`，构建运行 `npm run build`。生成目录为 `dist`。

## 接入 GitHub 自动更新

1. 将本站源码放入你选定的 GitHub 仓库；保留 LICENSE.md，勿上传 node_modules、环境密钥和 `.sites-runtime`。
2. 在选定的静态托管平台连接该仓库。构建命令使用 `npm run build`，输出目录使用 `dist`。
3. 正式域名确定后，在托管平台设置 `SITE_URL` 环境变量（例如实际分配的网址或自己的域名）。它覆盖 `src/config.yaml` 中的 `site.site`；构建会同步更新规范链接、RSS、站点地图和 robots.txt。
4. 后续提交文章即可触发托管平台重新构建。仅把代码推到 GitHub 本身不会自动更新当前 Sites 私有预览。

在 `.github/workflows/content-check.yml` 中已提供构建检查，可在 GitHub 提交及拉取请求时验证内容。

## 多平台分发

官网主稿可作为公众号、知乎等平台稿件的来源。当前尚未连接外部发布平台，不会自动发布。建议为每篇文章记录平台、实际发布链接、发布日期和使用的原稿版本，避免混淆草稿与已发布内容。

## 私有预览与正式上线

私有预览用于核对版式和文案。正式上线还需要确定公开联系方式、GitHub 仓库、域名及托管平台，并确认文章与项目描述。搜索收录和 AI 引用没有保证。
