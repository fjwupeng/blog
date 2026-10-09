import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import slugify from 'limax';
import { experiments } from '../data/experiments';
import { homepage } from '../data/homepage';

// Only use editorial dates. A new build does not make every page new content.
export function getContentDates() {
  const dates = new Map<string, string>();
  const record = (pathname: string, value: Date | string | undefined) => {
    if (!value) return;
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) throw new Error(`Invalid content date for ${pathname}`);
    const iso = date.toISOString();
    if (!dates.has(pathname) || iso > (dates.get(pathname) || '')) dates.set(pathname, iso);
  };
  const directory = new URL('../data/post/', import.meta.url);
  record('/', homepage.updatedAt);
  for (const filename of fs.readdirSync(directory)) {
    if (!/\.mdx?$/.test(filename)) continue;
    const body = fs.readFileSync(new URL(filename, directory), 'utf8');
    const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) continue;
    const data = yaml.load(frontmatter[1]) as {
      draft?: boolean;
      publishDate?: Date;
      updateDate?: Date;
      category?: string;
    };
    if (data.draft) continue;
    const date = data.updateDate || data.publishDate;
    record(`/articles/${slugify(path.parse(filename).name)}/`, date);
    record('/articles/', date);
    if (data.category) record(`/articles/category/${slugify(data.category)}/`, date);
  }
  for (const experiment of experiments) {
    record(`/experiments/${experiment.slug}/`, experiment.updatedAt);
    record('/experiments/', experiment.updatedAt);
  }
  return dates;
}
