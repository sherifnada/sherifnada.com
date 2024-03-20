---
title: "Stack rank and saturate: an approach for impact-driven prioritization"
createdDate: 03/17/2024
tags: 
    - prioritization
outline: |
    # High level idea: stack rank & saturate
    - there are always a million things competing for your attention
    - making a little bit of progress on all of them at the same time usually results in mediocre outcomes
    - instead, you should stack rank and saturate your priorities. 
    - The biggest benefit of this approach is that it organizes your company to be impact-focused
    - This increases cohesion, reduces politics, and fosters trust & transparency
    - Another benefit is higher quality releases and a more regular release cadence.
    - increases autonomy

    # how to implement 
    - This has two phases: top-down, then bottom-up. 
    - This list should start at the highest possible level within your company (ideally for the whole company), and it should be team-agnostic.
    - Individual teams should use the top-down guidance to stack rank their own deliverables, figure out cross team dependencies, and inject bottom-up priorities which may not be visible for higher level leadership
    - Using the bottom-up guidance, dig in to resolve misalignments or deliverables
    - Finalize your roadmap commitments based on what you can achieve
    - It's better to keep your final list of committed priorities short and focused on must-haves
    - use the team level stack rankings to refine your top-level deliverables and identify bottlenecks or if your org structure or headcount needs to change
    
    # additional benefits
    - This gets harder as your company gets larger, but it becomes even more important to keep people focused (Airbnb & Brex examples). Plus requiring each team to stack rank their priorities is still valuable when company level priorities don't directly tell them what to do.
    - This is compatible with OKRs or other frameworks but improves them via total ordering
---

In business, there's always a million things competing for your time. Customers submit what feels like a hundred feature requests per hour.  Stakeholders ask for deliverables. You really want to clear some technical debt. Your CEO occasionally airdrops a few half-baked ideas and disappears before you can have a meaningful discussion about why, when, or how you'd work on them[^1]. And so on. 

![](./time%20vs%20bandwidth.png)

It's tempting to try to make a bit of progress on many of these things all at once. Otherwise, you'd have to say 'no' a whole lot to your customers, coworkers, and teams, which is guaranteed to upset some people. You'd also have to say 'no' to yourself, because you _really_ want to work on some of these things. It will feel wrong not to work on the web app or UI or integrations or whatever else really needs attention, and before you know it you’re working on all of them because, I mean, you can’t _not_ be working on them, right? So you decide to make a bit of progress on each one in parallel. 

This is usually a bad idea because it doesn't optimize for impact. It's really hard to do a great job on a few things, let alone on many things all at once. You'd be frantically context-switching from project to project, have less cohesive teams with low bus factors, under-resource projects, and generally get less done. The most likely outcome is shipping a bunch of average work or ending up with unfinished projects. So it's better to avoid these outcomes by making some hard decisions upfront. 

## Stack rank and saturate

A much better approach is to explicitly stack rank your priorities, then in descending order, saturate them with your resources. The gist of it is: 
1. List out the highest impact outcomes or levers for your business, product domain, or team
2. Stack rank them by impact
3. Under each item, list the tasks or projects which can help achieve it
4. Starting with the first item on the list, assign as many resources to its projects until you hit meaningfully diminishing returns
5. Repeat step 4 for the remaining items on the list until you exhaust your resources
6. Explicitly mark every item that wasn't assigned any resources as "below the line" i.e: it's not a goal, and everyone in your company should assume it won't happen during this prioritization cycle

<to-do: picture of listing priorities, stack ranking them, then separating them into goals and non-goals>

It's good to keep your list short. The majority of the value usually lies in the top 1-3 goals. So it's better to worry about knocking the top goals out of the park than fret over the 6th goal or account for the last 10% of your bandwidth[^2]. Plus, it's good to build a buffer into your time estimates, because humans are known to overestimate what they can achieve. So if you already have a number of high impact goals committed and are trying to account for where the last bit of bandwidth should go, don't worry about it. In the worst case, you can always pick the first item below your priority line after you've knocked all the other goals out of the park.

The biggest benefit of this approach is that it orients your entire company around impact. When anyone is pitching a project, they have to express it in terms of its impact on business goals. Deciding which projects to work on is based on impact. Resources are allocated maximally to projects which generate the highest impact. Everything is oriented towards impact. 

This increases cross-team cohesion and decreases politics. Since all teams are operating from shared priorities, they'll spend less time debating the priorities and more time collaborating to achieve them. This is especially useful across functions, where achieving alignment is more expensive, like for example when marketing, sales, customer support, and engineering all need to support a product release. Your company will feel like more of a unit because everyone is rowing in the same direction. It also means that individuals are less likely to have diverging goals in service of their own career progression or personal agendas; the way to progress their career is to make an impact on the shared top goals. Any divergnce from the shared goals will seem out of place.

This also increases your teams' output quality and establishes a more consistent release cadence. Since resources are first allocated to the highest impact projects, those projects will not compete for oxygen with other projects; you'll ensure that they are done well before starting to think of how to staff the next project. Not only that, but important project will be executed and released as quickly as possible, since they are not bottlenecked on resources. This means your release cadence will be more consistent, which is great for delighting your users and building morale. There will always be a release to celebrate right around the corner.

Teams will also feel more trust, act more autonomously, and make fewer escalations. Everyone knows what the shared priorities are, so individuals will feel more empowered to say no to requests which don't achieve them. If a stakeholder's request is rejected, they can clearly see why and trace it back to the company goals. Similarly, when projects takes longer than expected, teams will know to divert bandwidth from the lower ranking projects to the highest impact ones without needing to escalate to their manager for explicit approval.

