---
title: "How to Use Claude Code: From Setup to Your First Task"
description: "Learn how to use Claude Code in 5 minutes. A beginner-friendly guide to setup, installation, and your first task. Then give it a CLAUDE.md so it knows who you are."
pubDate: 2026-01-28
updatedDate: 2026-10-12
category: building-products
topics: ["ai-practice"]
tags: ["how to use claude code", "claude code tutorial", "claude code setup"]
lang: en
featured: true
heroImage: /images/blog/claude-code-tutorial.webp
translationKey: claude-code-tutorial
relatedPosts: ["claude-skills-guide.md", "lyt-framework-guide.md", "ai-second-brain.md", "agentic-coding.md", "nocode-to-ai-coding.md", "ai-coding-arbitrage.md"]
focus_keyphrase: "how to use claude code"
---

You have probably heard of Claude Code without being quite sure what it is.

I'll skip the explanation for now. This is what I typed into it:

```text wrap
My computer feels slow. Take a look for me: how much memory do I have in total, which programs are using the most of it right now, and which ones are safe to close? Also check how much disk space is left and what is taking up the most.
```

It went and looked. It knew this machine is an M1 Max with 32 GB of memory. It knew Chrome was using at least 4.6 GB. It knew the disk is 995 GB with 521 GB free. It also found that Claude itself was using more than 7 GB, more than Chrome, and listed that too.

Then it answered: the machine was slow because memory was full, and because it had not been restarted in seventeen days.

Ask the same thing of an AI that is not connected to my computer and it knows nothing about this machine. All it can offer is a general checklist: close unused tabs, clear temporary files, restart.

This guide shows you how to use Claude Code: how to install it and do this on your own computer, then how to make it remember who you are. It ends with an exercise: half an hour of having it tidy up your computer.

---

## What is Claude Code

Claude Code is an AI that works inside your computer.

In its early days it only ran in the terminal, the black window engineers type commands into. Now it is part of the Claude desktop app, and it is in VS Code too. Wherever you open it, it is the same Claude Code.

Three things set it apart.

**It can see your computer.** The files on it, the software installed, what is running right now: it can look these up by itself. In the example above I never told it any specs. It found every number.

**It can act.** After it has looked, say "close those for me" and it closes them.

**A second model keeps watch.** Reading and editing files inside the folder you give it, it just does. For things like running commands or reaching the internet, another model checks the action first and blocks the risky ones.

### How it differs from regular Claude

Open Claude, on the web at claude.ai or in the desktop app, and you will see two sides: Claude and Code.

The Claude side is the one for everyday conversation. It used to be split into Chat and Cowork. They are now one.

Both sides can reach your computer, on the same condition: the Claude desktop app has to be installed on it. Claude on the web connects to your computer through that app. Click Code on the web and it asks you to install the app first.

I tried the opening question on both sides. Both could inspect this machine, and both took about five minutes. The difference is how.

| | How it looked | What it was like |
|---|---|---|
| Claude | Operated my screen, reading one screenshot after another | Asked me before touching each program, four or five times |
| Code (this is Claude Code) | Ran commands directly on my computer | Never stopped to ask. It answered when it was done |

Reading screenshots uses more of your plan than running commands. For the same job, the Claude side runs through your usage faster.

Code also found more. The Claude side told me memory was nearly full and which programs I could close. Code told me one more thing: this computer had not been restarted in seventeen days.

The rest of this guide uses Code.

The name says Code, but what it does is not limited to writing code.

---

## Set up and install Claude Code

One thing first: Claude Code needs a paid plan. A free account will not work. The Pro plan is $20 a month.

There are three ways to use Claude Code. All three give you the same Claude Code. The difference is where you talk to it from.

- **The desktop app**: download, install, switch to Code inside it. Start here if you have never used a terminal.
- **The terminal (CLI)**: open the terminal that comes with your computer, called Terminal on a Mac and PowerShell on Windows. Paste one command to install it, then type `claude` to start it.
- **Inside VS Code**: VS Code is an editor many programmers use. If you already work in it, you can open Claude Code right there.

This guide uses the desktop app.

### With the desktop app

