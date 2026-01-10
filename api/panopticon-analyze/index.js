const { AzureOpenAI } = require('openai');

const SYSTEM_PROMPT = `你是一個內容分析助手，專門幫助分析社群媒體上的熱門貼文。

分析目的：
- 幫助用戶理解為什麼這篇文章受歡迎
- 提供回應角度建議，讓用戶能夠參與討論
- 評估這篇內容是否適合轉化為 FB 貼文或 Blog 文章

5 大內容類型（可多選）：
1. industry_thoughts: 行業思考（AI 產業、個人開發、一人公司、工具工作流）
2. values: 人生價值觀（追求自由、斯多葛主義、長期主義）
3. personal_growth: 個人成長（成長型思維、知識管理）
4. achievements: 人生成就（以事實為基礎的小成就）
5. testimonials: 客戶/朋友證言

回應格式：JSON`;

module.exports = async function (context, req) {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers };
    return;
  }

  // Verify Bearer token
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  const expectedToken = process.env.PANOPTICON_API_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    context.res = {
      status: 401,
      headers,
      body: JSON.stringify({
        error: 'Unauthorized',
        debug: {
          hasExpectedToken: !!expectedToken,
          expectedTokenLength: expectedToken ? expectedToken.length : 0,
          receivedTokenLength: token ? token.length : 0,
          hasAuthHeader: !!authHeader,
          authHeaderLength: authHeader ? authHeader.length : 0,
          authHeaderPreview: authHeader ? authHeader.substring(0, 50) : '',
          tokenPreview: token ? token.substring(0, 50) : '',
        }
      }),
    };
    return;
  }

  try {
    const body = req.body;

    if (!body || !body.title) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
      return;
    }

    const client = new AzureOpenAI({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      apiVersion: '2024-02-15-preview',
    });

    const userPrompt = `
分析以下貼文：

標題: ${body.title}
來源: ${body.source}${body.subreddit ? ` (r/${body.subreddit})` : ''}
分數: ${body.score} | 評論: ${body.comments}

內容摘要:
${body.selftext || '(無內容)'}

請提供以下分析（JSON 格式）：
{
  "summary_zh": "中文摘要（2-3 句話）",
  "why_popular": "為什麼受歡迎（1-2 句話）",
  "response_angles": ["回應角度1", "回應角度2", "回應角度3"],
  "categories": ["category1", "category2"],
  "fb_score": 4,
  "blog_score": 5
}`;

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4.1-japan',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    context.res = {
      status: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    context.log.error('Analysis error:', error);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: 'Analysis failed', details: error.message }),
    };
  }
};
