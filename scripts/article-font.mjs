// The text face of the Chinese articles (源雲明體, GenWanMin TW, SIL OFL) is 24 MB a weight, so each article gets its own
// two small files holding only the characters that article shows: public/fonts/a/<slug>-400.woff2 and <slug>-600.woff2.
// layouts/ArticleLayout.astro points the page at its own pair.
//
//   node scripts/article-font.mjs           rebuild the files of every article whose characters changed
//   node scripts/article-font.mjs --check   change nothing; exit 1 and name the articles whose files are out of date
//                                           (runs before every build — see "prebuild" in package.json)
//
// A character missing from an article's files is drawn in Noto Serif TC instead: readable, but visibly a different weight.
// Needs python3 and npm for a rebuild (the full typeface is fetched into /tmp/fonts, not kept in the repo). --check needs neither.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = path.join(ROOT, 'src/content/blog/zh-TW');
const OUT = path.join(ROOT, 'public/fonts/a');
const LIST = path.join(ROOT, 'src/data/article-font-chars.json');
const CACHE = process.env.CACHE || '/tmp/fonts';
const check = process.argv.includes('--check');

const ALWAYS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' + '，。、；：「」『』（）—…？！“”‘’–／　·・→←↑↓✓✕−';
const layout = fs.readFileSync(path.join(ROOT, 'src/layouts/ArticleLayout.astro'), 'utf8');
const uniq = (s) => [...new Set([...s])].filter((c) => c.codePointAt(0) >= 0x20).sort().join('');
// Semibold is used by bold text, table headings and first columns, figure labels and small headings — only those
// pieces of the text are counted, so the semibold file stays small.
const boldText = (text) => {
  const out = [];
  for (const m of text.matchAll(/\*\*([^*\n]+)\*\*|<strong>([^<]*)<\/strong>|<span class="l">([^<]*)<\/span>|^#{4,}\s*(.*)$/gm)) out.push(m[1] || m[2] || m[3] || m[4] || '');
  const lines = text.split('\n');
  lines.forEach((l, i) => {
    if (!/^\s*\|/.test(l)) return;
    if (/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '')) out.push(l); // a table's heading row
    else out.push(l.split('|')[1] || ''); // the first column
  });
  return out.join('');
};

const want = {};
for (const f of fs.readdirSync(POSTS).filter((f) => /\.mdx?$/.test(f)).sort()) {
  const text = fs.readFileSync(path.join(POSTS, f), 'utf8');
  want[f.replace(/\.mdx?$/, '')] = { r: uniq(text + layout + ALWAYS), b: uniq(boldText(text) + ALWAYS) };
}
const have = fs.existsSync(LIST) ? JSON.parse(fs.readFileSync(LIST, 'utf8')) : {};
const stale = Object.keys(want).filter((s) => !have[s] || have[s].r !== want[s].r || have[s].b !== want[s].b || !fs.existsSync(path.join(OUT, `${s}-400.woff2`)) || !fs.existsSync(path.join(OUT, `${s}-600.woff2`)));

if (check) {
  if (stale.length) {
    console.error(`\nArticle fonts are out of date for ${stale.length} article(s):\n  ${stale.join('\n  ')}\nRun: node scripts/article-font.mjs   (then commit public/fonts/a/ and src/data/article-font-chars.json)\n`);
    process.exit(1);
  }
  console.log(`article fonts: ${Object.keys(want).length} articles, all up to date`);
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(path.dirname(LIST), { recursive: true });
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], cwd: CACHE, ...opts });
if (!fs.existsSync(path.join(CACHE, 'venv/bin/pyftsubset'))) { sh('python3', ['-m', 'venv', 'venv']); sh(path.join(CACHE, 'venv/bin/pip'), ['-q', 'install', 'fonttools', 'brotli']); }
const PKG = path.join(CACHE, 'pkg-gen-wan-min-tw-ttf');
if (!fs.existsSync(PKG)) { sh('npm', ['pack', '@fontpkg/gen-wan-min-tw-ttf', '--silent']); const tgz = fs.readdirSync(CACHE).find((f) => /^fontpkg-gen-wan-min-tw-ttf-.*\.tgz$/.test(f)); fs.mkdirSync(PKG); sh('tar', ['-xzf', tgz, '-C', PKG]); fs.rmSync(path.join(CACHE, tgz)); }
let total = 0;
for (const s of stale) {
  for (const [w, face, chars] of [['400', 'Regular', want[s].r], ['600', 'SemiBold', want[s].b]]) {
    const txt = path.join(CACHE, 'article-chars.txt');
    fs.writeFileSync(txt, chars);
    const out = path.join(OUT, `${s}-${w}.woff2`);
    sh(path.join(CACHE, 'venv/bin/pyftsubset'), [path.join(PKG, `package/GenWanMinTW-${face}.ttf`), `--text-file=${txt}`, '--flavor=woff2', `--output-file=${out}`]);
    total += fs.statSync(out).size;
  }
  have[s] = want[s];
}
for (const s of Object.keys(have)) if (!want[s]) { delete have[s]; for (const w of ['400', '600']) fs.rmSync(path.join(OUT, `${s}-${w}.woff2`), { force: true }); }
fs.writeFileSync(LIST, JSON.stringify(have, null, 1) + '\n');
console.log(`rebuilt ${stale.length} article(s), ${Math.round(total / 1024)} KB written; ${Object.keys(want).length} articles in all`);
