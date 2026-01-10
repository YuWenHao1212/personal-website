const https = require('https');

module.exports = async function (context, req) {
  try {
    const result = await fetchReddit('SideProject');

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        result: result
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
        // Return raw response for debugging
        resolve({
          statusCode: res.statusCode,
          bodyLength: body.length,
          bodySample: body.slice(0, 500)
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}
