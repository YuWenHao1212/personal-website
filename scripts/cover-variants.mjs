// A phone does not need the 1200-pixel-wide cover image: on a slow connection that image is what the reader waits for
// (it is the page's "largest contentful paint"). For every article cover this writes an 800-pixel-wide WebP copy to
// public/images/cover-800/ and lists it in src/data/cover-variants.json; layouts/ArticleLayout.astro then offers both
// sizes and the browser picks one. Runs before every build ("prebuild"); it only makes what is missing or older than
// its source, and a cover without a small copy is simply served as before — so this never stops a build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIST = path.join(ROOT, 'src/data/cover-variants.json');
const W = 800;
let sharp;
try { sharp = (await import('sharp')).default; } catch { console.warn('cover-variants: sharp is not available, skipped'); process.exit(0); }

const covers = new Set();
for (const lang of ['zh-TW', 'en']) {
  const dir = path.join(ROOT, 'src/content/blog', lang);
  for (const f of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/^heroImage:\s*["']?([^"'\n]+?)["']?\s*$/m);
    if (m && /^\/.+\.(webp|jpe?g|png)$/i.test(m[1])) covers.add(m[1]);
  }
}
const out = {}; let made = 0;
for (const src of [...covers].sort()) {
  const from = path.join(ROOT, 'public', src);
  if (!fs.existsSync(from)) continue;
  const small = '/images/cover-800' + src.replace(/^\/images/, '').replace(/\.(webp|jpe?g|png)$/i, '.webp');
  const to = path.join(ROOT, 'public', small);
  try {
    const meta = await sharp(from).metadata();
    if (!meta.width || meta.width <= W * 1.2) continue; // already small: one size is enough
    if (!fs.existsSync(to) || fs.statSync(to).mtimeMs < fs.statSync(from).mtimeMs) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      await sharp(from).resize({ width: W }).webp({ quality: 76 }).toFile(to);
      made++;
    }
    if (fs.statSync(to).size < fs.statSync(from).size * 0.85) out[src] = { small, w: meta.width, h: meta.height }; // keep it only if it really is lighter
  } catch (e) { console.warn('cover-variants: skipped', src, e.message); }
}
fs.mkdirSync(path.dirname(LIST), { recursive: true });
const next = JSON.stringify(out, null, 1) + '\n';
if (!fs.existsSync(LIST) || fs.readFileSync(LIST, 'utf8') !== next) fs.writeFileSync(LIST, next);
console.log(`cover images: ${Object.keys(out).length} of ${covers.size} have a small copy (${made} made now)`);
