const https = require('https');

module.exports = async function (context, req) {
  try {
    const result = await fetchReddit('SideProject');

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        count: result.length,
        sample: result.slice(0, 2)
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
    // Try RSS feed instead of JSON
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
        if (res.statusCode === 200) {
          // Parse RSS (simple regex extraction)
          const titles = [];
          const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/g;
          let match;
          while ((match = titleRegex.exec(body)) !== null) {
            titles.push({ title: match[1] });
          }
          resolve(titles.slice(1)); // Skip first (feed title)
        } else {
          reject(new Error(`Reddit returned ${res.statusCode}: ${body.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}
