import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const allowed = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/script.js', ['script.js', 'text/javascript; charset=utf-8']],
  ['/assets/ayush-profile.jpg', ['assets/ayush-profile.jpg', 'image/jpeg']],
  ['/assets/favicon.svg', ['assets/favicon.svg', 'image/svg+xml']],
  ['/robots.txt', ['robots.txt', 'text/plain; charset=utf-8']],
  ['/sitemap.xml', ['sitemap.xml', 'application/xml; charset=utf-8']],
]);

const headers = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; form-action 'none'; base-uri 'none'; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
};

createServer(async (req, res) => {
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  // Canonical hostname only; never derive a redirect target from untrusted Host headers.
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  if (host === 'www.ayush-cyber-def.tech' && ['GET', 'HEAD'].includes(req.method)) {
    const pathname = new URL(req.url, 'http://localhost');
    const destination = 'https://ayush-cyber-def.tech' + pathname.pathname + pathname.search;
    res.writeHead(308, { Location: destination, 'Cache-Control': 'public, max-age=300' });
    return res.end();
  }
  if (req.socket.encrypted || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  }
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(req.method === 'HEAD' ? undefined : 'Method Not Allowed');
  }
  let url;
  try { url = new URL(req.url, 'http://localhost'); }
  catch { res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Bad Request'); }
  const file = allowed.get(url.pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(req.method === 'HEAD' ? undefined : 'Not Found');
  }
  try {
    const body = await readFile(join(root, file[0]));
    const cache = file[0] === 'index.html' ? 'no-cache' : 'public, max-age=600';
    res.writeHead(200, {
      'Content-Type': file[1], 'Content-Length': body.byteLength, 'Cache-Control': cache,
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    console.error('Failed serving static asset', file[0], error?.code || 'unknown');
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('Server Error');
  }
}).listen(port, '0.0.0.0', () => console.log(`Portfolio listening on ${port}`));
