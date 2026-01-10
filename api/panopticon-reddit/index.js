const https = require('https');

// Subreddits to fetch
const SUBREDDITS = [
  'SideProject',
  'indiehackers',
  'Entrepreneur',
  'startups',
  'resumes',
  'jobs',
  'careerguidance',
  'jobsearchhacks'
];

module.exports = async function (context, req) {
  // Verify token
  const token = req.headers['x-panopticon-token'] || '';
  const expectedToken = 'd960abf9d67f1cbcb82c038ccb9820084ce377784626b7ad993a3675328c208d';

  if (token !== expectedToken) {
    context.res = {
      status: 401,
      body: { error: 'Unauthorized' }
    };
    return;
  }

  try {
    const allPosts = [];

    // Fetch all subreddits in parallel
    const results = await Promise.allSettled(
      SUBREDDITS.map(sub => fetchSubreddit(sub))
    );

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allPosts.push(...result.value);
      } else {
        console.log(`Failed to fetch r/${SUBREDDITS[index]}: ${result.reason}`);
      }
    });

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        success: true,
        count: allPosts.length,
        posts: allPosts
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: {
        success: false,
        error: error.message
      }
    };
  }
};

function fetchSubreddit(subreddit) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.reddit.com',
      path: `/r/${subreddit}/hot.rss?limit=15`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Panopticon/1.0)'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Reddit returned ${res.statusCode}`));
          return;
        }

        // Parse Atom feed
        const posts = [];
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;

        while ((match = entryRegex.exec(body)) !== null) {
          const entry = match[1];

          // Extract title
          const titleMatch = entry.match(/<title>(.*?)<\/title>/);
          const title = titleMatch ? decodeHtmlEntities(titleMatch[1]) : '';

          // Extract link (Reddit post URL)
          const linkMatch = entry.match(/<link href="([^"]+)"/);
          const url = linkMatch ? linkMatch[1] : '';

          // Extract ID from URL
          const idMatch = url.match(/\/comments\/([a-z0-9]+)\//);
          const id = idMatch ? `reddit_${idMatch[1]}` : `reddit_${Date.now()}_${Math.random().toString(36).slice(2)}`;

          // Extract content/summary
          const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/);
          let content = contentMatch ? contentMatch[1] : '';
          // Clean HTML entities
          content = decodeHtmlEntities(content);
          // Strip HTML tags for selftext
          const selftext = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

          // Extract author
          const authorMatch = entry.match(/<author><name>\/u\/([^<]+)<\/name>/);
          const author = authorMatch ? authorMatch[1] : '';

          if (title && url) {
            posts.push({
              id,
              source: 'reddit',
              subreddit,
              title,
              url,
              selftext,
              author,
              // RSS doesn't have score/comments, set defaults
              score: 0,
              comments: 0
            });
          }
        }

        resolve(posts);
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
