---
title: "How I Passed the Claude Certified Architect Exam (CCAR-F): 882/1000, No Question Bank"
description: "Firsthand Claude Certified Architect exam (CCAR-F) experience: 882/1000. What it tests, how to prepare with no question bank, test day, and the eligibility gate."
pubDate: 2026-08-29
category: life-learning
tags: ["CCAR-F", "Claude Certified Architect", "Anthropic certification", "Claude certification", "Claude Code"]
lang: en
featured: true
heroImage: /images/blog/ccar-f-exam-experience-en.webp
translationKey: ccar-f-exam-experience
relatedPosts: ["anthropic-claude-certifications.md", "claude-code-tutorial.md", "ai-harness.md"]
focusKeyphrase: "claude certified architect exam"
faq:
  - question: "Is CCA-F the same certification as CCAR-F?"
    answer: "Yes. This credential was known as CCA-F, and sometimes written CCAF, when it launched in March 2026. When it moved onto Pearson VUE's catalog in July, it was assigned the formal exam code CCAR-F. The old name and the new code both refer to Claude Certified Architect - Foundations. It is not two separate credentials."
  - question: "Can individuals register for the CCAR-F exam?"
    answer: "Not currently. Registration requires membership in a Claude Partner Network organization, using that organization's email; a personal email address will not pass verification. To sit the exam today, you need access through an organization already in the Partner Network."
  - question: "Is the CCAR-F exam in English, or can I take it in another language?"
    answer: "English only. Questions, proctoring, and support all run in English, and online sessions do not allow browser translation. If English is not your first language, treat reading speed as its own prep track."
  - question: "How do you prepare for CCAR-F with no official question bank?"
    answer: "The only official material is the Exam Guide (12 sample questions plus 4 practice exercises). A workable approach: use Claude to generate practice questions weighted to the official domain breakdown, build a disciplined wrong-answer review habit, then verify your level on a third-party mock exam site."
  - question: "What's the difference between Anthropic Academy's free course certificates and CCAR-F?"
    answer: "The free courses give you a completion certificate for finishing an online course, with no proctoring. CCAR-F is a formal, Pearson VUE-proctored certification. They sit at different tiers entirely. I break down how all four proctored Claude certifications differ in a companion post."
  - question: "How many questions does CCAR-F have, how long is it, and what's the passing score?"
    answer: "60 questions in 120 minutes, a mix of single- and multiple-response items where each question states how many answers to select, scored out of 1,000 with a passing score of 720."
---

It's 11:45 a.m., third floor of a building on Guangfu Road in Hsinchu, Taiwan. I take one last look at the printed review sheet covered in decision trees, then lock it in a locker along with my phone, my watch, and everything else in my pockets. Two hours later, the screen shows a score: 882. Passing is 720.

![CCAR-F score report: passing score 720, my score 882, Pass (2026-08-24)](/images/blog/ccar-f-exam-experience-score.png)

This is CCAR-F, the Claude Certified Architect exam. I've been building products with Claude Code since June 2025, and I eventually moved my personal life and my company's daily operations onto it too. My working environment now runs mostly on the Anthropic ecosystem, and I also teach Claude Code in corporate training and public workshops. So the moment this credential launched in March, I wanted it. The actual focused prep took a bit over a month.

Only after deciding to sit for it did I find out there's no shortcut here. Anthropic publishes no official exam questions, and every practice bank on the market is written by a third party. Memorize it as hard as you want and you'll still walk into the real thing facing questions you've never seen before. After going through the whole process, I landed on the opposite conclusion: the missing shortcut is exactly what makes this credential worth taking. You can't memorize your way through it, you have to actually understand every mechanism. By the end, my grasp of Claude's architecture, and how it plays out in practice, had jumped a full level. A lot of things I thought I already understood, I only truly understood once I started writing my own practice questions and reviewing my wrong answers. This post is the full method.

---

## What CCAR-F Is: The Claude Certified Architect Exam, Explained

CCAR-F stands for Claude Certified Architect - Foundations. It's the credential Anthropic built for the architect role in its certification program: it tests whether you can make sound calls on how to architect an AI system, not whether you can write code.

It covers four core technologies: Claude Code, the Claude Agent SDK, the Claude API, and MCP. Anthropic's target candidate is a solution architect with six or more months of hands-on experience. The exam itself is 60 questions in 120 minutes (single- and multiple-response, each stating how many answers to select), scored out of 1,000 with a passing score of 720, proctored by Pearson VUE (the same proctoring company behind exams like Cisco's and Microsoft's). Pass, and you get a Credly digital badge, the platform international certifications use, so anyone can click through on LinkedIn or a resume and verify it's real. "Foundations" in the name marks the entry tier of the architect track, not that the content is basic. The questions are scenario-based, and I'll show you two real examples further down.

