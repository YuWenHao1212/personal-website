---
title: "Agentic Coding: One Year from Vibes to Agentic Engineering"
description: "What is agentic coding? How is it different from vibe coding? In one year, AI coding evolved from 'go with the vibes' to 'lead an AI engineering team.' A PM's firsthand perspective."
pubDate: 2026-02-13
category: building-products
tags: ["AI", "solo founder", "Claude Code", "agentic coding", "agentic engineering", "vibe coding", "developer-tools"]
lang: en
translationKey: agentic-coding
draft: false
featured: true
heroImage: /images/blog/agentic-coding.webp
focus_keyphrase: "agentic coding"
relatedPosts: ["claude-code-tutorial.md", "nocode-to-ai-coding.md"]
faq:
  - question: "What is agentic coding?"
    answer: "Humans set direction, AI teams execute. You define the goal, and multiple AI agents divide the work autonomously — one handles frontend, another backend, another runs tests — like managing an engineering team. But the greater the capability, the higher the cost of a wrong direction. The point isn't making AI move fast; it's making sure it moves in the right direction. Karpathy calls this Agentic Engineering — the word 'engineering' is key: applying engineering discipline to build human-AI workflows that let one person lead an entire AI team to ship products."
  - question: "What's the difference between vibe coding and agentic coding?"
    answer: "One word: quality. Vibe coding means letting AI write based on vibes — Accept All, ship if it works — you don't care what the code looks like because it's a demo, not a product. Agentic coding means you set the direction and AI teams execute, but you continuously verify the direction is right and the architecture holds up. The difference isn't in the tools you use, but in whether you've raised the bar from 'it works' to 'it's maintainable, deployable, and worth paying for.'"
  - question: "Will agentic coding replace software engineers?"
    answer: "It won't replace them, but the role will fundamentally change. Engineers go from writing code themselves to directing AI teams — from IC to manager, except you're managing AI, not people. The key skill shifts from 'can you build it' to 'can you define the requirements, evaluate the architecture, and ask the right questions.' These happen to be core PM skills — defining goals, breaking down tasks, reviewing output, ensuring quality. In the agentic coding era, people who know how to manage have an edge over people who know how to code."
  - question: "Can non-engineers use agentic coding?"
    answer: "Yes, and you might be better suited for it than you think. The core skills of agentic coding are defining clear goals, reviewing AI output direction, and establishing quality gates — these are management skills, not coding skills. The real barrier isn't 'can you write code,' but 'can you judge whether what the AI built is good or bad, and whether the direction is right.'"
---

On February 3, 2025, Andrej Karpathy posted on X.

He's the former head of AI at Tesla and a founding member of OpenAI. In the AI world, people take what he says seriously.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

