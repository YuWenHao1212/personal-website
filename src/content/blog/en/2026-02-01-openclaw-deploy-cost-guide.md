---
title: "OpenClaw Deploy Cost Guide: Build Your Personal AI Assistant for $0-8/month"
description: "Updated March 2026. Complete OpenClaw hosting cost breakdown: VM options, LLM API pricing (GPT-OSS-120B, GPT-5.4, Gemini 3), real agent token usage, and heartbeat hidden costs. Find the right setup for your budget."
pubDate: 2026-02-01
updatedDate: 2026-03-17
category: building-products
tags: ["AI", "indie hacker", "developer tools", "OpenClaw", "self-hosted AI"]
lang: en
translationKey: openclaw-deploy-cost-guide
featured: true
relatedPosts: ["ai-second-brain.md", "free-azure-startup-credits.md", "openclaw-tools-skills-tutorial.md"]
heroImage: /images/blog/openclaw-deploy-cost.webp
keywords: ["OpenClaw deploy", "OpenClaw hosting cost", "Oracle Cloud free tier", "Hetzner VPS", "LLM API pricing", "self-hosted AI agent", "personal AI assistant", "AI agent framework", "open source AI agent", "GPT-OSS-120B", "OpenClaw heartbeat cost"]
faq:
  - question: "How much does it cost to deploy OpenClaw per month?"
    answer: "It depends on your LLM model and VM choice. Free setup (Oracle Cloud + Gemini free tier) costs $0/mo; ultra low cost (Oracle + GPT-OSS-120B) runs about $2-5/mo; daily work (Hetzner + GPT-OSS-120B) about $7/mo; flagship (Hetzner + Opus 4.6) can reach $330/mo. You can start with GPT-OSS-120B and upgrade if needed."
  - question: "What is OpenClaw heartbeat and does it cost extra?"
    answer: "Heartbeat is a background mechanism enabled by default that sends an LLM request every 30 minutes to check for scheduled tasks. Each request consumes 8K-15K input tokens. With flagship models, heartbeat alone can cost $30-100/month. Disable it with every: 0m, or enable isolatedSession + lightContext to reduce costs by 90%."
  - question: "Is GPT-OSS-120B good enough for OpenClaw?"
    answer: "Yes. GPT-OSS-120B is OpenAI's open-weight 117B MoE model with tool calling that outperforms o4-mini (TauBench 68% vs 65%). API pricing is just $0.039/$0.10 per 1M tokens, costing about $2/month for daily use. It's the best value option for OpenClaw right now."
  - question: "Is Oracle Cloud free tier really free forever?"
    answer: "Yes. Oracle Cloud Always Free ARM resources (up to 4 OCPU + 24 GB RAM) are free indefinitely, not a 12-month trial. However, upgrading to Pay As You Go and setting a Budget Alert is recommended to avoid idle account reclamation."
---

## TL;DR

| Route | Cloud Hosting | LLM API | Monthly Cost |
|-------|---------------|---------|--------------|
| **Free Trial** | Oracle Cloud ARM | Gemini 2.5 Flash free tier | **$0** |
| **Ultra Low** | Oracle Cloud ARM | GPT-OSS-120B | **~$2-5** |
| **Daily Work** | Hetzner CAX11 | GPT-OSS-120B | **~$7** |
| **Flagship** | Hetzner CAX11 | GPT-5.4 / Sonnet 4.6 / Opus 4.6 | **~$140-330** |
| **Local** | Mac Mini M4 | Any | **$599+ one-time** |

