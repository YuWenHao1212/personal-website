---
title: "Agentic Coding: A Practical Guide to Tools, Workflows, and Getting Started"
description: "A practical agentic coding guide: 5-tool comparison, product maturity framework, real workflows, and a step-by-step path from vibe coding to production."
pubDate: 2026-02-14
category: building-products
tags: ["AI", "solo founder", "Claude Code", "agentic coding", "vibe coding", "developer-tools"]
lang: en
translationKey: agentic-coding-guide
featured: true
draft: false
heroImage: /images/blog/agentic-coding-guide.webp
focus_keyphrase: "agentic coding guide"
relatedPosts: ["agentic-coding.md", "claude-code-tutorial.md", "nocode-to-ai-coding.md", "ai-coding-arbitrage.md"]
faq:
  - question: "Can non-engineers get started with agentic coding?"
    answer: "Yes. The getting-started path in this guide is designed for non-engineers — you begin by writing an Intent Spec, not code. But shipping a production-grade product requires gradually learning architectural thinking and quality judgment. Start with vibe coding to get a feel for AI-assisted development, then upgrade to agentic coding."
  - question: "Does the intent spec have to be in English?"
    answer: "No. Write it in whatever language you're most comfortable with — AI agents understand most languages. What matters is clearly defining the goal, acceptance criteria, constraints, and non-goals. Clarity beats language choice."
  - question: "How much does agentic coding cost per month?"
    answer: "Most tools start at 20 USD/month. Claude Code, Cursor, and Codex CLI are all in that range. GitHub Copilot starts at 10 USD/month for individuals. Want to try free first? Antigravity is free during Preview, and GitHub Copilot has a free tier."
  - question: "How long should CLAUDE.md be?"
    answer: "Three lines is enough to start. The official recommendation is under 300 lines. The test for each line: 'If I remove this, will the agent make mistakes?' If not, delete it. When the file gets too long, split topic-specific rules into separate files and keep only the essentials in the main file."
  - question: "How do I verify code an agent wrote?"
    answer: "Core principle: give the agent a way to verify itself. Include test cases, expected outputs, or screenshots in your prompt so the agent can self-check. Second layer: use an independent session or sub-agent for code review — don't let the same agent grade its own homework. Third layer: manually test as a user. If you can't verify it, don't ship it."
  - question: "When should I upgrade from vibe coding to agentic coding?"
    answer: "Five signals — hit three and it's time: (1) changing A breaks B, (2) you can't remember what you changed last time, (3) when something breaks the only fix is starting over, (4) the same bug keeps coming back, (5) you're afraid to touch code from three months ago. One-liner: if it breaking means someone calls you, upgrade."
---

Vibe coding and agentic coding aren't either/or. They're different methods for different stages of your product.

This guide helps you figure out where your product is, which method fits, and how to get started. It includes a product maturity framework, a tool comparison, copy-paste templates, and a step-by-step path. For the narrative version of how AI coding evolved to this point, read [From Vibes to Agents](/en/blog/agentic-coding/).

---

## First, Get This Straight: It's Not Either/Or

"Which is better — vibe coding or agentic coding?"

Wrong question. That's like asking whether a 3D printer or injection molding is better — the answer depends on what stage your product is in.

I spent ten years as a product manager—the last few in automotive electronics. Hardware products have clear maturity stages, and each stage demands different manufacturing methods and quality standards:

| Product Stage | Purpose | Manufacturing Method | Quality Standard |
|--------------|---------|---------------------|-----------------|
| Mockup | Align direction, show people | 3D printer | Looks close enough |
| A sample | Validate functionality | Small-batch handmade | Works correctly |
| B sample | Validate manufacturing process | Near-production process | Precision, cosmetic defects matter |
| PVT | Production validation | Production line trial | DPPM, rework rate, monitoring |
| MP | Mass production | Full production line | Total quality management |

Nobody uses injection molding for mockups—invest in tooling for just 20 samples? And nobody 3D-prints at scale — the precision isn't there, quality is uncontrollable, and it doesn't scale.

**It's not about which is better. It's about using the right method for the right stage.**

Software development works the same way:

| Software Stage | Hardware Equivalent | Development Method | Quality Standard |
|---------------|--------------------|--------------------|-----------------|
| Demo / POC | Mockup | Vibe Coding | Runs and looks okay |
| MVP | A/B sample | Vibe → Agentic transition | Core features stable |
| Production | PVT | Agentic Coding | Tested, secure, maintainable |
| Scale | MP | Agentic Coding | CI/CD, monitoring, automated quality gates |

