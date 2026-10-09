import fs from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';
import { getSite, getSitemapUrls, readLocalSitemap, root } from './discovery-utils.mjs';

const site = await getSite();
const key = (await fs.readFile(new URL('public/indexnow-key.txt', root), 'utf8')).trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid IndexNow verification key.');
const keyLocation = new URL('/indexnow-key.txt', site).href;
const dryRun = process.argv.includes('--dry-run');
const expectedCommit = process.env.EXPECTED_COMMIT;

async function fetchSite(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}

if (!dryRun && expectedCommit) {
  const deadline = Date.now() + 10 * 60 * 1000;
  let ready = false;
  console.info(`Waiting for production commit ${expectedCommit.slice(0, 7)} at ${site.origin}.`);
  while (Date.now() < deadline) {
    try {
      const marker = new URL('/site-build.json', site);
      marker.searchParams.set('commit', expectedCommit);
      const published = await (await fetchSite(marker)).json();
      if (published.commit === expectedCommit && published.site === site.href) {
        ready = true;
        break;
      }
    } catch (error) {
      console.info(`Deployment not ready: ${error.message}`);
    }
    await wait(15000);
  }
  if (!ready)
    throw new Error('Production did not publish the expected commit within 10 minutes; no URLs were submitted.');
}

if (!dryRun && (await (await fetchSite(keyLocation)).text()).trim() !== key) {
  throw new Error('The live verification file does not match this repository; no URLs were submitted.');
}

const urlList = await getSitemapUrls(site, dryRun ? readLocalSitemap : async (url) => (await fetchSite(url)).text());
if (urlList.length > 10000) throw new Error('IndexNow allows at most 10,000 URLs per request.');
const payload = { host: site.hostname, key, keyLocation, urlList };

if (dryRun) {
  console.info(`Dry run: ${urlList.length} canonical pages at ${site.origin}; no notification sent.`);
} else {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(
      `IndexNow notification failed: HTTP ${response.status}. Check the key, site host, and endpoint; indexing is not confirmed.`
    );
  }
  console.info(
    `IndexNow HTTP ${response.status}: ${urlList.length} URLs received${response.status === 202 ? '; key verification is pending' : ''}. This does not confirm indexing or AI citations.`
  );
}
