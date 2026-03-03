---
title: "Your Notes Don't Need Organizing — They Need Linking: A Complete Guide to LYT"
description: "LYT (Linking Your Thinking) is the most popular PKM framework for Obsidian. After years with PARA and Zettelkasten, here's why I switched to LYT — and why it's the best note-taking method for the AI era."
pubDate: 2026-03-03
category: productivity
tags: ["Obsidian", "LYT", "PKM", "personal knowledge management", "note taking methods", "knowledge management"]
lang: en
seoTitle: "Obsidian PKM Guide: How I Use AI to Build a LYT Note-Taking System"
focusKeyphrase: "PKM"
featured: true
heroImage: /images/blog/lyt-framework/hero.webp
translationKey: lyt-framework-guide
relatedPosts: ["roam-research-to-obsidian.md", "ai-goal-management-system.md"]
---

How many notes do you have?

500? 1,000? More?

Now ask yourself: when was the last time you actually *found* a note you wrote three months ago?

If you're anything like me, the answer is silence. It's not that you don't take enough notes — it's that you take so many they disappear. You spend time writing things down, and they vanish into a black hole.

The problem isn't your memory. It's your system.

Most people organize notes by classification — folders, tags, trying to slot each note into the "correct" location. But knowledge isn't a library book. It doesn't belong in just one category. A note about "remote work" connects to "team management," "productivity," and "work-life balance" all at once. Which folder does it go in?

I've been through this myself.

When I was using Notion, I tried the PARA method — Tiago Forte's famous "Building a Second Brain" framework that organizes notes by project. Simple to start with. But a few months later, when the project ended, those notes got buried in the Archive folder and I never looked at them again.

That problem kept nagging at me, which is why I eventually picked Roam Research — its bidirectional links don't rely on folders, so notes don't disappear when a project ends. I bought a five-year membership for $500 and even invested in the company.

On Roam, I started using the Zettelkasten method. The idea is solid, but building cards is exhausting — every note has to be atomic, rewritten in your own words, manually linked to related cards. Twenty minutes per card was normal. When life got busy, the backlog piled up, and eventually I stopped touching it.

Last year my Roam membership expired. I also wanted to bring AI (Claude Code) into my personal knowledge management and goal system, and AI needs to read local Markdown files — Roam can't do that. So [I switched to Obsidian](/en/blog/roam-research-to-obsidian/). That decision completely changed how I think about knowledge management — when AI can directly read and write your notes, a lot of the manual work that used to be a bottleneck just isn't anymore. But that's a story for later.

The tool problem was solved, but a new one came up immediately: **I opened Obsidian to an empty vault. How should I organize my notes?** Most Obsidian tutorials stop at the operational level — how to install plugins, use shortcuts, set up themes — but very few tell you how to actually design a structure for your notes.

Then I found LYT.

---

## What Is LYT?

LYT stands for **Linking Your Thinking**, a personal knowledge management framework developed by Nick Milo in 2020.

Nick was one of Obsidian's earliest beta testers. He joined in April 2020 and released the first LYT Kit (later renamed Ideaverse) by May. Today, the free Ideaverse for Obsidian has been downloaded over 70,000 times — the most widely used linked notes starter kit in the world.

The core belief behind LYT is simple:

> Don't organize notes by category. Organize by connection.

You don't need to "put" a note into a folder. You just need to "link" it to related notes. Folders are rigid — a file can only live in one place. Links are fluid — a single note can connect to ten different topics at once.

---

## Three Core Concepts You Need to Know

### 1. MOC (Maps of Content)