Using vibe coding for a demo? Perfect. Like 3D printing a mockup — fast, cheap, good enough.

Using vibe coding for a paid product going live? Like 3D printing at production scale — quality is uncontrollable, problems are untraceable, and there's no systematic way to improve.

With this framework in mind, let's look at what each method actually is.

---

## What Is Vibe Coding?

In early 2025, Andrej Karpathy coined "vibe coding" — coding by feel. You describe what you want in natural language, AI generates code, you check if it works, and if not, describe it again. No diff reviews, no reading code. Accept All.

Collins Dictionary named it the 2025 Word of the Year. 25% of Y Combinator's Winter 2025 batch used AI to generate 95% of their code.

Vibe coding is the best tool for demos and POCs. Like a 3D printer for mockups — fast, low barrier, designed for alignment rather than delivery.

### Vibe Coding Workflow

```
You describe what you want (natural language)
  -> AI generates code
  -> Run it
  -> Error? Paste the error message back
  -> AI revises
  -> Repeat until it works
```

You guide every step. Every iteration needs your input.

### Why Vibe Coding Works Great at Its Stage

| Strength | Why It's Right for Demo/POC |
|----------|---------------------------|
| Extremely low barrier — non-engineers can use it | Direction alignment doesn't require engineering expertise |
| Prototyping speed (hours) | Mockups need to be fast |
| Great for learning new technologies | Exploration doesn't need perfection |
| Perfect for demos and POCs | This is exactly what it's designed for |

### Why You Can't Use It for Production

Same as a 3D printer — push it beyond its design purpose and problems appear:

| Hardware Production Requirement | Software Equivalent | Does Vibe Coding Have This? |
|-------------------------------|--------------------|-----------------------------|
| DPPM tracking (defect rate control) | Test coverage, bug tracking | No |
| QC stations (incoming/in-process/outgoing inspection) | Automated tests, static analysis, security scans | No |
| Rework process (how to fix defects) | Version control, diff review, rollback | Barely |
| Traceability (trace problems to their source) | Git history, change logs | No version control habits, can't trace issues |
| SPC process monitoring | Performance monitoring, error rate tracking | No |

