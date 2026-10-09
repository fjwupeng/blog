# 吴鹏 · 个人官网

基于 AstroWind 定制的中文个人品牌网站。包含本人介绍、Markdown 文章、RSS、项目实践与联系页面。

内容维护与部署步骤见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)。

源码仓库：[fjwupeng/blog](https://github.com/fjwupeng/blog)。文章位于 `src/data/post/`，图片位于 `public/images/`。

提交到 `main` 后会运行构建检查。连接托管平台后，同一提交可自动触发网站发布；仅推送源码不会更新原来的 Sites 预览链接。

Vercel 连接参数：导入 `fjwupeng/blog`，Framework Preset 选 `Astro`，生产分支 `main`，构建命令 `npm run build`，输出目录 `dist`，Node.js 24。仓库中的 `vercel.json` 已配置构建参数。

设置环境变量 `SITE_URL` 为实际正式网址，使文章规范链接、RSS 和站点地图使用正确域名。首次连接需要在自己的 Vercel 账号中授权此仓库。之后每次提交到 `main` 会自动部署生产网站；其他分支用于预览。

可以先使用 Vercel 分配的网址，域名稍后再绑定。添加自定义域名时，以 Vercel 项目页面给出的 DNS 记录为准。

当前没有写作后台，也不会自动向公众号、知乎等平台发布内容。

## 开源来源

基于 [AstroWind](https://github.com/arthelokyo/astrowind)，保留 MIT 许可证，见 LICENSE.md。

## 依赖说明

已更新可兼容修复的依赖。剩余审计提示来自开发构建工具（astro-compress 与 Tailwind typography 的传递依赖）；没有将这些工具作为网站服务端部署，产物为静态页面。后续升级时应重新检查。