After switching to Obsidian, with AI helping me, my notes started growing at 5-10 per day. They crossed a hundred notes pretty quickly. At first I stuck with the Zettelkasten approach from my Roam days, but it broke down fast — AI could help me generate notes quickly, but there was no framework telling it how to organize them. Notes were piling up faster than ever. I needed something better than folders (I'd already learned that lesson with Notion) and something more structured than pure freeform linking (Roam taught me that without some higher-level structure, you get lost once notes multiply).

What I needed was a map.

MOC is that map. It's the most important concept in LYT.

Think of a MOC as a "thinking workbench." It's just a note containing links to other notes, arranged according to your own logic. It's not a folder, not a tag — it's a map you draw yourself.

Here's an excerpt from my actual `AI MOC`:

```
## Core Concepts
- [[Agentic Coding]]
- [[MCP]]
- [[Claude Skills]]
- [[Agent Loop]]

## Tools & Practice
- [[Claude Code]]
- [[AI Agent]]

## My Insights
- [[MCP and Skills are like kitchen and recipes]]
- [[The distribution problem of AI tools]]
- [[Harness differences matter more than model differences]]
- [[Iteration beats genius]]

## Industry Events
- [[Anthropic acquires Bun]] (2025-12)
```

This isn't randomly thrown together. It's how AI helped me organize these notes after our discussions — what the core concepts are, what tools I use, what insights I've drawn from practice, and what's happened in the industry. With this structure in place, every time I dive deep into a topic with AI, it first checks my note system for existing context. The MOC lets it quickly find everything related to that topic, so we can build on my past thinking instead of starting from scratch.

The key difference between a MOC and a folder: **a note can appear in multiple MOCs.** For example, `[[Claude Code]]` lives in both my `AI MOC` and my `PKM MOC` because it's both an AI tool and a core part of how I manage knowledge. In a folder system, you'd have to pick one.

When should you create a MOC? Before AI, Nick Milo's rule of thumb was to create one when you have 5+ notes on the same topic and things start feeling messy. With AI, this can be automated — AI can check whether a relevant MOC already exists when filing a note, and suggest creating one if it doesn't. You just approve. No need to keep track yourself.

### 2. The ACE Framework

MOCs handle individual topics, but what about the top-level structure of your entire vault? When I started, I had no folders at all — everything sat in one flat layer. As notes piled up, I knew I shouldn't go back to the folder approach, but I didn't know what framework could replace it. You can't have hundreds of notes sitting in one flat layer forever.

ACE solves this problem. It's LYT's top-level folder structure — just three folders that divide your vault into three "mental spaces":

| Space | The Question It Asks | What Goes Here |
|-------|---------------------|----------------|
| **Atlas** (Knowledge) | What is this? | Knowledge cards, MOC indexes, source material |
| **Calendar** (Time) | When did this happen? | Journal entries, reviews, timelines |
| **Efforts** (Action) | What am I working on? | Active projects, ongoing areas, finished work |

```
Vault/
├── Atlas/        ← What I know (Knowledge)
│   ├── Notes/    ← Knowledge cards
│   ├── Maps/     ← MOC indexes
│   └── Sources/  ← Books, articles, courses
├── Calendar/     ← What I've experienced (Time)
│   └── Journal/  ← Daily notes
└── Efforts/      ← What I'm doing (Action)
    ├── Areas/    ← Ongoing responsibilities
    ├── Projects/ ← Things with a clear endpoint
    └── Works/    ← Finished outputs
```

The philosophy behind ACE goes beyond file organization. It separates three modes of thinking:

- Open Atlas and you're in **learning mode** — what is this concept? How does it connect?
- Open Calendar and you're in **reflection mode** — what happened today? What did I learn?
- Open Efforts and you're in **execution mode** — what project am I working on? What's next?

Many people's problem is mixing everything together. Learning notes and to-do lists in the same space — and doing neither well. ACE uses physical space to help you shift mental modes.

One thing worth noting: the original LYT design puts MOCs under Atlas/Maps, which makes it look like they only serve knowledge cards. But in practice, my MOCs naturally link across to projects in Efforts and journal entries in Calendar. They live in Atlas, but their reach spans the entire vault. That's my own takeaway from using the system — not necessarily Nick Milo's original intent.

### 3. Five Note Types

ACE manages space. MOCs manage topics. But what about each individual note? When I first started, all my cards looked the same — definitions of concepts. After writing a hundred of them, I realized they were no different from Wikipedia entries. There was no "me" in them. LYT's five note types helped me break through that blind spot.

Within Atlas, LYT classifies notes into five types:

| Type | The Question | Examples |
|------|-------------|----------|
| **Things** | What is this? | Concepts, frameworks, tools |
| **Statements** | What do I think? | Your opinions, insights, principles |
| **Questions** | What am I curious about? | Open questions to explore |
| **Quotes** | What did someone else say? | Quotations |
| **People** | Who said it? | People notes |

Most people only write Things — "What is Zettelkasten?" "What is the PARA method?" But what actually makes a PKM system valuable is Statements — your own thinking.

For example, I have a Statement: "MCP and Skills are like kitchen and recipes." That's not a definition from a textbook — it's an analogy I came up with while building OpenClaw. A month later, when I was writing an article, that note turned directly into a paragraph.

**Write down your own ideas, not just other people's.** That's the biggest difference between LYT and traditional note-taking methods. And with AI, this happens more naturally — many of my Statements emerged from conversations with AI. It captures those ideas and files them as notes. You don't have to sit down and deliberately "produce insights." They surface in the flow of discussion.

---

## How LYT Compares to PARA and Zettelkasten

As I mentioned, I tried both the PARA method and Zettelkasten before settling on LYT. These three are the most popular personal knowledge management frameworks today, and many people struggle to choose between them. Here's how I see them after using all three:

| | LYT | PARA | Zettelkasten |
|---|-----|------|-------------|
| **Creator** | Nick Milo | Tiago Forte | Niklas Luhmann |
| **Core Question** | How are these ideas connected? | Which project is this useful for right now? | How does this idea connect to my existing thinking? |
| **Organization** | Links + MOC | Folders + moving files | Pure links, almost no folders |
| **Learning Curve (without AI)** | Medium | Low | High |
| **AI Compatibility** | High | Medium | Low |

> With AI, the learning curve for all three frameworks drops dramatically. The real differentiator becomes: **which framework works best with AI?** I use Claude Code to work with my Obsidian vault — it reads and writes Markdown files directly, so your note-taking framework determines how efficiently AI can operate. LYT's MOCs act as a topic index — when Claude Code enters the vault, it opens a single MOC and immediately sees the full landscape of a topic and all related notes, grasping the context in seconds. Zettelkasten doesn't have this; AI has to hop from card to card following links, which is far less efficient. PARA's folder structure is readable by AI, but once a project ends and notes get buried in the Archive, AI doesn't know where to look either. That's the key reason I chose LYT.

Tables can be abstract. Let me use a scenario to make it concrete.

Say you're working on a "company website redesign" project. During the process, you research some SEO concepts and take a note about "long-tail keyword strategy." You open your note-taking app. Then what?

**The PARA approach**: In PARA, each project is a folder, and notes go straight in — so this note lands in `Projects/Website Redesign/`. Simple and intuitive. But three months later, the website launches and the project is done. Forte recommends extracting reusable material (he calls them Intermediate Packets) before moving everything to Archive. The question is: did you think "this SEO note might be useful later" at that moment? Usually not. Six months later, you're planning a new marketing campaign and need that long-tail keyword strategy — it's buried in the Archive under "Website Redesign," and you have to search for it, assuming you even remember what you wrote.

**The Zettelkasten approach**: You can't just paste in highlights. Zettelkasten requires you to write a "permanent note" — restating "why long-tail keywords work" in your own words, with each card covering only one idea. Then you have to flip through your existing cards, find related ones like "content marketing" and "search intent," manually create links, and write down why they're connected.

But what if you only have a vague sense that "long-tail keywords seem to rank more easily than short ones," but can't articulate why? In Zettelkasten, that level of understanding isn't enough for a permanent note. You can only jot it down as a "fleeting note" and deal with it later — but fleeting notes are meant to be discarded. They don't enter the formal system. That's Zettelkasten's design philosophy: "meaningful friction" (eufriction), deliberately slowing you down and forcing you to think clearly before anything enters the system. Niklas Luhmann wrote 70 books with this method, but he also spent a lifetime maintaining 90,000 cards.

**The LYT approach**: You create a `Long-tail Keyword Strategy.md` knowledge card. At the top, you fill in frontmatter (metadata) that tells the system where this card belongs:

```yaml
---
up:
  - "[[SEO MOC]]"
  - "[[Content Marketing MOC]]"
collection:
  - "[[Things]]"
related:
  - "[[Search Intent]]"
created: 2026-03-03
says: "Long-tail keywords rank more easily and have higher conversion rates"
---

Long-tail keywords (3+ word search terms) have lower competition and clearer search intent, leading to higher conversion rates.
For example, someone searching "note taking app" might just be browsing, but someone searching "Obsidian beginner tutorial" has already decided to use it — that's a long-tail keyword.

Learned during the website redesign. Useful for future content strategy.
```

`up` points to the card's "parent maps" — which MOCs it belongs to. `collection` marks the note type. `related` creates horizontal links to other cards you think are connected. `says` captures the card's core point in one sentence.

Once you fill these in, the card automatically shows up in your SEO MOC and Content Marketing MOC. Up to this point, it looks a lot like Zettelkasten — links, knowledge cards. But the critical difference: **LYT lets you write first, think clearly later.** The note body can be just three lines — "long-tail keywords seem easier to rank, might be related to search intent, needs more research" — metadata goes in first, and you flesh out the content later when you've read more. In Zettelkasten, this kind of half-formed idea doesn't enter the formal system. In LYT, it's on the knowledge graph from day one, waiting for you to come back and deepen it.

The other difference is the MOC itself. Zettelkasten is purely bottom-up — cards link one-to-one, and you rely on memory or browsing to discover connections. LYT adds the MOC layer, letting you see an entire topic from above. Open your `Productivity MOC` and you immediately see Timeboxing, Deep Work, and Pomodoro sitting together — the relationships between them become obvious. Zettelkasten grows a web from the bottom up; LYT gives you both bottom-up links and top-down overview.

All three frameworks were designed before AI. PARA and Zettelkasten's core friction — moving files, building cards — AI can handle. But their structural problems remain:

- **PARA**: When a project ends, knowledge gets buried in the Archive black hole. AI can dig through it, but there's no index telling it which old project folder to look in.
- **Zettelkasten**: No higher-level structure. For AI to understand your knowledge system, it has to hop card by card with no overview.
- **LYT**: The MOC is that overview. AI walks in, sees the full map of a topic, and knows exactly where to find things and where new notes belong.

If you plan to bring AI into your knowledge management — not just asking it questions, but having it read your notes, file new ones, and build on your past thinking — think of it as building an AI-powered second brain. I believe LYT is the best foundation available today.

---

## How I Actually Use LYT

I've been managing my knowledge with LYT for about six months now. The most obvious change is how fast I write articles. Before, half the time went to finding material — searching Google, digging through old notes, checking bookmarks, piecing fragments together. Now I use Claude Code as my AI note-taking partner, directly reading and writing the Markdown files in my Obsidian vault — it files notes and builds links as I go. When I sit down to write, Claude Code first checks the relevant MOCs for material, fills gaps with web research, and adds newly found knowledge back into the system as cards. Every article and every research session feeds back into the knowledge base. The compounding effect kicks in. Most of the PARA and Zettelkasten comparisons in this article were pulled by Claude Code from my Obsidian knowledge cards — no re-research needed.

Remember the question from the beginning — when was the last time you found a note from three months ago? My answer isn't silence anymore. Notes don't vanish into a black hole because LYT gives them an address, and AI delivers new material to the right place every day. When I need something, AI follows the MOC and pulls out everything related.

But after about a month, I noticed a gap: **LYT manages "knowing," not "doing."**

My Atlas looked great. MOCs were growing nicely. But every morning when I opened Obsidian, I still didn't know what to work on that day. Knowledge management and execution are two different things — LYT's ACE framework has Efforts (projects and areas), but it only provides a place to categorize them. It doesn't tell you how to break down goals into daily actions.

A lot of people use bullet journaling or GTD (Getting Things Done) to track goals and tasks, but I needed a longer-cycle execution framework. I ended up layering [12 Week Year](/en/blog/ai-goal-management-system/) on top of LYT — compressing annual goals into 12-week cycles, with clear weekly deliverables and daily executable tasks. Now every morning, AI and I do a 1-on-1 standup — it reads my 12 Week Year progress, scans the week's tasks, and we discuss priorities for the day. LYT manages knowledge. 12 Week Year manages action. AI ties them together. I'll write a full post about that system separately.

But back to this article's point: **LYT is a great knowledge foundation.** It won't help you hit your goals on its own, but it will make sure none of your ideas ever disappear. Over time, the connections between them grow denser and more valuable. Whatever you want to build on top — a goal system, a writing workflow, project management — you can. The foundation is solid.

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm always happy to chat about AI, systems, and building things solo.*
