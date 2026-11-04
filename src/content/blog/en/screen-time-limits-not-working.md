---
title: "Screen Time limits not working? I built my kids' Wi-Fi rules with Claude Code"
seoTitle: "Screen Time limits not working? I manage my kids' Wi-Fi at the router"
description: "Screen Time failed on our Mac, so I used Claude Code to build a program that switches each kid's own Wi-Fi on and off and counts time by traffic."
pubDate: 2026-11-04
heroImage: /images/blog/screen-time-limits-not-working.webp
category: building-products
topics: ["ai-practice"]
tags: ["Claude Code", "vibe coding", "self-hosted AI"]
lang: en
translationKey: screen-time-limits-not-working
featured: true
relatedPosts: ["claude-code-tutorial.md", "ai-second-brain.md", "ai-meeting-notes.md"]
faq:
  - question: "Why don't Screen Time limits work?"
    answer: "One issue Apple has acknowledged is that Screen Time settings may reset unexpectedly: in July 2023, it told The Wall Street Journal it was aware that \"some users may be experiencing an issue where Screen Time settings are unexpectedly reset.\" The coverage at the time was about limits parents had set on iPhones and iPads. According to 9to5Mac, all Apple could suggest at the time was resetting devices. On our Mac, when time ran out, Screen Time failed, and Chrome would sometimes still open. When I tried to find out why, I had no data to troubleshoot with."
  - question: "Can I put parental controls on my router?"
    answer: "Yes, some routers have parental controls built in; a TP-Link Deco, for example, lets you set schedules and blocks. On the Deco in my house, the blocks often didn't stop anything, and I had no data to troubleshoot with. I ended up replacing it and giving each kid their own Wi-Fi (the router's built-in guest Wi-Fi). A small program on an always-on computer at home switches those networks on and off by each kid's daily allowance, so the rules follow the kid, whatever device they connect with."
  - question: "What kind of router do I need to control my kids' Wi-Fi?"
    answer: "In my setup, an always-on computer at home switches the kids' Wi-Fi on and off by each kid's daily allowance, so the router has to do three things. First, besides the main Wi-Fi it can run guest Wi-Fi, and each network can be switched on and off separately, so you can turn off only the kids' and leave the adults' alone. Second, its system is based on OpenWrt (an open-source router operating system) and allows SSH login (a way to log in to another computer and operate it with commands), so that computer can check traffic and switch Wi-Fi with commands. Third, it has its own schedule that turns the kids' Wi-Fi off at night and on in the morning, so if that computer crashes, the kids' Wi-Fi still comes back on by the next morning at the latest. Mine is a GL.iNet Flint 3e, and OpenWrt and SSH are the two keywords to look for when you pick a model."
  - question: "Do I need to know how to code to build a program with AI that switches my kids' Wi-Fi on and off?"
    answer: "You don't need to know how to code, but you do need an AI tool installed on your computer, like Claude Code, which is what I use; a chat AI on a web page can't reach your router. Your part is to spell out your home's setup, your rules, and what you want. Paste the request at the end of the post into it, and as its last sentence asks, the AI will first ask what's missing, then propose an architecture and steps, and check with you before each step, so you keep confirming all the way through. Two-step verification on accounts like the one you use to sign in to the AI tool is something you turn on yourself. I use Claude Code for work every day, and in my house the program itself was done in two evenings."
---

I thought my son's internet time was up. He said he'd stepped away for 30 minutes in the middle and hadn't been using it then. We each had our own version, and there was just no settling it. I didn't have a single record that lined up with either story.

## Screen Time limits not working: set them, and they still don't stick

With the off-the-shelf tools, I got stuck at every step. For a long time, most parents had to make do with tools like Apple's Screen Time or router parental controls. I set time limits in Screen Time, and set blocks on our old router (a TP-Link Deco). On the kids' devices, the Mac and the iPhone are signed in to different accounts, so I had to set up Screen Time on each one separately. The old router was a whole other system.

