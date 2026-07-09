---
title: "2:30 A.M., Nobody at the Keyboard: Loop Engineering From One Desk"
description: "At 2:30 a.m. a Mac mini wakes on its own and works: maintaining my system, producing drafts, checking itself, all with no instruction from me. A ground-level look at loop engineering: how one person running a business on Claude Code steps back, what the AI can take over, and where the line still holds."
pubDate: 2026-07-08
category: building-products
tags: ["AI", "loop engineering", "loopcraft", "harness", "Claude Code", "agentic coding", "solopreneur", "AI automation"]
keywords: ["loop engineering", "what is loop engineering", "loopcraft", "designing loops that prompt agents", "overnight AI automation", "AI agent loop"]
lang: en
translationKey: loop-engineering
draft: false
featured: true
heroImage: /images/blog/loop-engineering.webp
focus_keyphrase: "loop engineering"
relatedPosts: ["ai-harness.md", "multi-agent-hidden-cost.md", "claude-code-tutorial.md", "agentic-coding-guide.md"]
faq:
  - question: "What is loop engineering?"
    answer: "Instead of prompting an AI one line at a time, you design a loop that prompts the AI for you: observe, decide, act, verify, update, around and around until the work is done. The term was set off by a single line from developer Peter Steinberger in 2026 and carried into wide use by Google engineer Addy Osmani's article."
  - question: "How is loop engineering different from prompt engineering?"
    answer: "Prompt engineering is about getting that one instruction you give the AI right. Loop engineering hands the act of repeatedly prompting itself to a loop you've designed, so the person steps back to only the few points where their judgment truly has to show up."
  - question: "Do you need to be an engineer to do loop engineering?"
    answer: "No. I run all of it on Claude Code, a ready-made harness, handing off work in plain language, without writing the loop's plumbing myself. The real requirement isn't coding; it's whether you can put 'what counts as done right' into a standard that's objective and can be checked."
  - question: "What do you need to run an AI unattended overnight?"
    answer: "A machine that stays awake all night (I use a Mac mini), the operating system's scheduler (macOS's launchd) to start a command at a fixed time, and an acceptance standard the AI can check itself against, stopping to ask a person when it has to."
---

It's 2:30 in the morning. I'm asleep. Part of my work is not.

A Mac mini has just started up on its own. No screen is attached to it; it sits in a corner of the apartment, running without a glow and without a sound. For the next hour or so it moves down a list, one item at a time. It takes what I did the day before, reconstructed from the files and version history I left behind, and turns it into a record of the day, saved and backed up. It walks the length of my working system and finds the seams that have come loose: links that broke when something moved, files sitting in the wrong place, a project still marked "in progress" that has actually gone untouched for three weeks. And some of it is work I handed off the evening before, work it can carry end to end on its own. It plans, it acts, it finishes. Before the sky lightens, it leaves a few finished things on my desk, and one short list: the things it found but wouldn't touch, left for me to rule on.

Through all of it, I never gave it a single instruction.

Over the past year, more and more developers have been describing the same shift: they've stopped prompting their AI one line at a time and started designing a process that prompts the AI for them. What this piece records is what that shift looks like when it lands on one ordinary working person, and what it can, and can't yet, do.

## Loop Engineering: A Name Surfaces, Mid-2026

