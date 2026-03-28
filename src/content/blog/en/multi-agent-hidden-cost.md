---
title: "I Built an AI Agent Company and Wanted to Shut It Down on Day One"
description: "6 AI agents, OKRs, approval workflows, budget controls. Everything in place. Day one, I realized: management overhead outweighed the output. A lesson from 10 years as a PM."
pubDate: 2026-03-28
category: building-products
tags: ["AI agent", "multi agent", "Paperclip AI", "agentic coding", "AI automation"]
author: "Yu Wen-Hao"
keywords: ["multi agent", "AI agent", "Paperclip AI", "multi agent system", "AI automation", "AI agent management", "multi agent cost"]
lang: en
translationKey: multi-agent-hidden-cost
draft: false
featured: false
heroImage: /images/blog/multi-agent-hidden-cost.webp
focus_keyphrase: "multi agent"
relatedPosts: ["ai-harness.md", "agentic-coding.md", "claude-code-tutorial.md", "claude-skills-guide.md"]
faq:
  - question: "When should you use a multi agent system?"
    answer: "When your work requires 24/7 unattended operation, or when you have a clear pipeline with fixed inputs, fixed steps, and fixed pass/fail criteria. For solo operators or small teams, a single agent with a good Harness is enough."
  - question: "What are the hidden costs of multi agent systems?"
    answer: "Three: management cost (every agent's instructions must be written down to the operational level and continuously maintained), handoff cost (every step between agents can break, miss one step and the pipeline stalls), and context rebuilding cost (every time an agent wakes up, it reloads all instructions and history from scratch)."
  - question: "What is Paperclip?"
    answer: "Paperclip is an open-source AI agent orchestration platform (23,000+ GitHub stars) that uses real-world corporate management methodologies (OKRs, org charts, approval workflows, budget controls) to manage AI teams. Its vision: zero-human companies."
---

6 AI agents. OKRs. Approval workflows. Budget controls. Everything in place.

End of day one, I was thinking about how to shut it all down.

---

## The Allure of a Zero-Human Company

I've spent 10 years as a PM shipping products across teams of 10 to 100+. I know what process looks like when it works — and when it doesn't. So when I saw an open-source platform that promised to apply the same management principles to AI agents, I had to try it.