[The post](https://x.com/karpathy/status/1886192184808149383) got 6.7 million views.

"Vibe Coding" — coding by vibes — became the hottest term in tech in 2025. [Collins Dictionary named it Word of the Year](https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl). [25% of Y Combinator's winter batch had codebases that were 95% AI-generated](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/). [Lovable hit $100M ARR in 8 months](https://techcrunch.com/2025/07/23/eight-months-in-swedish-unicorn-lovable-crosses-the-100m-arr-milestone/).

One year later, in February 2026, Karpathy himself said the term wasn't enough anymore.

He introduced a new concept: [**Agentic Engineering**](https://x.com/karpathy/status/2019137879310836075). Anthropic calls it **Agentic Coding** in their official reports.

From "go with the vibes" to "autonomous agents." It took one year.

This article starts from that tweet.

---

## What is vibe coding?

My first experience with vibe coding was in February 2025, using Cursor to build a stock backtesting app.

Enter a ticker symbol, and it would pull historical prices, calculate annualized returns, max drawdown, and beta — even simulate lump-sum vs. dollar-cost averaging from any start date to present.

I hadn't written a line of code in 14 years.

But that evening, between finishing dinner and going to bed, the thing worked. I demoed it to colleagues the next day. They couldn't believe it.

That's the magic of vibe coding. You tell the AI what you want in natural language, it generates code, you run it, and if it works, you're done. No reading diffs, no reviewing code (I couldn't read it anyway). Accept All.

But I never thought about security, stability, authentication, or how to charge for it.

Because I didn't need to. It was a demo, not a product.

Vibe coding is perfect for exactly this: prototypes, weekend side projects, impressing your colleagues.

What it's not suited for: anything where you care about quality, security, and long-term maintenance.

Most valuable software falls into the latter category.

But vibe coding wasn't the end. Looking back, it was just one stage in the evolution of AI-assisted coding.

## Three stages of AI coding

### Autocomplete: AI guesses your next line

In 2021, GitHub Copilot launched. You type, and AI predicts what you'll write next.

Useful, but fundamentally no different from your phone's autocomplete. Humans drive everything; AI just makes you type a little faster.

### Chat: you talk, AI writes

In 2023, ChatGPT exploded, and everything accelerated.

You open a chat window, describe a feature in plain English. AI responds with code. You don't quite understand it, but that's fine — copy, paste into your editor, run it. Got an error? Paste the error message back. AI gives you another version. Back and forth, like texting a very patient engineer friend.

In 2024, Cursor moved this workflow into the editor. No more switching windows, no more copy-paste — AI edits your files directly, and you just hit Accept.

[An 8-year-old girl used Cursor to build an AI chatbot in 45 minutes](https://x.com/rickyrobinett/status/1825581674870055189). Vibe coding lowered the barrier of "knowing how to code" to a grade-school level.

A few months later, I built my own stock backtesting app. One evening, from zero to a working demo. That feeling of "I actually made this" is hard to forget.

In February 2025, Karpathy gave this mode a name: Vibe Coding.

But no matter how the tools evolved, the core dynamic stayed the same: you had to guide AI step by step, or it wouldn't move.

### Agents: you state the goal, AI figures it out

That same month, Anthropic released the Claude Code preview.

Three months later it officially launched, powered by two models: **Opus 4** (more reliable on complex tasks, 10-20% more accurate, but half the speed and five times the cost) and **Sonnet 4** (faster, cheaper, the daily workhorse — but prone to mistakes on complex logic).

This time was different.

Instead of telling AI "write a function that does X," you say "I want users to be able to sign in with Google." Then the agent plans which files to change, writes the code, runs tests, finds a bug, fixes it, runs tests again.

The whole process becomes an autonomous loop — **reason → act → observe → reason again**.

The human role shifts from "the person who writes code" to "the person who defines goals and reviews results."

What followed was breathtaking:

- **September: Sonnet 4.5** — 20-25% faster than Sonnet 4, better at catching bugs
- **November: Opus 4.5** — [output speed surpassed Sonnet 4.5, token usage down 76%](https://www.anthropic.com/news/claude-opus-4-5). The top-tier model became the daily driver
- **February 2026: Opus 4.6** — multiple agents working simultaneously

That last step was a qualitative shift. Before, it was one person talking to one agent — you give instructions, it executes. Now you're talking to an AI Team Lead. You discuss requirements, confirm the plan, and it breaks the work into tasks, spawns specialized agents — frontend, backend, testing, docs — each working in parallel, tracking dependencies, even coordinating with each other. You grab a coffee, come back, and the whole team has made progress.

From May to the following February — nine months, four major upgrades. Each one let agents do more, with less human intervention.

Overnight, every engineer got promoted — from IC to manager. Except the team they manage isn't people. It's AI.

In early 2026, [Elon Musk posted on X: "We have entered the Singularity."](https://x.com/elonmusk/status/2007738847397036143) Many thought it was hyperbole. But in software development at least, it's hard to say he's wrong.

This is agentic coding.

---

## When I got serious about building a product

I spent 10 years as a product manager. The last few were in automotive electronics.

Automotive software has extremely high safety standards — the ASPICE V-model framework, where requirements, design, implementation, and testing all trace back to each other. I was responsible for development processes and tooling — Jira, Polarion, DOORS. Requirements traceability, issue tracking, change management. That was my daily work.

In 2025, while pursuing my master's at Minerva University, my thesis project was an AI resume analysis tool — [AIResumeAdvisor](https://airesumeadvisor.com).

I built the MVP with no-code tools. It worked, but it was limited at every turn — constrained by available components and plugins, unable to implement many of my ideas. When Claude Code launched, I decided to start over.

This wasn't another weekend demo. This was going to production — with real users, requiring long-term maintenance.

Naturally, I brought my 10 years of experience: DevOps, requirements management, automated testing, CI/CD — the full stack.

And it worked. **It actually worked.**

I was still the PM. Defining requirements, reviewing output, ensuring quality. The only difference was that the team doing the work went from engineers to an AI team.

Specifically:

1. **Define clearly what you want** before talking to the agent
2. **Have the agent draft a plan first** — I review the plan before letting it execute
3. **Focus on the big picture, not individual lines of code** — is the architecture right? Is the direction off? When in doubt, ask the AI: how did you evaluate this? What's the cost? Is the response time acceptable? What about risks and security? This is the same as being a PM — we make decisions by asking the right questions
4. **Let machines handle quality** — unit tests, integration tests, E2E tests, pre-commit hooks, backend monitoring — all automated. I don't review test code line by line, but if anything breaks, I know immediately

Isn't this just the V-model? Requirements → design → implementation → testing. Except the execution speed went from "a few sprints" to "a few hours."

My agentic coding workflow:

```
Define intent → discuss plan with agent → confirm direction → AI team executes → I review architecture and results → merge
```

80% of my time goes to thinking and reviewing. 20% goes to talking with agents. 0% goes to writing code myself.

But the way AI improves development doesn't stop there.

## Even the workflow itself is evolving

Agentic coding doesn't just change "who writes the code." It changes the entire workflow.

Before, every engineer had their own approach. Experience lived in their heads and was hard to transfer. New hires took months to get up to speed.

Now, how to plan, how to do code review, how to approach frontend design — all of it is written as prompts, skills, and agent configs, stored in the repo.

**The process itself becomes code that can be continuously improved.**

My own projects work this way. CLAUDE.md contains the project's tech stack, coding style, and workflow. Every time an agent starts up, it reads this file. One minute to onboard, and it immediately produces output at senior engineer quality.

And this file keeps getting better. Every time I catch the agent making a mistake, I add a rule. Next time, it won't make that mistake again.

Knowledge is no longer locked in people's heads. It becomes something you can version control, iterate on, and share.

---

On the one-year anniversary of vibe coding, Karpathy wrote a [retrospective](https://x.com/karpathy/status/2019137879310836075):

> At the time, LLM capabilities weren't yet strong enough, and vibe coding mostly applied to fun throwaway projects, demos, and experiments. Fun, and almost working. A year later, coding through LLM agents is becoming the default workflow for professionals — just with more oversight and review. The goal is to capture the leverage agents provide without compromising software quality.

He gave this new mode a name: **Agentic Engineering**.

> "Agentic" — because 99% of the time you're not writing code yourself but directing agents to write it, while you supervise. "Engineering" — emphasizing this is a craft with both art and science, requiring professional skills. Something you can learn and get better at.

Karpathy was talking about software development. But I think the pattern extends further.

I now use the same approach to manage knowledge — AI helps me research, organize, and archive to Obsidian, while I decide what's worth keeping. The same approach for [goal management](/en/blog/ai-goal-management-system/) — AI tracks my progress and flags when I drift, while I set the direction.

**Set goals → agents execute → humans review → iterate.**

This loop applies to every aspect of life. Coding is just the starting point.

From 2021's autocomplete, to 2023's chat, to 2025's agents. In four years, AI coding evolved from "guessing your next line" to "you state the goal, it figures out the rest."

AI has already changed so much in just one year.

What will it look like a year from now?