When this credential launched in March 2026, it didn't have an official abbreviation yet. Press and community discussion mostly called it CCA-F or CCAF, and if you searched for a "CCAF exam" page and landed here instead, that's not a mistake, it's the same credential's naming history. The formal exam code CCAR-F wasn't assigned until July, when Anthropic's program expanded to four credentials. Same exam, three names across its history.

I wrote up the full story of that naming history, and how the four credentials divide up who should take which, in [another post of mine](/en/blog/anthropic-claude-certifications/). This piece skips straight to the exam itself: what it tests, how I prepared, and what the test center actually looks like.

---

## What the Claude Certified Architect Exam Actually Tests: A Map of 5 Domains

CCAR-F's official Exam Guide splits the exam into 5 domains. The names sound like something you'd memorize off a spec sheet, but every domain is actually testing judgment. Here's the one question each domain is really asking:

**Agentic Architecture & Orchestration (27%)**: how to split up and coordinate multiple agents. A typical judgment question looks like this: an action that can never be allowed to misfire, like a refund, should that be hard-blocked in code with a hook, or guided through a prompt? Almost every answer in this domain points at the same principle: if you need certainty, don't rely on a prompt.

**Tool Design & MCP Integration (18%)**: how to design tool interfaces so an agent picks the right one. An agent keeps choosing the wrong tool between two similar options, do you fix the tool description or add a prompt reminder? The principle here: the description is the agent's primary basis for choosing a tool. A vague description can't be patched after the fact with a prompt.

**Claude Code Configuration & Workflows (20%)**: which layer a given rule or workflow belongs in. The same team convention, should it live in CLAUDE.md, in a path-conditional rule, packaged as a skill, or enforced with a hook? The axis this domain tests: when should it apply, and to whom.

**Prompt Engineering & Structured Output (20%)**: how to make output reliably consistent. Output format keeps drifting, do you write a more detailed spec, or change approach entirely? The principle: a format requirement written as prose gets interpreted a little differently every run. To lock the format down, use tool_use with a JSON schema. To make output consistent, give it few-shot examples to follow.