[Paperclip](https://github.com/paperclipai/paperclip) hit 23,000+ stars within weeks of launch. Its vision is bold: **zero-human companies**.

Not AI answering questions — AI running an entire company. Real corporate management applied to AI teams:

- **Org chart**: CEO → PM → Developer → Reviewer, with reporting lines
- **OKRs**: Company goals → project goals → every task tied to an objective
- **Approval workflows**: Strategy decisions and content publishing go through formal approval
- **Budget controls**: Monthly budget caps per agent, auto-pause on overspend
- **Heartbeat**: Agents don't run continuously — they wake up on schedule, do their work, then go back to sleep

I was already using [Claude Code](/en/blog/claude-code-tutorial/) with a [Harness](/en/blog/ai-harness/) (CLAUDE.md + Skills) — a single agent doing [agentic coding](/en/blog/agentic-coding/) was already powerful. But Paperclip promised the next level: AI runs itself, I just approve.

Researcher finds topics, writer drafts, editor reviews, engineer handles tech — four roles, each specialized, auto-relay.

I decided to build one for real.

---

## Day One

Half a day to set up. 6 AI agents — strategy, research, writing, review, and engineering. OKRs, approvals, budgets, heartbeats, audit logs. All in place. Not a demo — built to actually use.

Opened the first ticket. Assigned it to the CEO.

Over the next four hours, I rewrote instructions four times, manually pushed the pipeline forward countless times, clicked approve in the inbox, watched agents run and stall, stall and run.

The article came out. 3,200 words. Well-structured. Decent quality.

But I sat there thinking: **what am I actually doing?**

I was managing. Not producing.

---

## What Are the Hidden Costs of Multi Agent Systems?

### Management Cost

One agent was responsible for tracking progress. It produced a beautiful status report — but never actually handed off the work. The instructions said "push work to the next station" but didn't specify the exact operations. It didn't know how.

6 agents, each needing 3-4 rounds of instruction rewrites. When the business changes, maintaining 6 sets of instructions costs 6x more than maintaining one.

### Handoff Cost

In a real company, when you're done, you walk over to your colleague's desk and say "done, take a look." Humans have common sense. No protocol needed.

AI doesn't have common sense. Every "walk over to the desk" has to be spelled out — change the status, change the assignee, notify the right person in the right format. Miss one step, and the pipeline stalls.

### Context Rebuilding Cost

Every time an agent wakes up, it reloads all instructions, history, and context from scratch before it can even start thinking.

6 agents × 3 heartbeats each = 18 context rebuilds. A single Claude Code session loads context once. **18 times vs. 1 time. That's not a percentage difference — it's an order of magnitude.**

---

## What Is Process Actually For?

Here's what I've learned from a decade of shipping products: process is a tradeoff. You buy consistency and error reduction, but you pay with flexibility and speed.

An approval form with 5 signers across departments. Best case, one week. Worst case, two weeks. Nobody follows up? Longer.

Once you have process, everything has "the proper way." But the proper way is almost always the least flexible and the slowest way.

Process exists to reduce errors when multiple people coordinate. A 10-person team without it is chaos. A 100-person org without it collapses.

But what if a task could be done in a single conversation?

The moment you split it into a process, you add handoffs, approvals, and waiting. 2 nodes means 1 handoff. 6 nodes means 15 possible interactions. **Coordination cost doesn't grow linearly — it grows combinatorially.**

I brought this corporate intuition with me, confident I understood management. Then I carefully, deliberately decomposed something a single conversation could handle into a full orchestration system.

And spent four hours operating that system instead of doing the actual work.

---

## What Can a Single Agent Do?

Earlier that same day, I used Claude Code to prepare a workshop. Modified templates, updated the website, wrote process docs, compressed files, deployed.

One session. 40 minutes. Done.

In a single conversation, it was researcher, writer, and engineer — switching roles as needed, all context intact. No tickets, no scheduling, no approvals, no special formatting to wake up a colleague.

I said "change this," it changed. I said "wrong," it fixed it immediately.

With Paperclip? I'd write a comment on the ticket, @mention the agent in the correct format, wait for it to wake up and reload all context, read through the history, understand what I wanted changed, and then start working.

A one-sentence fix becomes a full ticket workflow.

Looking back at the 6-agent management system:

| | 6 Agents + Management System | 1 Session |
|---|---|---|
| Idea to first draft | 15+ steps, 4 hours | 1 step, 30 minutes |
| Waiting in between | Each step waits for scheduled wake-up | 0 |
| Approval process | 2 formal approvals | Just say what to change |
| Error correction | Rewrite instructions → rerun → wait | "Wrong, do it this way" |

Paperclip turned something a sentence could solve into an approval workflow.

---

## When Do You Actually Need This?

Paperclip isn't bad. Its underlying design is solid — two agents can't grab the same task, budgets auto-pause on overspend, all operations are recorded and immutable. These mechanisms would be lifesavers in the right scenario.

The issue is the scenario.

| Your Situation | Recommendation | Why |
|---------|------|------|
| Solo or small team | One agent + a good [Harness](/en/blog/ai-harness/) | Change anything instantly — faster than any process |
| Unattended, 24/7 operation | Persistent multi agent system | Nobody online, the system runs itself |

The nature of your work matters too. If your tasks have clear specs and pass/fail criteria — running tests, deployments, data pipelines — process and automation add real value. But if every step requires human judgment and direction changes constantly, forcing process in just locks down your flexibility.

Same as real companies — a 3-person team doesn't need OKRs, approval workflows, or weekly standups. Imposing them only slows things down. As Anthropic puts it in [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents):

> Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs.

---

## Was That Day Wasted?

No.

Running through it once showed me which parts of my work actually need process, and which parts were just creating work for myself.

The company architecture is still there. All 6 agents' instructions are written. One command to start it up.

When the day comes that I truly need unattended operation, or my work becomes a clear pipeline with fixed inputs, fixed steps, and fixed pass/fail — I'll fire it up. But that day isn't today.

Back to Claude Code + Harness. One session. One agent. Say what to do, it does it. Wrong? Fixed immediately.

After 10 years as a PM, the most important lesson: **Process is for scale. Without scale, process is a cage.**

The same principle applies whether you're managing people or AI agents. Match your tooling to your actual coordination needs — not to what looks impressive on an architecture diagram.

---

*I write about AI workflows, agentic coding, and the engineering decisions behind systems that actually ship. [Connect on LinkedIn](https://www.linkedin.com/in/hence/) or [explore my other writing](/en/).*
