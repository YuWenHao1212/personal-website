// Keeps new pages and new articles on the site's tokens (src/styles/tokens.css; rules in docs/DESIGN.md).
//
//   node scripts/check-tokens.mjs              exit 1 and name every hard-coded value in a file that is not exempt
//                                              (runs before every build — see "prebuild" in package.json)
//   node scripts/check-tokens.mjs --all        list what the exempt files contain too (to see what is left to move)
//   node scripts/check-tokens.mjs --baseline   rewrite the exempt list from the files that fail today.
//                                              Used once, on 10/12. Do not run it to get a new page past the check:
//                                              the list is meant to get shorter, never longer.
//
// What is read: the CSS in src/styles/*.css, and in every <style> block of src/**/*.astro and of the articles
// (src/content/blog/**/*.md, .mdx). In those same files' markup, class names of the older Tailwind palette.
//
// What counts as hard-coded:
//   colour   a hex colour, rgb()/rgba()/hsl()/hsla() written out, in any declaration
//   size     font-size that is not var(--t-*), a relative value (em, %) or inherit
//   spacing  margin, padding, gap (and their -top / -inline / row- / column- forms) whose parts are not
//            var(--space-*), var(--gx), 0, auto, 1px, 2px, a relative value (em, %) or a calc() of those
//   palette  a class such as bg-cream-200, text-ink-600, border-accent (tailwind.config.mjs's older colours)
//
// The exempt list (scripts/check-tokens-exempt.json) holds the files that existed before the scales did.
// A file on the list that no longer breaks any rule is reported, so it can be taken off.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exemptFile = path.join(root, 'scripts/check-tokens-exempt.json');
const TOKENS = 'src/styles/tokens.css'; // the one file where values are written out
const mode = process.argv[2] ?? '';

function walk(dir, keep, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, keep, out);
    else if (keep(full)) out.push(full);
  }
  return out;
}

const files = [
  ...walk(path.join(root, 'src'), (f) => f.endsWith('.astro') || (f.endsWith('.css') && f.includes(`${path.sep}styles${path.sep}`))),
  ...walk(path.join(root, 'src/content/blog'), (f) => /\.mdx?$/.test(f) && !f.includes(`${path.sep}drafts${path.sep}`)),
]
  .map((f) => path.relative(root, f).split(path.sep).join('/'))
  .filter((f) => f !== TOKENS)
  .sort();

// Split "a b(c d) e" on the spaces that are not inside brackets.
function parts(value) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of value) {
    if (ch === '(') depth += 1;
    if (ch === ')') depth -= 1;
    if (ch === ' ' && depth === 0) {
      if (cur) out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

const relative = /^-?[\d.]+(em|%)$/;
const spaceOk = (part) =>
  part === '0' ||
  part === 'auto' ||
  part === 'inherit' ||
  /^-?[12]px$/.test(part) ||
  relative.test(part) ||
  /^var\(--(space-[\w-]+|gx)\)$/.test(part) ||
  // a calc() made only of tokens, numbers and relative values, e.g. calc(-1 * var(--gx))
  (/^calc\(/.test(part) && !/\d(px|rem|vw|vh)\b/.test(part.replace(/\b[12]px\b/g, '')));

function cssProblems(css, lineOf) {
  const found = [];
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const decl = /(^|[;{\s])(-{0,2}[a-z][\w-]*)\s*:\s*([^;{}]+)(?=[;}])/g;
  let m;
  while ((m = decl.exec(noComments))) {
    const prop = m[2];
    const value = m[3].replace(/!important/g, '').replace(/\s+/g, ' ').trim();
    const line = lineOf(m.index + m[1].length);
    if (/#[0-9a-fA-F]{3,8}\b/.test(value) || /\b(rgb|rgba|hsl|hsla)\(/.test(value)) {
      found.push({ line, kind: 'colour', text: `${prop}: ${value}` });
    }
    if (prop === 'font-size' && !(/^var\(--t-[\w-]+\)$/.test(value) || relative.test(value) || value === 'inherit')) {
      found.push({ line, kind: 'size', text: `${prop}: ${value}` });
    }
    if (/^(margin|padding)(-[a-z-]+)?$|^(row-|column-)?gap$/.test(prop) && !parts(value).every(spaceOk)) {
      found.push({ line, kind: 'spacing', text: `${prop}: ${value}` });
    }
  }
  return found;
}

const palette = /(?:^|[\s"'`:])((?:bg|text|border|ring|from|to|via|decoration|fill|stroke)-(?:cream|ink|accent|link|lavender)(?:-[\w/]+)?)/g;

function problemsIn(file) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  const lineAt = (index) => text.slice(0, index).split('\n').length;
  if (file.endsWith('.css')) return cssProblems(text, lineAt);

  const found = [];
  const style = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let markup = text;
  let m;
  while ((m = style.exec(text))) {
    const start = m.index + m[0].indexOf(m[1]);
    found.push(...cssProblems(m[1], (i) => lineAt(start + i)));
    markup = markup.replace(m[0], m[0].replace(/[^\n]/g, ' '));
  }
  // Articles are prose: only their own <style> blocks are checked, not words that happen to look like a class.
  if (file.endsWith('.astro')) {
    while ((m = palette.exec(markup))) found.push({ line: lineAt(m.index), kind: 'palette', text: m[1] });
  }
  return found;
}

const results = new Map(files.map((f) => [f, problemsIn(f)]));
const failing = files.filter((f) => results.get(f).length > 0);

if (mode === '--baseline') {
  const list = {
    note: 'Files that carried hard-coded colours, sizes or spacing before the scales existed (10/12). Take a file off when it is moved onto the tokens. Never add one. See docs/DESIGN.md.',
    files: failing,
  };
  fs.writeFileSync(exemptFile, `${JSON.stringify(list, null, 2)}\n`);
  console.log(`check-tokens: wrote ${failing.length} exempt file(s) to scripts/check-tokens-exempt.json`);
  process.exit(0);
}

const exempt = new Set(JSON.parse(fs.readFileSync(exemptFile, 'utf8')).files);
const show = (file) => {
  const list = results.get(file);
  const count = (kind) => list.filter((p) => p.kind === kind).length;
  console.log(`\n${file}  (${['colour', 'size', 'spacing', 'palette'].map((k) => `${k} ${count(k)}`).join(', ')})`);
  for (const p of list.slice(0, 40)) console.log(`  ${String(p.line).padStart(5)}  ${p.kind.padEnd(8)} ${p.text}`);
  if (list.length > 40) console.log(`  … and ${list.length - 40} more`);
};

if (mode === '--all') {
  failing.forEach(show);
  console.log(`\ncheck-tokens: ${failing.length} file(s) with hard-coded values, ${files.length} read`);
  process.exit(0);
}

const bad = failing.filter((f) => !exempt.has(f));
const clean = [...exempt].filter((f) => !failing.includes(f));
for (const f of clean) {
  console.log(
    fs.existsSync(path.join(root, f))
      ? `check-tokens: ${f} no longer has hard-coded values — take it off scripts/check-tokens-exempt.json`
      : `check-tokens: ${f} is gone — take it off scripts/check-tokens-exempt.json`,
  );
}
if (bad.length) {
  bad.forEach(show);
  console.error(
    `\ncheck-tokens: ${bad.length} file(s) use hard-coded values. Use the tokens in src/styles/tokens.css instead (rules: docs/DESIGN.md).`,
  );
  process.exit(1);
}
console.log(`check-tokens: ${files.length} files read, ${files.length - failing.length} on the tokens, ${failing.length} exempt`);
