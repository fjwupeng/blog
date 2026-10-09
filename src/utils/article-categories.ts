import type { Post, Taxonomy } from '~/types';

export function getArticleCategories(posts: Post[]): Array<Taxonomy & { count: number }> {
  const categories = new Map<string, Taxonomy & { count: number }>();
  for (const { category } of posts) {
    if (!category) continue;
    const existing = categories.get(category.slug);
    categories.set(category.slug, { ...category, count: (existing?.count ?? 0) + 1 });
  }
  return [...categories.values()].sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
}
