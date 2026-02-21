---
title: "How to Use Claude Code: From Setup to Your First Task"
description: "Learn how to use Claude Code in 5 minutes. A beginner-friendly guide to setup, installation, and completing your first task. Let AI do the work—not just talk about it."
pubDate: 2026-01-28
category: building-products
tags: ["how to use claude code", "claude code tutorial", "claude code setup"]
lang: en
featured: true
heroImage: /images/blog/claude-code-tutorial.webp
translationKey: claude-code-tutorial
relatedPosts: ["agentic-coding-guide.md", "agentic-coding.md", "nocode-to-ai-coding.md", "ai-coding-arbitrage.md"]
focus_keyphrase: "how to use claude code"
---

You've used ChatGPT. You've used Claude.

You know AI is powerful.

But every time you finish a conversation, you're still the one copying and pasting, organizing files, and executing the suggestions yourself.

Why?

Because these AIs are trapped in a browser—they can't touch your computer. All they can do is answer questions in a chat window.

Claude Code is different.

It runs directly on your machine. It can read and write files, execute commands, and actually get things done.

This guide shows you how to use Claude Code—from setup to your first task in 5 minutes.

---

## What is Claude Code

Claude Code is a command-line tool (CLI) from Anthropic that lets AI work directly on your computer.

The biggest difference from web-based Claude: the web version can only *talk*. Claude Code can *do*.

You tell it what you want, and it reads files, runs commands, writes code, even deploys to the cloud. You just review and approve—no manual work required.

This makes it perfect for:
- **Batch processing**: Handle hundreds of files at once
- **Automation**: Build systems that run automatically every day
- **Building products**: Write code, set up databases, deploy to production—from scratch

In short, Claude Code turns AI from an "advisor" into a "doer."

## Claude Product Lineup

Anthropic's Claude products, categorized by what they can do:

| Capability | Product | Description |
|------------|---------|-------------|
| Chat | Web / Desktop App | It sees what you paste |
| Web browsing | Chrome Extension | Operates current webpage, fills forms |
| Sandboxed execution | Desktop Cowork | A feature within Desktop App, runs commands in isolated environment |
| Full local access | Claude Code | Access your entire computer, use your credentials to connect services |

**Claude Code has two interfaces**:
- **CLI** (Terminal)
- **Desktop App's Code Tab** (GUI, same functionality as CLI)

**Feature comparison**:

| | Web | Desktop App | Chrome Extension | Desktop Cowork | Claude Code |
|---|--------|-------------|-----------------|----------------|-------------|
| Environment | Browser | macOS/Win | Browser | Inside Desktop (sandbox) | CLI or Desktop Code Tab |
| Access | What you paste | What you paste | Current webpage | Authorized folders | Entire computer |
| Run commands | ❌ | ❌ | ❌ | ✅ (sandboxed) | ✅ |
| Skills | ❌ | ❌ | ❌ | ✅ | ✅ |
| MCP Integrations | ✅ | ✅ | ❌ | ✅ | ✅ |
| Hooks | ❌ | ❌ | ❌ | ❌ | ✅ |