## Stack rank & saturate in practice
To make this more concrete, I'll share how we implemented this framework at Airbyte. I make no claim that this works universally. There's probably other ways of doing it; this is just how we did it. I'd love to hear about how you think this could be better, or how you implemented this in your own context.

When implementing this, I've found it useful to think of this process in three phases: 
1. A top-down phase where the goal is to produce specific company-level (and sometimes org-level) guidance about high impact outcomes
2. A bottom-up phase where the goal is to produce stack ranked team-level project commitments
3. A final back-and-forth where the company-level and team-level lists are finalized


### Top-down: producing high-level guidance
In the top-down phase, leadership communicates the most important business levers or outcomes to the rest of the company. These points should be written in a document circulated within the company. Items on this list will usually be business-sounding goals like "sign more enterprise clients" or "reduce churn", although sometimes they will be specific deliverables like releasing a specific product or feature. 

In general, items on this list should be team or function-agnostic to ensure that teams are impact-focused and aligned on priority regardless of their function. For example, "close 10 enterprise customers in 2024" could be a sales-only goal, or it could require work from multiple teams. But it ultimately doesn't matter -- if this is the top goal for your company, it's the top goal, and everyone should figure out how to achieve it. Plus, leadership will not always know the exact pieces that need to come together to achieve these goals. So it's good to communicate the desired outcomes and let individual teams tell you how they can collaborate to achieve them.

It's also useful to include the most important context behind the goals in this document. For example, if leadership happens to know that clients are churning because the product is full of bugs, they should mention that in the doc. If it's because the product doesn't provide some specific recurring value to a category of users, that's good to know too. If leadership doesn't really know why clients are churning, it's still useful to say that, because it orients teams more into discovery mode rather than into solution mode.

### Bottom-up: producing specific project commitments
The goal of the bottom-up phase is for each team to come up with a committed stack rank of the projects they will ship. This list is usually more tactical and enumerates specific projects they'll undertake to achieve the top goals. For example, an engineering team trying to reduce churn could items like "implement personalized newsfeed" or "implement an enhanced onboarding process" on their list. 

While the projects should generally be in line with the company level goals, some of them may be team-specific priorities (like clearing specific tech debt) that are not directly present on the company-level stack rank. It's perfectly normal and useful to do this as long as teams can align with leadership on the priority of these projects, especially since leadership doesn't have visibility into these needs. Also during this phase, teams should make sure to place their requests on other teams' backlogs, align with each other on cross-team dependencies, and get explicit sign-offs that they'll get done.

The larger your company gets, the less likely that your company or organization-level goals explicitly tell each team what to work on. But by requiring each team to stack rank their priorities nonetheless, they will tell you how they can contribute to certain goals. If they can't, the mindset behind stack ranking and saturation will still orient them towards maximizing impact within their local domains. 

Similarly, the more layers of management you have, the bigger of a role middle managers play in connecting their subteams' outputs with company goals. They will need to give context on how the company goals apply to their specific teams. This can either take the form of creating an explicit org-level document of stack ranked priorities "translated" into the org's context, or by middle managers being very involved in their teams's bottom-up process to ensure that their goals make sense given the top-down guidance.

The bottom-up phase usually tightens the scope of your priorities since it tests whether the stated goals are worth the effort they require. For example, if it’s going to take two weeks to add intricate animations to your landing page, you have to decide if that’s really worth the time, or if you can achieve the same outcome (e.g: an impressive looking landing page for your pre-seed startup) with a different, cheaper approach. Maybe you hire a contractor to do it, find some other way to make your landing page impressive in a few hours, or maybe you decide the outcome isn't worth it altogether. After going through this phase, I often found myself or other teams deciding to trim scope of items high on the list to make room for things below.

This phase also reveals velocity bottlenecks or headcount shortages. When you’re forced to explicitly map how your existing capabilities (budget, employees, product features, etc) will achieve your desired outcomes, you'll get a better idea of where you need better processes, productivity, more employees, budget, or something else. This in and of itself may cause you to change priorities (for example to address some technical debt or process inefficiency to increase velocity). You'll also significantly speed up future headcount planning exercises (and root them in reality) by building a cache of examples of what you would have been able to achieve if you had more headcount. During headcount planning, you can then determine if the extra impact justifies the additional headcount.

<to-do: picture of decide priorities —> assign existing capabilities to priorities —> see gaps in capabilities —> improve capabilities or change priorities> 

### The final back-and-forth
With the company-level and team-level objectives put forth, some final back-and-forth should occur amongst individual teams and leadership, and the lists should be finalized. Everyone in the company now has stack-ranked lists of priorities and projects that they can execute against. 

This process may take longer for larger companies, it can be done relatively quickly especially for smaller teams. As long as everyone has some head notice about when this process will take place, they can prepare drafts of their own lists and clear up a day or two for synchronous conversations to align on everything relatively quickly. Another way to speed up the process is by changing higher-level goals on a slower cadence. Team-level projects may change more frequently (e.g: every 6 weeks or quarter), but company level goals can be a little more stable (e.g: they can mostly stay the same for 1-2 quarters or even more in larger organizations), saving time in subsequent iterations of the process. 


## Applying this in your context
Despite the implementation section above (which you can completely substitute with whatever implementation works for you), this approach is relatively unopinionated about all but two things: 
1. Goals need to be a stack ranked
2. Bandwidth should saturate the stack ranked goals in descending order

For that reason, stack ranking and saturation is perfectly compatible with frameworks like OKRs or SMART goals. You can just add the stack rank and bandwidth saturation requirements on top of those frameworks.

[^1]: Michel, if you're reading this: it's nothing personal. I just needed a good setup for the article ;)
[^2]: Peter Thiel [took this to an extreme](https://www.youtube.com/watch?v=6fQHLK1aIBs&t=1172s) and essentially only allowed people to talk about the most important problem they're working on as a way of focusing them