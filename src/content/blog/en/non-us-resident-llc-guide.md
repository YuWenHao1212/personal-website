---
title: "Stripe Doesn't Support Your Country? Open a $139 Wyoming LLC: 2-Year Guide"
description: "If you live in a country Stripe doesn't support, opening a US LLC is the most practical fix. This is the 2-year real-world guide — not romance, just plumbing. Cost breakdown, tax structure, and the 5-step setup that takes ~2 weeks."
pubDate: 2026-04-25
author: "Yu Wen-Hao"
category: building-products
tags: ["vibe-coding", "us-llc", "wyoming", "stripe", "claude-code", "solo-operator"]
lang: en
translationKey: vibe-coder-wyoming-llc-guide
featured: false
draft: false
heroImage: /images/blog/vibe-coder-wyoming-llc-guide.webp
focus_keyphrase: "non us resident llc"
keywords: ["non us resident llc", "non resident llc", "llc for non us residents", "llc for foreigners", "wyoming llc non-resident", "open us llc as non resident", "form 5472 non-resident", "mercury bank non resident", "stripe non us"]
relatedPosts: ["free-azure-startup-credits.md"]
faq:
  - question: "Can non-US residents really open a US LLC and use Stripe?"
    answer: "Yes. A single-member LLC owned by a non-US person is treated as a disregarded entity by the IRS. As long as you have no US trade or business presence (no US office, no US employees, no dependent agent), you owe zero US federal income tax. You can open Mercury bank online from anywhere, then connect it to Stripe. The whole process is $139 upfront, ~2 weeks, fully online."
  - question: "How much does a Wyoming LLC really cost per year?"
    answer: "One-time setup: $139 (Northwest formation $39 + Wyoming state filing fee $100). Annual maintenance: ~$309 (Wyoming Annual Report $60, Northwest Annual Report service $100, Registered Agent $125, Zadarma virtual US phone $24, Form 1120 + 5472 self-filed $0). Going full DIY can drop annual cost to ~$185."
  - question: "Will I be double-taxed by both the US and my home country?"
    answer: "Probably not. On the US side, single-member LLCs are pass-through. As a non-US tax resident with no ETBUS (Effectively Connected Business in the US), you owe no US federal income tax on LLC profits. You only file informational forms (Form 1120 + Form 5472) by April 15 — no payment, just disclosure. On the home country side, your country's tax rules apply to the income that flows through to you personally. Most countries with a US tax treaty (DTAA) prevent double taxation. Verify with a local CPA — this depends entirely on your country."
  - question: "Why Wyoming, not Delaware or California?"
    answer: "Wyoming has the lowest annual fee ($60), no state income tax, strong privacy protections, and the largest community of non-US founders using it (so resources are abundant). Delaware ($300/year) is for VC-funded startups. California ($800+/year) is the most expensive — only consider it if you have California-based business activity. Other no-income-tax states (Nevada, South Dakota, etc.) have downsides like lower brand recognition or extra reporting requirements."
  - question: "What's the fastest way to get an EIN as a non-US resident?"
    answer: "Non-US residents can't apply for EIN online — only by fax or by hiring a service. The fastest path is Fiverr ($15-50, often 24-48 hours): you fill out Form SS-4, the seller submits it and follows up with the IRS for you. DIY fax takes ~1 week. Northwest's add-on EIN service ($200) is overpriced — they only fax, don't call IRS, don't act as Third Party Designee. After receiving your EIN letter, immediately check the first two digits: if it starts with 98, the IRS classified you as a foreign entity (you'll get rejected by Stripe/Mercury) — re-file before going further."
---

Two years ago, I was a Taiwan-based developer who couldn't accept payments from anyone outside Taiwan.

Today I run a Wyoming LLC, collect USD via Stripe from customers in 30+ countries, and pay $309/year to maintain the whole setup.

Why I did this: not for "going global." Not for the American dream. Not for some imagined founder identity.

For one thing only: making Stripe work for me. Stripe doesn't support Taiwan (Google "Stripe Taiwan" — you'll find a wall of "how do I..." threads). The most practical fix is opening a US company.

## Plumbing, Not a Dream

I'm a **vibe coder** (a developer who builds products with AI tools like [Claude Code](https://claude.com/claude-code) and [Cursor](https://cursor.com/) — Andrej Karpathy coined the term in 2025). In May 2024, I was building [AI Resume Advisor](https://airesumeadvisor.com/) on [Bubble](https://bubble.io/) (a no-code platform), and I hit a wall: how do I let people from other countries pay me?

For online USD collection from Bubble, the only two real options were Stripe and PayPal. I compared:

