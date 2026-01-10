const https = require('https');

module.exports = async function (context, req) {
  try {
    const posts = await fetchReddit('SideProject');

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        count: posts.length,
        posts: posts.slice(0, 5)
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
};

function fetchReddit(subreddit) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.reddit.com',
      path: `/r/${subreddit}/hot.rss`,
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
          const title = titleMatch ? titleMatch[1] : '';

          // Extract link
          const linkMatch = entry.match(/<link href="([^"]+)"/);
          const url = linkMatch ? linkMatch[1] : '';

          // Extract content/summary
          const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/);
          let content = contentMatch ? contentMatch[1] : '';
          // Clean HTML entities
          content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          // Strip HTML tags for selftext
          const selftext = content.replace(/<[^>]+>/g, '').trim();

          if (title && url) {
            posts.push({
              title,
              url,
              selftext,
              subreddit
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
