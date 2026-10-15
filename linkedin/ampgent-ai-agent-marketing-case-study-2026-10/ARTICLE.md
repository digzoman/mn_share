# How We Used AI Agents to Research, Build, and Connect an Entire Marketing System

What if AI agents could do more for your marketing than brainstorm ideas and write ad copy? What if they could actually **research competitors, work in a browser, generate and review ads, configure Meta campaigns, update a website, test a CRM chatbot, and connect conversion tracking** — with a human directing the strategy and approving important changes? That's what we've been building at **Ampgent**.

For the complete walkthrough, including real screenshots and diagrams, [read the full Ampgent case study](https://ampgent.com/insights/ai-powered-meta-ads-launch/?s=li-a).

We put several AI assistants to work across the real systems our marketing uses. Not in one magical prompt, and not perfectly on the first attempt. We gave them specific jobs, connected them to tools, checked their work, corrected mistakes, and gradually built out a functioning advertising and lead-handling setup.

This is the behind-the-scenes story of what we did, how the pieces connected, and what business owners can learn from the process.

## 1. Start with actual market research, not AI-generated guesses

We had a basic commercial problem: Ampgent can deliver several different AI-related services, but which offers should we advertise, and who would actually respond?

Rather than begin with a single assumed ideal customer profile, we used AI agents to investigate **real advertisements running in Meta's public Ad Library**.

We were looking for patterns:

- Which business problems were advertisers making specific?
- Who appeared to be the buyer?
- What offer and call to action did the ad present?
- Was it a video, demonstration, text-led image, or another format?
- Were similar offers appearing repeatedly over time?

Our research documentation recorded **34 advertiser checks, 96 keyword searches, and 131 candidate offer families**.

One of the most useful instructions in the process was:

> “Classify the ad by its actual offer, not by the keyword that surfaced it.”

That mattered. A search for “AI agents” could reveal a software product, a training course, an implementation service, or recruitment. Those are not the same business.

We also learned that a public ad running for months is **not proof that it's profitable**. It is a reason to investigate, not evidence of someone else's return on advertising spend.

The research helped us build **eight offer categories**, including inbound sales agents, customer-support automation, AI receptionists, practical AI training, implementation support, embedded AI developers, and human virtual-assistant services.

The point wasn't to create eight impressive labels. It was to get better evidence about which problems might justify a serious sales conversation.

## 2. Give AI agents access to browsers and business systems

A chatbot can explain how to research the Meta Ad Library. That's different from an agent actually opening the page, inspecting the visible advertisements, and saving what it found.

So we gave our agents real tools.

We used a **virtual machine and browser automation**, with a Patchright/Playwright-compatible setup, to navigate dynamic web pages and inspect live interfaces.

We also built a **custom MCP connector**. MCP stands for *Model Context Protocol*: a standardized way for AI assistants to access permitted tools and data.

Through connected tools, our assistants could work with systems such as **GitHub, Meta, and browser sessions**, instead of asking us to continually copy data from one window to another.

Different assistants contributed in different ways:

- **ChatGPT** helped structure the research, compare opportunities, write and critique creative, and connect decisions across the project.
- **Fred** handled bounded technical and repository tasks.
- **Muse** contributed independent research and challenged assumptions.
- **Claude Code** worked on defined coding, browser, and evidence tasks.

Not all agents had the same access or were active at the same time. We used them where their tools and responsibilities made sense.

A key principle was **AI execution with human direction**. The owner still decided which offers to pursue, which claims were defensible, what to approve, and when advertising could start spending money.


Want to see how we connected the agents to browser tools and research workflows? [Explore the full illustrated case study](https://ampgent.com/insights/ai-powered-meta-ads-launch/?s=li-a).

## 3. Turn research into real ads — and review the creative properly

Once we shortlisted an offer, AI helped translate the underlying buyer problem into new Ampgent ad concepts.

That included headline and body copy, calls to action, imagery-led and non-imagery variations, and creative files sized for Meta placements.

But we made an important distinction between **generating an image** and **making a good advertisement**.

One of our actual creative instructions was:

> “Do not generate an image until the source-specific semantic gate passes.”

In other words: first verify that we understand the customer, the problem, the proposed solution, and what we can honestly promise. *Then* make it look good.

Agents could produce variations quickly, but human review still caught:

- Graphics that looked attractive but targeted the wrong buyer.
- A research reference that was really a video, not a static image.
- Text too small to read on a phone.
- Square crops that cut off important parts of a portrait creative.
- Incorrect creative uploads or bindings.

We used the actual approved Ampgent logo artwork — not an AI-invented approximation.

AI made iteration faster. **Quality assurance made the output usable.**

## 4. Configure campaigns inside Meta, not just make mockups

We wanted the agents to move beyond PowerPoint-style marketing ideas.

With properly authorized **Meta Marketing API** access, we could stage campaign, ad-set, ad, and creative objects, then read settings back from Meta to confirm what actually existed.

That required technical work: a Meta Business system user, appropriate asset permissions, a developer integration, and reliable API operations. We also used browser inspection when the actual Meta interface needed checking.

One practical lesson: an API timeout is not proof an operation failed. Retrying without verifying the provider's state can create duplicate objects. We encountered and corrected that problem.

We eventually prepared **17 new campaigns** spanning the different offers.

Creating those objects was not the same as validating commercial performance. The initial experiment was deliberately staged for review and controlled activation, with some campaigns held back.

Still, getting from a research hypothesis to a real, correctly configured Meta ad is a significant amount of operational work — and AI agents helped with the journey.

## 5. Make the website part of the same process

We also worked on the **Ampgent website**, because even a compelling ad won't convert well if the next step is confusing.

With AI-assisted development and review, we organized pages around the services and learning pathways we wanted people to understand.

Rather than send everybody to a generic contact form, the site offered clearer next steps such as **Chat with Max** and **Book a Call**.

The website work was versioned in GitHub, which mattered because code, content, changes, and rollbacks all needed to remain traceable.

The same general workflow applied:

**Agent proposes or implements a bounded change → we review the result → test the actual site → approve the release.**

This wasn't just “AI writes website copy.” It was AI assisting with real website development and supporting the marketing funnel.


The website implementation, screenshots, and technical examples are documented in [the complete Ampgent case study](https://ampgent.com/insights/ai-powered-meta-ads-launch/?s=li-a).

## 6. Connect the ads to a CRM and an AI chatbot

Next, we wanted inquiries to become useful conversations instead of disappearing into disconnected message inboxes.

We used **HighLevel** as the CRM and connected its customer-facing AI assistant, Max, to the lead-handling journey.

Our Meta ads used selectable Facebook or Instagram message questions. We designed short, offer-specific phrases into those questions so the chatbot could recognize what someone was asking about, even if the source-ad metadata wasn't available.

The intended flow looked like this:

**Meta ad → Messenger or Instagram inquiry → HighLevel AI conversation → qualification → booking → human sales follow-up**

The chatbot could answer questions and direct interested people toward an Ampgent Discovery Call. We also configured website chat and booking pathways so prospects could enter from the site.

Then we **tested the chatbot with AI agents**.

Rather than manually typing each test one by one, browser-capable assistants could simulate different prospect questions, capture the replies, and help identify problems: awkward tone, repetitive answers, incorrect routing, or failure to recognize an offer.

Some of those test batches covered dozens of scenarios. We used the findings to refine instructions and behavior.

One important caveat: synthetic tests are not real customer conversations, and a workflow action visible in a configuration screen isn't automatically proof that every downstream step fired correctly.

## 7. Connect tracking to business outcomes, not just clicks

We also worked on measuring what happened after an ad generated attention.

A click or message start is useful information. But it isn't the same as a qualified opportunity, a booked meeting, or a customer.

Our measurement architecture included:

- A consent-gated **Meta Pixel** on the website for relevant browser activity.
- A server-side **Conversions API** path for important events such as booked appointments.
- A custom **Good Lead** signal intended to help identify stronger conversations.
- The longer-term goal of connecting leads to real sales outcomes.

The prelaunch technical review observed a permitted website PageView and a genuine server-side booking event.

It also revealed uncertainties around potential browser/server event duplication and the exact rules behind some Good Lead events. Those needed further verification.

That's part of the lesson: **installing tracking and proving the tracking is accurate are different jobs**. An agent needs to report what it verified, not fill gaps with confident language.


For the detailed chatbot, tracking, and event-verification story, [visit the full case study on Ampgent](https://ampgent.com/insights/ai-powered-meta-ads-launch/?s=li-a).

## 8. The bigger lesson: AI agents can work across the marketing stack

The most valuable part of this project wasn't any single ad, image, prompt, or chatbot reply.

It was connecting the work:

**Market research → offer strategy → ad creative → Meta configuration → website → CRM → AI chat → bookings → conversion measurement.**

GitHub gave us a record of decisions and changes. Browser automation let agents inspect real interfaces. MCP and APIs connected assistants to external tools. Human oversight kept quality, permissions, budgets, and business judgment in the loop.

It took iteration. There were broken browser sessions, creative corrections, duplicate API objects, imperfect chatbot answers, and event-tracking questions.

And we haven't claimed that this experiment already produced profitable ad results. This is a case study about **building and preparing the system**, not a victory lap about return on ad spend.

For entrepreneurs and small marketing teams, that's the exciting possibility: AI agents can contribute to work that used to involve separate researchers, copywriters, designers, developers, media buyers, and CRM specialists.

They don't make those skills or judgment unnecessary. They can make a much smaller team more capable of coordinating the work.

### See the complete case study — and talk to us about your own marketing agents

We documented the full process on the Ampgent website, including the eight offer categories, architecture, real prompts, sanitized screenshots, and technical details:

**[Read the complete Ampgent case study](https://ampgent.com/insights/ai-powered-meta-ads-launch/?s=li-a)**

If you want to set up **AI agents that can research your market, build marketing assets, work with your ad accounts, improve your website, and connect to your CRM**, **send me a DM here on LinkedIn with “AGENTS.”**

We can discuss which parts would be useful for your business, where agents should have access, and what needs human approval.

*This article describes preparation and implementation. It does not claim validated advertising ROI or fully automated campaign optimization.*