> Monthly cost = VM + LLM API (tasks + heartbeat). Token usage assumptions and calculations in [Part 2](#part-2-how-much-does-the-llm-api-cost).

---

## Introduction

"This is the closest thing to JARVIS I've ever used."

That's what developers are saying about [OpenClaw](https://openclaw.ai/)—an open source **AI agent framework** that lets you run your own personal AI assistant 24/7, responding via Telegram, Discord, or WhatsApp.

Over **250K GitHub stars** (surpassing React in just 60 days to become the most-starred software project on GitHub), viral TikTok demos—developers call it "the closest thing to JARVIS." But one question keeps coming up:

> "What's the actual OpenClaw hosting cost?"

### What do you need to run an AI bot?

Think of it like opening a 24/7 coffee shop.

First, you need **a space**—you can buy or rent. This is the "hardware" where OpenClaw runs.

**Buy (self-hosted locally)?** Many choose a Mac Mini M4—under $600, quiet, energy-efficient. Or use an old PC. You own the hardware, but you handle power outages, networking, and 24/7 uptime yourself.

**Rent (cloud hosting)?** Your server lives in Amazon, Google, or Oracle's data center. No hardware maintenance, reliable uptime, starting at **$0-4/month**—but you pay monthly.

> This guide focuses on **renting**—finding the cheapest cloud setup for your self-hosted AI agent.

With a space secured, you also need **a barista**. OpenClaw is just the framework—you need an AI brain to think and respond. That's an **LLM (Large Language Model)** like ChatGPT, Claude, or Gemini.

> Two ways to get a barista:
> - **Self-serve (Local LLM)**: AI runs on your machine, no API fees. Instant coffee (7B models) works on basic hardware; premium espresso (70B+) needs expensive GPUs costing thousands of dollars
> - **Delivery (API LLM)**: AI runs in the cloud, pay per use. Any computer can access top-tier models
>
> This guide focuses on **API LLMs**—lowest hardware barrier, no GPU investment needed.

API pricing varies:
- Budget but capable: GPT-OSS-120B, Gemini Flash
- Premium: GPT-5.4, Claude Sonnet / Opus

How do they charge? **By tokens**—the text processed.

- Your message to AI = input tokens
- AI's response = output tokens (usually pricier—generating is harder than reading)

More complex requests = higher cost. But agent token usage is much larger than you'd expect—each task carries system prompts, tool definitions, and conversation history, and a single task typically runs 3-8 LLM calls. We'll break down the real numbers below.

---

Concepts covered. Let's do the math—this guide focuses on the "rent + delivery" combination:

- **Cloud hosting**: Rent a remote server to run OpenClaw
- **API LLM**: Use cloud-based AI models to process messages

Goal: **Show you the real cost of every combination**, from free to flagship.

---

## Part 1: How much does cloud hosting cost?

---

### What are OpenClaw's minimum hardware requirements?

Per [OpenClaw docs](https://docs.openclaw.ai/help/faq):

| Spec | Minimum | Recommended | Browser Automation |
|------|---------|-------------|-------------------|
| **vCPU** | 2 | 2-4 | 4+ |
| **RAM** | 2 GB | 4 GB | 8 GB |
| **Storage** | 2 GB | 10 GB+ | 40 GB+ |
| **OS** | Ubuntu 22.04+ / macOS | Ubuntu 24.04 | - |
| **Dependencies** | Node.js 22+ | Docker (optional) | Docker 24+ |

> OpenClaw Gateway is lightweight—**even a Raspberry Pi 4 can run it**. But for multiple channels, browser automation, or media tools, use 4GB+ RAM.

> **Real-world advice**: For smooth operation, use at least **2 vCPU + 4GB RAM**. The Chrome DevTools attach mode added in v2026.3.13 (browser automation) uses an additional 1-2 GB RAM per instance.

---

### Which cloud provider is cheapest?

| Provider | Plan | vCPU | RAM | Storage | Monthly | Notes |
|----------|------|:----:|:---:|:-------:|---------|-------|
| **Oracle Cloud** | ARM Flex | 4 | 4 GB | 100 GB | **Free** | Risk of deletion |
| **Hetzner** | CAX11 | 2 | 4 GB | 40 GB | ~$4 | Stable choice (rising to ~$5 on 4/1) |
| **AWS** | t4g.small | 2 | 2 GB | EBS extra | $12.26 | Free trial until 2026/12 |
| **GCP** | e2-small | 2 | 2 GB | 10 GB | $12.23 | - |
| **Azure** | B2s | 2 | 4 GB | Extra | $30.37 | Most expensive |

---

### Recommended: Oracle Cloud Free Tier

Oracle offers the most generous free tier in the industry:

**Always Free ARM specs:**
- **4 OCPU (= 8 vCPU) + 24 GB RAM**
- 200 GB Block Storage
- 10 TB/month bandwidth
- **Forever free** (not 12-month trial)

**Suggested config:**

OpenClaw doesn't need much—2 OCPU (4 vCPU) + 4 GB RAM works great. Or max it out at 4 OCPU + 24 GB—it's all free.

> **Avoid idle reclamation**: Upgrade to Pay As You Go. Your Always Free resources **stay free**—you only pay if you manually create resources beyond the free limits. Upgrading prevents idle shutdown.

> **Known risk**: Without PAYG upgrade, some users report accounts terminated without warning—deployments deleted, unrecoverable.

**Recommendation**: Add a credit card, upgrade to PAYG. Set a **Budget Alert** (e.g., $1) in OCI Console for email notifications. Free and peace of mind.

---

### Recommended: Hetzner VPS CAX11

For stability without hassle:

| Plan | vCPU | RAM | Storage | Monthly |
|------|------|-----|---------|---------|
| CAX11 | 2 (ARM) | 4 GB | 40 GB NVMe | **~$4** |

Transparent pricing, no hidden fees, no idle reclamation, stable performance. Want zero friction? Choose this.

> **Price increase notice**: Hetzner announced a price hike effective 2026/4/1 in Germany/Finland regions—CAX11 goes from €3.29 to €4.49 (+36%). Still the cheapest option at this spec level.

---

### Big Three Comparison (AWS / GCP / Azure)

If you prefer mainstream clouds:

| Provider | Plan | vCPU | RAM | Storage | Monthly |
|----------|------|:----:|:---:|:-------:|---------|
| **AWS** | t4g.small | 2 | 2 GB | 10 GB | ~$13 |
| **GCP** | e2-small | 2 | 2 GB | 10 GB | ~$13 |
| **Azure** | B2s | 2 | 4 GB | 10 GB | ~$31 |

---

#### Big Three Free Tiers (Not Recommended)

AWS, GCP, and Azure have free tiers that **meet minimum requirements** (1 vCPU + 1 GB), but struggle with complex tasks—multiple channels, browser automation, or heavy messaging may lag.

| Provider | Plan | Specs |
|----------|------|-------|
| GCP | e2-micro | 1 vCPU, 1 GB |
| Azure | B1s | 1 vCPU, 1 GB |
| AWS Lightsail | Lowest | 1 vCPU, 512 MB |

OK for testing. For production, use 2 vCPU + 2 GB minimum.

---

## Part 2: How much does the LLM API cost?

### How should you choose a model?

1. **Must support Vision** (image analysis)—OpenClaw supports sending images to AI, very useful
2. **Agent capability must be strong enough**—OpenClaw is an agent, not a chatbot

The second point matters. OpenClaw agents need accurate tool calling, multi-step reasoning, and the ability to persist through complex tasks. Weak models cause the agent to pick wrong tools, loop mid-task, or produce poor results.

> **Not recommended for OpenClaw**: Qwen3 VL Flash, Gemini 2.5 Flash-Lite, GPT-4.1-mini—cheap but insufficient tool calling and multi-step reasoning. Saving on API fees costs you the experience. For details on how OpenClaw's 25 Tools and 53 Skills work, see the [Tools & Skills Complete Guide](/en/blog/openclaw-tools-skills-tutorial/).

---

### Recommended LLM Models (Vision + Agent Capable)

> Price: **USD / 1M tokens** | sorted by input price

| Provider | Model | Input | Output | Free Tier | Agent Capability |
|----------|-------|-------|--------|-----------|-----------------|
| **OpenAI** | GPT-OSS-120B | $0.039 | $0.10 | None | ⭐⭐⭐⭐⭐ |
| **Google** | Gemini 2.5 Flash | $0.30 | $2.50 | 10 RPM, 250/day | ⭐⭐⭐ |
| **Google** | Gemini 3 Flash | $0.50 | $3.00 | Free | ⭐⭐⭐⭐ |
| **Google** | Gemini 2.5 Pro | $1.25 | $10.00 | 5 RPM, 100/day | ⭐⭐⭐⭐⭐ |
| **OpenAI** | GPT-5.2 | $1.75 | $14.00 | None | ⭐⭐⭐⭐⭐ |
| **OpenAI** | GPT-4.1 | $2.00 | $8.00 | None | ⭐⭐⭐⭐ |
| **OpenAI** | GPT-5.4 | $2.50 | $15.00 | None | ⭐⭐⭐⭐⭐ |
| **Anthropic** | Claude Sonnet 4.6 | $3.00 | $15.00 | None | ⭐⭐⭐⭐⭐ |
| **Anthropic** | Claude Opus 4.6 | $5.00 | $25.00 | None | ⭐⭐⭐⭐⭐ |

> **What is GPT-OSS-120B?** OpenAI's open-weight 117B MoE model (Apache 2.0), activating only 5.1B parameters per pass, runs on a single H100. Scores 68% on TauBench (tool calling), **outperforming o4-mini's 65%**; math (AIME 2025: 97.9%) and code (HumanEval: 92.1) are also top-tier. Yet it costs 1/50th of flagship models.
>
> **Free tier notes:**
> - **RPM** (Requests Per Minute) = requests allowed per minute
> - **/day** = daily request limit, resets at midnight Pacific Time
> - Google AI Studio works without credit card—exceeding limits blocks requests temporarily, no charges

---

### How many tokens does an agent actually use per month?

OpenClaw's LLM costs come from two sources:

1. **Task consumption** — tokens generated when you give commands and the agent does work
2. **Heartbeat consumption** — even when you do nothing, OpenClaw periodically sends LLM requests in the background to check for scheduled tasks

You control the first one (less usage = less cost). Many people don't even know the second one exists. Let's start with task consumption—most cost estimates just count "messages per day × a few hundred tokens each," which severely underestimates real agent usage.

**Token structure of each OpenClaw agent task:**

| Component | Input Tokens | Notes |
|-----------|-------------|-------|
| System prompt + persona | ~2K | Sent every LLM call |
| Tool definitions (25 tools) | ~3-5K | Sent every LLM call |
| Skills context | ~1-3K | Active skill descriptions |
| Conversation history (multi-turn) | ~2-10K | Accumulates with each step |
| User input | ~0.5-1K | Your actual command |

A single task typically runs **3-8 LLM calls** (think → pick tool → execute → evaluate → pick again → complete), so a medium task consumes 80K-150K input tokens.

**Three user profiles:**

| Profile | Tasks/Day | Monthly Input | Monthly Output |
|---------|-----------|--------------|---------------|
| **Light** | 5-10 | ~5M | ~1M |
| **Daily** | 15-25 | ~20M | ~5M |
| **Heavy** | 40+ | ~80M | ~20M |

---

### What is heartbeat, and why does it silently burn money?

Heartbeat is like your barista doing regular rounds: "Any new orders? Did the boss leave instructions?"—even when there are no customers, they still check.

This mechanism lets OpenClaw periodically check for pending tasks, read scheduled jobs from HEARTBEAT.md (e.g., push a Daily Brief every morning), or report system status—even when you haven't given any commands. If you've set up scheduled tasks, heartbeat is the engine that drives them.

The problem: **heartbeat is enabled by default**, sending an LLM request every 30 minutes (60 minutes for Anthropic accounts), even if you haven't set up any scheduled tasks. Each heartbeat sends the full workspace context (SOUL.md, AGENTS.md, MEMORY.md, etc.), consuming 8K-15K input tokens.

That's ~38 calls/day × 15K = **~570K input tokens per day**, burning money while doing nothing.

> **Cost-saving tips:**
> - No scheduled tasks? Disable it: `every: "0m"`
> - Need scheduling but want to save? Enable `isolatedSession: true` + `lightContext: true` to reduce each heartbeat to ~2-5K tokens—90% savings

---

### What's the actual monthly bill? (Including Heartbeat)

Based on a **daily user** (20M input / 5M output) + **default heartbeat** (~570K input / ~19K output per day):

| Model | Task Cost | Heartbeat Cost | **Monthly Total (LLM only)** |
|-------|-----------|---------------|------------------------------|
| GPT-OSS-120B | $1.28 | $0.72 | **~$2** |
| Gemini 2.5 Flash | $18.50 | $5.27 | **~$24** |
| Gemini 2.5 Pro | $75.00 | $29.25 | **~$104** |
| GPT-5.2 | $105.00 | $30.75 | **~$136** |
| GPT-4.1 | $80.00 | $22.38 | **~$102** |
| GPT-5.4 | $125.00 | $35.48 | **~$160** |
| Sonnet 4.6 | $135.00 | $52.73 | **~$188** |
| Opus 4.6 | $225.00 | $99.75 | **~$325** |

> Gemini free tier (2.5 Flash: 250/day, 2.5 Pro: 100/day) works for light users, but in agent mode 100 requests/day only covers about **10-15 medium tasks**.

---

## Part 3: Which combination is right for you?

### Free Trial

| Item | Choice |
|------|--------|
| Cloud | Oracle Cloud ARM (2 OCPU + 4GB) |
| LLM | Google AI Studio Gemini 2.5 Flash free tier |
| Heartbeat | Disabled (`every: "0m"`) |
| **Monthly** | **$0** |
| Best for | Testing, light use (10-15 tasks/day max) |
| Limits | Oracle idle reclamation risk, Gemini 250/day / 10 RPM |

> Gemini 2.5 Flash has ⭐⭐⭐ agent capability—fine for simple tasks, but complex multi-step operations may stall or pick wrong tools. This setup is for **experiencing how OpenClaw works at zero cost**, not as a daily driver. Once you see the value, upgrade to GPT-OSS-120B or stronger.

---

### Ultra Low Cost (~$2-5/mo)

| Item | Choice |
|------|--------|
| Cloud | Oracle Cloud ARM (free) |
| LLM | GPT-OSS-120B |
| Heartbeat | Even enabled, only ~$0.72/mo |
| **Monthly** | **~$2-5** |
| Best for | Real agent capability on a budget |
| Risks | Oracle idle reclamation |

> GPT-OSS-120B's tool calling outperforms o4-mini, and even heavy use costs only ~$5/month. The best value combo available right now.

---

### Daily Work (~$7/mo)

| Item | Choice |
|------|--------|
| Cloud | Hetzner CAX11 (~$4-5) |
| LLM | GPT-OSS-120B |
| Heartbeat | Even enabled, only ~$0.72/mo |
| **Monthly** | **~$7** |
| Best for | Daily use, work integration, stable VM without hassle |
| vs. Ultra Low | VM switches from Oracle (free but risky) to Hetzner (stable, paid) |

> GPT-OSS-120B has ⭐⭐⭐⭐⭐ agent capability—more than enough for daily work. $7/month for a 24/7 AI agent is the price of a coffee.

---

### Flagship Experience (~$140-330/mo)

| Item | Choice |
|------|--------|
| Cloud | Hetzner CAX11 (~$4-5) |
| LLM | GPT-5.4 / Claude Sonnet 4.6 / Opus 4.6 |
| Heartbeat | Included (Opus heartbeat alone is ~$100/mo) |
| **Monthly** | **~$144-330** |
| Best for | Strongest reasoning, full automation, highest response quality |
| Note | Opus 4.6 heartbeat alone costs ~$100/mo—make sure you need it |

> The jump from $7 to $140+ is a 20x price difference. Flagship models are genuinely stronger at **complex reasoning, code quality, and nuanced language understanding**, but for most daily tasks GPT-OSS-120B handles them well. Start with OSS-120B, upgrade when you hit a ceiling.

---

## Decision Flowchart

```
What's your budget?
    |
    ├─ $0 (Free) → Oracle + Gemini 2.5 Flash free tier (disable heartbeat)
    |
    ├─ < $5 → Oracle + GPT-OSS-120B (free VM, idle risk)
    |
    ├─ < $10 → Hetzner + GPT-OSS-120B (stable VM, best value)
    |
    └─ Unlimited → Hetzner + GPT-5.4 / Sonnet 4.6 / Opus 4.6
```

---

## My Setup

I personally use **Azure B2s (2 vCPU + 4GB RAM) + Azure OpenAI GPT-5.2**.

Why not the cheaper Oracle or Hetzner options? Because I got **$25,000 in free Azure credits** (valid for one year) through [Microsoft for Startups](/en/blog/free-azure-startup-credits)—covering both cloud hosting and LLM API. My current **monthly cost is $0**.

If you're an indie hacker or early-stage founder, this path is worth considering: zero cost for both hardware and LLM.

What do I actually do with it? OpenClaw is my mobile gateway to my [entire AI second brain](/en/blog/ai-second-brain/)—when I'm away from my computer, it pushes a Daily Brief every morning, reports task status on demand, and lets me interact with the whole system from my phone.

---

## Conclusion

Self-hosted AI agent costs depend on two things: **which model you choose** and **whether you disable heartbeat**.

| Your Need | Recommended | Monthly |
|-----------|-------------|---------|
| Just testing | Oracle + Gemini 2.5 Flash free tier | $0 |
| Budget but capable | Oracle + GPT-OSS-120B | ~$2-5 |
| Daily work | Hetzner + GPT-OSS-120B | ~$7 |
| Flagship | Hetzner + GPT-5.4 / Sonnet 4.6 / Opus 4.6 | ~$140-330 |

**Oracle Cloud free tier is the best free option—but be prepared to migrate if needed.**

**Hetzner VPS is the best value for money—$4-5/month for stability.**

**GPT-OSS-120B is the cost game changer**—tool calling outperforms o4-mini, yet costs just $2-5/month. If budget matters, start here.

---

## Next Step: Deploy OpenClaw in 30 Minutes

You know the costs. Now take action.

**Recommended starting path**:
1. Sign up for [Oracle Cloud](https://www.oracle.com/cloud/free/) (free, 5 min)
2. Create an ARM VM (2 OCPU + 4GB)
3. Follow the [OpenClaw deployment guide](https://docs.openclaw.ai/)
4. Connect [Google AI Studio](https://ai.google.dev/) (free Gemini 2.5 Flash API)
5. Disable heartbeat (`every: "0m"`) to save tokens—enable it later once you're familiar

In 30 minutes, you'll have your own 24/7 personal AI assistant.

> Before deploying, read the [OpenClaw Security Guide](/en/blog/2026-02-04-is-openclaw-safe-security-guide/)—set up token limits, tool allowlists, and network isolation to avoid security pitfalls.

> **Stuck?** Ask in the [OpenClaw Discord](https://discord.gg/openclaw)—the community is active and helpful.

---

## FAQ

### How much does it cost to deploy OpenClaw per month?

It depends on your LLM model and VM choice. Free setup (Oracle Cloud + Gemini free tier) costs $0/month; ultra low cost (Oracle + GPT-OSS-120B) runs about $2-5/month; daily work (Hetzner + GPT-OSS-120B) about $7/month; flagship (Hetzner + Opus 4.6) can reach $330/month. You can start with GPT-OSS-120B and upgrade if needed.

### What is OpenClaw heartbeat and does it cost extra?

Heartbeat is a background mechanism enabled by default that sends an LLM request every 30 minutes to check for scheduled tasks. Each request consumes 8K-15K input tokens. With flagship models, heartbeat alone can cost $30-100/month. Disable it with `every: "0m"`, or enable `isolatedSession: true` + `lightContext: true` to reduce costs by 90%.

### Is GPT-OSS-120B good enough for OpenClaw?

Yes. GPT-OSS-120B is OpenAI's open-weight 117B MoE model with tool calling that outperforms o4-mini (TauBench 68% vs 65%). API pricing is just $0.039/$0.10 per 1M tokens, costing about $2/month for daily use. It's the best value option for OpenClaw right now.

### Is Oracle Cloud free tier really free forever?

Yes. Oracle Cloud Always Free ARM resources (up to 4 OCPU + 24 GB RAM) are free indefinitely, not a 12-month trial. However, upgrading to Pay As You Go and setting a Budget Alert is recommended to avoid idle account reclamation.

---

---

## Resources

**Cloud Hosting**
- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Hetzner Cloud](https://www.hetzner.com/cloud)
- [AWS EC2 Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
- [GCP Compute Engine Pricing](https://cloud.google.com/compute/all-pricing)
- [Azure VM Pricing](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

**LLM API Pricing**
- [OpenAI Pricing](https://openai.com/api/pricing/)
- [Anthropic Claude Pricing](https://www.anthropic.com/pricing)
- [Google AI Studio Pricing](https://ai.google.dev/pricing)
- [GPT-OSS-120B Model Card](https://openai.com/index/gpt-oss-model-card/)
- [LLM API Pricing Comparison Tool](https://pricepertoken.com/)

**OpenClaw**
- [OpenClaw Official Site](https://openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Docs](https://docs.openclaw.ai/)

---

*Last updated: 2026-03-17*

*Want OpenClaw deployed for your team or agency? I handle setup, configuration, and ongoing support. [Get in touch](mailto:mail@yu-wenhao.com?subject=OpenClaw%20Deployment).*

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm open to collaboration, consulting, and new opportunities.*