When time ran out, Screen Time on the Mac failed, and Chrome would sometimes still open. The blocks on the old router often didn't stop anything. When I tried to find out why, I had no data to troubleshoot with. TP-Link's own site has a support article with this exact title: [Troubleshooting Guide: Deco Parental Control Not Working as Expected](https://community.tp-link.com/en/smart-home/kb/detail/412628).

It's not just my house. For some parents, the limits they set disappear on their own. In December 2022, a parent with an iPhone posted on [Apple Community](https://discussions.apple.com/thread/254480754) that the limits would vanish "after a day or even less." That thread has since collected 7,056 "Me too" votes (as of November 3, 2026). In July 2023, Apple told The Wall Street Journal it was aware that "some users may be experiencing an issue where Screen Time settings are unexpectedly reset"; the coverage was about limits parents had set on iPhones and iPads ([Engadget](https://www.engadget.com/apple-says-its-aware-of-a-bug-that-may-affect-screen-time-restrictions-for-kids-052057086.html)). According to [9to5Mac](https://9to5mac.com/2023/07/31/screen-time-is-broken/), all Apple could suggest at the time was resetting devices.

On our Mac, the usage report built into Screen Time looked crude to me. With several apps open at the same time, it seemed to count the time for every one of them, so the total came out far higher than the time anyone was actually using the computer.

One iPhone user posted on [Apple Community](https://discussions.apple.com/thread/255762373) that on a day they'd been on their phone for no more than an hour, their own phone's report showed 13 hours.

There's no settling anything with a report like that.

When a kid finished their chores and I wanted to give a little extra time on the spot, the rules were too rigid. I had to enter the passcode in Screen Time on the Mac to change the limit, then open the old router's app to lift the block.

## Why not build one myself?

I [use Claude Code for work every day](/en/blog/ai-second-brain/), yet it never occurred to me to build a small program for my own home. I kept relying on off-the-shelf tools. Claude Code is an AI tool that writes code and also runs it.

Since vibe coding came along, parents have a second option: build it yourself.

One day I drew out the system architecture and split it into pieces. Taken apart, every piece was something I could do. I'd set the rules, and I'd be free. By free I mean I no longer have to keep track of when my son is online or when he got on, and every minute he uses is on record.

## One sentence from me, and my kids' Wi-Fi turns on or off

The whole setup uses three machines: my phone or laptop on my end, a Mac mini at home (a computer that stays on all the time), and one router the whole family shares. There's also a status page in the cloud where the kids can see how much time they have left.

I replaced the old router with a new one, a GL.iNet Flint 3e. The parents and the rest of the family use the main Wi-Fi. My son and my daughter each get their own Wi-Fi (the router's built-in guest Wi-Fi). Each has only their own password. Turning off a kid's own Wi-Fi leaves the main Wi-Fi running as usual. The old router managed by device: its schedules and blocks keyed on MAC addresses (a device's ID on the network), so once a device's address changed, the rules couldn't reach it. The new setup manages by person: the rules follow each kid's own Wi-Fi, whatever device they connect with.

The allowance is the number of minutes a kid can be online each day. It resets at midnight, and unused minutes don't carry over. Every minute a kid is actually using the Wi-Fi comes out of the allowance, and when it hits zero, their own Wi-Fi shuts off.

On my phone or laptop, I just say what I want in plain words, like "on" or "add 30 minutes for my son." Giving extra time on the spot no longer means changing two sets of settings; one sentence does it. Once I've said it, as long as there's allowance left, the kid's own Wi-Fi comes back on within a minute.

Each kid has their own status page, showing how much is left today in big type, plus a 24-hour time bar marking which stretches were in use, and the reason for each time added or taken away. When I tell Claude Code "check allowance," I can see how much time a kid has used.

<style>
.ar .ar-body .kt-map { margin: var(--space-6) 0; }
.ar .ar-body .kt-map svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-map .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-map .wide { display: none; } .ar .ar-body .kt-map .narrow { display: block; } }
.ar .ar-body .kt-map .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-map .zone { fill: none; stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-map .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-map .chip-em { fill: var(--paper); stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .chip-dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-map .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-map .ic circle { fill: var(--ink); }
.ar .ar-body .kt-map .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-map .ar-wl { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-dasharray: 7 6; }
.ar .ar-body .kt-map .ar-wl-dim { fill: none; stroke: var(--muted); stroke-width: 2; stroke-dasharray: 7 6; }
.ar .ar-body .kt-map .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-map .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-map .mk-dim { fill: var(--muted); }
.ar .ar-body .kt-map text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-map .tt, .ar .ar-body .kt-map .tc { font-weight: 700; }
.ar .ar-body .kt-map .ts, .ar .ar-body .kt-map .tls, .ar .ar-body .kt-map .zl, .ar .ar-body .kt-map .tds, .ar .ar-body .kt-map .tcs { fill: var(--muted); }
.ar .ar-body .kt-map .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-map .td, .ar .ar-body .kt-map .tcd { font-weight: 700; fill: var(--muted); }
.ar .ar-body .kt-map .wide .tt, .ar .ar-body .kt-map .wide .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .ts, .ar .ar-body .kt-map .wide .tds { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tc, .ar .ar-body .kt-map .wide .tcd { font-size: 21px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tcs { font-size: 18px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tls, .ar .ar-body .kt-map .wide .zl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tt, .ar .ar-body .kt-map .narrow .td { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .ts, .ar .ar-body .kt-map .narrow .tl, .ar .ar-body .kt-map .narrow .tds { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tc, .ar .ar-body .kt-map .narrow .tcd { font-size: 25px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tls, .ar .ar-body .kt-map .narrow .zl { font-size: 24px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .legend { margin-top: var(--space-4); font-size: var(--t-small); line-height: 1.7; }
.ar .ar-body .kt-map .legend p { margin: 0 0 var(--space-1); }
.ar .ar-body .kt-map .legend b { margin-right: var(--space-2); color: var(--terra-deep); }
.ar .ar-body .kt-map .narrow .tt { font-size: 28px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .ts, .ar .ar-body .kt-map .narrow .tl, .ar .ar-body .kt-map .narrow .tds { font-size: 23px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tls, .ar .ar-body .kt-map .narrow .zl { font-size: 22px; } /* ds-local: svg user units */
</style>
<figure class="fg kt-map"><div role="img" aria-label="One router shared by the whole family, running four Wi-Fi networks. The main Wi-Fi on 2.4 GHz and 5 GHz serves the parents&#x27; and family&#x27;s phones and computers, and the program doesn&#x27;t touch it. The guest Wi-Fi on 2.4 GHz goes to my daughter&#x27;s computer and on 5 GHz to my son&#x27;s computer, and the program switches these on and off. The Mac mini connects to the router by cable or the main Wi-Fi, and every minute it checks traffic over SSH and switches the two guest Wi-Fi networks. My phone controls the Mac mini remotely through the Claude app, and my laptop connects to it over SSH. The time left is pushed to the status page in the cloud, which the kids open over their own Wi-Fi."><svg class="wide" viewBox="0 0 1034 950" aria-hidden="true"><defs><marker id="m-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="m-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker><marker id="m-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-dim" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="250" height="420"/><text class="zl" x="26" y="40" text-anchor="start">My end</text><rect class="bx" x="30" y="60" width="210" height="140"/><g class="ic"><rect x="48" y="92" width="34" height="58" rx="6"/><line x1="60" y1="142" x2="70" y2="142"/></g><text class="tt" x="98" y="116" text-anchor="start">Phone</text><text class="ts" x="98" y="150" text-anchor="start">Claude App</text><rect class="bx" x="30" y="250" width="210" height="140"/><g class="ic"><rect x="48" y="290" width="48" height="32"/><line x1="42" y1="328" x2="102" y2="328"/></g><text class="tt" x="114" y="306" text-anchor="start">Laptop</text><text class="ts" x="114" y="340" text-anchor="start">Claude Code</text><rect class="zone-em" x="360" y="10" width="280" height="540"/><text class="zl" x="376" y="40" text-anchor="start">Mac mini at home</text><rect class="bx" x="380" y="60" width="240" height="110"/><text class="tt" x="398" y="102" text-anchor="start">Claude Code</text><text class="ts" x="398" y="136" text-anchor="start">Runs what I say</text><rect class="bx" x="380" y="230" width="240" height="100"/><text class="tt" x="398" y="270" text-anchor="start">Allowance log</text><text class="ts" x="398" y="302" text-anchor="start">Changes + reasons</text><rect class="bx" x="380" y="390" width="240" height="120"/><text class="tt" x="398" y="432" text-anchor="start">Minute timer</text><text class="ts" x="398" y="464" text-anchor="start">reads traffic</text><text class="ts" x="398" y="490" text-anchor="start">counts real use</text><rect class="bx" x="780" y="10" width="210" height="130"/><g class="ic"><path d="M924,56 a12,12 0 0,1 4,-23 a16,16 0 0,1 30,-4 a12,12 0 0,1 10,27 z"/></g><text class="tt" x="798" y="88" text-anchor="start">Status page</text><text class="ts" x="798" y="120" text-anchor="start">Cloud, kids see</text><path class="ar" d="M242,130 L376,108" marker-end="url(#m-ink)"/><text class="tl" x="262" y="86" text-anchor="start">① Remote</text><text class="tl" x="281" y="106" text-anchor="start">control</text><path class="ar" d="M242,320 L300,320 L300,150 L376,150" marker-end="url(#m-ink)"/><text class="tl" x="302" y="236" text-anchor="start">② SSH</text><path class="ar-acc" d="M500,172 L500,226" marker-end="url(#m-acc)"/><text class="tl" x="512" y="206" text-anchor="start">③ Logs it</text><path class="ar" d="M500,332 L500,386" marker-end="url(#m-ink)"/><text class="tls" x="512" y="366" text-anchor="start">read</text><path class="ar-acc" d="M622,440 L700,440 L700,75 L776,75" marker-end="url(#m-acc)"/><text class="tl" x="712" y="262" text-anchor="start">⑥ Push changes</text><rect class="bx" x="10" y="600" width="985" height="140"/><g class="ic"><rect x="150" y="642" width="60" height="22" rx="4"/><line x1="162" y1="642" x2="156" y2="622"/><line x1="198" y1="642" x2="204" y2="622"/><circle cx="196" cy="653" r="3"/></g><text class="tt" x="26" y="690" text-anchor="start">Router</text><text class="ts" x="26" y="724" text-anchor="start">Shared by all</text><rect class="chip-dim" x="240" y="632" width="175" height="88"/><text class="tcd" x="327" y="670" text-anchor="middle">Main Wi-Fi</text><text class="tcs" x="327" y="700" text-anchor="middle">2.4 GHz</text><rect class="chip-dim" x="430" y="632" width="175" height="88"/><text class="tcd" x="517" y="670" text-anchor="middle">Main Wi-Fi</text><text class="tcs" x="517" y="700" text-anchor="middle">5 GHz</text><rect class="chip-em" x="620" y="632" width="175" height="88"/><text class="tc" x="707" y="670" text-anchor="middle">Guest Wi-Fi</text><text class="tcs" x="707" y="700" text-anchor="middle">2.4 GHz</text><rect class="chip-em" x="810" y="632" width="175" height="88"/><text class="tc" x="897" y="670" text-anchor="middle">Guest Wi-Fi</text><text class="tcs" x="897" y="700" text-anchor="middle">5 GHz</text><path class="ar-acc" d="M560,512 L560,582 L802,582 L802,626" marker-start="url(#m-acc)" marker-end="url(#m-acc)"/><text class="tl" x="652" y="568" text-anchor="start">④ SSH: traffic, guest Wi-Fi on/off</text><path class="ar-wl-dim" d="M327,722 L327,786" marker-end="url(#m-dim)"/><path class="ar-wl-dim" d="M517,722 L517,786" marker-end="url(#m-dim)"/><rect class="dim" x="240" y="790" width="365" height="120"/><g class="ic"><rect x="500" y="806" width="34" height="58" rx="6"/><line x1="512" y1="856" x2="522" y2="856"/></g><g class="ic"><rect x="546" y="818" width="48" height="32"/><line x1="540" y1="856" x2="600" y2="856"/></g><text class="td" x="256" y="862" text-anchor="start">Parents, family</text><text class="tds" x="256" y="894" text-anchor="start">Devices online as usual</text><path class="ar-wl" d="M707,722 L707,786" marker-end="url(#m-ink)"/><path class="ar-wl" d="M897,722 L897,786" marker-end="url(#m-ink)"/><text class="tl" x="716" y="762" text-anchor="start">⑤</text><text class="tl" x="906" y="762" text-anchor="start">⑤</text><rect class="bx" x="620" y="790" width="175" height="120"/><g class="ic"><rect x="735" y="800" width="48" height="32"/><line x1="759" y1="832" x2="759" y2="842"/><line x1="747" y1="842" x2="771" y2="842"/></g><text class="tt" x="636" y="872" text-anchor="start">Daughter</text><text class="ts" x="636" y="900" text-anchor="start">Guest 2.4 GHz</text><rect class="bx" x="810" y="790" width="175" height="120"/><g class="ic"><rect x="925" y="800" width="48" height="32"/><line x1="949" y1="832" x2="949" y2="842"/><line x1="937" y1="842" x2="961" y2="842"/></g><text class="tt" x="826" y="872" text-anchor="start">Son</text><text class="ts" x="826" y="900" text-anchor="start">Guest 5 GHz</text><path class="ar-wl" d="M707,912 L707,936 L1008,936 L1008,75 L994,75" marker-end="url(#m-ink)"/><path class="ar-wl" d="M897,912 L897,936"/><text class="tl" x="1014" y="330" transform="rotate(90 1014 330)">⑦ Opens it over Wi-Fi</text></svg><svg class="narrow" viewBox="0 0 600 1450" aria-hidden="true"><defs><marker id="mn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="mn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker><marker id="mn-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-dim" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="580" height="210"/><text class="zl" x="28" y="44" text-anchor="start">My end</text><rect class="bx" x="28" y="64" width="260" height="136"/><g class="ic"><rect x="46" y="94" width="34" height="58" rx="6"/><line x1="58" y1="144" x2="68" y2="144"/></g><text class="tt" x="96" y="124" text-anchor="start">Phone</text><text class="ts" x="96" y="160" text-anchor="start">Claude App</text><rect class="bx" x="312" y="64" width="260" height="136"/><g class="ic"><rect x="332" y="100" width="48" height="32"/><line x1="326" y1="138" x2="386" y2="138"/></g><text class="tt" x="398" y="124" text-anchor="start">Laptop</text><text class="ts" x="398" y="160" text-anchor="start">Claude Code</text><path class="ar" d="M158,202 L158,328" marker-end="url(#mn-ink)"/><text class="tl" x="170" y="256" text-anchor="start">① Remote control</text><path class="ar" d="M442,202 L442,328" marker-end="url(#mn-ink)"/><text class="tl" x="454" y="256" text-anchor="start">② SSH</text><rect class="zone-em" x="10" y="290" width="580" height="500"/><text class="zl" x="172" y="316" text-anchor="start">Mac mini at home</text><rect class="bx" x="28" y="332" width="544" height="100"/><text class="tt" x="48" y="372" text-anchor="start">Claude Code</text><text class="ts" x="48" y="408" text-anchor="start">Runs what I say</text><path class="ar-acc" d="M300,432 L300,486" marker-end="url(#mn-acc)"/><text class="tl" x="312" y="466" text-anchor="start">③ Logs it</text><rect class="bx" x="28" y="490" width="544" height="100"/><text class="tt" x="48" y="532" text-anchor="start">Allowance log</text><text class="ts" x="48" y="566" text-anchor="start">Changes + reasons</text><path class="ar" d="M300,592 L300,640" marker-end="url(#mn-ink)"/><text class="tls" x="312" y="624" text-anchor="start">read</text><rect class="bx" x="28" y="644" width="544" height="120"/><text class="tt" x="48" y="688" text-anchor="start">Minute timer</text><text class="ts" x="48" y="724" text-anchor="start">Reads traffic, counts use</text><path class="ar-acc" d="M141,766 L141,866" marker-start="url(#mn-acc)" marker-end="url(#mn-acc)"/><text class="tl" x="155" y="816" text-anchor="start">④ SSH</text><text class="tl" x="155" y="852" text-anchor="start">traffic, guest Wi-Fi on/off</text><rect class="bx" x="10" y="870" width="262" height="410"/><g class="ic"><rect x="196" y="904" width="60" height="22" rx="4"/><line x1="208" y1="904" x2="202" y2="884"/><line x1="244" y1="904" x2="250" y2="884"/><circle cx="242" cy="915" r="3"/></g><text class="tt" x="28" y="912" text-anchor="start">Router</text><text class="ts" x="28" y="948" text-anchor="start">Shared by all</text><rect class="chip-dim" x="28" y="962" width="226" height="60"/><text class="tcd" x="141" y="1002" text-anchor="middle">Main 2.4 GHz</text><rect class="chip-dim" x="28" y="1034" width="226" height="60"/><text class="tcd" x="141" y="1074" text-anchor="middle">Main 5 GHz</text><rect class="chip-em" x="28" y="1120" width="226" height="60"/><text class="tc" x="141" y="1160" text-anchor="middle">Guest 2.4 GHz</text><rect class="chip-em" x="28" y="1204" width="226" height="60"/><text class="tc" x="141" y="1244" text-anchor="middle">Guest 5 GHz</text><path class="ar-wl-dim" d="M256,992 L326,992" marker-end="url(#mn-dim)"/><path class="ar-wl-dim" d="M256,1064 L326,1064" marker-end="url(#mn-dim)"/><rect class="dim" x="330" y="962" width="226" height="142"/><g class="ic"><rect x="448" y="972" width="34" height="58" rx="6"/><line x1="460" y1="1022" x2="470" y2="1022"/></g><g class="ic"><rect x="496" y="986" width="48" height="32"/><line x1="490" y1="1024" x2="550" y2="1024"/></g><text class="td" x="346" y="1062" text-anchor="start">Parents, family</text><text class="tds" x="346" y="1094" text-anchor="start">As usual</text><path class="ar-wl" d="M256,1150 L326,1150" marker-end="url(#mn-ink)"/><path class="ar-wl" d="M256,1234 L326,1234" marker-end="url(#mn-ink)"/><text class="tl" x="282" y="1140" text-anchor="start">⑤</text><text class="tl" x="282" y="1224" text-anchor="start">⑤</text><rect class="bx" x="330" y="1112" width="226" height="76"/><text class="tt" x="346" y="1162" text-anchor="start">Daughter</text><rect class="bx" x="330" y="1196" width="226" height="76"/><text class="tt" x="346" y="1246" text-anchor="start">Son</text><path class="ar-acc" d="M540,766 L540,915 L578,915 L578,1375 L560,1375" marker-end="url(#mn-acc)"/><text class="tl" x="530" y="905" text-anchor="end">⑥ Push changes</text><path class="ar-wl" d="M443,1274 L443,1316" marker-end="url(#mn-ink)"/><text class="tl" x="298" y="1304" text-anchor="start">⑦ Opens it</text><rect class="bx" x="10" y="1320" width="546" height="110"/><g class="ic"><path d="M480,1366 a12,12 0 0,1 4,-23 a16,16 0 0,1 30,-4 a12,12 0 0,1 10,27 z"/></g><text class="tt" x="28" y="1366" text-anchor="start">Status page</text><text class="ts" x="28" y="1404" text-anchor="start">Cloud, kids see</text></svg></div><div class="legend">
<p>Solid arrows are connections between programs, and dashed arrows are wireless Wi-Fi connections. Of the router's four Wi-Fi networks, the ones outlined in red are switched on and off by the program, and the gray dashed ones are left alone.</p>
<p><b>①</b>My phone uses Remote Control in the Claude app to connect to Claude Code on the Mac mini.</p>
<p><b>②</b>Claude Code on my laptop connects to the Mac mini over SSH (an encrypted connection that lets another computer log in and operate it with commands) and runs there. When I'm out, the laptop and the Mac mini both have Tailscale installed (a tool that lets machines on different networks reach each other), so I can still connect home.</p>
<p><b>③</b>Claude Code writes an addition or deduction to the allowance log, and the minute timer reads it the next minute.</p>
<p><b>④</b>The Mac mini is connected to the router over the main Wi-Fi or a cable. Every minute, the program checks traffic on the router over SSH, then tells it to turn that kid's guest Wi-Fi on or off. If the Mac mini isn't on this router, installing Tailscale on both still lets them reach each other.</p>
<p><b>⑤</b>The router runs four Wi-Fi networks. The main Wi-Fi on 2.4 GHz and 5 GHz is for the parents and the rest of the family, and stays on as usual. The guest Wi-Fi on 2.4 GHz is for my daughter and on 5 GHz for my son, and each has only the password to their own.</p>
<p><b>⑥</b>The program pushes the time left and the in-use stretches to the status page in the cloud, only when something changes.</p>
<p><b>⑦</b>The kids' computers go online through their own Wi-Fi and open their own page in a browser.</p>
</div><figcaption>Figure 1. What pieces make up this program, and how do they connect?</figcaption></figure>


We used to each have our own version. Now both of us look at the same record.

## Off by default, and only real use counts

Parents can't watch their kids' usage all the time, so when the school year started, we made a house rule: off by default. On weekday mornings, both kids' Wi-Fi starts out off, and their allowance is zero until I say "on." The router's own schedule still turns the kids' Wi-Fi on in the morning. If I haven't said "on" for a kid yet, the program immediately turns that kid's Wi-Fi back off. When my son finishes his homework or chores, I use the Claude app on my phone to tell Claude Code on the Mac mini, remotely, "turn on my son's." He gets that day's preset allowance, and I can still add or take away time.

The preset allowance is short on weekdays and a bit more generous on weekends. On weekend mornings, the kids' Wi-Fi turns on by itself, without waiting for me to say "on" first.

Once the Wi-Fi is on, checking whether a device is connected isn't enough. A sleeping Mac stays on the network too, and its time would get counted for nothing. So the program looks at traffic instead: a minute only counts as used if data is actually moving in that minute. The threshold is how much traffic it takes to count, currently 150 KB per minute.

The 30 minutes my son said he stepped away can now be calculated: as long as traffic in that stretch stayed under the threshold, it doesn't count as him using the Wi-Fi.

<style>
.ar .ar-body .kt-day .track { position: relative; height: var(--space-6); background: var(--paper-2); }
.ar .ar-body .kt-day .seg { position: absolute; top: 0; bottom: 0; left: calc(var(--l) * 1%); width: calc(var(--w) * 1%); background: var(--ink); }
.ar .ar-body .kt-day .seg.gap { background: var(--paper); border: 1px dashed var(--terra); }
.ar .ar-body .kt-day .off { position: absolute; top: 0; bottom: 0; left: calc(var(--l) * 1%); border-left: 2px solid var(--terra); }
.ar .ar-body .kt-day .axis { position: relative; height: var(--space-5); font-size: var(--t-small); color: var(--muted); }
.ar .ar-body .kt-day .axis span { position: absolute; left: calc(var(--l) * 1%); transform: translateX(-50%); white-space: nowrap; }
.ar .ar-body .kt-day .axis span.first { transform: none; }
.ar .ar-body .kt-day .axis span.last { transform: translateX(-100%); }
.ar .ar-body .kt-day .key { margin-top: var(--space-3); font-size: var(--t-small); }
.ar .ar-body .kt-day .key p { margin: 0 0 var(--space-1); font-size: var(--t-small); line-height: 1.6; }
.ar .ar-body .kt-day .key i { display: inline-block; width: var(--space-4); height: var(--space-3); margin-right: var(--space-2); vertical-align: middle; background: var(--ink); }
.ar .ar-body .kt-day .key i.gap { background: var(--paper); border: 1px dashed var(--terra); }
.ar .ar-body .kt-day .key i.off { position: static; border-left: 0; width: 2px; height: var(--space-4); background: var(--terra); }
</style>
<figure class="fg kt-day" role="img" aria-label="Illustration: the time bar for one weekday evening (7:00 to 9:00 PM). At 7:30 he uses the Wi-Fi for 15 minutes; traffic is over the threshold, so it counts. From 7:45 he steps away for 30 minutes; traffic stays under the threshold, so it doesn&#x27;t count. At 8:15 he comes back for another 15 minutes. At 8:30 the allowance runs out and his Wi-Fi shuts off.">
<p class="fg-h">One weekday evening's time bar (sample)</p>
<div class="track">
<span class="seg" style="--l:25;--w:12.5"></span>
<span class="seg gap" style="--l:37.5;--w:25"></span>
<span class="seg" style="--l:62.5;--w:12.5"></span>
<span class="off" style="--l:75"></span>
</div>
<div class="axis"><span class="first" style="--l:0">7 PM</span><span style="--l:25">7:30</span><span style="--l:50">8 PM</span><span style="--l:75">8:30</span><span class="last" style="--l:100">9 PM</span></div>
<div class="key">
<p><i></i>Over the threshold, counted: two 15-minute stretches</p>
<p><i class="gap"></i>Away 30 minutes: under the threshold, not counted</p>
<p><i class="off"></i>Allowance used up, his Wi-Fi turns off</p>
</div>
<p class="fg-note">Sample data, not a kid's actual usage. The real status page shows a full 24 hours.</p>
<figcaption>Figure 2. How does the time bar work out &quot;the 30 minutes he stepped away&quot;?</figcaption>
</figure>


Since we got the time bar, we haven't had another argument over how much time was actually used.

## What you need, and how much of it I did myself

If you want to build this yourself, my setup needs three things. The first two are a computer that stays on all the time and an AI tool installed on it. The third is a router that can turn just the kids' Wi-Fi on and off.

<style>
.ar .ar-body .kt-prep { margin: var(--space-6) 0; }
.ar .ar-body .kt-prep svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-prep .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-prep .wide { display: none; } .ar .ar-body .kt-prep .narrow { display: block; } }
.ar .ar-body .kt-prep .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-prep .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-prep .sep { stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-prep .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-prep .ic circle { fill: var(--ink); }
.ar .ar-body .kt-prep .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-prep .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-prep .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-prep .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-prep text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-prep .tt { font-weight: 700; }
.ar .ar-body .kt-prep .ts { fill: var(--muted); }
.ar .ar-body .kt-prep .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-prep .wide .tt { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .wide .ts { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .wide .tl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .tt { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .ts, .ar .ar-body .kt-prep .narrow .tl { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .tt { font-size: 28px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .ts, .ar .ar-body .kt-prep .narrow .tl { font-size: 23px; } /* ds-local: svg user units */
</style>
<figure class="fg kt-prep"><div role="img" aria-label="On the left, a large box for the always-on computer, set to never sleep. Mine is a Mac mini, and Windows should work too. Inside it, at the top, is the AI tool: I use Claude Code, and Codex or Grok Build should work too. Below it is the program the AI wrote, which checks traffic every minute and switches the kids&#x27; Wi-Fi. An arrow from the AI tool to the program reads &quot;writes it, then revises it.&quot; On the right, a box for the router, which needs three things: guest Wi-Fi besides the main Wi-Fi, with each one switchable on its own; an OpenWrt-based system with SSH login; and its own schedule. Mine is a GL.iNet Flint 3e. The program connects to the router over SSH."><svg class="wide" viewBox="0 0 1034 520" aria-hidden="true"><defs><marker id="p-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="p-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone-em" x="10" y="10" width="550" height="500"/><g class="ic"><rect x="476" y="34" width="56" height="20" rx="4"/><line x1="482" y1="60" x2="526" y2="60"/></g><text class="tt" x="30" y="56" text-anchor="start">Always-on computer</text><text class="ts" x="30" y="92" text-anchor="start">Never sleeps</text><text class="ts" x="30" y="122" text-anchor="start">Mine: Mac mini (Windows should work)</text><rect class="bx" x="40" y="150" width="490" height="124"/><text class="tt" x="60" y="190" text-anchor="start">AI tool</text><text class="ts" x="60" y="224" text-anchor="start">Claude Code (what I use)</text><text class="ts" x="60" y="254" text-anchor="start">Codex, Grok Build should work</text><path class="ar" d="M285,276 L285,350" marker-end="url(#p-ink)"/><text class="tl" x="300" y="320" text-anchor="start">Writes it, then revises</text><rect class="bx" x="40" y="354" width="490" height="124"/><text class="tt" x="60" y="396" text-anchor="start">Program (AI-written)</text><text class="ts" x="60" y="430" text-anchor="start">Checks traffic every minute</text><text class="ts" x="60" y="460" text-anchor="start">Switches kids' Wi-Fi</text><path class="ar-acc" d="M532,416 L676,416" marker-end="url(#p-acc)"/><text class="tl" x="604" y="402" text-anchor="middle">SSH</text><rect class="bx" x="680" y="120" width="344" height="390"/><g class="ic"><rect x="944" y="158" width="60" height="22" rx="4"/><line x1="956" y1="158" x2="950" y2="138"/><line x1="992" y1="158" x2="998" y2="138"/><circle cx="990" cy="169" r="3"/></g><text class="tt" x="700" y="166" text-anchor="start">Router</text><text class="ts" x="700" y="210" text-anchor="start">Needs:</text><text class="ts" x="700" y="248" text-anchor="start">・Guest Wi-Fi besides main Wi-Fi</text><text class="ts" x="700" y="276" text-anchor="start">　each switchable on its own</text><text class="ts" x="700" y="314" text-anchor="start">・OpenWrt-based, SSH login</text><text class="ts" x="700" y="352" text-anchor="start">・Own schedule</text><line class="sep" x1="700" y1="420" x2="1004" y2="420"/><text class="ts" x="700" y="466" text-anchor="start">Mine: GL.iNet Flint 3e</text></svg><svg class="narrow" viewBox="0 0 600 950" aria-hidden="true"><defs><marker id="pn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="pn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone-em" x="10" y="10" width="580" height="520"/><g class="ic"><rect x="506" y="30" width="56" height="20" rx="4"/><line x1="512" y1="56" x2="556" y2="56"/></g><text class="tt" x="28" y="56" text-anchor="start">Always-on computer</text><text class="ts" x="28" y="94" text-anchor="start">Never sleeps</text><text class="ts" x="28" y="128" text-anchor="start">Mine: Mac mini (Windows should work)</text><rect class="bx" x="28" y="154" width="544" height="136"/><text class="tt" x="48" y="196" text-anchor="start">AI tool</text><text class="ts" x="48" y="232" text-anchor="start">Claude Code (what I use)</text><text class="ts" x="48" y="266" text-anchor="start">Codex, Grok Build should work</text><path class="ar" d="M300,292 L300,366" marker-end="url(#pn-ink)"/><text class="tl" x="314" y="338" text-anchor="start">Writes it, then revises</text><rect class="bx" x="28" y="370" width="544" height="136"/><text class="tt" x="48" y="412" text-anchor="start">Program (AI-written)</text><text class="ts" x="48" y="448" text-anchor="start">Checks traffic every minute</text><text class="ts" x="48" y="482" text-anchor="start">Switches kids' Wi-Fi</text><path class="ar-acc" d="M300,508 L300,612" marker-end="url(#pn-acc)"/><text class="tl" x="314" y="566" text-anchor="start">SSH</text><rect class="bx" x="10" y="616" width="580" height="324"/><g class="ic"><rect x="506" y="652" width="60" height="22" rx="4"/><line x1="518" y1="652" x2="512" y2="632"/><line x1="554" y1="652" x2="560" y2="632"/><circle cx="552" cy="663" r="3"/></g><text class="tt" x="28" y="662" text-anchor="start">Router</text><text class="ts" x="28" y="704" text-anchor="start">Needs:</text><text class="ts" x="28" y="742" text-anchor="start">・Guest Wi-Fi besides main Wi-Fi</text><text class="ts" x="28" y="776" text-anchor="start">　each switchable on its own</text><text class="ts" x="28" y="814" text-anchor="start">・OpenWrt-based, SSH login</text><text class="ts" x="28" y="852" text-anchor="start">・Own schedule</text><line class="sep" x1="28" y1="878" x2="572" y2="878"/><text class="ts" x="28" y="918" text-anchor="start">Mine: GL.iNet Flint 3e</text></svg></div><figcaption>Figure 3. What do you need, and where do the AI and the program live?</figcaption></figure>


**The computer**: set it to never sleep. A Windows PC should work too (Claude Code runs on Windows), but I haven't tried it.

**The AI tool**: it has to be an AI agent installed on that computer at home, like [Claude Code](/en/blog/claude-code-tutorial/) (an AI that runs commands itself), not a chat AI on a web page like claude.ai or ChatGPT. A chat AI can write code for you, but it can't run commands on your computer at home, so it can't reach your router.

I built mine with Claude Code. From my laptop I connect to the Mac mini over SSH (a way to log in to another computer and operate it with commands), or I control it remotely from the Claude app on my phone. OpenAI's Codex and xAI's Grok Build are the same kind of tool and should be able to do this too. You can SSH into that computer to use them the same way. To control Codex from your phone, the computer at home needs the ChatGPT desktop app, and you connect to it from the ChatGPT app on your phone.

**The router**: it has to be able to do the following.

- Besides the main Wi-Fi, it can run guest Wi-Fi, and each network can be switched on and off separately, so you can turn off only the kids' and leave the adults' alone.
- Its system is based on OpenWrt (an open-source router operating system) and allows SSH login, so the computer at home can check traffic and switch Wi-Fi with commands.
- It has its own schedule that turns the kids' Wi-Fi off at night and on in the morning, so if the computer at home crashes, the kids' Wi-Fi still comes back on by the next morning at the latest.

OpenWrt and SSH are the two keywords to look for when you pick a model. If you choose one that ships with an OpenWrt-based system, you won't have to replace the router's original system yourself (flashing it).

If the computer at home is connected to this router by cable or the main Wi-Fi, it can SSH into the router directly. If it isn't on this router, the router needs to support Tailscale (a tool that lets machines on different networks reach each other), installed on both the router and that computer. Connecting home from your laptop while you're out also goes through Tailscale, so install it on the laptop and on that computer.

> **The one I use at home**: <a href="https://www.amazon.com/dp/B0FX9C5QVJ?&amp;linkCode=ll2&amp;tag=yuwenhao-20&amp;linkId=d60b9045636fffa192386031fc34ec74&amp;gaOptInStatus=true&amp;ref_=as_li_ss_tl" target="_blank" rel="sponsored nofollow noopener noreferrer">GL.iNet Flint 3e (GL-BE6500)</a>. Its system is based on OpenWrt and allows SSH login, and Tailscale is built into its admin panel.

**How much I did myself**: I bought the router on Amazon and had it shipped to Taiwan, where I live. The program itself was done in two evenings. The code, the testing, and the status page were all handed to Claude Code.

## Could this become a security hole in your home?

What attackers want is to steal your passwords and API tokens (the codes programs use to log in), and to spend your money through your accounts. Or to tamper with your home router and send you to fake websites.

I took stock of my own setup: everything that can switch the network on and off sits on one always-on computer. The key for logging in to the router (a file used in place of a password) lives on it, and what can reach that computer from outside is two accounts: the AI tool's and Tailscale's.

<style>
.ar .ar-body .kt-sec { margin: var(--space-6) 0; }
.ar .ar-body .kt-sec svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-sec .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-sec .wide { display: none; } .ar .ar-body .kt-sec .narrow { display: block; } }
.ar .ar-body .kt-sec .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-sec .chip { fill: var(--paper-2); stroke: var(--ink); stroke-width: 1.5; }
.ar .ar-body .kt-sec .zone { fill: none; stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-sec .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-sec .grp { fill: none; stroke: var(--terra); stroke-width: 1.5; stroke-dasharray: 4 5; }
.ar .ar-body .kt-sec .dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-sec .sep { stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-sec .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-sec .ic circle { fill: var(--ink); }
.ar .ar-body .kt-sec .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-sec .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-sec .ar-out { fill: none; stroke: var(--terra); stroke-width: 2.5; stroke-dasharray: 7 6; }
.ar .ar-body .kt-sec .blk { stroke: var(--terra); stroke-width: 6; }
.ar .ar-body .kt-sec .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-sec .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-sec .bd circle { fill: var(--terra); }
.ar .ar-body .kt-sec .bd text { fill: var(--paper); font-weight: 700; }
.ar .ar-body .kt-sec text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-sec .tt { font-weight: 700; }
.ar .ar-body .kt-sec .ts, .ar .ar-body .kt-sec .zl { fill: var(--muted); }
.ar .ar-body .kt-sec .td { font-weight: 700; fill: var(--muted); }
.ar .ar-body .kt-sec .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-sec .wide .tt, .ar .ar-body .kt-sec .wide .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .ts { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .tl, .ar .ar-body .kt-sec .wide .zl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .bd text { font-size: 18px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .tt { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .ts, .ar .ar-body .kt-sec .narrow .tl, .ar .ar-body .kt-sec .narrow .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .zl, .ar .ar-body .kt-sec .narrow .bd text { font-size: 24px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .legend { margin-top: var(--space-4); font-size: var(--t-small); line-height: 1.7; }
.ar .ar-body .kt-sec .legend p { margin: 0 0 var(--space-2); font-size: var(--t-small); }
.ar .ar-body .kt-sec .narrow .tt { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .ts, .ar .ar-body .kt-sec .narrow .tl, .ar .ar-body .kt-sec .narrow .td { font-size: 23px; } /* ds-local: svg user units */
</style>
<figure class="fg kt-sec"><div role="img" aria-label="One router at home. The Mac mini is on the main Wi-Fi and holds Claude Code and the key for logging in to the router. The kids&#x27; computers are on a separate network (the guest Wi-Fi). The phone reaches home through the Claude account, and the laptop through the Tailscale account. Four red circles mark what to guard: ① the door, keeping strangers out; ② the two accounts; ③ the path by which fake install pages and bad packages get onto the computer; ④ the key. The numbers match the four principles below."><svg class="wide" viewBox="0 0 1034 680" aria-hidden="true"><defs><marker id="s-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="s-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="260" height="660"/><text class="zl" x="26" y="40" text-anchor="start">Outside</text><rect class="bx" x="30" y="65" width="220" height="110"/><g class="ic"><rect x="46" y="91" width="34" height="58" rx="6"/><line x1="58" y1="141" x2="68" y2="141"/></g><text class="tt" x="96" y="112" text-anchor="start">Phone</text><text class="ts" x="96" y="150" text-anchor="start">Claude App</text><rect class="bx" x="30" y="205" width="220" height="110"/><g class="ic"><rect x="48" y="236" width="48" height="32"/><line x1="42" y1="274" x2="102" y2="274"/></g><text class="tt" x="114" y="252" text-anchor="start">Laptop</text><text class="ts" x="114" y="288" text-anchor="start">Tailscale</text><rect class="dim" x="30" y="465" width="220" height="90"/><text class="td" x="50" y="503" text-anchor="start">Strangers</text><text class="td" x="50" y="537" text-anchor="start">online</text><rect class="grp" x="288" y="50" width="288" height="278"/><rect class="bx" x="300" y="65" width="270" height="110"/><text class="tt" x="320" y="112" text-anchor="start">Claude account</text><text class="ts" x="320" y="150" text-anchor="start">Remote control path</text><rect class="bx" x="300" y="205" width="270" height="110"/><text class="tt" x="320" y="252" text-anchor="start">Tailscale account</text><text class="ts" x="320" y="288" text-anchor="start">Path back home</text><rect class="dim" x="300" y="360" width="270" height="84"/><text class="td" x="320" y="394" text-anchor="start">Fake installers,</text><text class="td" x="320" y="428" text-anchor="start">bad packages</text><path class="ar" d="M252,120 L296,120" marker-end="url(#s-ink)"/><path class="ar" d="M572,120 L662,120" marker-end="url(#s-ink)"/><text class="tl" x="613" y="108" text-anchor="middle">remote</text><path class="ar" d="M252,260 L296,260" marker-end="url(#s-ink)"/><path class="ar" d="M572,260 L662,260" marker-end="url(#s-ink)"/><text class="tl" x="613" y="248" text-anchor="middle">home</text><path class="ar-acc" d="M572,402 L662,402" marker-end="url(#s-acc)"/><path class="ar-out" d="M252,510 L638,510"/><line class="blk" x1="644" y1="486" x2="644" y2="534"/><text class="tl" x="440" y="498" text-anchor="middle">Door shut</text><rect class="zone-em" x="650" y="10" width="374" height="660"/><text class="zl" x="666" y="40" text-anchor="start">Home (one router)</text><rect class="bx" x="666" y="58" width="340" height="380"/><text class="tt" x="686" y="94" text-anchor="start">Mac mini</text><text class="ts" x="820" y="94" text-anchor="start">On main Wi-Fi</text><rect class="chip" x="686" y="108" width="300" height="150"/><text class="tt" x="706" y="165" text-anchor="start">Claude Code</text><text class="ts" x="706" y="203" text-anchor="start">Follows instructions</text><rect class="chip" x="816" y="300" width="170" height="108"/><text class="tt" x="836" y="344" text-anchor="start">Key</text><text class="ts" x="836" y="382" text-anchor="start">Router login</text><path class="ar-acc" d="M901,410 L901,466" marker-end="url(#s-acc)"/><text class="tl" x="912" y="462" text-anchor="start">SSH</text><rect class="bx" x="666" y="470" width="340" height="80"/><g class="ic"><rect x="930" y="502" width="60" height="22" rx="4"/><line x1="942" y1="502" x2="936" y2="482"/><line x1="978" y1="502" x2="984" y2="482"/><circle cx="976" cy="513" r="3"/></g><text class="tt" x="686" y="520" text-anchor="start">Router admin</text><line class="sep" x1="666" y1="568" x2="745" y2="568"/><line class="sep" x1="927" y1="568" x2="1006" y2="568"/><text class="ts" x="836" y="574" text-anchor="middle">Separate network</text><rect class="bx" x="666" y="582" width="340" height="72"/><text class="tt" x="686" y="612" text-anchor="start">Kids' computers</text><text class="ts" x="686" y="640" text-anchor="start">On guest Wi-Fi</text><g class="bd"><circle cx="612" cy="510" r="15"/><text x="612" y="516" text-anchor="middle">①</text></g><g class="bd"><circle cx="576" cy="50" r="15"/><text x="576" y="56" text-anchor="middle">②</text></g><g class="bd"><circle cx="570" cy="360" r="15"/><text x="570" y="366" text-anchor="middle">③</text></g><g class="bd"><circle cx="986" cy="300" r="15"/><text x="986" y="306" text-anchor="middle">④</text></g></svg><svg class="narrow" viewBox="0 0 600 1420" aria-hidden="true"><defs><marker id="sn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="sn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="580" height="190"/><text class="zl" x="28" y="40" text-anchor="start">Outside</text><rect class="bx" x="28" y="56" width="262" height="124"/><g class="ic"><rect x="46" y="88" width="34" height="58" rx="6"/><line x1="58" y1="138" x2="68" y2="138"/></g><text class="tt" x="96" y="112" text-anchor="start">Phone</text><text class="ts" x="96" y="152" text-anchor="start">Claude App</text><rect class="bx" x="310" y="56" width="262" height="124"/><g class="ic"><rect x="328" y="100" width="48" height="32"/><line x1="322" y1="138" x2="382" y2="138"/></g><text class="tt" x="396" y="112" text-anchor="start">Laptop</text><text class="ts" x="396" y="152" text-anchor="start">Tailscale</text><rect class="grp" x="16" y="226" width="568" height="146"/><rect class="bx" x="28" y="240" width="262" height="120"/><text class="tt" x="48" y="288" text-anchor="start">Claude account</text><text class="ts" x="48" y="330" text-anchor="start">Remote control</text><rect class="bx" x="310" y="240" width="262" height="120"/><text class="tt" x="328" y="288" text-anchor="start">Tailscale account</text><text class="ts" x="328" y="330" text-anchor="start">Way home</text><rect class="dim" x="180" y="400" width="240" height="96"/><text class="td" x="198" y="438" text-anchor="start">Fake installers,</text><text class="td" x="198" y="478" text-anchor="start">bad packages</text><rect class="zone-em" x="10" y="520" width="580" height="750"/><rect class="bx" x="28" y="560" width="544" height="330"/><text class="tt" x="340" y="814" text-anchor="start">Mac mini</text><text class="ts" x="340" y="854" text-anchor="start">On main Wi-Fi</text><rect class="chip" x="48" y="616" width="504" height="116"/><text class="tt" x="68" y="666" text-anchor="start">Claude Code</text><text class="ts" x="68" y="710" text-anchor="start">Follows instructions</text><rect class="chip" x="48" y="752" width="264" height="116"/><text class="tt" x="68" y="802" text-anchor="start">Key</text><text class="ts" x="68" y="846" text-anchor="start">Router login</text><path class="ar-acc" d="M180,870 L180,942" marker-end="url(#sn-acc)"/><text class="tl" x="196" y="916" text-anchor="start">SSH</text><rect class="bx" x="28" y="946" width="544" height="96"/><g class="ic"><rect x="488" y="980" width="60" height="22" rx="4"/><line x1="500" y1="980" x2="494" y2="960"/><line x1="536" y1="980" x2="542" y2="960"/><circle cx="534" cy="991" r="3"/></g><text class="tt" x="48" y="1006" text-anchor="start">Router admin</text><line class="sep" x1="48" y1="1080" x2="170" y2="1080"/><line class="sep" x1="430" y1="1080" x2="552" y2="1080"/><text class="ts" x="300" y="1089" text-anchor="middle">Separate network</text><rect class="bx" x="28" y="1110" width="544" height="96"/><text class="tt" x="48" y="1170" text-anchor="start">Kids' computers</text><text class="ts" x="300" y="1170" text-anchor="start">On guest Wi-Fi</text><text class="zl" x="28" y="1248" text-anchor="start">Home (one router)</text><path class="ar-out" d="M300,1328 L300,1278"/><line class="blk" x1="270" y1="1272" x2="330" y2="1272"/><text class="tl" x="372" y="1306" text-anchor="start">Door shut</text><rect class="dim" x="169" y="1330" width="262" height="80"/><text class="td" x="188" y="1382" text-anchor="start">Strangers online</text><path class="ar" d="M159,182 L159,236" marker-end="url(#sn-ink)"/><path class="ar" d="M441,182 L441,236" marker-end="url(#sn-ink)"/><path class="ar" d="M159,374 L159,612" marker-end="url(#sn-ink)"/><text class="tl" x="40" y="456" text-anchor="start">remote</text><path class="ar" d="M441,374 L441,556" marker-end="url(#sn-ink)"/><text class="tl" x="456" y="456" text-anchor="start">home</text><path class="ar-acc" d="M300,498 L300,556" marker-end="url(#sn-acc)"/><g class="bd"><circle cx="340" cy="1298" r="20"/><text x="340" y="1306" text-anchor="middle">①</text></g><g class="bd"><circle cx="584" cy="226" r="20"/><text x="584" y="234" text-anchor="middle">②</text></g><g class="bd"><circle cx="420" cy="400" r="20"/><text x="420" y="408" text-anchor="middle">③</text></g><g class="bd"><circle cx="312" cy="752" r="20"/><text x="312" y="760" text-anchor="middle">④</text></g></svg></div><div class="legend"><p>Red circles mark the places to guard. The numbers match the four principles below.</p></div><figcaption>Figure 4. What are the four places to guard in a setup like this?</figcaption></figure>


An attacker has only three ways in: knock on the door directly, take over one of your accounts, or trick you or the AI into installing something bad on the computer. Of the four principles below, the first three each guard one of those ways in, and the fourth means that even if someone does get in, they can't do much.

**1. Keep the door shut**: don't let anything outside connect in directly, and use a tool like Tailscale to reach home. Only devices you've added to your own Tailscale network can connect, and the connection is encrypted. You can reach home when you're out without opening a door to the outside.

**2. Lock down accounts and passwords**: Claude and Tailscale have no passwords of their own; you sign in with an account like Google. Turn on two-step verification for the account you sign in with, or for both if you use different ones, so any new device has to pass that check first. Lock the cloud service behind the status page too, and keep passwords and tokens out of files.

**3. Keep the computer clean**: download what you install only from official sites, including anything the AI installs, and keep the router, the computer, and the AI tool updated.

**4. Give just enough permission**: an AI follows the instructions it reads, including ones someone has hidden in a web page or a file. So let the router key only check traffic and switch Wi-Fi, and don't run the AI in a mode that skips permission prompts.

Starting in 2026, people have been buying [search ads for fake Claude Code install pages](https://www.kaspersky.co.za/about/press-releases/kaspersky-discovers-infostealers-mimicking-claude-code-openclaw-and-other-ai-developer-tools) that tell you to paste in a one-line command. Paste it and the Mac ends up with data-stealing malware. [It steals the browser's logged-in sessions](https://www.huntress.com/blog/fake-claude-macsync), and [two-step verification only checks you at the moment you log in](https://blog.google/chromium/fighting-cookie-theft-using-device/), which makes principle 3 all the more important. Some fake pages even sit on [shared conversation pages on claude.ai](https://www.huntress.com/blog/fake-claude-macsync), so even the address is real. The surest way to tell is how you got to the page: type the official address, code.claude.com, yourself, and don't click ads.

The request in the next section has these four principles written in. The AI will follow it for the router and program settings. Two-step verification on your accounts is something you turn on yourself, and the AI will remind you.

## Want to build one? Paste this request into Claude Code

You don't need my program. What you need is to spell out your home's setup, your rules, and what you want. You can paste the text below straight into an AI tool installed on your computer, like Claude Code or Codex. Replace each [ ] with your own details; where a bracket offers two choices split by a slash, keep the one that fits. Once you paste it, the AI will first ask what information is still missing, then propose an architecture and steps, and walk you through to the end. The last sentence asks it to check with you before each step. You don't need to know how to code.

```text
I want to build a small program at home to manage my kids' internet time. Please help me plan it, then build it step by step.

My home setup:
- Kids: [how many kids, and which devices each one uses]
- A computer that stays on all the time: [model, operating system]
- One router the whole family shares: [model]. It needs to run multiple Wi-Fi networks and switch any one of them on and off separately. If you're not sure whether this router's system is based on OpenWrt or whether it allows SSH login, please check that for me first.
- The computer at home is [connected to this router's main network (by cable or the main Wi-Fi) / not on this router]. If it's not on this router, we can connect them with a tool like Tailscale. Once they're connected, first confirm that the computer can reach the router's admin panel. If I'm not sure how things are connected, I can send you a photo of the back of the router.
- Network for parents and other family members: this router's main Wi-Fi

The rules I want:
- Each kid gets their own Wi-Fi, set up on the router's guest Wi-Fi, with only the password to their own. Put each kid's Wi-Fi on just one band, for example one on 2.4 GHz and one on 5 GHz. The rules follow the kid: they're tied to the kid's own Wi-Fi, not to devices. Once it's set up, help me confirm that the kids' Wi-Fi is really on the guest Wi-Fi.
- Daily allowance: [minutes on weekdays, minutes on weekends]. It resets at midnight, and unused minutes don't carry over to the next day.
- Use traffic to decide whether a kid is using the Wi-Fi: a minute only counts as used if traffic in that minute is over a threshold, so a sleeping computer doesn't get counted. Log a few days first, then suggest a threshold to me based on the actual numbers.
- When the allowance runs out, turn off that kid's Wi-Fi.
- At night, the router's own schedule forces the kids' Wi-Fi off: [what time it turns off, what time it turns back on in the morning]. The schedule covers only the kids' Wi-Fi and must never turn off the main Wi-Fi; if this router can't do that, tell me first. When I say "on," that kid is cleared for today, and I say it once a day for each kid (weekends can be set to clear automatically in the morning). In the morning, the router's schedule turns the kids' Wi-Fi on, and the program then turns off any kid who hasn't been cleared yet. That way, if the program breaks, the kids' Wi-Fi still comes back on by the next morning at the latest.

How I'll operate it:
- I want to talk to you [by remote-controlling the computer at home from my phone / sitting at that computer], and I need to be able to operate it when I'm not home.
- One sentence to add time, take away time, make today unlimited, or cut today off early. Unlimited for today means nothing is deducted until the kids' Wi-Fi turns off at night. Cutting today off early means the kid's Wi-Fi stays off for the rest of the day. Record the reason for every entry.

What the kids can see:
- One web page per kid, showing how much is left today, which stretches of the 24 hours were in use, and the reason for each time added or taken away.
- Records stay on the computer at home, and the web page is hosted in the cloud and updates only when something changes. The kids' guest Wi-Fi is usually isolated from the main network and can't reach the computer at home, so a page hosted at home wouldn't open for them.

Security principles:
- If the program fails, fail toward the network staying on. Don't turn off the kids' Wi-Fi because the program broke.
- Log in to the router with a key. Don't ask me to paste the password into the chat.
- Once everything is set up, turn off password login for SSH on the router, and limit this key to checking traffic and switching Wi-Fi.
- Don't set up port forwarding, and don't turn on the router's remote management. To connect from outside, use a tool like Tailscale.
- If we use Tailscale, help me set rules so that only the machines that need to reach each other can connect.
- List what needs updating (router firmware, Tailscale, the operating system on the computer at home, the AI tool) and remind me to update them regularly.
- Remind me to turn on two-step verification for the accounts (Google, for example) I use to sign in to the AI tool, Tailscale, and the cloud service hosting the web page; to turn on trusted devices for remote control and device approval in Tailscale; and not to use a simple password for the router's admin panel.
- Don't store the passwords and tokens the program needs in plain text in files. Use the system keychain or a password manager instead.
- If I'm running in a mode that skips confirmations, remind me to switch out of it first, and don't use it at all for this project.
- When packages need to be installed, install them only from official sources, and tell me before you install.
- Once it's built, test once from a kid's Wi-Fi to confirm it can't reach the computer at home or the router's admin panel.
- Start by only logging, without turning off the kids' Wi-Fi. Run it for a few days to confirm the numbers make sense before actually turning anything off.
- Don't touch the main Wi-Fi the parents use. Before you start actually turning things off, switch the kids' Wi-Fi a few times as a test, and use ping to confirm that devices on the main Wi-Fi don't drop.

Please first ask me what information is still missing, then propose an architecture and steps, and check with me before each step.
```

*The Amazon link in this post is an affiliate link: if you buy through it, I earn a small commission, and your price stays the same. As an Amazon Associate I earn from qualifying purchases.*
