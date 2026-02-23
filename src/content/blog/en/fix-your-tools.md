---
title: "Your Tools Set Your Ceiling"
seoTitle: "My AI Workflow: 3 Tool Fixes That Saved Me Hours Every Week"
description: "Most people work around broken tools instead of fixing them. The cost is 30+ minutes a day doing things you shouldn't have to. I built an AI workflow with Claude Code, MCP, and Obsidian — here's what I learned from three tool-fixing decisions."
pubDate: 2026-02-23
category: productivity
tags: ["Claude Code", "AI workflow", "Obsidian", "productivity", "knowledge management"]
lang: en
featured: false
draft: false
heroImage: /images/blog/fix-your-tools.webp
translationKey: fix-your-tools
focus_keyphrase: "AI workflow"
relatedPosts: ["claude-code-tutorial.md", "roam-research-to-obsidian.md", "12-week-year-guide.md"]
---

A few months ago, I was spending 20 minutes every morning manually piecing together my calendar.

Three calendars across three apps. Two Google Calendar accounts, one iCloud. Every morning I'd open three tabs, merge them in my head, and write out the day's schedule by hand.

I knew it was dumb. I kept doing it anyway. Eventually I wired everything into a single AI workflow — and realized how much time I'd been wasting.


## Work Around It, or Fix It

I recently came across an article on Hacker News called [Fix your tools](https://ochagavia.nl/blog/fix-your-tools/).

The author, a software engineer, was tracking down a bug. His debugger wasn't working — breakpoints wouldn't fire. The natural response would be to fix the debugger first. But he didn't. He worked around it, adding print statements and tracing through logs line by line.

It took him much longer than it should have. The debugger issue turned out to be a single config flag. One line. Once he flipped it, he found the bug immediately.

His takeaway stuck with me:

> The urge to solve the problem makes you blind to fixing the tool first.

I recognized that pattern in myself. Every time a tool breaks or feels clunky, my first instinct is to route around it — just get the task done. I rarely stop to think: maybe I should fix the tool.

The busier you are, the less likely you are to stop. And the less you stop, the longer the tool stays broken.


## Three Times I Stopped and Fixed It

Looking back, I made three "fix the tool" decisions over the past few months. Each one had a bigger impact than I expected.

---

**First: Claude Code Skills.**

My morning planning routine involved 8 manual steps. Open the daily note, check the weekly breakdown, scan project progress across five repos, review the backlog, pull content ideas from my Panopticon feed, and assemble today's task list.

It took 30–40 minutes every day. Not painful enough to stop everything and fix, but a constant drag.

I spent two hours mapping out the workflow and building a [Claude Code](/en/blog/claude-code-tutorial/) Skill for it. Now I type `/daily` and the entire sequence runs automatically. The AI scans all my data sources, synthesizes a draft plan, and I just review and adjust.

30 minutes down to 3. Over a month, that's hours back.

But the real win wasn't time saved — it was removing friction from the decision to plan. I used to skip planning on busy mornings and jump straight into work. Now the cost of planning is so low that skipping it doesn't make sense.

---

**Second: MCP integration for three calendars.**

Same problem from the intro. Three calendars, three places.

I knew they could be unified. But every time I thought about digging into CalDAV protocols, setting up OAuth flows, and handling token refresh — I'd tell myself "it's fine, checking manually only takes a few minutes."

After months of putting it off, I finally sat down and built it. Two hours of work: wiring up two Google Calendar accounts and iCloud Calendar through MCP servers into Claude Code.

Now I ask "what's on my schedule today?" and get a unified view from all three calendars. No apps to open.

Two hours of investment for 5 minutes saved daily. Pays for itself in a month, and keeps paying after that.

What surprised me most was the cognitive overhead that disappeared. I used to have a background process running in my head: "Did I miss a meeting on the other Google account?" That's gone now.

---

**Third: Obsidian LYT for knowledge management.**

This one took the longest to set up, but had the deepest impact.

Writing used to start with 30 minutes of searching for material. Digging through old notes, past articles, Googling things I'd read before. Everything was scattered across Google Docs, phone notes, random places.

I migrated to [Obsidian](/en/blog/roam-research-to-obsidian/) and restructured everything using LYT (Linking Your Thinking). Every concept is a card. Cards link to each other bidirectionally. When I start writing, I search a keyword and related material surfaces instantly — including notes I'd forgotten I had.

The "find material" phase went from 30 minutes to 5. And what I find is more complete, because the links pull in connections I wouldn't have thought to look for.


## Sharpen the Axe: Building an AI Workflow

**It's not that I didn't know I should fix these things. I just never felt like I had time.**

An extra 10, 20, 30 minutes a day — each one feels manageable. There's always something more urgent. Every time I thought "I should really fix this tool," the next task would pull me back in.

Add it up, though. That's hours per month. Days per year.

Everyone knows the saying: sharpen the axe before you chop. But when you're rushing and the deadline is tomorrow, you keep chopping with the dull blade.

The thing is, good tools are multipliers.

Two hours to wire up my calendars, then 5 minutes saved every day — pays for itself in a month. Two hours to build the `/daily` skill, then 27 minutes saved every day. The ROI on fixing tools dwarfs the ROI on just grinding through one more task.

Here's what my AI workflow looks like now:

Cockpit is my command center for daily planning and cross-project coordination. Claude Code plus custom Skills automate repetitive workflows. MCP pipes three calendars, Gmail, and Drive into a single interface. Obsidian with LYT manages knowledge — when I write, source material is always within reach. And [12 Week Year](/en/blog/12-week-year-guide/) breaks quarterly goals into weekly checkboxes.

Fixing tools can also go too far — you get deep into optimizing and forget what you were supposed to be working on. When I'm deciding whether something is worth fixing, I think about three things: how often do I hit this friction? How much effort will it save? How long will it take to fix?

**If it's daily, saves real effort, and takes a few hours — fix it now. If it's occasional, work around it.**

At first, it feels like you can't afford to stop and fix things because everything is urgent. But the more urgent things feel, the less you fix, and the less you fix, the more urgent things get. Once the system starts coming together, it flips — time freed up goes into fixing the next thing, which frees up more time, which lets you fix the next one.

My workflow still has friction. It probably always will.

The difference is, now when I hit it, I ask three questions: how often? How much will it save? How much effort to fix?

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm always happy to chat about AI, systems, and building things solo.*
