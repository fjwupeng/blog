import fs from 'node:fs/promises';
import yaml from 'js-yaml';

export const root = new URL('../', import.meta.url);

export async function getSite() {
  const config = yaml.load(await fs.readFile(new URL('src/config.yaml', root), 'utf8'));
  const site = new URL(process.env.SITE_URL || config.site.site);
  if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash) {
    throw new Error('Search discovery requires an HTTPS site origin.');
  }
  return site;
}

export function decodeXml(text) {
  return text.replace(
    /&(?:amp|lt|gt|quot|apos);/g,
    (entity) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'",
      })[entity]
  );
}

export async function getSitemapUrls(site, read) {
  const visited = new Set();
  const pages = new Set();
  async function walk(url) {
    if (visited.has(url.href)) return;
    if (url.origin !== site.origin) throw new Error(`Foreign sitemap: ${url.href}`);
    visited.add(url.href);
    if (visited.size > 100) throw new Error('Unexpectedly many sitemap files.');
    const xml = await read(url);
    const locations = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(
      (match) => new URL(decodeXml(match[1].trim()))
    );
    if (!locations.length) throw new Error(`Empty sitemap: ${url.href}`);
    if (/<sitemapindex(?:\s|>)/.test(xml)) {
      for (const location of locations) await walk(location);
    } else if (/<urlset(?:\s|>)/.test(xml)) {
      for (const location of locations) {
        if (
          location.origin !== site.origin ||
          location.search ||
          location.hash ||
          !location.pathname.endsWith('/') ||
          /^\/404\/?$/.test(location.pathname)
        ) {
          throw new Error(`Invalid canonical page URL: ${location.href}`);
        }
        pages.add(location.href);
      }
    } else throw new Error(`Invalid sitemap: ${url.href}`);
  }
  await walk(new URL('/sitemap-index.xml', site));
  return [...pages].sort();
}

export function readLocalSitemap(url) {
  return fs.readFile(new URL(`dist${url.pathname}`, root), 'utf8');
}
