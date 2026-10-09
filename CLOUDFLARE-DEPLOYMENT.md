# Cloudflare Pages 部署

本站是 Astro 静态网站，可以连接同一份 GitHub 仓库自动发布，无需文章数据库或服务器适配器。

## 创建项目

在 Cloudflare 控制台进入 Workers & Pages，创建 Pages 项目并连接 GitHub。选择 `fjwupeng/blog`，授权范围仅需这个仓库。

| 设置                        | 值                                                                        |
| --------------------------- | ------------------------------------------------------------------------- |
| 项目名称                    | `wupeng`（如已被占用，以实际创建的名称为准，并同步修改 `wrangler.jsonc`） |
| 生产分支                    | `main`                                                                    |
| 框架                        | Astro                                                                     |
| 构建命令                    | `npm run build`                                                           |
| 输出目录                    | `dist`                                                                    |
| 根目录                      | 仓库根目录                                                                |
| 构建环境变量 `NODE_VERSION` | `24`                                                                      |
| 构建环境变量 `SITE_URL`     | 实际分配的 Pages 网址或已绑定的自定义域名，包含 `https://`                |

仓库的 `wrangler.jsonc` 指定 Pages 输出目录，不包含函数、数据库、密钥或外部服务绑定。`public/_headers` 设置静态资源缓存，`404.astro` 提供不存在页面的处理。

`SITE_URL` 必须添加到 Pages 的构建环境变量中。它会使文章规范链接、RSS、站点地图和生成的 robots.txt 使用正式域名；Wrangler 的运行时 `vars` 不用于这个设置。

## 自动更新

项目连接成功后，提交文章、图片或页面到 `main` 会触发构建与发布。先确认首次部署成功，再通过一次真实提交验证自动更新。

Cloudflare 项目尚未创建或验证前，不应把预计分配的网址当作已上线地址。正式网址以控制台的实际部署结果为准。

## 国内访问

部署成功不等于中国大陆所有网络都能稳定访问。应使用关闭代理的国内网络测试首页、文章和图片；长期使用建议绑定自有域名，实际可用性仍需测试。

参考：[Cloudflare Git 集成](https://developers.cloudflare.com/pages/configuration/git-integration/) · [Astro 部署说明](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
