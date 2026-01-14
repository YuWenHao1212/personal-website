---
title: "From Obsidian to Claude Code: Building a Programmable Life"
description: "A viral X post with 700K views inspired me to build my own AI system. Three core principles: Markdown-first, API-first, data-driven. Here's how I'm using Claude Code and Obsidian to build my personal command center."
pubDate: 2026-01-14
category: building-products
lang: en
featured: true
heroImage: /images/blog/personal-panopticon.webp
translationKey: personal-panopticon
---

A few weeks ago, I came across a post on X. 700,000 views. 4,000+ bookmarks.

The author, Molly Cantillon, runs 8 Claude Code instances to manage her life: product, email, investments, health, writing. Every morning, AI auto-generates her brief. She hit Inbox Zero for the first time ever. AI even found $2,000 in subscriptions she didn't know she was paying.

She wrote: "A panopticon still, but the tower belongs to you."

After reading her post, I thought about it for a long time.

Not "wow, that's impressive." More like: why was she able to do this?

## Three Principles

I started organizing my own system. The core isn't "what tools to use"—it's "how to choose."

Three principles.

### Principle 1: Programmable Infrastructure

What does programmable mean?

It means machines can read, write, and operate on it.

All my documents are in Markdown. Plain text, cross-platform, future-proof. More importantly, AI can read it directly.

When choosing services, the first thing I check is whether they have an API. No API means your data is trapped. You can use it, but you can't take it with you.

That's why I use Obsidian for my knowledge base, not Notion. Obsidian notes are local .md files. Notion notes live on their servers.

Self-hosting my website follows the same logic. My blog runs on Astro + Markdown. Claude Code can publish posts directly. No admin panel, no login, no copy-paste.

This isn't technical perfectionism. It's about enabling AI to do work for me.

### Principle 2: Data-Driven Decisions

This is something Minerva taught me.

When I was at Minerva, every decision required asking: where's the data? Without data, you're guessing. With data, you're deciding.

Sounds simple. But it's hard in practice. Most people's data is scattered everywhere. Google Analytics here, social engagement there, product metrics somewhere else.

Looking at dashboards? Too slow. Open five websites every day, stare at numbers, then what?

What I want: AI reviews everything and tells me "what needs attention."

So I built a system called Content Discovery. It automatically scrapes trending content from Reddit, Hacker News, and X every day. AI analyzes, scores, and categorizes. Every morning, I receive a brief.

I don't go find information. Information comes to me.

### Principle 3: Automated Execution

Repetitive tasks shouldn't be done manually.

| Manual | Automated |
|--------|-----------|
| Open 10 websites daily for news | Cron job auto-scrapes + AI summarizes |
| Manually publish blog posts | GitHub Actions auto-deploys |
| Manually compile data | Scripts run on schedule + generate reports |

My rule:

- Do it once: do it manually
- Do it twice: consider automating
- Do it three times or more: definitely automate

Time should be spent on decisions, not execution.

## The System I'm Building

I don't have Molly's 8 Claude Code instances. But I've started building my own version.

### Cockpit (Personal Command Center)

```
~/Cockpit/
├── daily/           <- Daily planning
├── projects/        <- Project tracking
├── content/         <- Content creation
├── inbox/           <- Quick capture
└── ideas/           <- Processed ideas
```

All planning in one place. All files in Markdown. Claude Code can read and write directly.

Cockpit is where I have my morning standup with my AI manager. Every day, we review yesterday, inventory tasks, and plan today. Once we decide "what to do," I switch to individual projects for execution and coding.

Before signing off, I return to Cockpit to update today's progress. Random thoughts go into inbox for tomorrow's review.

### Content Discovery (Daily Brief)

- Auto-scrapes trending content from Reddit, Hacker News, X
- AI analysis + scoring
- Generates brief every morning
- I only see "what's worth paying attention to"

This is already running. GitHub Actions executes daily.

### What's Not Done Yet

Honestly, I'm not at Molly's level yet.

- Email automation? Still manual
- Finance tracking? Haven't connected APIs
- Health data integration? Haven't started

But that's fine. Systems are built gradually, not all at once.

## Where You Can Start

If you've read this far, you might want to try it yourself.

You don't need to build 8 systems at once. Start with one pain point.

Ask yourself three questions:

1. What do I repeat every day?
2. What information do I spend the most time finding?
3. What do I most often "forget"?

The answer is your starting point.

### Tool Recommendations

| Purpose | Beginner | Advanced |
|---------|----------|----------|
| Notes | Obsidian | Obsidian + MCP |
| Automation | Zapier / Make | GitHub Actions / Cron |
| AI Assistant | ChatGPT | Claude Code |
| Website | Notion Site | Astro + Markdown |

Don't overthink the beginner choices. What matters is starting.

## Final Thoughts

Molly's system is impressive. But it took her months to build.

My system is still being built. This post isn't a "I did it" share—it's a "I'm doing it" record.

Before, we were shaped by tools. Whatever app we used, we were limited by its logic.

Now, we can shape our own tools.

The tower is still a tower. But the keys can be in your hands.

---

*Further reading: [Molly Cantillon's original post](https://x.com/mollycantillon/status/2008918474006122936)*

*Want more content like this? [Subscribe to my newsletter](https://yu-wenhao.com/newsletter)*
