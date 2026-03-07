---
title: "Claude Skills Guide: Build AI Workflow Automation From Scratch"
description: "A practical Claude Skills guide with real examples. Learn how skills work, the three-layer loading architecture, trigger mechanics, design patterns, and Anthropic's official writing philosophy. Includes hands-on experience and getting started tips."
pubDate: 2026-03-07
category: building-products
tags: ["AI", "Claude Code", "agentic coding", "Claude Skills", "developer-tools"]
lang: en
translationKey: claude-skills-guide
featured: true
draft: true
heroImage: /images/blog/claude-skills-guide.webp
focusKeyphrase: "claude skills guide"
relatedPosts: ["agentic-coding-guide.md", "claude-code-tutorial.md", "lyt-framework-guide.md"]
faq:
  - question: "What are Claude Skills?"
    answer: "They solve the 'teaching AI the same thing every conversation' problem. A skill is a folder: SKILL.md (main instructions—YAML header + Markdown steps), scripts/ (executable code), references/ (docs), and assets/ (templates). Write once, auto-applied to every future conversation."
  - question: "What's the difference between Claude Skills and MCP?"
    answer: "MCP lets Claude connect to external tools and APIs (solves 'can it do this?'). Skills teach it what to do with the data (solves 'how to do it best'). Example: for my Panopticon system, MCP pulls content from Reddit, Hacker News, and Product Hunt. The skill filters for engagement scores above 4, categorizes into 5 content types, and recommends 2-3 topics."
  - question: "Do I need to code to use Skills?"
    answer: "No. SKILL.md is just Markdown—no programming required. You don't even need to write it yourself. Anthropic's official skill-creator interviews you about your workflow (what it looks like, when to trigger, edge cases), then auto-generates the SKILL.md and folder structure."
  - question: "Do Skills only work with Claude Code?"
    answer: "No. Agent Skills is an open standard launched by Anthropic in late 2025, now adopted by 30+ tools including Cursor, VS Code Copilot, Gemini CLI, OpenAI Codex, and JetBrains Junie. Skills you write are portable across platforms—your investment isn't locked into any single tool."
  - question: "How long can a Skill be?"
    answer: "Keep SKILL.md under 500 lines. Beyond that, use the three-layer architecture: the cover page (name + description, ~100 tokens) loads permanently, full instructions load only when triggered, and lengthy reference material goes in a references/ folder loaded on demand. This lets 17 skills coexist without blowing up the context window."
---

Almost everyone who works with AI has hit the same wall: you teach it something, open a new conversation the next day, and everything resets to zero.

You spend three days dialing in a workflow, going back and forth with Claude until it's perfect. Next morning, you're explaining everything from scratch. You save the prompt in your notes and paste it every time, but after a month of pasting the same 500-word instruction daily, you start wondering—is this really how AI is supposed to work?

It's not. There's something built specifically for this problem—Claude Skills.

Every morning, I type two words—"start work"—and Claude automatically runs through 8 steps: review yesterday, check weekly goals, sync four projects, build today's task list. Three minutes later it asks: "What should we tackle first?"

This article covers everything from the ground up: what a skill is, how it works, how to create Claude code skills, and how Anthropic themselves think about this.

---

## Why You Need Skills

Re-pasting prompts isn't just annoying—it's wasteful.

Every paste eats a chunk of the context window. And the context window is finite. Even Claude Opus, the most powerful model, only has 200K tokens (roughly 150,000 words). Sounds like a lot, but system instructions, MCP tool descriptions, and conversation history all share that space. The more tools you connect, the longer the conversation, the less room for your actual instructions. In my experience, loading several MCP tools can eat half the context before the conversation even starts—leaving just 50% for real work.

There's a subtler problem too: **inconsistency.** The same task described slightly differently on different days produces different results. Sometimes Claude adds an extra step, sometimes it skips one, sometimes the format is off. Without a standardized SOP, quality depends on luck.

Skills solve both problems: **save context, stabilize quality.** In Anthropic's open standard, this system is called Agent Skills—it's not limited to Claude Code. Cursor, Gemini CLI, Codex all support the same format. Regardless of the name, the core idea is the same: make AI follow your defined workflow when coding, executing tasks, or running AI workflow automation.

---

## What Claude Code Skills Look Like

Technically, a Claude Code Skill is just a folder. At its core is a Markdown file called `SKILL.md`—your SOP lives here. It starts with a YAML header (telling Claude what this skill does and when to use it), followed by the actual steps and instructions.

