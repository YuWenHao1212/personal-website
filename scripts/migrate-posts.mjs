/**
 * Blog Migration Script
 * Converts posts from Cockpit format to Astro Content Collections format
 */

import fs from 'fs';
import path from 'path';

const SOURCE_DIR = '/Users/yuwenhao/Cockpit/content/blog';
const TARGET_DIR = '/Users/yuwenhao/GitHub/personal-website/src/content/blog/zh-TW';

// Category mapping from old to new
const categoryMap = {
  '行業思考': 'ai-tech',
  '用 AI 做產品': 'ai-tech',
  'AI與科技': 'ai-tech',
  '知識與學習系統': 'productivity',
  '生產力': 'productivity',
  '個人成長': 'productivity',
  '創業筆記': 'entrepreneurship',
  '一人公司': 'entrepreneurship',
  '思考與生活': 'thoughts-life',
  '人生價值觀': 'thoughts-life',
};

// Default category based on content keywords
function guessCategory(content, title) {
  const text = (content + ' ' + title).toLowerCase();

  if (text.includes('bubble') || text.includes('no-code') || text.includes('api') ||
      text.includes('ai') || text.includes('coding') || text.includes('claude')) {
    return 'ai-tech';
  }
  if (text.includes('創業') || text.includes('產品') || text.includes('fiverr') ||
      text.includes('persona') || text.includes('報價') || text.includes('成本')) {
    return 'entrepreneurship';
  }
  if (text.includes('筆記') || text.includes('學習') || text.includes('readwise') ||
      text.includes('coursera') || text.includes('roam') || text.includes('jira') ||
      text.includes('miro') || text.includes('ynab') || text.includes('otter')) {
    return 'productivity';
  }
  if (text.includes('幸福') || text.includes('勇氣') || text.includes('溝通') ||
      text.includes('人生') || text.includes('學到')) {
    return 'thoughts-life';
  }

  return 'thoughts-life'; // default
}

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  // Simple YAML-like parsing
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle quoted strings
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
        }
      }

      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

// Convert date formats
function parseDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];

  // Handle various formats
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0];
}

// Generate slug from filename or title
function generateSlug(filename, frontmatter) {
  // Use explicit slug if available
  if (frontmatter.slug) return frontmatter.slug;
  if (frontmatter.url) return frontmatter.url;

  // Generate from filename
  let slug = filename.replace(/\.md$/, '');

  // Remove date prefix if present
  slug = slug.replace(/^\d{4}-\d{2}-\d{2}-?/, '');

  // Convert Chinese to pinyin-like format or keep as-is for now
  return slug;
}

// Create new frontmatter for Astro
function createAstroFrontmatter(oldFm, body, filename) {
  const slug = generateSlug(filename, oldFm);
  const oldCategory = oldFm.category || '';
  const newCategory = categoryMap[oldCategory] || guessCategory(body, oldFm.title || '');

  // Get date
  const pubDate = parseDate(oldFm.date || oldFm.published_date);

  // Get tags
  let tags = oldFm.tags || [];
  if (typeof tags === 'string') {
    tags = tags.split(',').map(t => t.trim());
  }

  // Clean title (remove quotes)
  let title = oldFm.title || filename.replace(/\.md$/, '');
  title = title.replace(/^["']|["']$/g, '');

  // Generate description if not present
  let description = oldFm.description || '';
  if (!description) {
    // Use first paragraph as description
    const firstPara = body.split('\n\n').find(p => p.trim() && !p.startsWith('#') && !p.startsWith('**'));
    description = firstPara ? firstPara.slice(0, 160).trim() + '...' : title;
  }
  // Clean description - remove markdown headers and formatting
  description = description.replace(/^#+\s*/g, '').replace(/\*\*/g, '').trim();
  if (description.length > 200) {
    description = description.slice(0, 200) + '...';
  }

  return {
    title,
    description,
    pubDate,
    category: newCategory,
    tags,
    lang: 'zh-TW',
    featured: false,
  };
}

// Format frontmatter as YAML
function formatFrontmatter(fm) {
  const lines = ['---'];

  lines.push(`title: "${fm.title.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${fm.description.replace(/"/g, '\\"')}"`);
  lines.push(`pubDate: ${fm.pubDate}`);
  lines.push(`category: ${fm.category}`);

  if (fm.tags && fm.tags.length > 0) {
    lines.push(`tags: [${fm.tags.map(t => `"${t}"`).join(', ')}]`);
  }

  lines.push(`lang: ${fm.lang}`);
  lines.push(`featured: ${fm.featured}`);

  lines.push('---');
  return lines.join('\n');
}

// Clean body content
function cleanBody(body) {
  // Remove duplicate title (first h1 if it matches)
  let cleaned = body.trim();

  // Remove leading # title that duplicates frontmatter title
  cleaned = cleaned.replace(/^#\s+[^\n]+\n+/, '');

  // Remove reading time / last updated lines
  cleaned = cleaned.replace(/^\*\*Reading Time\*\*:.*\n/gm, '');
  cleaned = cleaned.replace(/^\*\*Last Updated\*\*:.*\n/gm, '');

  // Remove ALL horizontal rules (---) that appear alone on a line throughout the content
  // These are decorative separators that shouldn't be in the final output
  cleaned = cleaned.replace(/^---\s*$/gm, '');

  // Clean up extra newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

// Main migration function
async function migrate() {
  // Ensure target directory exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Get all markdown files
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md') && !f.startsWith('_'));

  console.log(`Found ${files.length} markdown files to migrate\n`);

  const results = {
    success: [],
    failed: [],
  };

  for (const filename of files) {
    try {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const content = fs.readFileSync(sourcePath, 'utf-8');

      const { frontmatter, body } = parseFrontmatter(content);
      const newFm = createAstroFrontmatter(frontmatter, body, filename);
      const cleanedBody = cleanBody(body);

      // Generate new filename from slug
      const slug = generateSlug(filename, frontmatter);
      const newFilename = `${slug}.md`;
      const targetPath = path.join(TARGET_DIR, newFilename);

      // Create new content
      const newContent = formatFrontmatter(newFm) + '\n\n' + cleanedBody + '\n';

      fs.writeFileSync(targetPath, newContent);

      console.log(`✓ ${filename} → ${newFilename} (${newFm.category})`);
      results.success.push({ old: filename, new: newFilename, category: newFm.category });

    } catch (error) {
      console.error(`✗ ${filename}: ${error.message}`);
      results.failed.push({ file: filename, error: error.message });
    }
  }

  console.log(`\n========================================`);
  console.log(`Migration complete!`);
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  // Category breakdown
  const categoryCount = {};
  for (const r of results.success) {
    categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
  }
  console.log(`\nCategory breakdown:`);
  for (const [cat, count] of Object.entries(categoryCount)) {
    console.log(`  ${cat}: ${count}`);
  }
}

migrate().catch(console.error);