**Context Management & Reliability (15%)**: when a long conversation degrades, and when to hand off to a human. A customer explicitly asks for a human, should the agent try to resolve it first or escalate right away? The principle: escalation is triggered by explicit signals (the customer says so, or there's a real gap in policy), not by the agent's own sense of how complex the problem feels.

What makes all five domains hard is the same thing: symptoms look alike, but the mechanism underneath is different. "The rule wasn't followed" could mean the rule was written vaguely, or the rule was clear but nothing actually enforces it. "The agent's answers start missing things and getting unreliable" could mean context is nearly full, or the middle of the conversation got diluted (there's room left, but nothing sticks), or the data it read is simply stale. Same symptom, different mechanism, completely different answer.

So the real prep work is understanding what each mechanism actually does. Memorizing "pick X when Y happens" doesn't work: the scenario dressing changes every time, but the mechanisms underneath stay the same small set.

---

## How I Prepared Without a Question Bank

The method breaks into five parts: where the knowledge came from, how I built my own questions, how I reviewed wrong answers, when to actually book the exam, and what the questions look like.

![CCAR-F prep workflow: foundation, practice loop, three-gate check](/images/blog/ccar-f-exam-experience-flowchart-en.png)

### Where the Knowledge Came From

My base came from daily hands-on work. As I mentioned, my working environment already runs mostly on the Anthropic ecosystem. But hands-on experience has a shape to it: wherever you've gone deep, you've gone deep, and wherever you haven't touched something, it's a blank spot. In my case, I use Claude Code and MCP every day. The Agent SDK, much less.

For systematic coverage, I used [Anthropic Academy](https://anthropic.skilljar.com/)'s free courses and finished four of them before the exam: Claude Code in Action, Introduction to Model Context Protocol, Introduction to Agent Skills, and Claude with the Anthropic API. Together they cover most of what the Exam Guide asks for.

The rest of the gaps got filled by going back to the official docs, one at a time, while reviewing wrong answers. More on that method below.

### No Question Bank, So I Built My Own

CCAR-F has no official past questions to study from. The exam agreement explicitly prohibits distributing, reproducing, or publishing any exam content, even recreating it from memory. The only official prep material is the Exam Guide, downloadable from the [CCAR-F certification page](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification), no registration or purchase required. It lists the domain weights, a one-line description for every objective, 12 public sample questions with explanations, and 4 hands-on Preparation Exercises, each tagged to a domain.

There are third-party practice sites out there (I used one myself to gauge where I stood, more on that below), but this exam only launched in March 2026, so how well a third-party bank's coverage and question logic actually match the official weighting is hard to verify. The most direct way to fill gaps against the real weighting is to write your own questions.

My approach: read the Exam Guide objective by objective, use Claude to generate practice questions that follow the same logic as the official samples, review every answer, and turn all of it into a self-study system: quick concept checks by domain, plus one full 60-question mock exam. The mock matched the real thing's question count and time limit exactly (60 questions, 120 minutes), weighted by the official domain percentages, single screen, no reference material, as close to real exam conditions as I could get.

You don't need to know how to build a website to copy this. Feed the Exam Guide to Claude, ask it to generate practice questions by the domain weighting, and you get the same kind of practice. Under an NDA that bans recreating real questions, writing your own is the cleanest way to train.

The biggest payoff from this question-and-review loop was forcing out, one item at a time, the gap between what I thought the official material said and what it actually said.

### How I Reviewed Every Wrong Answer

Whether a question came from my own bank or an outside practice site, the review method was the same, four steps.

Every wrong answer goes into a fixed format: which mechanism the question tests, what I picked, why I picked it at the time, what the mechanism behind the correct answer actually is, and exactly where my understanding broke down. The important part is "why I picked it at the time." Skip writing that down, and the same instinct fires again next time.

When reviewing, I hand the wrong question to Claude, but the framing matters. Not "what's the answer," but "what mechanism is this testing, and where did my understanding break." Memorizing the answer only gets you through that one question. Understanding the mechanism transfers to the next one. The breakdown point usually has to get patched by going back to the official docs, and that's where the real gap-filling happens.

Retention gets verified with a time gap. Retest right after the same-day review and you'll almost always get it right; that's short-term memory, and it doesn't count. Reshuffle the choices and retest a few days later, still right, and that's actually sticking. Still right two or three weeks later, now you can trust it.

A clean wrong-answer log isn't really the point. What matters is whether the same category of mistake shows up again.

### Three Elimination Rules I Learned From Wrong Answers

After enough wrong-answer review, you start to see the skeleton underneath the questions. Three rules I found most valuable, all pattern-matched from official sample questions and my own practice mistakes, none of it from real exam content.

**Wrong answers have four favorite disguises: add more examples, write a more precise description, switch to a stronger model, tell it to check itself.** These four are almost always wrong. What they have in common is trying to make the AI step itself more reliable. But no matter how you tune a model, the error rate never actually hits zero, and the scenario usually spells out that it's already been tuned and it still makes mistakes. The correct answer takes a different route: accept that it will make mistakes, and add a catch after it, a test suite on the output, a validator, or routing anything suspicious to a human. Errors still happen, but every one gets caught instead of quietly flowing downstream.

**When a question says "a team member proposes X," X is almost always wrong.** If the proposal were the right answer, the question wouldn't be worth asking. See this sentence pattern and go looking for what's wrong with X first. That's usually what the question wants.

**A seemingly redundant qualifier in the scenario is there to kill options.** A line like "the context window isn't full yet" exists for exactly one reason: to kill every option aimed at a capacity problem (compression, summarization, that whole category). See a sentence that sounds unnecessary, find out who it's designed to kill, and the answer usually surfaces.

### How I Knew I Was Ready

At some point in prep, everyone hits the same decision: when do you actually book it? My bar was three gates, all cleared.

**Gate one: your own knowledge and practice questions, clean across the board.** Run through the domain-weighted practice once, and every domain comes back clean, wrong answers actually understood on the spot and retested the next day, not just glanced at and moved past.

**Gate two: an external question bank, stable above 900.** However fair you try to be with your own questions, you'll unconsciously avoid your own blind spots, so you need questions you've never seen to actually test you. I ran five full mock exams on [Claude Certification Guide](https://claudecertificationguide.com/) (CCG), reviewing every wrong answer after each one and retesting a few days later. Scores went 766, 846, 901, then 903 and 915 on the last two before the real exam. The real thing came out to 882. The mock scores tracked the real one closely, and that's the main reason I'll name it and recommend it here. I found CCG on my own; I have no affiliation with them. Its question bank is free right now, has enough volume, gives a per-domain score breakdown, and reviewing wrong answers from it is genuinely useful.

Don't expect to pass on question-bank drilling alone, though. Grind long enough and it turns into rote memorization, and a repackaged option breaks it instantly. The question bank's job is verification and gap-filling. The foundation still has to come from hands-on experience and actually understanding the mechanisms; that's what makes it stick.

**Gate three: every entry in your wrong-answer log, fully explainable.** For each recorded wrong answer, beyond just picking the right choice, you need to be able to state the correct mechanism and exactly why each wrong option is wrong. Verification is the same time-gap retest: closed-book, run through the whole wrong-answer log before booking, choices reshuffled. A lucky guess during self-testing doesn't count as knowing it. Can't explain it, write it down honestly and go fill the gap before retesting.

Clear all three gates, then book the exam. Missing one, go fill the gap first. Don't use the real exam as your mock test.

### Two Sample Questions: What the Exam Actually Looks Like

Both questions below are kept in their original English. There's no translated version on exam day, so get used to this density now.

The first is straight from the CCAR-F Exam Guide's 12 public sample questions (Question 6, verbatim):

> Your codebase has distinct areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow a repository pattern. Test files are spread throughout the codebase alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?
>
> A) Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths
> B) Consolidate all conventions in the root CLAUDE.md file under headers for each area, relying on Claude to infer which section applies
> C) Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files
> D) Place a separate CLAUDE.md file in each subdirectory containing that area's specific conventions

