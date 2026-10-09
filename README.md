# 吴鹏 · 个人官网

基于 AstroWind 定制的中文个人品牌网站。包含本人介绍、Markdown 文章、RSS、项目实践与联系页面。

内容维护与部署步骤见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)。

源码仓库：[fjwupeng/blog](https://github.com/fjwupeng/blog)。文章位于 `src/data/post/`，图片位于 `public/images/`。

网站：[wupeng-personal.vercel.app](https://wupeng-personal.vercel.app)。Vercel 已连接本仓库，提交到 `main` 会自动构建并发布，首次部署已成功。

提交到 `main` 后会运行构建检查，同时触发 Vercel 自动发布。原来的 Sites 预览链接由另一套流程维护，不随 GitHub 更新。

Vercel 连接参数：导入 `fjwupeng/blog`，Framework Preset 选 `Astro`，生产分支 `main`，构建命令 `npm run build`，输出目录 `dist`，Node.js 24。仓库中的 `vercel.json` 已配置构建参数。

`src/config.yaml` 已配置当前正式网址，使文章规范链接、RSS 和站点地图使用正确域名。以后绑定自定义域名时，可以修改此配置或设置 Vercel 环境变量 `SITE_URL` 覆盖它。其他分支用于预览。

可以先使用 Vercel 分配的网址，域名稍后再绑定。添加自定义域名时，以 Vercel 项目页面给出的 DNS 记录为准。

当前没有写作后台，也不会自动向公众号、知乎等平台发布内容。

## 开源来源

基于 [AstroWind](https://github.com/arthelokyo/astrowind)，保留 MIT 许可证，见 LICENSE.md。

## 依赖说明

已更新可兼容修复的依赖。剩余审计提示来自开发构建工具（astro-compress 与 Tailwind typography 的传递依赖）；没有将这些工具作为网站服务端部署，产物为静态页面。后续升级时应重新检查。
