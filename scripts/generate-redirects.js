/**
 * Auto-generate blog redirect rules for staticwebapp.config.json
 *
 * Scans src/content/blog/zh-TW/ for all blog posts and ensures
 * each has a /blog/{slug} -> /zh-TW/blog/{slug} redirect rule
 * in the staticwebapp config, placed BEFORE the /blog/* catch-all.
 *
 * Usage: node scripts/generate-redirects.js [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, basename } from 'path'

const CONFIG_PATH = resolve('public/staticwebapp.config.json')
const BLOG_DIR = resolve('src/content/blog/zh-TW')
const DRY_RUN = process.argv.includes('--dry-run')

function getAllBlogSlugs() {
  return readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => basename(f, f.endsWith('.mdx') ? '.mdx' : '.md'))
}

function getExistingRedirectSlugs(routes) {
  return new Set(
    routes
      .filter(r =>
        r.route?.startsWith('/blog/') &&
        !r.route.endsWith('/*') &&
        r.redirect
      )
      .map(r => r.route.replace('/blog/', ''))
  )
}

function run() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
  const allSlugs = getAllBlogSlugs()
  const existingSlugs = getExistingRedirectSlugs(config.routes)

  const missingSlugs = allSlugs.filter(s => !existingSlugs.has(s))

  if (missingSlugs.length === 0) {
    console.log('[redirects] All blog posts have redirect rules. Nothing to do.')
    return
  }

  console.log(`[redirects] Found ${missingSlugs.length} missing redirect(s):`)
  missingSlugs.forEach(s => console.log(`  /blog/${s} -> /zh-TW/blog/${s}`))

  if (DRY_RUN) {
    console.log('[redirects] Dry run - no changes made.')
    return
  }

  const newRules = missingSlugs.map(slug => ({
    route: `/blog/${slug}`,
    redirect: `/zh-TW/blog/${slug}`,
    statusCode: 301
  }))

  const catchAllIndex = config.routes.findIndex(
    r => r.route === '/blog/*' && r.redirect
  )

  if (catchAllIndex === -1) {
    console.error('[redirects] ERROR: Could not find /blog/* catch-all rule.')
    process.exit(1)
  }

  config.routes.splice(catchAllIndex, 0, ...newRules)

  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n')
  console.log(`[redirects] Added ${newRules.length} redirect rule(s) to staticwebapp.config.json`)
}

run()