A simplified example:

```markdown
---
name: daily-planning
description: Daily work planning workflow. Use when the user says
  "plan my day", "daily planning", "start work", or "morning routine".
---

# Daily Planning

## Steps

1. Check today's date and day of the week
2. Read the last two daily notes, identify carry-overs
3. Read weekly goals, check progress and remaining days
4. Scan in-progress tasks across all projects
5. Create today's daily note
6. Suggest today's work items based on priority
```

The YAML between the `---` markers is the cover page—Claude uses this to decide whether to activate the skill (we'll get into why this matters so much later). The Markdown below is the SOP itself. That's it.

A complete skill folder looks like this:

```
my-daily-planning/
├── SKILL.md          ← Main instructions (required)
├── scripts/          ← Executable scripts (optional)
├── references/       ← Reference docs (optional)
└── assets/           ← Templates (optional)
```

`SKILL.md` is the recipe itself—your workflow, steps, and decision logic all live here. Claude reads it and knows what to do.

The other three folders are supporting ingredients:

- **`scripts/`**: Parts that need to run code. A shell script to parse CSV data and calculate stats, or a Python script to call an external API. These are more accurate than asking Claude to compute things itself. Plus, scripts execute directly without loading into the context window—another win for the context scarcity problem.
- **`references/`**: Reference material too long to fit in SKILL.md. An API doc, a style guide, or a decision matrix. Claude only reads these when needed, so they don't waste context every time.
- **`assets/`**: Templates and materials. A Markdown template for daily notes, applied automatically when creating new files so the format never drifts.

See the pattern? These four components solve different problems but serve the same two goals: **save context, stabilize quality.** Scripts don't occupy context and compute accurately, references load on demand, assets standardize output. The entire skill folder is designed around these two principles.

Write once. Every future conversation, Claude applies it automatically. No pasting prompts, no repeating yourself.

---

## MCP is the Kitchen, Skills are the Recipes

If you've used [Claude Code's](/en/blog/claude-code-tutorial/) MCP (Model Context Protocol), you've already given Claude an entire kitchen—tools, ingredients, equipment.

But having a kitchen doesn't mean you can cook.

| MCP (Kitchen) | Skills (Recipes) |
|---------------|-----------------|
| Connects tools | Teaches how to use those tools |
| Provides real-time data access | Packages workflows and best practices |
| Solves "can it do this?" | Solves "how to do it best" |

My [Panopticon (content monitoring system)](/en/blog/personal-panopticon/) is a good example. MCP lets Claude connect to APIs and pull trending content from Reddit, Hacker News, and Product Hunt. But "what to do after pulling the data"—filter for engagement scores above 4, categorize into 5 content types, recommend 2-3 topics—that decision logic lives in the skill.

MCP provides capability. Skills provide intelligence.

Both layers now have open standards. MCP standardizes "how tools connect," Agent Skills standardizes "how tools are used." Agent Skills is an open standard launched by Anthropic in late 2025, now adopted by 30+ tools—not just Claude Code, but Cursor, VS Code Copilot, Gemini CLI, OpenAI Codex, JetBrains Junie, and more. The skills you write are portable across platforms.

---

## Three-Layer Loading: How Claude Knows Which Skill to Use

I currently run 17 skills simultaneously. If all of them loaded in full every time, Claude would drown in information—imagine a chef with 17 cookbooks open to every page at once.

So skills don't load all at once. The solution is a three-layer architecture called **Progressive Disclosure**:

**Layer 1: Cover Page** (always loaded, ~100 tokens/skill)

Like a cookbook cover, it has just two things:
- `name`—what this skill is called
- `description`—what it does and when to use it ("Tomato pasta, great for weekend lunch")

Claude reads this to know when to activate.

**Layer 2: Full Instructions** (loaded only when relevant, recommended < 500 lines)

The cover page and full instructions live in the same SKILL.md file. The difference: the cover is always loaded, but Claude only reads the rest when it determines "this task needs this recipe."

**Layer 3: Supporting Files** (loaded on demand, no limit)

Everything in `references/`, `scripts/`, `assets/`. Claude checks these only when needed. Scripts execute directly without entering the context.

This design lets 17 skills coexist peacefully. I say "start work" and only `/daily` loads fully—the other 16 stand by quietly. Say "write a blog post" and `/content` opens. Say "SEO research" and `/seo` opens. Each skill occupies context only when it's actually needed.

---

## The Description Makes or Breaks Your Skill

