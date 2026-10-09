import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getSite, getSitemapUrls, readLocalSitemap, root, decodeXml } from './discovery-utils.mjs';

const site = await getSite();
const headers = await fs.readFile(new URL('dist/_headers', root), 'utf8');
const policy = headers.match(/^\s+Content-Security-Policy: (.+)$/m)?.[1];
assert(policy && policy.includes("frame-ancestors 'none'") && !policy.includes("'unsafe-inline'"));
assert(/Strict-Transport-Security: max-age=31536000; includeSubDomains/.test(headers));
const dates = new Map();
const urls = await getSitemapUrls(site, async (url) => {
  const xml = await readLocalSitemap(url);
  for (const entry of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const location = entry[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = entry[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (location && lastmod) dates.set(decodeXml(location), lastmod);
  }
  return xml;
});
const visibleText = (html) =>
  decodeXml(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
const includesText = (html, text) => visibleText(html).includes(text.replace(/\s+/g, ' ').trim());
const attributes = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((item) => [item[1], decodeXml(item[2])]));
let articleCount = 0;
let questionCount = 0;
for (const url of urls) {
  const page = new URL(url);
  const html = await fs.readFile(new URL(`dist${page.pathname}index.html`, root), 'utf8');
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0]));
  assert.equal(links.find((link) => link.rel === 'canonical')?.href, url, `Canonical mismatch: ${url}`);
  const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]));
  const robots = metadata.find((meta) => meta.name === 'robots')?.content;
  assert(robots && !robots.includes('noindex'), `Public page is noindex or missing robots: ${url}`);
  assert(/<html lang="zh-CN"/.test(html), `Missing language: ${url}`);
  const graphMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert(graphMatch, `Missing structured data: ${url}`);
  const graph = JSON.parse(graphMatch[1])['@graph'];
  for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!body.trim() || /\bsrc\s*=|application\/ld\+json/.test(attributes)) continue;
    const hash = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
    assert(policy.includes(hash), `CSP blocks an inline script on ${url}`);
  }
  const person = graph.find((item) => item['@type'] === 'Person');
  assert.equal(person.name, '吴鹏');
  assert.equal(person['@id'], new URL('/about/#person', site).href);
  assert(person.sameAs.includes('https://github.com/fjwupeng'));
  const webpage = graph.find((item) => item.url === url && item['@id'].endsWith('#webpage'));
  assert(webpage, `WebPage does not match canonical: ${url}`);
  const posting = graph.find((item) => item['@type'] === 'BlogPosting');
  if (posting) {
    articleCount++;
    if (posting.author['@id']) assert.equal(posting.author['@id'], person['@id']);
    else assert(includesText(html, posting.author.name));
    assert.equal(posting.url, url);
    assert(includesText(html, posting.headline));
    if (posting.articleSection) assert(includesText(html, posting.articleSection));
    assert(html.includes(`datetime="${posting.datePublished}"`));
    assert(html.includes(`datetime="${posting.dateModified}"`));
    assert(new Date(posting.dateModified) >= new Date(posting.datePublished));
    assert(includesText(html, '引用本文时'));
    assert.equal(dates.get(url), posting.dateModified, `Article sitemap date mismatch: ${url}`);
  }
  const faq = webpage['@type'] === 'FAQPage' ? webpage : webpage.hasPart;
  if (faq?.['@type'] === 'FAQPage') {
    for (const question of faq.mainEntity) {
      questionCount++;
      assert(includesText(html, question.name), 'FAQ question is not visible.');
      assert(includesText(html, question.acceptedAnswer.text), 'FAQ answer is not visible.');
    }
  }
  if (page.pathname === '/') {
    assert(html.includes(`datetime="${webpage.datePublished}"`));
    assert(html.includes(`datetime="${webpage.dateModified}"`));
    assert.equal(dates.get(url), webpage.dateModified);
    assert(person.telephone && person.contactPoint.telephone === person.telephone);
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const target = new URL(decodeXml(match[1]), page);
    if (target.origin !== site.origin || !target.pathname.startsWith('/') || /\.[a-z0-9]+$/i.test(target.pathname))
      continue;
    assert(target.pathname.endsWith('/'), `Internal link is not canonical: ${target.href}`);
    await fs.access(new URL(`dist${target.pathname.replace(/\/$/, '')}/index.html`, root));
  }
}
assert(articleCount > 0, 'No published articles checked.');
assert(questionCount > 0, 'No visible FAQ checked.');
const robots = await fs.readFile(new URL('dist/robots.txt', root), 'utf8');
assert(/User-agent: \*\s+Allow: \//.test(robots));
assert(robots.includes(`Sitemap: ${new URL('/sitemap-index.xml', site).href}`));
const marker = JSON.parse(await fs.readFile(new URL('dist/site-build.json', root), 'utf8'));
const llms = await fs.readFile(new URL('dist/llms.txt', root), 'utf8');
assert(llms.split(/\r?\n/).filter((line) => line.trim()).length >= 5, 'llms.txt is too short.');
assert(llms.includes(new URL('/articles/', site).href), 'llms.txt is missing the canonical article resource.');
assert.equal(marker.site, site.href);
assert(marker.commit === 'local' || /^[0-9a-f]{40}$/.test(marker.commit));
const notFound = await fs.readFile(new URL('dist/404.html', root), 'utf8');
assert(notFound.includes('noindex,follow'));
console.info(
  `Discovery checks passed: ${urls.length} canonical pages, ${articleCount} articles, ${questionCount} visible FAQ answers, internal links and sitemap dates.`
);