Real-world case: [EnrichLead](https://ruinunes.com/vibe-coding-trap-ai-built-mvp/)'s founder publicly claimed the product was 100% written by Cursor AI with zero manual code. Two days after launch, it was attacked — API keys exposed on the frontend, no authentication, database completely unprotected. They shut down. The tool wasn't the problem. Mockup-stage methods simply don't include these quality mechanisms.

---

## What Is Agentic Coding?

When your product is ready to move from POC to production, you no longer need "it runs." You need "it's maintainable, secure, and tested." That's what agentic coding is for.

If vibe coding is a 3D printer, agentic coding is a production line. The difference isn't that the machines are more expensive—it's the entire engineering quality system behind them:

| Hardware Production Mechanism | Software Equivalent |
|------|---|
| **BOM + engineering drawings** (define what to build) | Requirements docs, Intent Spec, Acceptance Criteria |
| **SOPs + automated production line** (consistent execution, reduced human variability) | CLAUDE.md, coding standards, CI/CD pipeline |
| **IQC / IPQC / OQC** (incoming, in-process, outgoing inspection) | Automated tests, static analysis, security scans |
| **Traceability + defect handling + corrective action** (find, fix, prevent recurrence) | Git version control, bug tracking, updating rules to prevent repetition |
| **SPC process monitoring** (continuous stability tracking) | Performance monitoring, error rate tracking, uptime dashboard |

Agentic coding brings this system to software development — and AI agents are the ones executing within the system.

### The Steps Haven't Changed. Your Role Has.

The steps of software development haven't changed—requirements, design, implementation, testing, release. That's been true from waterfall to agile. What changed is **your role at each step**:

| Development Phase | Traditional Development | Agentic Coding | Your Involvement |
|---------|---------|---------------|---------|
| **Requirements** | You write the spec | You write the Intent Spec | High (unchanged) |
| **Design / Planning** | You design the architecture | You review the agent's plan | Medium (from designer to reviewer) |
| **Implementation** | You write code | Agent writes, you answer questions | Low |
| **Testing** | You write and run tests | Agent writes and runs tests automatically | Low (just check results) |
| **Review** | You review code line by line | You review diffs + agent flags risks | Medium |
| **Release** | You run the deployment | Agent deploys, you give final approval | Low |

Your value concentrates at the **beginning and end** — defining intent and final review. The execution and verification in between? That's the agent's job.

### Karpathy's Latest Definition: Agentic Engineering

In February 2026, Karpathy upgraded the concept himself:

> "Agentic"—because 99% of the time you're not writing code yourself; you're orchestrating agents to write it. "Engineering"—to emphasize that this is professional work requiring real expertise.

Vibe coding is fun weekend projects. Agentic engineering is professional work — directing agents as a supervisor, gaining leverage without sacrificing quality.

---

## Vibe Coding vs Agentic Coding: Which Method for Which Stage

### Product Stage Decision Table

Back to the product maturity framework — your product's stage determines the method:

| Your Product Is At... | Use | Quality Standard | Analogy |
|-------------|-----|---------|------|
| **Idea validation** | Vibe Coding | Runs and looks okay | 3D printed mockup |
| **MVP development** | Vibe → Agentic transition | Core features stable | A/B sample |
| **Live product** | Agentic Coding | Tested, secure, maintainable | PVT production validation |
| **Scaling** | Agentic Coding | CI/CD, monitoring, automated quality gates | MP mass production |

### Upgrading from Vibe to Agentic: What You Need to Add

When your product moves from mockup to production, these are the things you need to introduce:

| What to Add | Why |
|---|---|
| **Requirements and spec documentation** | Agents need clear goals, acceptance criteria, test specs, and constraints to deliver correct results |
| **Version control + branching strategy** | When things break, you can trace back and rollback |
| **Automated testing** | Don't rely on manual inspection for quality |
| **Diff review habit** | Know what the agent changed and why |
| **"Set goals" replaces "give steps"** | Tell the agent "what I want," not "how to do it" — let the agent propose a plan, you approve before execution |
| **Monitoring and logging** | After launch, you need to know if things are broken — error logs, performance monitoring, uptime dashboard |

### Rule of Thumb

**If it breaking means someone calls you, use agentic coding.**

If it's just for showing people the direction, vibe coding is enough — and faster.

---

## 2026 Tool Comparison

### Five Major Tools

| Tool | Primary Models | Starting Price |
|------|-------------|---------|
| **Cursor** (Anysphere) | Claude, GPT (OpenAI), Gemini | 20 USD/month |
| **Antigravity** (Google) | Gemini 3 Pro, Claude Sonnet 4.5, GPT-OSS | Free (Preview) |
| **GitHub Copilot** (Microsoft) | Anthropic (Claude), OpenAI, Google, etc. | Free tier available |
| **Claude Code** (Anthropic) | Claude Opus 4.6 / Sonnet | 20 USD/month |
| **Codex CLI** (OpenAI) | GPT series | 20 USD/month |

When choosing a tool, the interface form matters less than you'd think. Most tools now offer both GUI and CLI — Claude Code has a CLI and a VS Code extension, Copilot has an IDE plugin and a terminal version, Cursor is a full IDE.

**What actually determines a tool's ceiling is the LLM behind it.** The model's reasoning ability, context window, and code comprehension depth determine how far the agent can go. The same model in different interfaces has the same capabilities. That's why the table above lists "Primary Models" first.

On cost, most tools land between 10 and 20 USD/month. The differences are in usage limits and advanced features:

- [Cursor](https://www.cursor.com/pricing): three tiers (20/60/200 USD)
- [Claude Code](https://claude.com/pricing): three tiers (20/100/200 USD)
- [GitHub Copilot](https://github.com/features/copilot/plans): 10 USD for individuals, 19 USD/user for enterprise
- [Codex CLI](https://openai.com/codex/): open source, requires ChatGPT subscription (20 USD+) or pay-per-use API
- [Antigravity](https://antigravity.google/pricing): free during Preview with weekly quotas; paid plans expected at GA

### How to Choose?

**Pick the model first, then the tool.** Want Anthropic's Claude? Start with Claude Code or Cursor. OpenAI's GPT? Codex CLI or Copilot. Google's Gemini? Antigravity. Want flexibility to switch? Cursor and Copilot support multiple providers.

**Then consider budget.** Want to test the waters? Antigravity's free preview and GitHub Copilot's free tier are there. Ready to invest? Most tools are 20 USD/month. Heavy usage? Look at higher tiers.

**Finally, check ecosystem fit.** Team already on VS Code + GitHub? Copilot integrates most smoothly. Google ecosystem? Antigravity.

**My choice:** I use Claude Code. The reason is straightforward — I'm a heavy user of Anthropic's models, and enterprises are [2.3x more likely](https://www.uncoveralpha.com/p/anthropics-claude-code-is-having) to choose Claude for coding over OpenAI. Claude isn't just available through Claude Code — Cursor, GitHub Copilot, and Antigravity all support it as a model option. Since I've committed to Anthropic's models, using their own tool made sense.

---

## How to Get Started with Agentic Coding

Before you start, adjust two expectations:

First, the time split in agentic coding is **80% thinking and reviewing, 20% communicating with the agent, 0% writing code yourself** — the inverse of traditional development where 80% is writing code.

Second, the exercises below start with very simple tasks — so simple that the workflow looks almost identical to vibe coding. That's intentional. We're building the muscle memory of "set goal → review plan → check results" with small tasks first. As your projects grow and ship to real users, you'll deliberately layer in more engineering practices — testing, version control, security checks — and that's where agentic coding truly separates from vibe coding.

Four steps, from zero.

### Step 1: Install a Tool

Refer to the comparison above: pick the model first, then the tool. I use Claude Code. I wrote a [Claude Code setup guide](/en/blog/claude-code-tutorial/) if you want to follow along.

### Step 2: Create a Config File So the Agent Knows Your Project

Agentic coding effectiveness depends on how much context you give the agent. The most important setup: a **config file** in your project root. Claude Code calls it CLAUDE.md; Cursor calls it `.cursorrules`—same concept.

Think of it as onboarding documentation for a new engineer—everything you'd want them to know on day one.

You don't need to write it all at once. Three lines is enough to start:

**Day 1: Three Lines**

```markdown
# My Toolkit

## Rules
- Communicate with me in English
- Each tool should be a single file that opens in a browser when double-clicked
- Don't use anything that requires installation
```

That's it. The agent knows what language to use, how simple things should be, and what's off-limits.

**One Week Later: Every Time the Agent Makes a Mistake, Add a Rule**

Say the agent builds a page that breaks on mobile, or buttons are too small to tap:

```markdown
# My Toolkit

## Rules
- Communicate with me in English
- Each tool should be a single file that opens in a browser when double-clicked
- Don't use anything that requires installation
- Must work on mobile — buttons can't be too small
- Clear input fields after form submission
- Number fields should only accept numbers
```

Every new rule exists because the agent made a mistake once. **The config file is a living document that grows with your experience.** As your project grows from a small tool into a real product, this file grows too — adding tech stack details, commands, file locations, and more.

### Step 3: Run Your First Agentic Task

Pick a small task. Don't start with something ambitious — begin with "build a small utility page."

The key mindset: **tell the agent "what I want," not "how to do it."** The quality of the agent's output directly depends on the quality of your goal definition.

I use a format called **Intent Spec** for every task. It has four sections:

- **Goal** — what you want (outcomes, not steps)
- **Acceptance Criteria** — what "done" looks like (checkboxes)
- **Constraints** — limitations
- **Non-goals** — what you explicitly don't want (prevents the agent from over-building)

Here's an example — building a personal expense tracker:

```markdown
## Goal
Build a personal expense tracker page. Users can enter each expense
(item + amount), and the page displays all entries and a running total in real time.

## Acceptance Criteria
- [ ] Page has a form with two fields: item (text) and amount (number)
- [ ] Clicking "Add" appends the entry to a list below
- [ ] List shows each entry's item and amount
- [ ] Running total updates in real time at the bottom
- [ ] Each entry has a "Delete" button
- [ ] Single file, no installation required

## Constraints
- Single HTML file that opens in a browser when double-clicked
- No build tools or dependencies
- Must work on mobile

## Non-goals
- No data persistence (page refresh clears everything — that's fine)
- No categories or charts
- No multi-currency support
```

Notice what this spec does — it describes **what the experience feels like** (enter expenses, see a list, total updates), without saying how to build it. The agent decides the technical details. You just judge whether the result is correct.

Paste the Intent Spec to the agent, but don't let it start building yet — ask for a plan first. Add this at the end: "Give me a plan first. Don't start building."

1. Paste the Intent Spec, ending with "Give me a plan first. Don't start building"
2. The agent outlines its approach — structure, sections, implementation plan
3. You review: is the direction right? Anything missing or extra?
4. If it looks good, reply "OK, go ahead"
5. The agent builds it and tells you where the file is
6. Open the file, enter a few expenses, and test it

### Step 4: Build the Muscle Memory

The first time, writing an Intent Spec and reviewing a plan might feel like overhead — wouldn't it be faster to just say "build me an expense tracker"?

Faster, yes. But the agent's output might not be what you want, and the back-and-forth revisions end up taking longer. The Intent Spec is the "requirements and spec documentation" practice mentioned earlier—agentic coding's first discipline. Define the goal clearly and the agent gets it right on the first try much more often.

The expense tracker is just practice. The same loop handles more complex tasks — connecting to a stock API to show real-time quotes, building a Google login system, creating a full web app with a database. The more complex the task, the more time a good Intent Spec saves.

### Step 5: Cross the Line from Vibe to Agentic

Through Step 4, what you've been doing isn't that different from vibe coding — the only addition is the Intent Spec. Now it's time to cross the line.

Say you decide to build a personal website — homepage, about page, portfolio, blog. This isn't a throwaway tool. It's going live, people will see it, and you'll keep updating it:

- You'll keep adding posts, swapping projects, adjusting the design
- Changing the portfolio page **can't break the homepage**
- When a friend shares your URL, **it can't load as a blank page**
- Three months later when you need to change something, **you need to understand why it was built that way**

If the expense tracker breaks, rebuild it. If your personal website breaks, your professional image breaks with it. That's why you need to upgrade from vibe coding to agentic coding.

Back to the "upgrading from vibe to agentic" table — you've already done "requirements and spec documentation" (Intent Spec). Three things left:

**1. Version Control — Undo When Things Break**

Tell the agent: "Set up Git for this project. Track every change."

You asked the agent to redesign the blog layout and the homepage broke? Roll back to the previous version. No starting over. Three months later, you can see every change — when, what, and why.

That's the "traceability" from the table. Vibe coding doesn't have this. When things break, you're guessing from memory.

**2. Automated Testing — Confirm Nothing Else Broke**

Tell the agent: "Write tests for the website: every page loads, all links work, all images display."

Your site has a homepage, about, portfolio, blog, and each post has its own page — change one thing and you need to verify a dozen pages aren't broken. Manually clicking through takes ten minutes and you'll always miss something. Automated tests run in seconds and check everything.

From now on, every time you make changes, the agent runs tests first. All pass? Done. Something fails? The agent fixes it and re-runs until everything passes.

**3. Diff Review — Know What the Agent Changed**

You asked the agent to add a new project to the portfolio. When it's done, say: "Show me what you changed."

The agent lists which files it touched and what changed. You evaluate: did it only modify the portfolio page? Or did it accidentally change the homepage nav or the blog's CSS?

Changing one thing but accidentally affecting unrelated pages — that's the most common website issue. Diff review catches it before anything goes live.

Going further: tell the agent "run tests automatically after every change, and only show me the diff after tests pass." That way what reaches you is already "no obvious problems" — you only need to judge if the direction is right.

With these three things in place, you're no longer just "using AI to build things." You're "using engineering practices to manage what AI builds." That's agentic coding.

The same engineering practices apply to bigger projects — a stock dashboard connected to APIs, an expense app with login, even a paid SaaS product. The bigger the project, the more time these practices save and the more disasters they prevent.

### After You're Comfortable

Once the basic loop is stable, agentic coding extends beyond writing code:

**Build Your Own Skills — Extract Processes and Rules**

As you use it longer, your config file grows — rules, SOPs, workflows for different tasks all crammed into one file, and the agent loses focus. That's when you split specific workflows into standalone Skills: one SOP for deploying the site, another for writing blog posts, another for running tests. Load them on demand, keep the config file clean.

**Connect External Services — Let the Agent Do More**

Agents don't just write code — they can connect to tools you use daily. For example: have the agent read your Google Calendar and organize today's tasks, connect to a stock API and email you a daily investment summary, track KOLs you follow for new content and compile summaries. This isn't product development — it's using agentic coding to build your personal automation workflows.

**Connect Your Digital Notes — Give the Agent Your Knowledge Base**

If you use Obsidian, Notion, or another note-taking tool, let the agent access your notes. When discussing a new project, the agent can reference your previous notes, research, and ideas — no re-explaining the background every time. Your knowledge base becomes the agent's long-term memory.

At this point you have the complete toolkit: the product maturity framework helps you choose the right method, Intent Spec helps you define goals, and engineering practices help you maintain quality. What's left is building things.

As you build, you'll find the same loop — set goals, let the agent execute, review results, iterate — applies beyond coding. I use it to [manage goals](/en/blog/ai-goal-management-system/), manage knowledge, and manage daily workflows. Coding is just the starting point.

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I’m always happy to chat about AI, systems, and building things solo.*