On June 7, 2026, the developer Peter Steinberger posted [a single line](https://x.com/steipete/status/2063697162748260627) on X that got passed around the developer world within days. Steinberger is the author of OpenClaw, the open-source AI assistant that blew up late last year, and since February 2026 he has worked at OpenAI. He wrote:

> "Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

The line was like a shutter clicking on something that had been forming for a while without a name. Within days it had one. Boris Cherny, who leads Claude Code at Anthropic, said he no longer prompts Claude; his job now is to write loops. Addy Osmani, an engineer at Google, wrote [the article that carried the term "loop engineering" into wide use](https://addyosmani.com/blog/loop-engineering/), setting down and systematizing a practice that was still taking shape. The writer swyx coined a different word for it, [Loopcraft](https://x.com/swyx/status/2065307558198567206). The name isn't settled; they all point at the same thing: handing the act of repeatedly prompting an AI to a loop you've designed.

Worth noting: none of them are talking about new technology. They're talking about a shift in how it's used. And to understand that shift, you have to look at the thing underneath it first.

## Underneath: A Thing Called a Harness

By 2026, the models are smart enough. What actually decides whether an AI is any good is the whole system wrapped around it: which tools it can reach, what it remembers, how it checks itself, how far it's allowed to go. That system has a name in developer circles: a [harness](/en/blog/ai-harness/). The same brain with a good harness, versus turned loose to run bare, gives you two different animals.

A harness has several layers, and one of them is the loop: observe, decide, act, verify, update, around and around until the work is done. Loop engineering is the practice of pulling that one layer out and designing it deliberately.

The [Claude Code](/en/blog/claude-code-tutorial/) I run all this on is already a finished harness, with those layers built in. It's one person (me) plus this thing, running an entire business. Normally I use it on a MacBook, back and forth, tethered to a screen. The real shift began when I started moving myself, step by step, out of that tethered position.

## Three Steps Back

Stepping back happened in stages.

At first, the ordinary way: I say something, it does one thing, I look and say the next thing. I call it, and I stay the whole time.

Then I learned to lay out a whole piece of work at once and hand it to a single `claude -p` command: no chat window, it just runs to the finish. Once the command is in, I can walk away. I call it, but I don't sit with it.

The last step was dropping even the calling. I handed that command to the operating system's scheduler (macOS's launchd), set to start on its own at 2:30 in the morning. No one calls it, and no one is beside it.

That last step has a physical precondition: it needs a machine that stays awake all night. A laptop with its lid shut, asleep in a bag, can't do this. So last month I bought a Mac mini that stays on, sitting at home. Only then did the "runs with no one present" part actually hold. From start to finish it's the same harness; two things changed, and only two: who presses start, and whether a person is in the room while it runs.

## A Debt There's Never Time to Settle

Of the things that machine works through at night, one kind is especially hard to fit into daylight hours.

By day, a person is mostly pushed along by whatever's in front of them. Something comes up; you set it down somewhere it'll do for now: a folder dragged over, a note left, a status slapped on, fine to work with in the moment. But "fine to work with" isn't the same as "in its right place"; settle only for the first, and you've taken on a debt inside the system. And no sooner is one thing set down than the next one pushes you forward, and the debt you just took on, there's never time to circle back and clear.

In software there's a ready-made name for this: technical debt, the cost you take on to get something running now and pay back later, with interest. A knowledge system you use to run your work and your life owes the same kind of debt; it just lives in documents, links, and statuses instead: a project that moved leaves a string of dead signposts pointing at its old address; a note cites a path to a file that was archived and hauled off long ago; a project marked "in progress" that hasn't actually moved in three weeks.

The loosening is quiet. Ignore it today and nothing happens; let it run three months and what's written in the system and what's actually happening drift quietly apart.

The debt there's no time to clear by day, that machine clears for me at night. What it reconciles against isn't only files. To see where each open item really stands, it also reads my inbox and calendar: a meeting that happened, an email that pinned something down, things a file might keep no trace of, but it can read them, see that something has moved forward, and pull the card that needs to catch up onto the morning's list.

The last time it ran overnight, it turned up eight of these places where things didn't line up, listed them one by one, and set them where I'd see them the moment I opened my eyes. It didn't rush in and start fixing. For each one it had already worked out how it would be fixed, and it just waited on a word from me: do it, or don't. The line it holds is clear: detecting and proposing are its; acting waits for me.

## The Work That Doesn't Have to Pass Through Me

That debt is it maintaining a system that already exists. And in the same overnight hours, it does another kind of work, not maintenance but production: the things I'd otherwise have to sit down and do myself, start to finish.

What can be handed off is work with clear acceptance criteria: done or not, right or wrong, visible at a glance, no back-and-forth with me about direction, nobody having to dream it up from nothing. Building a small feature to a spec I've written (the spec is right there; pass the tests and it's done); pulling together everything worth reading on a topic into a single note; realigning a document whose formatting has come apart. The reverse, anything that needs me to steer as it goes or has to be conjured out of thin air, I don't hand off. That was always mine.

