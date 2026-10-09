# 吴鹏 · 个人官网

基于 AstroWind 定制的中文个人品牌网站。包含本人介绍、Markdown 文章、RSS、项目实践与联系页面。

内容维护与部署步骤见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)。

Cloudflare Pages 已连接本仓库并完成首次部署，配置说明见 [CLOUDFLARE-DEPLOYMENT.md](CLOUDFLARE-DEPLOYMENT.md)。

源码仓库：[fjwupeng/blog](https://github.com/fjwupeng/blog)。文章位于 `src/data/post/`，图片位于 `public/images/`。

网站：[fjwupeng.pages.dev](https://fjwupeng.pages.dev)。Cloudflare Pages 项目名称为 `fjwupeng`，提交到 `main` 会自动构建并发布。

提交到 `main` 后会运行构建检查，同时触发 Cloudflare Pages 自动发布。Vercel 的 [wupeng.vercel.app](https://wupeng.vercel.app) 保留为另一份部署，也连接同一仓库。原来的 Sites 预览链接由另一套流程维护，不随 GitHub 更新。

Vercel 连接参数：导入 `fjwupeng/blog`，Framework Preset 选 `Astro`，生产分支 `main`，构建命令 `npm run build`，输出目录 `dist`，Node.js 24。仓库中的 `vercel.json` 已配置构建参数。

`src/config.yaml` 已配置当前 Cloudflare 网址，使文章规范链接、RSS 和站点地图使用正确域名。以后绑定自定义域名时，可以修改此配置或设置托管平台的构建环境变量 `SITE_URL` 覆盖它。其他分支用于预览。

添加自定义域名时，以对应托管平台项目页面给出的 DNS 记录为准。Cloudflare 默认域名的中国大陆访问效果仍需使用国内直连网络测试。

当前没有写作后台，也不会自动向公众号、知乎等平台发布内容。

## 开源来源

基于 [AstroWind](https://github.com/arthelokyo/astrowind)，保留 MIT 许可证，见 LICENSE.md。

## 依赖说明

已更新可兼容修复的依赖。剩余审计提示来自开发构建工具（astro-compress 与 Tailwind typography 的传递依赖）；没有将这些工具作为网站服务端部署，产物为静态页面。后续升级时应重新检查。
