---
title: "What Is Karpathy's LLM Wiki? A Zettelkasten User's Honest Review"
description: "Karpathy's LLM Wiki pattern went viral in the AI community. As an Obsidian + LYT user, I ran his method on his own method — and found the real divide is about classification: folders, tags, wiki pages, same container problem in different skin."
pubDate: 2026-04-10
category: building-products
tags: ["karpathy", "llm", "obsidian", "knowledge management", "zettelkasten", "lyt", "ai workflow", "personal knowledge base"]
lang: en
featured: false
heroImage: /images/blog/karpathy-zettelkasten-comparison.webp
translationKey: karpathy-zettelkasten-comparison
relatedPosts: ["lyt-framework-guide.md", "ai-second-brain.md", "claude-skills-guide.md", "teaching-48yo-psychologist-claude-code.md"]
focus_keyphrase: "karpathy llm wiki"
faq:
  - question: "What's the difference between Karpathy's LLM Wiki and RAG?"
    answer: "RAG re-derives answers from raw files on every query, keeping nothing. LLM Wiki has the LLM incrementally compile raw files into a persistent markdown wiki, then maintain it over time. The difference is time — RAG starts fresh each time, wiki compounds."
  - question: "What is Model Collapse?"
    answer: "When an LLM repeatedly reads and rewrites its own output, details get smoothed out and style homogenizes over time — the average of the average of the average. Nature 2024 published a paper on this. It's the biggest technical concern HN raised about Karpathy's pattern."
  - question: "What's the core difference between Zettelkasten and Karpathy's LLM Wiki?"
    answer: "The container. Zettelkasten's atomic notes hold one concept each — links replace classification, so you never ask 'where does this go?' Karpathy's wiki pages are topic aggregations — one page holds everything about a topic, but you have to decide where the topic boundaries are. Same container problem as folders and tags, different skin."
  - question: "Should I use Karpathy's method?"
    answer: "Ask yourself: does the decision 'which page does this belong to?' bother you? If not, and you have a clear topic to maintain long-term, Karpathy's pattern is worth trying. If you're like me — escaped from folders, escaped from tags, don't want another classification system — atomic notes might suit you better."
---

This week, the AI community got flooded by a single technical note.

The author was Andrej Karpathy.

If you don't know him — he was one of OpenAI's earliest founding members, then headed AI at Tesla, and now runs Eureka Labs for AI education. In the AI world, whatever he says, people try the next day.

