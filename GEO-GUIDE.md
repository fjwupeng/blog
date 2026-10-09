# 官网的搜索与 AI 引用维护

当前正式网址为 **https://fjwupeng.pages.dev/**。本次优化使用现有网址，不需要后台或文章数据库。

## 已建立的基础

- 完整中文正文由 Astro 生成到 HTML，阅读不依赖客户端脚本。robots.txt 允许抓取，并指向站点地图。
- 页面使用统一的官网规范地址。作者页将“吴鹏”、GitHub 账号 `fjwupeng` 和本人介绍联系起来，页面同时提供对应的 Person、WebSite、ProfilePage 等结构化数据。
- 文章标明作者、分类、发布与修订时间，提供要点、参考资料和原文链接。BlogPosting 与面包屑数据使用同一份文章信息。
- 常见问题页的问答直接显示在正文中，与 FAQPage 数据保持一致。此标注不承诺搜索结果会显示特殊样式。
- 首页补充了来自现有原稿的实践说明、问答、作者与编辑日期；全文保留中文。`llms.txt` 随构建生成作者、文章与实验的目录，仅作为可读取的内容索引，不承诺平台采用或引用。
- 每页页脚提供隐私政策与使用条款。Cloudflare 的安全响应头在构建后生成，CSP 使用最终脚本的哈希，新增脚本时需重新构建并检查搜索功能。
- 站点地图随构建更新；文章和实验的 lastmod 使用实际编辑日期，不把每次构建时间当成内容更新。
- GitHub 的内容检查会验证规范地址、结构化数据、站内链接和文章日期。`main` 更新后，搜索通知任务会等待同一个版本在正式官网上线，再通过 IndexNow 提交通知。拉取请求和预览不会发送通知。

**通知送达、搜索收录、被 AI 引用是三个不同状态。** IndexNow 的 200 表示收到，202 表示收到但仍待验证密钥，不代表收录或引用。它只通知参与此协议的搜索引擎，不能据此声称已通知百度、搜狗、豆包、元宝、Kimi 或 DeepSeek。

## 国内搜索入口：仍需本人完成验证

1. 在 [百度搜索资源平台](https://ziyuan.baidu.com/site/index) 和 [搜狗站长平台](https://zhanzhang.sogou.com/) 添加当前官网，按平台要求验证。平台是否接受 `pages.dev`、是否允许提交站点地图，以当时控制台为准。
2. 若平台提供 HTML 文件验证，将它发出的文件原样放入 `public/`，提交后即可通过官网根路径访问。不要自行编造验证文件名或内容。
3. 百度若提供 meta 验证值，可在 Cloudflare Pages 的**生产构建环境变量**中设置 `BAIDU_SITE_VERIFICATION`，值只填写平台给出的验证码，然后重新部署。Bing 和 Google 可分别使用 `BING_SITE_VERIFICATION`、`GOOGLE_SITE_VERIFICATION`；这些项目只有拿到真实验证码后才填写。
4. 验证通过后，如果控制台支持站点地图，提交 `https://fjwupeng.pages.dev/sitemap-index.xml`；需要网页地址时，从文章原文链接或站点地图复制，保留末尾 `/`。
5. 在站长工具查看真实的抓取、索引及错误记录。尚未配置百度推送 token，当前不会通过百度专用接口自动推送。

当前只验证了普通网络请求能取得正文、robots 和站点地图，**不能代表中国大陆直连、平台真实爬虫或索引结果**。建议分别用电信、联通、移动的直连网络打开首页和一篇文章，关闭代理，记录运营商、日期、是否出现超时或验证页。如果直连不稳定，需要再评估个人域名及适合的托管方式；GEO 文案无法解决网络连接问题。

`pages.dev` 不是账户下可配置的个人域名 zone。本次没有改变 Cloudflare WAF 或付费设置，也没有把模拟爬虫名称的普通请求当成真实爬虫验证。

## 国内 AI 平台：记录实际来源

公开文档显示，Kimi 搜索会借助搜索引擎和其他资料来源，也能尝试读取给定网址；元宝相关的腾讯 Web Search 产品结合搜狗搜索与腾讯内容生态。各平台的数据源和策略可能变化，目前没有发现能保证所有平台引用本站的统一提交入口。

可以在豆包、元宝、Kimi、DeepSeek **开启联网搜索**后分别测试，记录日期、平台/模型、完整问题、返回的来源网址及是否准确引用：

| 测试         | 示例问题                                                                 | 说明                                       |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------ |
| 指定网址读取 | 请读取 https://fjwupeng.pages.dev/about/ ，概括作者背景并标明来源。      | 成功只说明能读取指定网址，不代表自然发现。 |
| 作者识别     | 独立开发者吴鹏（GitHub fjwupeng）是谁，有哪些作品？请给出来源。          | 检查是否找到本人，避免与同名人物混淆。     |
| 文章发现     | 如何用 GitHub 维护个人网站的文章原稿，并避免多平台版本混乱？请列出来源。 | 记录是否引用本文，不能预设一定出现。       |
| 修订发现     | 吴鹏的官网文章更新后，内容如何同步到网站？请核对最新原文。               | 对照文章的修订日期和实际回答。             |

截至本次配置，没有将上述 AI 平台的引用标记为“已验证”。如果答案没有官网来源，记录“未发现”即可；不要把读到 GitHub、其他转载页或只给出作者姓名当成引用官网。

## 内容与日常维护

优先补充真实的产品案例、开发决策、可复现步骤、使用反馈及适用范围，让文章解决具体问题。现有两篇属于开站和内容方法介绍，还需要持续积累原创实践。

跨平台发布目前仍需单独操作。每个版本保留作者身份，在允许的地方链接官网原文，并记录实际发布网址。发布到多个平台可能增加发现机会，但不是引用效果的证明。

新增文章的方法见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)。网站构建后运行 `npm run check:discovery`；`npm run notify:indexnow -- --dry-run` 只验证通知内容，不向外提交。通常由 GitHub 自动通知，无需反复手动推送。更换正式域名时应同时更新配置、重定向和站长验证，避免两份正式地址并存。若在 Cloudflare 用 `SITE_URL` 覆盖配置，也需在 GitHub 仓库的 Actions variables 设置同名变量，让检查和通知指向同一正式网址。

## 依据

- [Google：面向 AI 功能的优化指导](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)：基本原则仍是可抓取、有用且可信的内容，没有特殊 GEO 标记能保证引用。此项目不依赖未经验证的 llms.txt 收录效果。
- [Bing 站长指南](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)：规范链接、站点地图和内容质量是发现与引用的基础。
- [IndexNow 协议](https://www.indexnow.org/documentation)与[常见问题](https://www.indexnow.org/faq)：通知请求、公开验证文件及返回状态。
- [百度：HTTPS 站点抓取与收录](https://ziyuan.baidu.com/college/documentinfo?id=1399)。
- [Kimi 搜索使用说明](https://www.kimi.com/help/features/search)与[腾讯 Web Search 产品说明](https://cloud.tencent.com/product/wsa)。
- [Cloudflare AI Crawl Control 前提](https://developers.cloudflare.com/ai-crawl-control/get-started/)与[Git 自动部署](https://developers.cloudflare.com/pages/configuration/git-integration/)。
