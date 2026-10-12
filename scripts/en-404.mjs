// Runs after `astro build` (package.json "postbuild").
//
// Astro only writes a file literally named 404.html for src/pages/404.astro. The English one comes out
// as dist/en/404/index.html, which Cloudflare Pages would treat as an ordinary page at /en/404/.
// Pages answers a missing address with the closest 404.html up the directory tree, so the file has to
// be dist/en/404.html for English addresses to get the English page.
import { existsSync, renameSync, rmdirSync } from 'node:fs';

const from = 'dist/en/404/index.html';
const to = 'dist/en/404.html';

if (!existsSync(from)) {
  console.error(`en-404: ${from} is missing. Was src/pages/en/404.astro removed or renamed?`);
  process.exit(1);
}
renameSync(from, to);
rmdirSync('dist/en/404');
console.log(`en-404: ${from} -> ${to}`);