> **Sources** (verified 2026-01-28):
> - [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code) — Claude Code features, Skills, MCP, Hooks
> - [Cowork Docs](https://support.claude.com/en/articles/13345190-getting-started-with-cowork) (2026/01) — Cowork features, Skills
> - [Claude Blog - Integrations](https://claude.com/blog/integrations) (2026/01) — Web supports MCP Integrations
> - [First impressions of Claude Cowork](https://simonwillison.net/2026/Jan/12/claude-cowork/) - Simon Willison (2026/01/12) — Cowork runs commands in sandbox

**Glossary**:

- **Sandbox**: An isolated safe space—like a kid's sandbox. You can play however you want inside, but the sand doesn't get out. Desktop Cowork runs in a sandbox, so it can execute commands, but only within folders you've authorized. Safe, but limited.

- **Run commands**: Letting AI actually *do things* on your computer, not just *tell you* how. Web Claude will explain how to organize photos, but you still have to do it yourself. Tools that can run commands (Desktop Cowork, Claude Code) are different—you say "move screenshots to the Screenshots folder," and it actually does it. Batch renaming, image compression, auto-backups—all made possible by this capability.

- **Skills**: Files that teach AI how you work. Could be SOPs (what to do in certain situations), workflows (do A then B), or best practices (articles should follow these guidelines). Once written, AI follows them. It's like documenting your expertise and preferences so AI becomes an assistant that truly "gets" you.

- **MCP Integrations**: A standard protocol for connecting AI to other services. You've probably heard of APIs—every service has a different one, so connecting to ten services means writing ten different integrations. MCP is a unified standard, like USB-C. One interface connects to Slack, Google Drive, Notion, and more. For users, it means "AI can directly work with these services for you."

- **Hooks**: Automatic checks before AI takes action. Like a motion sensor at your door—every time AI is about to do something, the hook checks first. You can set rules like "backup before deleting files" or "confirm with me before running commands." It's an advanced feature to make sure AI doesn't do anything you don't want.

**Desktop Cowork vs Claude Code: Sandbox Limitations**

Both Desktop Cowork and Claude Code can run commands, but Cowork runs in an isolated environment. It can browse the web, download files, install programs—but everything stays in the sandbox. Close it, and it's gone.

| | Desktop Cowork (Sandbox) | Claude Code (Local) |
|---|--------------------------|---------------------|
| Organize files in authorized folders | ✅ | ✅ |
| Browse web, download data | ✅ | ✅ |
| Install software on your computer | ✅ (sandbox only, gone when closed) | ✅ (permanent) |
| Push to GitHub with your SSH key | ❌ (no access to your credentials) | ✅ |
| Connect services with your API keys | ❌ (no access to your credentials) | ✅ |
| Modify system settings, env variables | ❌ | ✅ |

**Bottom line**:
- One-off tasks (organizing files, research, writing reports) → Desktop Cowork is enough
- Persistent systems (daily automation, API integrations, deployment) → Use Claude Code

---

## When Do You Need Claude Code?

**Scenario 1: Process 500 photos with one command**

You just got back from Japan with 500 photos, each 5MB.

You want to upload them to your blog, but they're too big. Pages load forever.

Compress them one by one? Exhausting just thinking about it.

With Claude Code, one sentence:

"Compress all photos in this folder to under 500KB, keep the original filenames."

It runs terminal commands (the stuff engineers type in that black window with white text), and finishes 500 photos in minutes.

Desktop Cowork can handle files too, but Claude Code can do more—like automatically upload the processed photos to the cloud, or write a script so you can do this with one click next time.

**Scenario 2: Build an automated goal management system**

This is a real example from my own life.

I needed a system to pull together scattered information (Google Calendar, Tasks, emails) and push a summary to my phone every morning.

Web Claude could help me *plan* this system, but couldn't *build* it.

With Claude Code, I told it what I wanted, and it:
- Wrote the API integration code
- Set up automated scheduling
- Deployed to the cloud, running every morning at 6:45

Now every morning I wake up to a message telling me what I need to do today.

Want to see how the full system works? Check out my other article: [AI Goal Management System](/en/blog/ai-goal-management-system).

**Scenario 3: Build products without knowing how to code**

You have an app idea.

Before, you'd need to hire an engineer, outsource, or learn to code yourself.

Now, you can use Claude Code.

Tell it what you want, and it writes the code, sets up the database, deploys to production.

I've done this myself.

With Claude Code, I built my personal website in two days (yes, the one you're reading right now).

I also built a <a href="/en/products/ai-resume-advisor" target="_blank">SaaS product</a> and a <a href="/en/products/linkedin-resume-checker" target="_blank">Chrome Extension</a>.

This isn't the future. It's happening right now.

**Which one do you need?**

- Just want to ask questions, write copy → **Web / Desktop App**
- Want AI to browse and fill forms → **Chrome Extension**
- One-off tasks (organize files, research) → **Desktop Cowork**
- Batch processing, API integrations, building products → **Claude Code** (CLI or Desktop Code Tab)

---

## Setup (2 minutes)

Open your terminal and paste this:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

No other dependencies needed. Just paste and run.

After installation, type `claude` and log in with your Anthropic account.

**Note**: Claude Code requires a paid subscription. Pro plan is $20/month, Max plan is $100 or $200/month (higher usage). Free accounts can't use it.

Once logged in, you're ready to go.

---

## Your First Task: Organize Scattered Screenshots

Your screenshots are probably scattered across Desktop, Downloads, and Documents. With Claude Code, one sentence gets it done.

Type this in Claude Code:

```
Organize all my screenshots scattered across Desktop, Downloads, and Documents
```

That's it.

Claude figures out how to do it: scan folders, find screenshots, move them, rename them.

You don't need to tell it every step. Just state what you want.

Done in seconds. Saves you 30 minutes of manual organizing.

---

## Tips: How to Communicate with Claude Code

The most important thing when using Claude Code:

**State the goal, not the steps.**

❌ Don't say: "First list files on Desktop, then filter for .png, then move to..."

✅ Just say: "Organize my screenshots."

You define the goal. AI figures out the how.

But this doesn't mean you hand over everything blindly.

You can add scope ("screenshots from Desktop, Downloads, and Documents"), or ask AI to propose a plan first ("tell me what you're going to do before doing it"), then review before executing.

You're the commander, not the typist.

---

## Next Steps

Setup done. First task completed.

Now, think of something you do every day—organizing files, backing up photos, updating reports.

Tell Claude Code what you want in one sentence. See how it handles it.

That's where the real journey begins.

---

*Related reading:*

- *[From No-Code to AI Coding](/en/blog/nocode-to-ai-coding/)* — The shift from No-Code tools to AI Coding
- *[The AI Coding Arbitrage](/en/blog/ai-coding-arbitrage/)* — Why now is the best time to learn AI Coding
- *[AI Goal Management System](/en/blog/ai-goal-management-system/)* — A real system built with Claude Code

---

## Resources

- [Claude Code Official Docs](https://docs.anthropic.com/en/docs/claude-code)

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I’m always happy to chat about AI, systems, and building things solo.*
