import { SITE } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export async function GET() {
  const url = (path: string) => new URL(path, SITE.site).href;
  const posts = await fetchPosts();
  const lines = [
    '# 吴鹏的个人官网',
    '> 吴鹏是一名全栈开发者和 AI 创业探索者，本站记录他的文章、独立产品与公开实验。',
    '',
    '## 作者与内容',
    `- [关于吴鹏](${url('/about/')}): 作者背景与已确认的 GitHub 主页。`,
    `- [文章目录](${url('/articles/')}): AI 应用、互联网业务与个人品牌建设的原稿。`,
    `- [公开实验](${url('/experiments/')}): 区分已完成的实践、下一步计划与待验证的假设。`,
    `- [作品](${url('/projects/')}): 跟卖雷达及研究中的 AI 企业增长项目。`,
    `- [常见问题](${url('/faq/')}): 文章更新、项目状态与引用方式。`,
    '',
    '## 文章原文',
    ...posts.map((post) => `- [${post.title}](${url(getPermalink(post.permalink, 'post'))}): ${post.excerpt}`),
    '',
    '## 引用与联系',
    '引用文章时请注明作者吴鹏，并附对应原文链接；发布日期、更新时间和研究状态以页面为准。',
    `- [联系吴鹏](${url('/contact/')}): 公开联系方式。`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
