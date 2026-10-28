#!/usr/bin/env node
/**
 * Static preview server that resolves paths the way GitHub Pages does.
 *
 * `serve` and `vite preview` both get this build wrong: adapter-static emits
 * both `platform.html` and a `platform/` directory, and they disagree about
 * which wins. GitHub Pages tries, in order:
 *
 *   1. the exact file
 *   2. <path>/index.html
 *   3. <path>.html
 *   4. 404.html, with a 404 status
 *
 * This mirrors that, so what you see locally is what ships.
 *
 *   node scripts/preview.mjs [--port 4173] [--dir build]
 */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, normalize, extname, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const port = Number(flag('port', 4173));
const root = resolve(flag('dir', 'build'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

async function firstFile(candidates) {
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${port}`);
  const decoded = decodeURIComponent(pathname);

  // Keep traversal inside the build directory.
  const rel = normalize(decoded)
    .replace(/^(\.\.[/\\])+/, '')
    .replace(/^[/\\]+/, '');
  const base = join(root, rel);

  if (!base.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  const file = await firstFile([
    ...(decoded.endsWith('/') ? [] : [base]),
    join(base, 'index.html'),
    `${base.replace(/[/\\]+$/, '')}.html`
  ]);

  const status = file ? 200 : 404;
  const target = file ?? join(root, '404.html');

  const resolved = await firstFile([target]);
  if (!resolved) {
    res.writeHead(404, { 'Content-Type': MIME['.html'] }).end('<h1>404</h1>');
    return;
  }

  res.writeHead(status, {
    'Content-Type': MIME[extname(resolved)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  createReadStream(resolved).pipe(res);
});

server.listen(port, () => {
  console.log(`Preview (GitHub Pages resolution) → http://localhost:${port}`);
  console.log(`Serving ${root}`);
});
