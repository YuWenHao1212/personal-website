// The text face of the Chinese articles (源雲明體, GenWanMin TW, SIL OFL) is 24 MB a weight, so each article gets its own
// two small files holding only the characters that article shows: public/fonts/a/<slug>-400.woff2 and <slug>-600.woff2.
// layouts/ArticleLayout.astro points the page at its own pair.
//
//   node scripts/article-font.mjs           rebuild the files of every article whose characters changed
//   node scripts/article-font.mjs --check   change nothing; exit 1 and name the articles whose files are out of date
//                                           (runs before every build — see "prebuild" in package.json)
//
// The heading face (昭源宋體, Chiron Sung HK, SIL OFL) is handled here too, as two files shared by every Chinese page:
// public/fonts/head-900.woff2 (every heading and article title) and head-700.woff2 (the small titles in the home page's
// list). They hold the characters of every Chinese article's title and headings plus everything written in the Chinese
// page files, so a new article or a reworded page heading makes them out of date the same way.
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
// the heading face: titles, the articles' own headings, and the Chinese page files
const PAGES = ['src/pages/zh-TW/index.astro', 'src/pages/zh-TW/about.astro', 'src/pages/zh-TW/workshop.astro', 'src/pages/zh-TW/contact.astro', 'src/pages/zh-TW/thank-you.astro', 'src/pages/zh-TW/workshop/thanks.astro', 'src/components/BlogIndex.astro', 'src/layouts/ArticleLayout.astro', 'src/layouts/ProductLayout.astro', ...fs.readdirSync(path.join(ROOT, 'src/pages/zh-TW/products')).map((f) => 'src/pages/zh-TW/products/' + f)];
let titles = '', heads = '';
for (const f of fs.readdirSync(POSTS).filter((f) => /\.mdx?$/.test(f))) {
  const text = fs.readFileSync(path.join(POSTS, f), 'utf8');
  titles += (text.match(/^title:\s*(.*)$/m) || [])[1] || '';
  heads += [...text.matchAll(/^#{2,3}\s+(.*)$/gm)].map((m) => m[1]).join('');
}
const HEAD = '_headings';
want[HEAD] = { r: uniq(titles + heads + PAGES.map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('') + ALWAYS), b: uniq(titles + fs.readFileSync(path.join(ROOT, 'src/pages/zh-TW/index.astro'), 'utf8') + ALWAYS) }; // 700: the home page's list — article titles and the entries written in the home page itself
const HEAD_FILES = [path.join(ROOT, 'public/fonts/head-900.woff2'), path.join(ROOT, 'public/fonts/head-700.woff2')];

const have = fs.existsSync(LIST) ? JSON.parse(fs.readFileSync(LIST, 'utf8')) : {};
const stale = Object.keys(want).filter((s) => !have[s] || have[s].r !== want[s].r || have[s].b !== want[s].b || (s === HEAD ? !HEAD_FILES.every((f) => fs.existsSync(f)) : !fs.existsSync(path.join(OUT, `${s}-400.woff2`)) || !fs.existsSync(path.join(OUT, `${s}-600.woff2`))));

if (check) {
  if (stale.length) {
    console.error(`\nFonts are out of date for ${stale.length} item(s) (${HEAD} = the heading face shared by all pages):\n  ${stale.join('\n  ')}\nRun: node scripts/article-font.mjs   (then commit public/fonts/a/ and src/data/article-font-chars.json)\n`);
    process.exit(1);
  }
  console.log(`fonts: ${Object.keys(want).length - 1} articles and the heading face, all up to date`);
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(path.dirname(LIST), { recursive: true });
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], cwd: CACHE, ...opts });
if (!fs.existsSync(path.join(CACHE, 'venv/bin/pyftsubset'))) { sh('python3', ['-m', 'venv', 'venv']); sh(path.join(CACHE, 'venv/bin/pip'), ['-q', 'install', 'fonttools', 'brotli']); }
const PKG = path.join(CACHE, 'pkg-gen-wan-min-tw-ttf');
if (!fs.existsSync(PKG)) { sh('npm', ['pack', '@fontpkg/gen-wan-min-tw-ttf', '--silent']); const tgz = fs.readdirSync(CACHE).find((f) => /^fontpkg-gen-wan-min-tw-ttf-.*\.tgz$/.test(f)); fs.mkdirSync(PKG); sh('tar', ['-xzf', tgz, '-C', PKG]); fs.rmSync(path.join(CACHE, tgz)); }
// the heading face comes as one variable file (50 MB) from Google's font repository; cut the two weights out of it once
const VAR = path.join(CACHE, 'ChironSungHK-wght.ttf');
const cut = (w) => { const f = path.join(CACHE, `chiron-${w}.ttf`); if (!fs.existsSync(f)) { if (!fs.existsSync(VAR)) sh('curl', ['-sfL', '-o', VAR, 'https://raw.githubusercontent.com/google/fonts/main/ofl/chironsunghk/ChironSungHK%5Bwght%5D.ttf']); sh(path.join(CACHE, 'venv/bin/python'), ['-c', `from fontTools.ttLib import TTFont\nfrom fontTools.varLib import instancer\ninstancer.instantiateVariableFont(TTFont(${JSON.stringify(VAR)}),{'wght':${w}}).save(${JSON.stringify(f)})`]); } return f; };
let total = 0;
for (const s of stale) {
  if (s === HEAD) {
    for (const [w, chars, out] of [[900, want[s].r, HEAD_FILES[0]], [700, want[s].b, HEAD_FILES[1]]]) {
      const txt = path.join(CACHE, 'article-chars.txt');
      fs.writeFileSync(txt, chars);
      sh(path.join(CACHE, 'venv/bin/pyftsubset'), [cut(w), `--text-file=${txt}`, '--flavor=woff2', `--output-file=${out}`]);
      total += fs.statSync(out).size;
    }
    have[s] = want[s];
    continue;
  }
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
console.log(`rebuilt ${stale.length} item(s), ${Math.round(total / 1024)} KB written; ${Object.keys(want).length - 1} articles and the heading face in all`);
