import rss from '@astrojs/rss';
import { fetchPosts } from '~/utils/blog';
import { SITE } from 'astrowind:config';
export async function GET() {
  const posts = await fetchPosts();
  return rss({
    title: '吴鹏的文章',
    description: '记录 AI 应用、互联网业务和个人品牌建设中的思考与实践。',
    site: SITE.site || 'https://fjwupeng.pages.dev',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishDate,
      description: post.excerpt,
      link: `/${post.permalink}`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