The correct answer is A. The scenario dressing here is "where should test files live," but the actual thing being tested is when a rule should apply automatically based on file path versus live in a config file that's always loaded.

B relies on the model guessing correctly, which isn't guaranteed. C requires manually invoking something, which contradicts the "automatically applies" requirement. D ties the rule to a folder, which breaks down for files scattered across multiple directories.

The second is from [CCG](https://claudecertificationguide.com/)'s question bank (reproduced as-is), and it's the one I got wrong both times I attempted it:

> A Claude Code agent has been working on a feature branch for 45 minutes and has accumulated extensive context about the codebase. The developer notices that several tool results from early in the session (file reads from 40 minutes ago) are now stale because a colleague pushed changes to those files. The agent is making recommendations based on the outdated file contents. What is the best recovery strategy?
>
> A) Continue in the current session and simply ask the agent to re-read the files a colleague changed, so it picks up the latest contents
> B) Start a completely new session with no context from the previous session
> C) Start a fresh session with a summary of the key findings and decisions, then read the changed files for current state
> D) Use fork_session to create a new branch that excludes the stale tool results

The correct answer is C. I picked A both times, and both times it was the same instinct: tell it to re-read the files and the agent should just pick up the update.

A isn't unusable. In practice, for small stakes, this often works fine: re-read, add a line saying "treat the new version as current," and most of the time the agent falls in line. Its problem is mechanical. Context can only be added to, never edited or deleted. Re-reading stacks the new content on top; the old file, and every judgment built on it, is still sitting in the conversation. Two versions now coexist, and the agent might cite the stale one again later.

B throws away 45 minutes of architectural understanding that's still valid. D's fork_session branches off from the current, already-contaminated state, so there's no way to keep only the clean parts. It's designed for "same starting point, try two approaches in parallel," not for cleaning out stale data.

What makes C clean: use a summary to carry forward the findings and decisions that still have value, then read the current files. The stale data gets left behind, not carried along.

This question happens to make a point on its own: the exam wants the mechanically cleanest answer, not the one that gets by in practice. In practice, A sometimes holds up fine. C is the sturdier approach start to finish. On exam day, pick C.

---

## Exam Day: Online Proctoring vs. Test Center

CCAR-F offers two official formats: online-proctored, or in person at a test center.

Online proctoring runs on Pearson VUE's [OnVUE system](https://www.pearsonvue.com/us/en/anthropic/onvue.html). Check-in includes a photo of you, a photo of your ID, and a 360-degree camera scan of your room to confirm the environment qualifies. Your desk has to be completely clear except for the exam computer, any approved accommodations, and one unlabeled drink.

You get exactly one screen; every other display has to be physically unplugged, not just turned off. No headphones, no virtual machines, no VPN, no corporate network. You take the exam alone, and you can't leave the camera's view unless the system has confirmed you're inside an approved break.

If something goes wrong mid-exam, the only channel for help is the text chat inside the exam interface. The proctor won't pause or extend your time, and won't troubleshoot your device or network.

