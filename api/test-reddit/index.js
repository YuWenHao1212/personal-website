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
    const options = {
      hostname: 'www.reddit.com',
      path: `/r/${subreddit}/hot.json?limit=5`,
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
          try {
            const data = JSON.parse(body);
            const posts = data.data.children.map(child => ({
              title: child.data.title,
              score: child.data.score
            }));
            resolve(posts);
          } catch (e) {
            reject(new Error('Failed to parse Reddit response'));
          }
        } else {
          reject(new Error(`Reddit returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}