| | Stripe (via US LLC) | PayPal (your country's personal account) |
|---|---|---|
| Fees | 2.9% + $0.30 | ~4.4% + $0.30 + 4% currency markup ≈ **8%** (rates vary by country, this is Taiwan) |
| Developer experience | API + CLI, industry-standard. Claude Code can wire it in 30 minutes | Old, full of edge cases |
| Subscriptions | Stripe Billing works out of the box | API exists but barely usable |

> Stripe deposits USD straight into your US bank account (zero conversion). To repatriate to your home currency, [Wise](https://wise.com/) charges ~0.5%. PayPal, in contrast, forces 4% currency markup on you — no opt-out.

PayPal's advantage: **you can use it today**, no LLC needed. But fees are roughly double, the subscription tooling is stuck in 2015, and the developer experience is painful.

For long-term monetization, Stripe wins.

Choosing Stripe was a rational call.

The most common form for "a US company" in this context is an **LLC — Limited Liability Company**, similar to a Ltd or GmbH in other countries.

In July 2024, I picked Wyoming — the friendliest US state for solo-owned LLCs: cheapest filing fees, strongest privacy, largest community of non-US founders.

In 2025, after [Claude Code](https://claude.com/claude-code) launched, I migrated the entire product from Bubble to a self-written codebase. But the payment layer underneath didn't change one bit — same LLC, same Stripe account, same Mercury bank account. **The pipe stayed put. What I plug into the faucet is up to me.**

Two years in, every product sale and every paid service of mine routes through the same Stripe account — USD from overseas, TWD from Taiwan, one LLC serving two markets.

So what is the US LLC, really? After two years, I have a clearer answer than I did on day one:

> A US LLC is the cost of running plumbing into your house. Stripe is the faucet.
>
> Once the pipe is in, you can sell subscriptions, consulting, courses, newsletters — all on the same system. Different products, different faucets, but one underlying pipe.
>
> That's why a vibe coder opens a US LLC: **to solve every future monetization question in advance.**

This is what I learned after stumbling through a few traps, filing two annual returns, and paying ~$309/year to keep the lights on.

---

## Before You Get Excited: Two Common Misconceptions

A lot of articles in non-English communities frame opening a US LLC as a kind of life upgrade — "go global," "become a transnational founder," "live the Silicon Valley dream." I've seen all of those.

Honestly, most of them are wrong.

### Will a US LLC Make My Product International?

For an overseas buyer to give you money, three gates must open:

1. **They find you** (marketing)
2. **The product actually solves their problem** (Product-Market Fit, or PMF — whether the market wants what you're selling)
3. **They can pay you** (payment infrastructure)

A US LLC only solves gate #3.

Gates #1 and #2 are marketing and product problems. If overseas buyers can't find you — or find you but don't want what you're selling — a US LLC contributes nothing.

### Will a US LLC Get Me a US Visa?

This misconception is the most damaging one. Owning a US LLC, getting a US work visa, and getting a green card are three completely independent systems.

| Item | What It Is | How Hard To Get |
|---|---|---|
| US LLC (Limited Liability Company) | A business entity (a payment vehicle) | Online filing, $139, ~2 weeks |
| H-1B (work visa) / O-1 (extraordinary ability visa) | Work authorization, requires an employer to sponsor you | Self-sponsoring is nearly impossible |
| EB-1A (extraordinary ability green card) / EB-2 NIW (national interest waiver) / E-2 (investor visa) | Green card or long-term residency paths | Lawyer fees $8K-$18K + 1-2 years, an entirely different game |

Opening a US LLC will not get USCIS (US Citizenship and Immigration Services) to look at you twice.

If you want a visa or green card, hire an immigration lawyer. Don't try to use an LLC as a shortcut — it's not one.

---

## Will I Be Double-Taxed by the US and My Home Country?

The most common fear: "Won't I be taxed by both countries?" or "Aren't US business taxes brutal?"

No. US federal tax: the LLC pays nothing. State tax has two flavors — "state income tax" depends on which state you registered (Wyoming has none); "sales tax" depends on what you sell and to whom. Your home country tax depends on your local rules (most solo vibe coders pay zero).

Walking through each:

### Will the US Federal Tax Take My Money?

Let's address the biggest fear first — whether Uncle Sam takes a cut. He doesn't.

A single-member LLC is **pass-through** taxed: imagine the LLC as a transparent envelope. Money comes in, flows through, lands in your personal account. The IRS (US Internal Revenue Service) doesn't tax the envelope itself — only the person holding the money. You're not a US tax resident, so US federal individual income tax doesn't apply to you either.

There's one exception, called **ETBUS** (Effectively Connected Business in the US). In short, ETBUS means "your business activity is substantively happening on US soil" — you have a US office, US employees, or a dependent agent in the US doing business on your behalf. The vast majority of solo vibe coders don't qualify, so this isn't a worry.

Each year, you must file two forms by **April 15**: **[Form 1120](https://www.irs.gov/pub/irs-pdf/f1120.pdf)** (corporate annual return) + **[Form 5472](https://www.irs.gov/pub/irs-pdf/f5472.pdf)** (Information Return of a 25% Foreign-Owned U.S. Corporation). These are **informational disclosures**, not tax payments — you're telling the IRS your LLC exists and who owns it. No money changes hands. File on time and it's free; miss the deadline and the **5472 fine starts at $25,000 with no cap, that's not a typo**.

### How Does US State Tax Work?

A common assumption: "Pick a no-income-tax state and state taxes go away." That's a misunderstanding. State tax actually splits into two completely separate categories:

- **State income tax + administrative fees** → depends on **which state you registered in**
- **Sales tax** → depends on **where your buyer lives**

Picking Wyoming only solves the first. The second has nothing to do with your registration state.

**State income tax + administrative fees** (depends on registration state)

For pass-through LLCs, **there's no state income tax to pay** (income passes through to the owner; non-US residents owe nothing). The real cost is **administrative fees**.

| State | Annual Cost | Notes |
|---|---|---|
| **Wyoming** | **$60** | **Best for vibe coders** (lowest fees, strong privacy, biggest community) |
| Delaware | $300 (flat) | Worth it only for VC fundraising (VCs love Delaware); LLCs don't benefit |
| California | $800+ (minimum, more above $250K) | Most expensive; only consider if you have California-specific business |
| Other no-income-tax states (Nevada / South Dakota / New Mexico / Florida / Texas) | $0–$550 | Each has drawbacks (low brand recognition, weaker privacy, extra reporting) — not recommended |

**Administrative fees aren't taxes** — they're a fee for "the company existing," paid whether or not you make money. Unavoidable. **Wyoming is $60/year.**

> ⚠️ **Common myth**: Some articles claim "pick Wyoming because digital products are exempt from sales tax." That's wrong. **Sales tax depends on the buyer's state and what you sell — your registration state has nothing to do with it.** Whether you register in Wyoming, Delaware, or Texas makes no difference to your sales tax obligations. The real reasons to pick Wyoming are low fees and good privacy — **not "no sales tax."**

**Sales tax** (depends on buyer's state)

Sales tax is determined by **which state your buyer is in and what you sell**. The threshold: most states use a **single-state $100K/year revenue trigger** (CA/TX/NY are higher at $500K; AL/MS at $250K). The old "200 transactions" trigger was dropped by Wyoming and many other states; the trend is converging on a single revenue threshold.

Whether you actually owe sales tax once you cross the threshold depends on what you sell:

- **Physical goods**: nearly every state taxes them
- **Digital products** (SaaS, downloads, ebooks, templates, courses): varies — most states tax some form of these, but the rules are messy
- **Services** (consulting, tutoring, 1-on-1): most states don't tax them

The good news: you don't have to research 50 state rule sets. **[Stripe Tax](https://stripe.com/tax)** (Stripe's tax automation, ~0.5% per transaction) does three things for you:

1. **Calculates at checkout** — detects buyer location → looks up state rules → adds the correct tax to the total
2. **Tracks accumulated revenue per state** — even before you cross the threshold, it logs everything and emails you a warning when you're close
3. **Collects + reports after threshold** — once you register for a sales tax permit in that state, flip a switch in Stripe Dashboard and it starts collecting

Most vibe coders won't trigger sales tax in the **PMF validation phase** — accumulating $100K in a single state is hard unless your customer base is concentrated in one small state. Wait for Stripe's email warning, then register for that state's permit (10-30 minutes online) when needed.

### Your Home Country's Tax Rules

This is the section I can't write for you.

Every country handles foreign income differently. I can only describe mine — Taiwan — as a single example:

- **Foreign income < NT$1M (~$31K USD)**: no filing, no tax
- **NT$1M–7.5M**: counts toward the Alternative Minimum Tax (AMT), but with a NT$7.5M (~$235K) exemption — usually still no tax owed
- **Above NT$7.5M**: only the excess is taxed at 20% AMT

For most solo vibe coders running a side product, even at decent revenue, the home-country tax bill is zero or trivial.

> ⚠️ **Verify with a local CPA in your country.** Don't trust a blog post for tax decisions.
>
> Tax residency rules, foreign income thresholds, US-treaty mechanics (DTAA), and AMT-equivalents vary wildly between countries. A CPA in your jurisdiction will know what applies; I won't.
>
> **The good news**: the LLC structure itself is **tax-neutral** on the home-country side. It doesn't make your local tax better or worse. You'll pay the same amount of home-country tax as you would if you'd earned the same money locally — because you're a tax resident of your home country, regardless of where the LLC is registered.

If your country has a tax treaty (DTAA) with the US — most major economies do — you avoid double taxation on the same income.

### One-Line Summary: Wyoming = $60/year

**For non-US founders, there's no "tax day" worth dreading.** You have two annual deadlines: April 15 to file federal informational returns (no payment) and the **first day of your LLC's anniversary month** to file the Wyoming Annual Report ($60 fee).

**An LLC doesn't save you tax. It also doesn't cost you tax. It's tax-neutral — not a tax loophole, not a tax trap. Stop treating it like either.**

---

## How Much Does an LLC Cost Per Year?

We've covered taxes and the state filing fee (Wyoming = $60/year). Now let's look at what else costs money to keep an LLC alive — Registered Agent, filings, a few optional small items.

> **What is a Registered Agent (RA)?** US law requires every LLC to have a "legal agent" with a physical address in the state of registration. The RA receives government documents (IRS letters, court summons) on your behalf. You can be your own RA if you have a physical address in that state, or pay a professional service (Northwest $125 / Bizee $119 / ZenBusiness $199). If you're not in the state, you must pay a service.

| Item | Cost | Necessity |
|---|---|---|
| Wyoming Annual Report fee | $60 / ~$160 | ✅ Required (DIY at wyobiz.wyo.gov in 10 min for $60 / +$100 if outsourced) |
| Registered Agent | $125 | ✅ Required (legal mandate, but paid to a private service) |
| Form 1120 + 5472 filing | $0 / ~$100 | ✅ Required (it's an informational disclosure, not a tax payment — most vibe coders pay zero tax. DIY $0 / Fiverr CPA ~$100 if you want peace of mind. I've self-filed two years; never used a CPA) |
| US virtual phone | $24/year (Zadarma annual plan) | ⚠️ Optional (Mercury / Stripe sometimes send SMS verification codes to your registered phone — having a US number is safer. I use [Zadarma](https://zadarma.com/)'s annual plan, $2/month) |

**My actual setup**: **$309/year**. Composition: $60 Wyoming fee + $100 Annual Report outsourcing + $125 RA + $24 Zadarma virtual phone + $0 self-filing.

In two years, the LLC has earned money — and I've paid **zero income tax to either the US or Taiwan**.

Why? On the US side, it's purely informational reporting (Form 1120 + 5472, telling the IRS the LLC exists, no payment owed). On the Taiwan side, my "Taiwan income + foreign income" hasn't crossed the NT$7.5M AMT exemption threshold.

(Yours might differ — see the disclaimer above.)

---

## Once the Pipe Is Connected, What Can I Do With It?

We've covered taxes and costs. Now let's look at what you actually get.

$309/year buys you one thing: **every future monetization experiment, you'll never get stuck on "no Stripe."**

- **Want to test a paid SaaS**: One weekend you build a small tool with [Claude Code](/en/blog/claude-code-tutorial/), post it on Twitter, and someone replies "I'd pay for this" — by Monday you wire up Stripe in an hour and ship a $9/month subscription link the same day
- **Want to take consulting / tutoring**: A reader DMs you "can we book a 1-hour call?" — you generate a payment link in 30 seconds (USD for overseas clients, your local currency for local ones, same Stripe account), they pay, you get an email notification, and the money's in your account before the call starts
- **Want to launch an online course**: You record 10 hours of teaching on something you're good at, drop it on [Teachable](https://teachable.com/), and next month you wake up to an email — someone in a country you've never heard of just bought your course while you were sleeping

Connect the pipe once, attach as many faucets as you want.

**The combo is especially nice for vibe coders**: Stripe has a CLI, and Claude Code can directly use it to set up webhooks (event notifications — "customer paid, ping my server"), test the integration, and call the API. The whole payment system can be wired into a new product in one hour (45 minutes of which is spent on copy and UI).

**Side note**: Opening an LLC unlocks more than Stripe — [Microsoft for Startups also gives Azure credits](/en/blog/free-azure-startup-credits/), with company status enabling up to **$5,000** in credits.

---

> 💡 **Want to start?** I used [Northwest](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-en-us-llc) in 2024 to open my Wyoming LLC, **$139 paid once** ($39 service fee including first year of Registered Agent + $100 Wyoming state formation fee), and I had the formation certificate in under 24 hours. The 5-step guide below uses this exact path.
>
> *📌 This is an affiliate link, but it doesn't change your fee. Full reasoning is in the "References" section at the end.*

---

## How to Set It Up: $139, 5 Steps, ~2 Weeks

From decision to Stripe accepting payments: $139 and roughly 2-3 weeks. The timeline mostly depends on which path you take for the **EIN** (Employer Identification Number, the US equivalent of a national tax ID for the company).

Five steps: **Form the LLC → State approves → Apply for EIN → Open bank account → Apply for Stripe**. They must run in order — each step needs the output of the previous one. **EIN is the most likely bottleneck.**

**Below is the timeline I actually went through (Northwest + Wyoming + Mercury).** Skim the chart for overall pacing; I break each of the 5 steps in detail below — if you're on mobile and the Gantt isn't readable, just scroll past to "Step 1."

<div class="llc-gantt not-prose my-10">
<style>
.llc-gantt {
--g-paper: #FAF7F2;
--g-rule: #E6DFD1;
--g-rule-strong: #D6CCB8;
--g-ink: #1F1B16;
--g-ink-2: #4A4339;
--g-muted: #8A8272;
--g-emerald: #2F7D5B;
--g-sky: #3E6FA8;
--g-amber: #B86E1C;
--g-amber-soft: #F2E3CB;
--g-amber-stripe: #E7C794;
--g-bar-h: 28px;
--g-radius: 4px;
background: var(--g-paper);
color: var(--g-ink);
padding: 32px 28px;
border-radius: 8px;
border: 1px solid var(--g-rule);
font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
line-height: 1.5;
}
.llc-gantt .g-chart {
display: grid;
grid-template-columns: 220px 1fr;
column-gap: 24px;
position: relative;
}
.llc-gantt .g-axis {
position: relative;
height: 24px;
border-bottom: 1px solid var(--g-rule-strong);
}
.llc-gantt .g-tick {
position: absolute;
top: 0;
bottom: 0;
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 11px;
color: var(--g-muted);
transform: translateX(-50%);
display: flex;
align-items: flex-end;
padding-bottom: 6px;
letter-spacing: 0.04em;
}
.llc-gantt .g-tick::after {
content: "";
position: absolute;
left: 50%;
bottom: -4px;
width: 1px;
height: 5px;
background: var(--g-rule-strong);
}
.llc-gantt .g-row-label {
padding: 14px 0;
border-top: 1px solid var(--g-rule);
display: flex;
flex-direction: column;
justify-content: center;
min-height: 58px;
}
.llc-gantt .g-idx {
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10px;
color: var(--g-muted);
letter-spacing: 0.1em;
margin-bottom: 4px;
}
.llc-gantt .g-name {
font-weight: 700;
font-size: 15px;
color: var(--g-ink);
display: flex;
align-items: center;
gap: 6px;
}
.llc-gantt .g-dur {
font-size: 12px;
color: var(--g-muted);
margin-top: 2px;
font-family: "JetBrains Mono", ui-monospace, monospace;
}
.llc-gantt .g-warn {
display: inline-flex;
align-items: center;
justify-content: center;
width: 16px;
height: 16px;
background: var(--g-amber);
color: var(--g-paper);
border-radius: 50%;
font-size: 10px;
font-weight: 700;
line-height: 1;
}
.llc-gantt .g-row-bar {
position: relative;
border-top: 1px solid var(--g-rule);
min-height: 58px;
display: flex;
align-items: center;
}
.llc-gantt .g-row-bar.g-last { border-bottom: 1px solid var(--g-rule-strong); }
.llc-gantt .g-gridlines { position: absolute; inset: 0; pointer-events: none; }
.llc-gantt .g-gridline {
position: absolute;
top: 0;
bottom: 0;
width: 1px;
background: var(--g-rule);
}
.llc-gantt .g-gridline.g-strong { background: var(--g-rule-strong); }
.llc-gantt .g-bar {
position: absolute;
height: var(--g-bar-h);
border-radius: var(--g-radius);
display: flex;
align-items: center;
top: 50%;
transform: translateY(-50%);
font-size: 11px;
font-family: "JetBrains Mono", ui-monospace, monospace;
color: var(--g-paper);
padding: 0 10px;
letter-spacing: 0.02em;
white-space: nowrap;
}
.llc-gantt .g-bar.g-emerald { background: var(--g-emerald); }
.llc-gantt .g-bar.g-sky { background: var(--g-sky); }
.llc-gantt .g-bar.g-amber-solid { background: var(--g-amber); }
.llc-gantt .g-bar.g-variance {
background-color: var(--g-amber-soft);
color: var(--g-amber);
background-image: repeating-linear-gradient(-45deg, var(--g-amber-stripe) 0 6px, transparent 6px 12px);
border: 1px solid var(--g-amber);
border-left: none;
border-top-left-radius: 0;
border-bottom-left-radius: 0;
}
.llc-gantt .g-vlabel {
background: var(--g-paper);
color: var(--g-amber);
font-weight: 500;
padding: 2px 6px;
border-radius: 3px;
border: 1px solid var(--g-amber);
font-size: 10.5px;
}
.llc-gantt .g-bottleneck {
position: absolute;
top: 4px;
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10px;
color: var(--g-amber);
letter-spacing: 0.05em;
text-transform: uppercase;
transform: translateX(-50%);
}
.llc-gantt .g-scenarios {
margin-top: 40px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 16px;
}
.llc-gantt .g-card {
background: var(--g-paper);
border: 1px solid var(--g-rule-strong);
border-radius: 6px;
padding: 20px 22px;
position: relative;
overflow: hidden;
}
.llc-gantt .g-card::before {
content: "";
position: absolute;
left: 0; top: 0; bottom: 0;
width: 4px;
}
.llc-gantt .g-card.g-fast::before { background: var(--g-emerald); }
.llc-gantt .g-card.g-typical::before { background: var(--g-sky); }
.llc-gantt .g-card .g-kicker {
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10.5px;
letter-spacing: 0.12em;
text-transform: uppercase;
color: var(--g-muted);
margin-bottom: 6px;
}
.llc-gantt .g-card .g-title {
font-family: "Inter", serif;
font-weight: 700;
font-size: 18px;
margin-bottom: 12px;
color: var(--g-ink);
}
.llc-gantt .g-card .g-big {
font-family: "Inter", serif;
font-size: 44px;
font-weight: 700;
line-height: 1;
letter-spacing: -0.02em;
}
.llc-gantt .g-card.g-fast .g-big { color: var(--g-emerald); }
.llc-gantt .g-card.g-typical .g-big { color: var(--g-sky); }
.llc-gantt .g-card .g-unit {
font-size: 20px;
font-weight: 600;
margin-left: 6px;
color: var(--g-ink-2);
}
.llc-gantt .g-card .g-desc {
margin: 10px 0 0;
font-size: 13.5px;
color: var(--g-ink-2);
}
.llc-gantt .g-card .g-desc strong { color: var(--g-ink); font-weight: 500; }
.llc-gantt .g-legend {
margin-top: 28px;
display: flex;
flex-wrap: wrap;
gap: 20px 28px;
padding-top: 18px;
border-top: 1px solid var(--g-rule);
}
.llc-gantt .g-legend-item {
display: flex;
align-items: center;
gap: 10px;
font-size: 13px;
color: var(--g-ink-2);
}
.llc-gantt .g-swatch {
width: 14px; height: 14px;
border-radius: 3px;
display: inline-block;
}
.llc-gantt .g-swatch.g-emerald { background: var(--g-emerald); }
.llc-gantt .g-swatch.g-sky { background: var(--g-sky); }
.llc-gantt .g-swatch.g-amber {
background-color: var(--g-amber-soft);
background-image: repeating-linear-gradient(-45deg, var(--g-amber-stripe) 0 4px, transparent 4px 8px);
border: 1px solid var(--g-amber);
}
.llc-gantt .g-footnote {
margin-top: 14px;
font-size: 11.5px;
color: var(--g-muted);
font-family: "JetBrains Mono", ui-monospace, monospace;
}
@media (max-width: 720px) {
.llc-gantt { padding: 20px 16px; }
.llc-gantt .g-chart { grid-template-columns: 1fr; column-gap: 0; }
.llc-gantt .g-axis-spacer { display: none; }
.llc-gantt .g-axis { grid-column: 1 / -1; }
.llc-gantt .g-row-label {
padding: 14px 0 6px;
min-height: auto;
}
.llc-gantt .g-row-bar {
border-top: none;
min-height: 64px;
padding-bottom: 14px;
}
.llc-gantt .g-scenarios { grid-template-columns: 1fr; }
.llc-gantt .g-card .g-big { font-size: 36px; }
}
</style>

<section class="g-chart">
<div class="g-axis-spacer"></div>
<div class="g-axis">
<span class="g-tick" style="left: 0%;">Day 0</span>
<span class="g-tick" style="left: 33.333%;">Day 7</span>
<span class="g-tick" style="left: 66.666%;">Day 14</span>
<span class="g-tick" style="left: 100%;">Day 21</span>
</div>

<div class="g-row-label">
<span class="g-idx">01</span>
<span class="g-name">Northwest form filling</span>
<span class="g-dur">30 min · Day 0</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-emerald" style="left: 0%; width: 3%; padding: 0 6px;">30m</div>
</div>

<div class="g-row-label">
<span class="g-idx">02</span>
<span class="g-name">State approval</span>
<span class="g-dur">24 hours (auto) · Day 1</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 0%; width: 4.76%;">24h</div>
</div>

<div class="g-row-label">
<span class="g-idx">03</span>
<span class="g-name">Apply for EIN <span class="g-warn">!</span></span>
<span class="g-dur">1 day – 2 weeks · Day 1–14</span>
</div>
<div class="g-row-bar" style="min-height: 72px;">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<span class="g-bottleneck" style="left: 33.333%;">bottleneck · high variance</span>
<div class="g-bar g-amber-solid" style="left: 4.76%; width: 4.76%; padding: 0 8px;">fast 1d</div>
<div class="g-bar g-variance" style="left: 9.52%; width: 57.14%;">
<span class="g-vlabel">variance · up to 2 weeks</span>
</div>
</div>

<div class="g-row-label">
<span class="g-idx">04</span>
<span class="g-name">Mercury bank application</span>
<span class="g-dur">3–5 days · Day 8–13</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 38.095%; width: 23.81%;">3–5 days</div>
</div>

<div class="g-row-label">
<span class="g-idx">05</span>
<span class="g-name">Stripe application</span>
<span class="g-dur">1–3 days · Day 14–16</span>
</div>
<div class="g-row-bar g-last">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 66.666%; width: 9.52%;">1–3 days</div>
</div>
</section>

<section class="g-scenarios">
<article class="g-card g-fast">
<div class="g-kicker">SCENARIO A · FASTEST</div>
<div class="g-title">Fastest</div>
<div class="g-big">~10<span class="g-unit">days</span></div>
<p class="g-desc"><strong>EIN via Fiverr, smooth path</strong>, no service hiccups, no flagged details.</p>
</article>
<article class="g-card g-typical">
<div class="g-kicker">SCENARIO B · TYPICAL</div>
<div class="g-title">Typical</div>
<div class="g-big">~16<span class="g-unit">days</span></div>
<p class="g-desc"><strong>DIY fax SS-4</strong>, IRS responds in 1–2 weeks, other steps proceed normally.</p>
</article>
</section>

<section class="g-legend">
<div class="g-legend-item"><span class="g-swatch g-emerald"></span>Active step</div>
<div class="g-legend-item"><span class="g-swatch g-sky"></span>Passive wait</div>
<div class="g-legend-item"><span class="g-swatch g-amber"></span>Bottleneck (high variance)</div>
</section>

<p class="g-footnote">* Estimates based on typical conditions; actual timing depends on each agency's processing speed.</p>
</div>

### Why I Use Northwest

I used Northwest to file the formation and remit Wyoming's $100 state fee. Year 1 is $39 and includes the Registered Agent (receives IRS letters and forwards them to my email); year 2+ the RA is $125/year.

When I formed the AI Resume Advisor LLC in 2024, I'd read a few English reviews recommending Northwest and just placed the order — never compared others. Two years in: card-to-Articles in under 24 hours, no upsell ambushes, $125 RA renewal with no surprises.

This isn't a "compared 10 services" recommendation. It's a "used it for 2 years and nothing exploded" recommendation. If you want to compare Bizee / ZenBusiness / Stripe Atlas, do your own research. If you want to follow my exact path, use Northwest.

### Step 1: Northwest Form Filling ($39 / 30 min)

Go to the [Northwest website](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-en-us-llc) and pick the "Wyoming LLC formation" $39 plan — includes the first year of Registered Agent.

Fill in the company name (your future product brand), your home address (yes, your non-US one is fine), and pay $39 by card. Northwest will automatically add Wyoming's **one-time state formation fee of $100** (not the same as the recurring $60 Annual Report fee — that's an annual maintenance cost; this is a one-time setup cost), totaling **$139 paid once**.

Total time: about 30 minutes.

### Step 2: Wyoming State Approval (Usually Within 24 Hours)

I filled out the form in the evening (Taiwan time) and woke up the next morning to an email — formation certificate attached. From that moment, you officially have a US company.

Save this PDF. You'll need it for opening Mercury and applying for an EIN.

### Step 3: Apply for EIN (1 Day to 2 Weeks)

The EIN is your US company's tax ID (similar to a VAT number or business registration number in other countries). **Non-US residents can't apply online** — only by fax or via a service.

I formed the LLC through Northwest (Step 1) but didn't add EIN service — I'll explain why below.

**Three options (in order of recommendation):**

- **DIY fax [Form SS-4](https://www.irs.gov/pub/irs-pdf/fss4.pdf)** ($0 / ~1 week): SS-4 is the EIN application. Fill it out in 30 minutes, fax it to the IRS foreign-applicant line. **Cheapest, but unfriendly to non-English speakers** — English form, international fax, and any back-and-forth means an English phone call to the IRS
- **[Fiverr service](https://www.fiverr.com/search/gigs?query=EIN)** ($15-50 / 24-48 hours): you fill the SS-4, the seller submits and follows up with the IRS for you. **My recommended path** — $15-50 buys you "no English phone call to the IRS"
- **Northwest's EIN add-on** ($200 / ~1 week): I emailed Northwest to ask, and their answer was that they only **fax the application — they don't call the IRS, and they don't act as Third Party Designee** (an IRS-recognized intake party who can take calls and reply on your behalf). Same timing as DIY but $200 more — **not recommended**

**Whichever option you pick, you'll fill out an SS-4. ~30 fields, 90% are obvious, but two need attention for an LLC:**

- **Line 8a-8c** (LLC-specific): 8a check Yes; 8b enter member count (1 if single-owner); 8c check "Organized in the United States" Yes + state of formation (this guide uses Wyoming, so write "Wyoming")
- **Line 9a** (entity type): check **Other**, write "**Disregarded entity**" (single-member LLC) or "**Partnership**" (multi-member)
- **Line 9b: don't fill it** (that field is for Corporations only)

> ⚠️ **Hard-earned warning: When your EIN letter arrives, immediately check the first two digits.**
>
> - **98 prefix** ❌ The IRS classified you as a **foreign entity** — meaning your SS-4 was filed wrong (typically Line 8c didn't get checked as "Organized in the United States")
> - **Not 98** (30, 35, 61, etc. are all fine) ✅ The IRS sees you as a domestic US entity
>
> Why is 98 a landmine? Stripe / Mercury, when reviewing your account application, may reject you outright if they see a 98 prefix (they'll treat you as a foreign company, not a US one). Catching this immediately and refiling is the cheapest fix; if you let Stripe reject you first, you'll have to redo the whole flow.

### Step 4: Open Mercury (Online ~15 min + 3-5 days review)

Application URL: [mercury.com/signup](https://mercury.com/signup)

Once you have Articles (formation certificate) + EIN, you can open Mercury. No flying to the US, no introductions needed, fully online.

Mercury is friendly to non-US founders. Fill out the form in 15 minutes, submit, and 3-5 days later you'll get an approval email. Once the account is open, you can connect Stripe.

**Don't use Chase / Bank of America** — those traditional banks require an in-person visit.

### Step 5: Stripe Application (1-3 Days)

Application URL: [dashboard.stripe.com/register](https://dashboard.stripe.com/register)

Use your Mercury account as the payout destination. When registering Stripe, choose business entity = "LLC" and country = United States.

1-3 days later, after review approval, your products can start collecting payments.

---

### Full Cost Table for a Wyoming + Northwest LLC

Putting all the costs together — you can match each one against the steps above to see who gets paid for what.

**One-Time Setup**

| Item | Cost | Paid To |
|---|---|---|
| Northwest LLC service fee | $39 | Northwest (includes first-year RA) |
| Wyoming state formation fee | $100 | Wyoming Secretary of State |
| EIN application (DIY fax) | $0 | IRS (free) |
| **Total** | **$139** | **paid once** |

> Want it faster? Fiverr EIN service runs ~$15-50 (24-48 hours) → total $154-189. Northwest's EIN add-on ($200) only faxes — it doesn't call the IRS or block IRS follow-up — see Step 3, not recommended.

**Annual Maintenance (Year 2 onward)**

| Item | Cost | Paid To |
|---|---|---|
| Wyoming Annual Report fee | $60 | Wyoming Secretary of State |
| Annual Report service fee | $100 | Northwest |
| Registered Agent renewal | $125 | Northwest |
| Zadarma US virtual phone | $24 | Zadarma (annual plan, $2/month) |
| Form 1120 + 5472 filing (DIY) | $0 | IRS (free informational disclosure) |
| **Total** | **$309/year** | **my actual setup** |

> Want it cheaper? DIY the Annual Report and save $100 (10 minutes at wyobiz.wyo.gov), skip the virtual phone and save $24 → **floor at $185/year**.

### After Setup: 3 Calendar Deadlines to Mark

Setting up the LLC isn't the end. Three dates need to live in your calendar:

- **Every March**: Registered Agent auto-charges your card for renewal. **Make sure your credit card hasn't expired** — if the card fails and the RA lapses, IRS letters have nowhere to go
- **Every April 15**: File Form 1120 + 5472 with the IRS. Missing 5472 starts at **$25,000** (it's not a tax payment, just informational disclosure — but the penalty is real)
- **First day of your LLC's anniversary month** (formed in July → every July 1; formed in November → every November 1): File Wyoming Annual Report and pay $60. Miss this and the state will administratively dissolve your LLC

Set Google Calendar reminders for all three. Don't rely on memory.

---

## Looking Back After 2 Years

A US LLC isn't an entrance to a dream. It's a pipe.

$139 to set up, $309/year to maintain — what you buy is **a one-time-and-done payment infrastructure**. Whatever you want to monetize next — subscriptions, consulting, courses, a newsletter — it's the same pipe, the same Stripe, the same US company.

Not romantic, but necessary. Without this pipe, none of the other things are even on the table.

---

## References

### 5-Step Application URLs (in order)

| Step | Link | Purpose |
|---|---|---|
| Step 1 LLC formation | [Northwest](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-en-us-llc) ⭐ | The service I use (affiliate) |
| Step 3 EIN application (DIY) | [Form SS-4 PDF](https://www.irs.gov/pub/irs-pdf/fss4.pdf) | Official IRS form |
| Step 3 EIN application (outsourced) | [Fiverr](https://www.fiverr.com/search/gigs?query=EIN) | Recommended for non-English speakers |
| Step 4 Open bank account | [mercury.com/signup](https://mercury.com/signup) | Startup-friendly bank |
| Step 5 Payment setup | [dashboard.stripe.com/register](https://dashboard.stripe.com/register) | Stripe registration |

### LLC Formation Services Compared

I use **Northwest** ([$39 includes first-year Registered Agent →](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-en-us-llc)) — a "used it for 2 years and nothing exploded" recommendation, not a "compared 10 services" recommendation.

> **📌 Affiliate disclosure**: The Northwest link above is an affiliate link. If you form your LLC through it, I receive a commission (your fee is unchanged). My reasoning is simple: I've personally used the service for two years without issues.

If you want to compare alternatives: [Bizee](https://bizee.com/), [ZenBusiness](https://www.zenbusiness.com/), [Stripe Atlas](https://stripe.com/atlas) — I haven't used any of these, so do your own research.

### Official Forms and Government Websites

| Item | Link |
|---|---|
| Form SS-4 (EIN application) | [irs.gov/pub/irs-pdf/fss4.pdf](https://www.irs.gov/pub/irs-pdf/fss4.pdf) |
| Form 1120 (corporate annual return) | [irs.gov/pub/irs-pdf/f1120.pdf](https://www.irs.gov/pub/irs-pdf/f1120.pdf) |
| Form 5472 (foreign-owned U.S. corporation disclosure) | [irs.gov/pub/irs-pdf/f5472.pdf](https://www.irs.gov/pub/irs-pdf/f5472.pdf) |
| Wyoming Annual Report DIY | [wyobiz.wyo.gov](https://wyobiz.wyo.gov/) |
| Stripe Tax (automatic sales tax collection) | [stripe.com/tax](https://stripe.com/tax) |

### Tools and Services Mentioned

| Category | Tool |
|---|---|
| Vibe coding tools | [Claude Code](https://claude.com/claude-code) · [Cursor](https://cursor.com/) · [Bubble](https://bubble.io/) |
| Cross-border money transfer | [Wise](https://wise.com/) |
| US virtual phone | [Zadarma](https://zadarma.com/) ($2/month annual plan) |
| My product | [AI Resume Advisor](https://airesumeadvisor.com/) |
| Monetization platform | [Teachable](https://teachable.com/) (online courses) |
| Cloud credits | [Microsoft for Startups (Azure credits)](/en/blog/free-azure-startup-credits/) |

---

*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm open to collaboration, consulting, and new opportunities.*

