# 吴鹏个人官网：内容维护

本站基于 AstroWind（MIT）定制。文章保存为 Markdown，构建后输出静态网页，无需文章数据库。

## 当前状态

- 首页、关于、文章列表、文章详情、实践和联系页面已建立。
- 两篇开站文章是根据讨论起草的文案，请在面向公众发布前核对。
- 照片来自你在原对话中提供的本人照片。
- 公开联系方式尚未提供；联系页会如实说明，未设置虚假的提交表单。
- 当前正式网站为 https://wupeng-36t.pages.dev ，源码仓库为 `fjwupeng/blog`。Cloudflare Pages 项目名称为 `wupeng`，已连接本仓库并完成首次部署，提交到 `main` 后自动构建并发布。Vercel 部署 https://wupeng.vercel.app 保留，也连接同一仓库。
- 原 Sites 链接为私有预览，不随 GitHub 更新。

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

## GitHub 自动更新

1. 在本仓库新增或修改文章、配图、页面。
2. 提交到 `main`，Cloudflare Pages 自动安装依赖并执行 `npm run build`，发布 `dist`。Node.js 使用 24。
3. 在 Cloudflare Pages 项目的部署列表中查看状态。成功后正式网址更新；失败时网站保留上一版。
4. 绑定自定义域名后，修改 `src/config.yaml` 中的 `site.site`，或在 Cloudflare 的构建环境设置 `SITE_URL`；环境变量优先。构建会同步更新规范链接、RSS、站点地图和 robots.txt。设置步骤见 [CLOUDFLARE-DEPLOYMENT.md](CLOUDFLARE-DEPLOYMENT.md)。

文章文件可以直接通过 GitHub 网页的编辑功能维护。`draft: true` 会隐藏文章；准备发布时请设为 `draft: false`。仅修改本地文件还需要提交并推送。

在 `.github/workflows/content-check.yml` 中已提供构建检查，可在 GitHub 提交及拉取请求时验证内容。

## 多平台分发

官网主稿可作为公众号、知乎等平台稿件的来源。当前尚未连接外部发布平台，不会自动发布。建议为每篇文章记录平台、实际发布链接、发布日期和使用的原稿版本，避免混淆草稿与已发布内容。

## 私有预览与正式上线

Cloudflare Pages 网站已上线，后续可以绑定自定义域名并补充公开联系方式。国内直连效果仍需测试。文章和项目描述仍由本人审阅维护。搜索收录和 AI 引用没有保证。