1. Download the Claude desktop app from [claude.com/download](https://claude.com/download), install it, and sign in.
2. At the top left there are two icons. The speech bubble is regular Claude. **</>** is Code. Click **</>**.
3. Above the message box there are two buttons. On the first one, choose **Local**.
4. The second one is the folder. It starts as "No folder". You can leave it that way and start right away. To set it, click it and pick an existing folder, or create a new one from there.

<figure>
<img src="/images/blog/claude-code-tutorial-new-session-en.webp" alt="The Code side of the Claude desktop app: the two icons at the top left switch between Claude and Code, Local and No folder sit above the message box, and Auto mode is below it" loading="lazy" />
<figcaption>Click the image to enlarge.</figcaption>
</figure>

Local means it runs on this computer. If you choose the cloud option, it works on a machine in the cloud and cannot touch your computer.

I did every step in this guide without choosing a folder. One thing to know: when no folder is chosen, the files it creates go to a temporary place and disappear when the conversation is deleted. If you want it to create files you will keep, choose a folder when you start the conversation.

That is the whole installation. No terminal, nothing else to install.

Below the message box, on the left, there is a menu for the permission mode. It starts on **Auto**, and you can begin with that. If you want to see each step and approve each one yourself, switch to **Manual**.

### Other ways to install

If you already use VS Code, search for "Claude Code" in the Extensions panel and install it.

<details>
<summary>Prefer the terminal (CLI)? Open this for the commands</summary>

If you want to type `claude` in a terminal, that is a separate install. The desktop app does not do it for you.

**Mac**

1. Open Terminal, paste this line, and press Enter:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Nothing shows progress while it installs. Wait for it to finish.

2. When it is done, paste these two lines to set the path:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3. **Close Terminal and open it again**, then type `claude --version`. If you see a version number, it is installed.
4. Type `claude` and follow the prompts to sign in.

Here is the full walkthrough:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/Mv5vXylks8U" title="Claude Code Setup Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Windows**

1. Open PowerShell, paste this whole block, and run it in one go:

```powershell
irm https://claude.ai/install.ps1 | iex
$claudePath = "$env:USERPROFILE\.local\bin"
$currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($currentPath -notlike "*$claudePath*") {
  [Environment]::SetEnvironmentVariable("Path", "$currentPath;$claudePath", "User")
}
```

2. **Close PowerShell and open it again**, then type `claude --version`. If you see a version number, it is installed.
3. Type `claude` and follow the prompts to sign in.

Once installed, the terminal version updates itself in the background. No manual upgrades.

</details>

---

## Your first task: ask why your computer is slow

Paste the opening question into it:

```text wrap
My computer feels slow. Take a look for me: how much memory do I have in total, which programs are using the most of it right now, and which ones are safe to close? Also check how much disk space is left and what is taking up the most.
```

It starts running a few commands, and you can see what it is running. You do not need to understand them. These commands only look. They change nothing.

When it finishes you get a report on your machine. This was mine:

| Item | What it found |
|---|---|
| Memory | 32 GB in total, and not enough |
| Biggest users | Claude itself, more than 7 GB. Chrome, at least 4.6 GB |
| Disk | 995 GB, about 521 GB free |
| Where the space goes | My home folder, 158 GB. The largest single item in it is 39 GB |
| Its conclusion | The disk is fine. The slowness comes from full memory and seventeen days without a restart. Restarting once will help the most |

It ended with this: "I only read. I did not close or delete anything."

Now let it act. In the same conversation, paste this:

```text wrap
Following what you just suggested, close the programs that are safe to close. Show me the list before you close anything.
```

It did not act right away. It listed the programs it planned to close, then asked me: close all of them? Name any you want to keep.

I told it: keep one, close the rest.

It closed several programs I was not using and left the one I named. The result:

| | Before | After |
|---|---|---|
| Memory still available | 42% | 54% |
| Memory used by the Logitech mouse and keyboard utility | 4.3 GB | 101 MB |

It also told me, without being asked, about one thing it had not done: part of the memory still in use would only be freed by a restart.

**Say the goal, not the steps.** Both messages only said what I wanted. Neither said which commands to run or where to look. How to do it is its job.

**See the plan before it acts.** Looking is safe, so let it look freely. For anything that changes something, ask it to say what it plans to do, read that, then say yes. Auto mode does not stop at every step, so "show me the list before you close anything" is something you have to say yourself.

---

## Make it know you

For the tasks above, it made no difference whether it knew you. But keep using it this way and every new conversation starts with the same instructions again: explain things in plain language, ask me before deleting anything.

When you start a new conversation, it cannot see what was said in the last one. It does keep some notes of its own about things you corrected, but you cannot count on what it kept. Anything you want it to know for certain goes in a file.

That file is called CLAUDE.md. Claude Code reads it every time it starts work.

CLAUDE.md can live in two kinds of places. In a folder, it is read only when you start a conversation in that folder. In the global location, it is read wherever you start a conversation. Things about you as a person, like your name and your language, belong in the global one.

You do not need to create the file yourself. Paste this into Claude Code:

```text wrap
Create a global CLAUDE.md for me so that you know me in every conversation, whatever folder I am in. Keep it to the basics:

- My name. Ask me.
- The language you reply in. Ask me.
- My time zone. Look it up from this computer's settings, then confirm it with me.
- Explain things in plain language, without jargon, and keep it short.
- Before deleting anything, or doing anything that is hard to undo, tell me what you plan to do and wait for me to say yes.
- When you are not sure about something, ask me. Do not guess.
- When you have questions for me, ask one at a time.

Show me the draft first. Save it only after I say yes.
```

When I did this, it first looked up this computer's time zone, found Taipei, and came back to ask whether that was right. Then it asked one question at a time: what to call me, and which language to reply in. After those three questions it showed me the draft and noted that it had not been saved yet. Mine was in Chinese. Answered in English, it reads like this:

```text wrap
# CLAUDE.md

## About me

- Name: Wen-Hao
- Time zone: Asia/Taipei (Taipei, UTC+8)

## How to talk with me

- Reply to me in English.
- Explain things in plain language, without jargon, and keep it short.
- When you are not sure about something, ask me. Do not guess.
- When you have questions for me, ask only one at a time.

## Before you act

- Before deleting anything, or doing anything that is hard to undo, tell me what you plan to do and wait for me to say yes.
```

It saves the file only after you say yes. Once it is saved, start a new conversation and ask:

```text wrap
What is my name? What time is it where I am?
```

If it gets both right, it has read the file.

Later, to see or change the file, just say: "Show me my global CLAUDE.md."

When it does something you do not like, add a line. But do not let the file grow into an essay. The shorter and more specific it is, the more closely Claude Code follows it.

---

## Practice on your own: half an hour of tuning up your computer

This computer has been in use for a few years. The software once installed, the files once downloaded, the programs that quietly start with the machine: they are all still in there. Many people buy an app to clean this up. This time, skip the app and make Claude Code your computer's caretaker. Spend half an hour with it and get the machine to where you are happy with it.

Paste this in. What you ask after that, and how far you go, is between you and it:

```text wrap
I want to spend half an hour with you getting this computer in order. You are my computer's caretaker.

First, note where things stand now: how much memory is in use and how much disk space is free. We will compare at the end.

There are three places worth looking: what is using the disk space, large files that have not been opened in a long time, and software that has not been opened in a long time. Tell me which one you suggest starting with.

Rules:
- One thing at a time. Before you change anything, show me the list and wait for me to say yes.
- Anything to be thrown away goes to the Trash. Do not delete it outright.
- If there is something you cannot do or do not have permission to see, tell me directly.

At the end, give me a before-and-after comparison.
```

I went through this on my Mac. It found 8 files over 500 MB that had not been opened in more than a year, 8.8 GB in all. For software, it could tell when each program was last opened and how many times it had been opened in total.

When you remove software, the computer may ask for your password. That is normal.

It cannot scan for viruses, and it does not watch your computer for you. It acts when you ask.

When you are done, find a moment to restart.

---

## Next steps: bring Claude Code into your work and life

I wrote the first version of this guide early this year. Installing meant opening a terminal and pasting a command. Many people saw that black window and stopped there.

A few months later I rewrote the same guide, and installing has become downloading an app. Claude Code has moved from a tool in engineers' hands to something anyone can use.

But being able to install it and being able to put it to use are two different things. It can see the computer and it can act. What to use it for, what to do first, where the results should go: it will not decide those for anyone. Once the tool is in hand, what is missing is a method.

This article is how I use it myself: [How I Built an AI Second Brain with Claude Code + Obsidian](/en/blog/ai-second-brain/).

---

## FAQ

**Is Claude Code free? How much does it cost?**

It is not free. You need a paid Anthropic plan: Pro at $20 a month ($17 a month when billed yearly), or Max from $100 a month for higher usage. The free plan does not include Claude Code. If you are not building products with it, Pro is generally enough.

**The desktop app or the terminal version: which should I install?**

If you have never used a terminal, install the desktop app. Claude Code is already in it. The two are the same thing, and a CLAUDE.md you write is read by both. You can add the terminal version later if you want it.

**Do I need coding experience to use Claude Code?**

No. It was first built for engineers writing software. But it can reach your whole computer, so it can organize files, turn data into reports, and set up routines that run every day, and you never write a line of code yourself. I use it to run my own knowledge management and goal tracking systems, and to build software and products.

**Will Claude Code change my files on its own?**

Yes. In Auto mode, the default, it reads, creates and edits files inside the folder you chose without stopping to ask. For actions outside that folder, such as running commands or reaching websites, another model checks them first and blocks the risky ones. Permanently destroying files that were already there is one of the things blocked by default.

If you want to approve every step yourself, switch the permission mode to Manual.

In either mode, before it deletes things or changes many files at once, ask it to list what it plans to do, read the list, then say yes.

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I’m open to collaboration, consulting, and new opportunities.*
