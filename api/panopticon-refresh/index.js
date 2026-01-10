const https = require('https');

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

  const githubToken = process.env.GITHUB_WORKFLOW_TOKEN;

  if (!githubToken) {
    context.res = {
      status: 500,
      body: { error: 'GitHub token not configured' }
    };
    return;
  }

  try {
    // Trigger Cockpit content-discovery workflow
    const result = await triggerWorkflow(
      githubToken,
      'YuWenHao1212',
      'Cockpit',
      'content-discovery.yml'
    );

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        message: 'Content discovery workflow triggered',
        details: result
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};

function triggerWorkflow(token, owner, repo, workflow) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ ref: 'main' });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${token}`,
        'User-Agent': 'Panopticon-Refresh',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 204) {
          resolve({ triggered: true });
        } else {
          reject(new Error(`GitHub API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
