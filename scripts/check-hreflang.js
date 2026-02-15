/**
 * Post-build SEO check: Verify hreflang URLs match canonical trailing slash
 * Run: node scripts/check-hreflang.js
 */

import { globSync } from 'glob';
import { readFileSync } from 'fs';

const files = globSync('dist/**/*.html');
let errors = 0;
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf-8');
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const hreflangs = [...html.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)].map(m => m[1]);

  if (!canonical || hreflangs.length === 0) continue;

  checked++;
  const canonicalHasSlash = canonical.endsWith('/');

  for (const href of hreflangs) {
    if (href.endsWith('/') !== canonicalHasSlash) {
      console.error(`❌ ${file}`);
      console.error(`   canonical: ${canonical}`);
      console.error(`   hreflang:  ${href} ← trailing slash mismatch`);
      errors++;
    }
  }
}

console.log(`\nChecked ${checked} pages with hreflang tags`);

if (errors) {
  console.error(`\n❌ ${errors} hreflang error(s) found`);
  process.exit(1);
}

console.log('✅ All hreflang URLs consistent with canonical');