One detail that's easy to miss: online sessions run entirely in English, from check-in through proctoring, and browser translation isn't allowed during the exam. Full rules are on the [Anthropic Partner Academy certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications).

The questions themselves are English-only either way. Choose the test center path, and you still won't get a translated exam.

I sat for mine in person, so here's what that path actually looks like.

Get your ID sorted at registration, not later. Register your name in Latin script exactly as it appears on your passport, and plan to bring that passport on exam day. If your legal documents aren't in Latin script, register with your passport spelling from the start; trying to reconcile a non-Latin legal name with an English registration at check-in is not a problem you want to be solving that morning.

At check-in, the proctor checks that passport: valid, government-issued, photo clearly recognizable, name matching your registration exactly. Get the registration right and this step is a non-event.

Bring a second form of ID too. A national ID card, driver's license, or similar government-issued ID works.

Personal items (phone, watch, wallet, any paper notes) all go in a locker, and electronics get powered off before they go in. Show up more than 15 minutes late, and the center can refuse you entry with no refund.

Given the choice between online and in person, I'd pick in person. The advantage is that all I have to focus on is answering questions. Installing exam software, setting up the room, the equipment check, talking to a remote proctor: none of that is on me, it's the test center's problem.

As for finding a center, look up test centers on the [Pearson VUE Anthropic page](https://www.pearsonvue.com/us/en/anthropic.html) when you register; that's the most accurate source for locations and available slots. If you want a specific time slot, book early.

---

## Advice for Anyone Preparing

Just two.

**First, get hands-on before you sit the exam.** This credential rewards people already using these tools, not people trying to get started with them. Anthropic's own candidate profile is explicit about it: a solution architect with six or more months of hands-on experience. If you haven't actually used these tools yet, go use them for a while first and come back. The exam tests judgment that only grows out of hands-on practice. Cramming straight for the exam, no matter how hard you study, just means memorizing someone else's conclusions.

**Second, treat scenario reading speed as its own hidden exam subject.** 60 questions, 120 minutes, a 2-minute budget per question, and every question drops you into a long scenario paragraph in English. When I started practicing, just reading one question and understanding it took me 4 to 5 minutes. At that pace, I'd have run out of time somewhere around question 30. That speed is trainable: by exam day, I finished all 60 questions with 15 minutes left to go back and check my work. If English isn't your first language, this is worth treating as its own prep track; that's exactly the position I was in. So practice in English from the start. Don't save your first real encounter with a full English scenario for exam day itself.

Beyond those two, there's one hard registration gate: this exam is currently only open to members of a Claude Partner Network organization. A personal email won't get you through registration. Right now, the only way in is through an organization already in the network.

One more thing worth knowing before you register: this credential expires. Anthropic's [certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications) puts the validity at 12 months from the date you earn it (certificates earned before June 30, 2026 were originally valid for 6 months and have been automatically extended to 12). Renewing on time is free — a non-proctored online assessment covering what has changed since you certified. Let it lapse, though, and you retake the full proctored exam at the full fee. Mine was issued on August 24, 2026 and expires on August 24, 2027.

If neither of those two things is holding you back (you've got hands-on experience, and English questions don't scare you off), and eligibility is the only thing standing between you and registering, reach out. My organization is in the network, and I'm happy to answer questions about sitting the exam through an organization. [Leave your contact here](https://ccarf-contact.pages.dev/en/), and I'll reply personally.

---

## After the Exam

I wanted this credential the moment it launched in March, finally sat for it at the end of August, and the badge is live on Credly now.

<a href="https://www.credly.com/badges/476d2a2e-42ce-41a3-81b1-474c8750c044" target="_blank" rel="noopener noreferrer" style="display: block;"><img src="/images/blog/ccar-f-exam-experience-badge.png" alt="Credly digital badge for Claude Certified Architect – Foundations" width="220" style="display: block; margin: 1.5rem auto;"></a>

The difference I actually feel is in day-to-day work. For every architecture decision, I understand the reasoning behind it more clearly now: when a rule belongs in CLAUDE.md versus when it needs a hook to enforce it, what gets handed off to an isolated subagent versus what stays in the main conversation, and whether to push through a conversation once context has gone stale or start fresh with a summary.

These used to be calls I made on instinct. Now I can name the mechanism behind them.

*If this sparked an idea, [subscribe to my newsletter](/en/). I write about AI workflows and the things I figure out along the way.*

---