On April 3rd he posted on X, then published the full method as a [GitHub gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Within a week, Hacker News, X, and Substack were all discussing it.

The most-shared line:

> Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.
> — Karpathy gist

Honestly, when this went viral, I was confused.

For the past six months, the Obsidian + Claude Code / Codex combo has been one of the PKM community's biggest trends. I [switched from Roam to Obsidian](/en/blog/roam-research-to-obsidian/) late last year, running Nick Milo's [LYT framework](/en/blog/lyt-framework-guide/) with [Claude Code](/en/blog/claude-code-tutorial/) as the backend. Almost six months now. Several friends are doing similar things.

So Karpathy's post, at first glance, felt like nothing new to me.

Why did it blow up like this?

With that question, I spent half a day using his method to study his method — fed 7 sources into an ingest run, then compared the results against my own LYT system.

Two things came out of it.

First, the skeletons match. The gap is in workflow.

Second, the real divide isn't technical. It's philosophical — what does a single card actually hold?

## What did Karpathy say?

His core claim is simple: **skip RAG, build a personal knowledge base as a wiki instead**.

RAG retrieves answers from raw files at query time. Karpathy's approach: have the LLM act as a compiler, incrementally building raw files into a persistent markdown wiki, then continuously maintaining it.

The fundamental difference is time:

- **RAG**: every query = re-derive the answer (stateless, transient)
- **LLM Wiki**: compile once, maintain continuously (stateful, compounding)

"The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged."

His reasoning:

> The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored.
> — Karpathy gist

People abandon wikis because maintenance costs exceed returns. LLMs don't get tired, don't forget to update cross-references, can touch 15 files in one pass — maintenance cost drops to near zero.

The pattern's core isn't "let AI write your notes." It's "push bookkeeping to near zero so humans have energy left to think."

Side note: Karpathy ties this pattern back to Vannevar Bush's 1945 Memex vision. Bush wanted to build "an extended memory system for humans" 80 years ago, but couldn't solve one thing — who does the maintenance? Karpathy's answer:

> The part he couldn't solve was who does the maintenance. The LLM handles that.

This historical depth makes the pattern more than a 2026 fad. It's an 80-year-old vision that finally has an answer.

## Same skeleton, different growth

I opened my Obsidian knowledge management system and compared it against Karpathy's gist. The skeleton is nearly identical:

| Karpathy Pattern | My LYT |
|---|---|
| `raw/` (source documents) | `Atlas/Sources/` |
| `wiki/` (LLM-maintained knowledge pages) | `Atlas/Dots/` + `Maps/` |
| schema file (rules & config) | `CLAUDE.md` + `SKILL.md` files |
| `index.md` (catalog) | `Maps/` MOC |

Karpathy's gist is tool-agnostic — he lists Claude Code, OpenAI Codex, OpenCode, and others. I use Claude Code, so my schema file is `CLAUDE.md`.

Four layers match. But matching skeletons doesn't mean matching paths — I've been running LYT for six months with a [full AI workflow](/en/blog/ai-second-brain/) built on Claude Code. The knowledge base keeps growing, just in a completely different way than what Karpathy describes.

## What I learned from Karpathy

After the skeleton comparison, I found several things Karpathy's pattern does that my system hasn't implemented yet.

**Contradiction detection during ingest**. When a new source arrives, the LLM compares it against existing wiki pages and flags conflicts, leaving the judgment call to the human. My atomic cards don't cross-compare.

**Cross-page chain updates**. A single new source might update 10-15 wiki pages simultaneously. When I create a new card, I add links, but I don't modify existing cards' content.

**Lint**. Periodic health checks across the entire wiki — finding contradictions, orphan pages, stale content. The really powerful part: it detects concept gaps. "You've mentioned this concept in several places but don't have a dedicated page for it" — the LLM proactively suggests creating one.

All of these could technically be added to my system. But Karpathy's contribution is that **he thought these through first and wrote them up as a pattern anyone can use**.

With those lessons absorbed, one question remains that I can't get around.

## What does a single card actually hold?

LYT's answer is an **atomic concept**. One card, one idea, boundaries determined by the concept itself. The upside: filing is straightforward — new stuff comes in, open a new card. The downside: to grasp a topic's current state, you need MOCs and links to piece it together yourself.

Karpathy's answer is a **topic aggregation**. A wiki page is a topic's current best-of compilation. 10 sources might get merged into 1-2 pages by the LLM. The upside: open one page, see the full picture.

But when I ran ingest yesterday, I got stuck — **where are the topic boundaries?** How many sources should merge into one page? Which ones should stay separate? The final page count and boundaries were all ad hoc decisions, not rules.

Then I realized: I've seen this problem before. In the Evernote era, the question was "which folder does this note go in?" Early Notion, it was "which tags does this page get?" Karpathy's wiki now asks "which wiki page does this source merge into?"

All three questions have the same shape: **for every new thing that arrives, you have to decide which container it belongs to**.

The Zettelkasten's core concept — atomization — sidesteps this entirely. One card, one concept. Links replace classification. New stuff comes in: same concept gets added to the existing card, different concept gets a new card. Boundaries are determined by concepts themselves — no "which container" decision needed. The [LYT framework](/en/blog/lyt-framework-guide/) I use inherits this core, adding MOC and AI integration — not pure Zettelkasten, but the atomization spirit is the same.

Karpathy's topic aggregation is a step backward. It uses LLM capability to push compounding costs down, but doesn't solve the old "where's the container boundary" problem.

## Pushback

Container boundaries are my own observation from running the experiment. But HN raised two more angles of opposition — both attacking **human laziness**, not LLM capability.

### Model Collapse (technical)

Beyond container boundaries, Karpathy's pattern has a more fundamental technical concern. From HN:

> I don't see why this wouldn't just lead to model collapse. The compounding will just be rewriting valid information with less sense information.

The argument: LLM-written wiki pages inherently lose information — they read smoothly but details get flattened, style homogenized. Next ingest, the LLM reads old wiki + new source, essentially "rewriting its own writing." Over time this could become the average of the average of the average, with details slowly disappearing. The AI community calls this **Model Collapse** — [Nature 2024](https://www.nature.com/articles/s41586-024-07566-x) has the full proof.

HN had rebuttals, but those targeted LLM training scenarios — not exactly the same as Karpathy's inference-time ingest. Whether this pattern actually triggers Model Collapse, nobody has run it long enough to prove.

### Vibe Thinking (cognitive)

This one cuts deepest. From HN:

> Rule of thumb: if you find yourself having to come up with instead of what it helps you produce, ask yourself 'am I thinking?'

Deep writing means **coming up with** things through the process of **producing**. If you're only letting AI produce while you only come up with questions, you might not actually be thinking.

Karpathy pre-addresses this in his gist:

> The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means.

"Think about what it all means" — that's the part he reserves for humans. But HN's counter: **that's the theoretical division of labor. In practice, most people won't actually do it**.

"Vibe coding" already exists — letting AI write code you don't understand, shipping things that work but you can't explain. HN worries about vibe thinking — outsourcing organization equals outsourcing thought. The wiki looks organized, but you never internalized any of it.

### What's the real problem for me?

Both objections attack human laziness. For me personally, they're not the real issue.

I'm lazy too. But my defense is front-loaded — new material comes in, I discuss it with the LLM until I understand it, then decide whether to archive. Thinking happens in the conversation. Archiving is the result of completed thinking. Every card in my knowledge base has been verified by me — the LLM never reads its own unreviewed compound output, so the premise of Model Collapse doesn't hold. Vibe Thinking doesn't either — archiving is storing completed understanding, not outsourcing understanding.

The contradiction detection, lint, and cross-card revision from Karpathy's pattern — I'm planning to integrate all of those into my system.

The only reason I'm not switching: **the container**.

Both paths use LLMs for compounding. Bookkeeping costs are manageable on both sides. But Karpathy's wiki pages are topic aggregations — you decide where topic boundaries go, which things merge into the same page. LYT's atomic cards sidestep this — one card, one concept, no classification decision.

If you have a clear topic to maintain long-term and the "which page does this go in?" decision doesn't bother you, Karpathy's pattern is worth trying. Read his [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), pair it with Mehmet's [implementation article](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude).

If you're like me — escaped from folders, escaped from tags, don't want to walk into another classification system — atomization might suit you better.

I used his method to study his method. It didn't make me switch systems. But it clarified one thing: the divide between the two paths isn't technical. It's your tolerance for classification.

---

*Related reading:*

- *[How I Built an AI Second Brain with Claude Code + Obsidian](/en/blog/ai-second-brain/)* — The complete system: knowledge base, daily briefs, email automation, meeting notes, and goal tracking

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm open to collaboration, consulting, and new opportunities.*