In the three-layer architecture, the Layer 1 `description` is the most critical—it determines whether your skill ever gets triggered.

Claude uses this text to judge: "Does what the user just said relate to this skill?" The judgment is based on the LLM's own semantic understanding—it's not doing keyword matching, but genuinely "reading" your intent against the description, then deciding whether to activate.

Sounds smart, but there's a catch: Claude errs on the side of caution. It would rather not trigger than trigger incorrectly. Testing shows that with vague descriptions, auto-trigger accuracy drops to just 55%. It's not that Claude can't understand your intent—it's that when the description is ambiguous, it chooses "when in doubt, don't activate."

How to write it right? A good description answers two things:

1. **What this skill does**—so Claude knows its purpose
2. **What the user will say**—specific trigger phrases

A well-written description:

```yaml
description: Daily work planning workflow. Use when the user says
  "plan my day", "daily planning", "start work", or "morning routine".
```

What it does: daily work planning. How to trigger it: four specific phrases. Claude sees "start work" and knows to activate.

A poorly written description:

```yaml
description: Helps with daily work tasks.
```

Just one vague purpose, no trigger phrases. Claude has no idea what the user will say to invoke it, so it never triggers.

A few things to keep in mind:

- **Be explicit about trigger phrases**: List specific phrases users will actually say. The more variations you include, the better—Claude tends to under-trigger, so more trigger phrases is safer than fewer.
- **Think of it like a landing page**: How you describe the skill determines whether Claude "clicks through." A clear value proposition with specific use cases beats a generic one-liner every time.

---

## What Skills Can Do

Skills aren't just "writing steps down." Anthropic identified 5 design patterns from early adopters:

| Pattern | What It Does | Example |
|---------|-------------|---------|
| Sequential execution | Ordered steps with dependencies | Daily planning: review yesterday → check weekly goals → create daily note |
| Cross-tool orchestration | Chain multiple tools, data flows between systems | Project init: create GitHub repo → generate folders → set up CI/CD → notify Slack |
| Iterative refinement | Draft, check, revise, check again until it meets standards | Content editing: first draft → style check → quality review → loop back if it fails |
| Conditional branching | Same goal, different paths based on context | SEO research: based on input, look up keywords, analyze competitors, or map the industry landscape |
| Embedded domain knowledge | Encode expertise, not just tool operations | Code review standards: naming conventions, error handling principles, test coverage—write once, apply always |

Most effective skills combine multiple patterns. You don't need to force-fit them, but knowing the possibilities helps you write with better structure.

---

## How to Write Skills Well

Anthropic's `skill-creator` (the official meta-skill for creating skills) contains a line that captures the most important principle of skill writing:

> Try to explain to the model why things are important in lieu of heavy-handed musty MUSTs.

Replace commands with reasons.

If you find yourself writing a lot of "ALWAYS" and "NEVER" (in all caps) in your SKILL.md, that's a signal—try explaining *why* instead.

For example, you could write this in a skill:

```
ALWAYS show command contents before executing. NEVER execute directly.
```

Or this:

```
Show command contents before executing, because users need to verify safety.
Executing without confirmation could cause irreversible damage.
```

With the first version, Claude follows these two rules. When it encounters a situation the rules don't cover (say, a command that looks safe but is actually risky), it has no basis for judgment.

With the second version, Claude understands the *why*—protect user safety. So even in gray areas the rules don't address, it leans toward caution. Reasons let the model generalize; rules only cover scenarios you thought of.

The only exception is formatting requirements—"always use this exact template" is a mechanical spec with no "why" to explain. Just hardcode those.

---

## Skills Don't Come Out Perfect

### A Single Skill Takes Many Iterations

My `/daily` is now on v6. The first version was rough—unclear steps, wrong file paths, edge cases unhandled.

Version 2 added content discovery system integration. Version 3 found that weekly progress calculations kept going wrong, so I added explicit calculation rules. Version 4 added auto-triggers—Tuesday reminders for weekly meetings, month-start reminders for archiving. Version 5 added iPhone lightweight mode (detect the environment, skip Python-dependent steps on mobile).

Each version came from discovering "this isn't good enough" during actual use, then fixing it.

A skill isn't a config file you write and forget—it's a living document of your workflow. Your work habits change, your needs change, the skill changes with them. Each revision deepens your understanding of your own workflow. The process itself forces you to think: "How do I actually work? Which steps truly matter?"

Anthropic's guide says the same thing:

> First iterate on a specific task in conversation until Claude gets it right. Then extract the successful approach into a skill.

Don't aim for perfection on day one. Build a v1 today, discover issues over a few days, iterate to v2. Good workflows are grown, not designed.

### 17 Skills Weren't Built at Once

I started with a single `/daily`. After using it for a while, I noticed the weekly solo accountability meeting was also repetitive—that became `/wam`. Then keyword research kept requiring re-explaining the strategy—that became `/seo`. Then YouTube video analysis had the same API integration every time—that became `/youtube`.

Every skill was born because "I've done this too many times." Not from sitting down and planning "what skills do I need," but from daily work naturally surfacing the need.

Six months later I looked back and had 17—not because I planned it, but because I use them every day and encapsulate a new one each time I hit repetition.

Here are a few I use daily, to give you a feel:

| Skill | What It Does | Why It's Worth Making a Skill |
|-------|-------------|------------------------------|
| `/daily` | Daily work planning (8 steps) | Run daily, many steps with dependencies |
| `/seo` | SEO keyword research (8 sub-modes) | Fixed query flow, different parameters each time |
| `/content` | Content creation + style editing | Writing style needs consistency, can't rely on memory |
| `/wam` | Weekly solo accountability meeting | Fixed flow: score → review → plan next week |
| `/youtube` | YouTube video transcript analysis | API integration + post-processing logic, don't want to rewrite each time |

You don't need to build many at once. Start with one repetitive task you do every day.

---

## How to Create Your First Skill

You don't need to hand-write SKILL.md. Whether it's writing code or writing skills, Claude can handle it. In fact, none of my skills were written by hand.

Two routes:

**Route A: Let Claude write it for you.**

The most natural approach. First, iterate on a workflow in conversation until Claude gets it right. Then tell it: "Turn what we just did into a skill." It auto-generates SKILL.md and sets up the folder structure. Use it for a few days, find issues, tell it to fix them.

Anthropic even has an official skill for this, called `skill-creator` (major upgrade in early March 2026). Launch it in Claude Code, and Claude interviews you—what does your workflow look like, when should it trigger, what are the edge cases—then auto-generates SKILL.md based on your answers.

It doesn't just generate. It also tests and optimizes:

- **Eval**: Auto-generates test cases ("user says X, skill should do Y"), verifying the skill triggers correctly
- **Improve**: Auto-optimizes description and instructions based on test results, using a 60/40 train/test split to prevent overfitting
- **Benchmark**: Tracks success rate, token usage, and can even run A/B tests—two versions in a blind head-to-head

**Route B: Start from the community and customize.**

Pre-built skills are everywhere. The largest directory is [SkillsMP](https://skillsmp.com), aggregating 96,000+ skills from GitHub. [Anthropic's official repo](https://github.com/anthropics/skills) has fewer but quality-assured. The community also has [Awesome Agent Skills](https://github.com/VoltAgent/awesome-agent-skills), a curated list featuring official skills from Anthropic, Vercel, Stripe, Cloudflare, and more.

But note: community skills are a generic starting point, not your finish line. A generic "daily planning" skill doesn't know your project management tools, your weekly goal format, or how you prioritize. Truly useful skills are always customized to your own workflow—which is why my `/daily` took six versions to reach its current state.

Either route, the key is the same: **get one thing right first, then package it.** Don't try to design a perfect skill from the start. A working v1 is enough—use it for a few days, find the gaps, then iterate.

---

## What This Means

Every new session, Claude is a blank slate who knows nothing about you. A skill is the onboarding manual you hand it—after reading, it knows your processes, your standards, your preferences. No re-training needed, ready to work from the first message.

`/daily` is my executive assistant, `/wam` is my meeting facilitator, `/content` is my writing coach. Each one is the senior team member who knows me best—knows my preferences, understands my processes, remembers the pitfalls from last time—not a day-one intern.

Agent Skills aren't hard—just Markdown with some structure. But the trend they represent matters: **AI shifts from "you teach it every time" to "you teach it once."**

And the standard is open. The skill you write in Claude Code today can move to Cursor, Gemini CLI, or Codex tomorrow. Your investment isn't locked into any single platform.

For me, Agent Skills are what took [Agentic Coding](/en/blog/agentic-coding-guide/) from "usable" to "powerful." Tools connected (MCP), knowledge packaged (Skills)—what's left is letting AI follow your workflow, whether you use it for coding, research, or turning daily operations into AI workflow automation.

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm open to collaboration, consulting, and new opportunities.*
