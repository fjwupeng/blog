import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url);
const hashes = { script: new Set(), style: new Set() };
async function collect(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(filename);
    else if (entry.name.endsWith('.html')) {
      const html = await fs.readFile(filename, 'utf8');
      for (const [tag, values] of Object.entries(hashes)) {
        for (const [, attributes, body] of html.matchAll(
          new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi')
        )) {
          if (!body.trim() || /\bsrc\s*=|application\/ld\+json/.test(attributes)) continue;
          values.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
        }
      }
    }
  }
}
await collect(fileURLToPath(dist));
const policy = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes.script].join(' ')}`.trim(),
  `style-src 'self' ${[...hashes.style].join(' ')}`.trim(),
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');
const file = new URL('_headers', dist);
const headers = await fs.readFile(file, 'utf8');
if (!/^\/\*\r?\n/.test(headers)) throw new Error('Missing global headers rule.');
await fs.writeFile(file, headers.replace(/^\/\*\r?\n/, `/*\n  Content-Security-Policy: ${policy}\n`));
console.log('Security headers include hashes of the final, compressed inline scripts and styles.');