Pick it, hand it over, and the rest is no longer mine. Before the sky lightens, it thinks through how to do it and runs its own plan past a standard once: didn't pass, it revises and re-checks; passed, then it acts; and even finished isn't finished until it goes back and checks once more before handing it over. Plan, self-audit, revise, execute, re-check, deliver: one whole chain with no one in the middle. In the morning I open it up, and what I find isn't a to-do list; it's a draft, a small working feature, a set of notes pulled together. It did it for me.

This is that line from the opening, in the most concrete form it takes in my life. On this kind of work I no longer stand beside it, feeding instructions one line at a time; what I do is design "how to hand off a piece of work" into a process that runs itself. And then go to sleep.

## A Line That Keeps Moving

To make this sound too clean would be dishonest, and "a machine that does my work for me" isn't right either. What it really is is a line. And where that line falls has less to do with what it's capable of than with me: whether I can put "what counts as done right" into a standard that's objective and can be checked. Say it, and the work can be pushed into the small hours. Can't say it, and it stays mine: because it takes taste, because there's no objective right or wrong, or because I haven't worked out what I want yet. What's stuck, more often than not, isn't that it isn't strong enough; it's that I haven't gotten the words clear.

At first I drew the line conservatively; the many things I couldn't yet put a standard to, I kept. But every time I get the feel of a kind of work and pin down its acceptance criteria, the line moves out a notch. What used to need my nod in the morning becomes something it finishes, checks, and hands over on its own overnight. Every move outward after that leans not on it getting stronger, but on me having marked out the right and wrong of one more kind of work.

And why do I let it act on its own overnight, without my having looked first? Because once right and wrong can be marked, even the checking doesn't have to be me. Before it wraps up each night, it wakes a separate, clean AI, one that took no part in the night's work, hands it the acceptance standard written in advance, and has it re-score the results, hunting for any place it falsely claimed "done." Fail the check and it goes back to redo it; only what genuinely needs my call is left on my desk. It's that second pair of eyes that lets me push the line outward instead of gambling it outward.

But the line doesn't get pushed all the way out. There's a stretch that, even where the standard could be written, even where it could do the work, I keep. Not because it can't; because I won't let it. It can read my inbox and my calendar, but only as far as reading: sending an email, adding someone to a meeting, committing me to anyone. Those are always mine to press.

And however far the line gets pushed, there's a core furthest in that it never reaches, a stretch that was only ever mine: the calls I make, the things I actually create. The line moving out was never about replacing me; it's about clearing me room: to make the calls, and to create.

## What Comes Back, and What Stepping Away Means

What I got back, stepping away, is mostly attention.

The debts that don't line up, the maintenance nobody wants to touch: all of it used to come out of the day's focus. There's only so long anyone can truly concentrate in a day, and time spent chasing dead links, reconciling, filing is time gone. Now those get taken stock of at night and gathered into a list, and what I spend in the morning is a few minutes of ruling on it. Some of it it reconciles against reality that same night: in every project's readme (README.md) there's a block it rewrites overnight against the folder itself (last touched when, which files changed this round, anything left stuck), so that whichever one I open, what it says matches what I actually have in hand. What comes back is a whole block of daytime attention that used to get eaten by odd jobs, and I keep it for the things only I can do: thinking through the next move for the business, getting a piece of writing right, teaching a class well.

Attention is the part I feel most, but underneath it sits something that matters more. As these debts get cleared one by one, the files stay pressed to reality, and whether it's acting on its own at night or working alongside me by day, what it reads is accurate, so it's less likely to go wrong. The closer the files sit to what's real, the more smoothly the whole system runs. What it clears overnight is more than my peace of mind; it's the ground that lets the thing be trusted to run on its own.

This is where the shift actually means something. On the surface it's a technical matter, loops, harnesses, schedulers; underneath it's a question of the division of labor: when a machine can be trusted to take over part of the judgment, where should the person step back to? Not to hands-off, and not to stepping back and then hovering; but to the few points where only your own judgment truly has to show up, and everything else to the loop.

That kind of stepping back takes design, and it takes a measure: a standard that tells the machine when to stop and ask a person. Designed well, the person steps back to just the right place, and what comes back is time and focus; designed badly, stepping away becomes losing control. Where exactly the line should fall, there's no settled answer yet; what's certain is that more and more people are starting to draw it in earnest.

From my own experience, round after round of running it, I think this direction is right: that time and that focus really did come back into my hands.

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/). I'm open to collaboration, consulting, and new opportunities.*
