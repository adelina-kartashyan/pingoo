/* eslint-disable @typescript-eslint/no-explicit-any */
// Sample content for the prototype: plans, posts, team, tips and Pingoo answers.
// Replace this with real data from an API later — the screens only read it.
export function buildContent(): any {
  const BR = '#45535F', INK = '#0D0A26', CO = '#CF3216';
  const CH = {
    Instagram: { ab: 'IG', c: '#B8297A' }, TikTok: { ab: 'TT', c: '#0D0A26' }, LinkedIn: { ab: 'in', c: '#0A66C2' },
    YouTube: { ab: 'YT', c: '#C4211A' }, X: { ab: 'X', c: '#2B2742' },
    Facebook: { ab: 'FB', c: '#1877F2' }, Threads: { ab: 'TH', c: '#000000' }, Bluesky: { ab: 'BS', c: '#1185FE' }, Pinterest: { ab: 'PI', c: '#E60023' }
  };
  const A = {
    kind: 'Video', title: 'Post 3 short videos', when: 'Tue–Thu, 10 AM–12 PM',
    hyp: 'Short videos should lift your engagement rate from 4.8% to 5.5% this week.',
    metric: 'Engagement rate', base: 4.8, target: 5.5, result: 6.1, unit: '%', effort: 'About 3 hours', conf: 'High',
    evidence: [
      { label: 'Your Reels get 2.9× more engagement than image posts', detail: 'Based on 14 Reels and 22 image posts', stat: '2.9×', pct: 92 },
      { label: 'Productivity is your strongest topic', detail: 'It gets 32% more saves than your average post', stat: '+32%', pct: 71 },
      { label: 'Your audience is most active Tue–Thu, 10 AM–12 PM', detail: '41% of your weekly engagement happens in those hours', stat: '41%', pct: 64 }
    ],
    fits: ['Short video is your best format', 'Productivity is your best topic', 'Posted when your audience is online'],
    drafts: [
      { t: '5 morning habits that stick', plat: 'Instagram', fmt: 'Reel', len: '0:28', c: BR, hooks: ['Small habits. Big results.', 'I tested 30 morning routines. 5 survived.', 'Your mornings decide your week.'], cap: 'Small habits. Big results.\n\nHere are 5 simple morning habits that help me stay focused and in control of my day.\n\nWhich one will you try tomorrow?\n\n#productivity #morninghabits' },
      { t: 'The 10-minute content plan', plat: 'TikTok', fmt: 'Short video', len: '0:34', c: INK, hooks: ['Plan a week of posts before your coffee cools.', 'Stop planning content on Sunday night.', '10 minutes. 7 posts. One template.'], cap: 'The 10-minute plan I use every Monday. Save it for next week.\n\n#contentplanning #smallbusiness' },
      { t: '3 tools that save me 10 hours a week', plat: 'LinkedIn', fmt: 'Video', len: '0:41', c: CO, hooks: ['3 tools gave me a day back every week.', 'The boring stack behind my best weeks.', 'I deleted 9 apps. These 3 stayed.'], cap: 'I tracked my week for a month. These 3 tools gave me back 10 hours.\n\nWhat would you add to the list?' }
    ],
    learn: { verdict: 'Worked', vk: 'v-good', headline: 'Video wins on Instagram and TikTok. LinkedIn prefers carousels.',
      points: ['The Instagram Reel brought in 58% of the week’s engagement', 'The TikTok video reached 3.1× more people than you have followers', 'The LinkedIn video did 21% worse than your usual post'] }
  };
  const B = {
    kind: 'Repurpose', title: 'Turn your best post into a carousel', when: 'Wed, 10 AM',
    hyp: 'Reusing a post that already worked should lift your save rate from 2.1% to 3.0%.',
    metric: 'Save rate', base: 2.1, target: 3.0, result: 2.7, unit: '%', effort: 'About 1 hour', conf: 'Medium',
    evidence: [
      { label: '“How to plan content” beat your average by 72%', detail: 'Your best post of the last 30 days', stat: '+72%', pct: 80 },
      { label: 'Carousels get 1.8× more saves', detail: 'Based on 9 carousels and 31 single-image posts', stat: '1.8×', pct: 62 },
      { label: 'People who save your posts often follow you', detail: 'Saves and new follows rise together', stat: 'Strong', pct: 55 }
    ],
    fits: ['The topic already worked once', 'Carousels get saved more', 'Posted on your busiest day'],
    drafts: [
      { t: 'Plan your week in 10 slides', plat: 'Instagram', fmt: 'Carousel', len: '10 slides', c: BR, hooks: ['Your content week, on one page.', 'Save this before Sunday night.', 'The plan I wish I had in year one.'], cap: 'Your content week on one page. Save it and use it on Monday.' },
      { t: 'Our planning template, explained', plat: 'LinkedIn', fmt: 'Carousel', len: '8 slides', c: INK, hooks: ['Most teams plan content backwards.', '8 slides. 1 template. No more blank pages.', 'Steal our planning doc.'], cap: 'Most teams plan content backwards. Here is the template we use instead.' },
      { t: 'My content week, as a thread', plat: 'X', fmt: 'Thread', len: '7 posts', c: CO, hooks: ['How I plan a week of posts in 10 minutes:', 'Planning content is a 10-minute job. Here’s mine.', 'For anyone posting at 11 PM on a Sunday.'], cap: 'How I plan a week of posts in 10 minutes 🧵' }
    ],
    learn: { verdict: 'Partly worked', vk: 'v-mid', headline: 'Saves went up, but slower than planned. The first slide needs a bigger promise.',
      points: ['The Instagram carousel reached a 3.4% save rate on its own', 'The LinkedIn version stayed at 1.9%', 'Most people stopped swiping after slide 2'] }
  };
  const C = {
    kind: 'Community', title: 'Answer 5 questions on video', when: 'Tue and Thu, 11 AM',
    hyp: 'Answering your audience on video should grow comments per post from 38 to 60.',
    metric: 'Comments per post', base: 38, target: 60, result: 44, unit: '', effort: 'About 2 hours', conf: 'Medium',
    evidence: [
      { label: 'Questions in your comments are up 46%', detail: '112 unanswered questions across your channels', stat: '+46%', pct: 70 },
      { label: 'Reply videos get 2.2× more comments', detail: 'Compared with similar productivity accounts', stat: '2.2×', pct: 58 },
      { label: 'Tuesday and Thursday get the most replies', detail: '38% of your weekly comments', stat: '38%', pct: 48 }
    ],
    fits: ['Your audience asked for these topics', 'Short video format', 'Posted on your chattiest days'],
    drafts: [
      { t: '“How do you stay consistent?”', plat: 'TikTok', fmt: 'Reply video', len: '0:31', c: BR, hooks: ['You asked how I stay consistent. Honest answer:', 'Consistency is a calendar problem.', 'I’m not disciplined. I have a system.'], cap: 'You asked, I answered. What should I cover next?' },
      { t: '“Which tools are worth paying for?”', plat: 'Instagram', fmt: 'Reel', len: '0:38', c: INK, hooks: ['I only pay for 2 tools. Here’s why.', 'Free tools got me to 10K. Then this.', 'Stop paying for tools you open once a week.'], cap: 'The only 2 tools I pay for, and why. Ask me about any of them below.' },
      { t: '“How long should a post take?”', plat: 'YouTube', fmt: 'Short', len: '0:45', c: CO, hooks: ['A good post takes 40 minutes, not 4 hours.', 'You’re overthinking your posts. Here’s my timer.', 'The 40-minute post, start to finish.'], cap: 'My 40-minute posting routine, start to finish.' }
    ],
    learn: { verdict: 'Didn’t work', vk: 'v-bad', headline: 'People watched the answers but didn’t reply. End each video with a question.',
      points: ['Comments rose to 44, short of the 60 goal', 'Views on reply videos were up 31%', 'None of the videos asked viewers anything back'] }
  };
  const Dd = {
    kind: 'Follow-up', title: '2 Reels and 1 LinkedIn carousel', when: 'Tue–Thu, 10 AM–12 PM',
    hyp: 'Matching the format to each channel should lift engagement from 6.1% to 6.6%.',
    metric: 'Engagement rate', base: 6.1, target: 6.6, result: 6.9, unit: '%', effort: 'About 3 hours', conf: 'High',
    evidence: [
      { label: 'Last week’s Reel brought in 58% of your engagement', detail: 'From last week’s results', stat: '58%', pct: 84 },
      { label: 'The LinkedIn video did 21% worse than usual', detail: 'Carousels are your best format on LinkedIn', stat: '−21%', pct: 40 },
      { label: 'Tue–Thu mornings are still your best time', detail: 'Two weeks in a row', stat: '2 wks', pct: 66 }
    ],
    fits: ['Video where video works', 'A carousel where carousels work', 'Same best-time slots'],
    drafts: [
      { t: 'The 2-minute shutdown ritual', plat: 'Instagram', fmt: 'Reel', len: '0:26', c: BR, hooks: ['End your workday in 2 minutes.', 'The habit that fixed my evenings.', 'Close the laptop like this.'], cap: 'The 2-minute ritual that ends my workday. Try it tonight.' },
      { t: 'Why I batch on Tuesdays', plat: 'TikTok', fmt: 'Short video', len: '0:33', c: INK, hooks: ['One day of batching. Six days of calm.', 'Tuesday is my content day. Here’s why.', 'Batching beats motivation.'], cap: 'One day of batching, six calm days. Here is how.' },
      { t: '10 hours back: our stack', plat: 'LinkedIn', fmt: 'Carousel', len: '9 slides', c: CO, hooks: ['The 3-tool stack that gives me a day back.', '9 slides on working less and shipping more.', 'Our whole marketing stack costs $40 a month.'], cap: 'Our full marketing stack, and what each tool replaced.' }
    ],
    learn: { verdict: 'Worked', vk: 'v-good', headline: 'Picking the format per channel beat using one format everywhere. Keep it.',
      points: ['Engagement rate reached 6.9%', 'The LinkedIn carousel beat last week’s video by 2.4×', 'The two Reels reached 61K people together'] }
  };
  const W40 = {
    week: 40, title: 'Polish your Instagram profile', metric: 'Profile visits', base: 1840, target: 2000, result: 2061, unit: '',
    learn: { verdict: 'Worked', vk: 'v-good', headline: 'A clear bio and pinned Reels turn visitors into followers.',
      points: ['Profile visits went up 12% week over week', 'More visitors followed you: 7.4%, up from 6.1%', 'Your pinned “Start here” Reel got 9.2K views'] }
  };
  const HIST = [
    { w: 40, t: 'Polish your Instagram profile', g: '2,000 profile visits', r: '2,061', v: 'Worked', vk: 'v-good' },
    { w: 39, t: 'Repost your top Reel on TikTok', g: '+15% reach', r: '+22%', v: 'Worked', vk: 'v-good' },
    { w: 38, t: 'A weekly LinkedIn carousel', g: '3.0% save rate', r: '2.6%', v: 'Partly worked', vk: 'v-mid' },
    { w: 37, t: 'Daily Stories for 5 days', g: '40 story replies', r: '17', v: 'Didn’t work', vk: 'v-bad' }
  ];
  const TEAM = [
    { n: 'Teo Casper', i: 'TC', c: '#0D0A26', e: 'teo@pingoo.app', r: 'Owner', on: true, last: 'Now' },
    { n: 'Sarah Kim', i: 'SK', c: CO, e: 'sarah@pingoo.app', r: 'Admin', on: true, last: '2 hours ago' },
    { n: 'Mike Chen', i: 'MC', c: INK, e: 'mike@pingoo.app', r: 'Editor', on: true, last: '1 hour ago' },
    { n: 'Emma Wilson', i: 'EW', c: '#0A66C2', e: 'emma@pingoo.app', r: 'Viewer', on: false, last: 'Yesterday' }
  ];
  const SLOTS = [[1, '10:30 AM'], [2, '11:00 AM'], [3, '10:15 AM']];
  const OTHERS = [
    { day: 0, time: '9:00 AM', t: 'Start small, finish strong', plat: 'X', fmt: 'Quote', st: 'pub', owner: 1 },
    { day: 0, time: '6:00 PM', t: 'Behind the scenes: our desk setup', plat: 'Instagram', fmt: 'Story', st: 'pub', owner: 2 },
    { day: 2, time: '4:00 PM', t: 'Office hours: your questions, live', plat: 'YouTube', fmt: 'Live', st: 'sched', owner: 0 },
    { day: 4, time: '12:00 PM', t: 'Friday wins thread', plat: 'X', fmt: 'Thread', st: 'draft', owner: 1 },
    { day: 6, time: '5:00 PM', t: 'Weekly recap', plat: 'LinkedIn', fmt: 'Carousel', st: 'draft', owner: 0 }
  ];
  const CAMPS = [
    { name: 'Autumn productivity series', status: 'Active', stCls: 's-pub', dates: 'Oct 5 – Nov 1', pct: 25, doneLabel: 'Week 1 of 4',
      summary: 'Four weeks of practical productivity content to grow engagement before the end of the year.',
      goal: 'Reach a 6.5% engagement rate', goalNote: 'Currently 4.8%. Pingoo plans each week to close the gap.',
      audience: 'Founders and small marketing teams, mostly 25–34', chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'],
      messages: ['Small habits, big results.', 'Plan less, post better.', 'Tools that give you time back.'],
      weeks: [{ w: 'Week 41', d: 'Oct 5 – 11', f: '@current', st: 'This week', stCls: 's-ready', now: true }, { w: 'Week 42', d: 'Oct 12 – 18', f: 'Pingoo decides after this week’s results', st: 'Next', stCls: 's-draft' }, { w: 'Week 43', d: 'Oct 19 – 25', f: 'Planned after week 42', st: 'Later', stCls: 's-draft' }, { w: 'Week 44', d: 'Oct 26 – Nov 1', f: 'Best-of recap and wrap-up', st: 'Later', stCls: 's-draft' }],
      rows: '@plan' },
    { name: 'Black Friday offer', status: 'Draft', stCls: 's-draft', dates: 'Nov 23 – Dec 1', pct: 0, doneLabel: 'Not started',
      summary: 'Our biggest offer of the year, with a waitlist first and launch-week reminders after.',
      goal: 'Get 120 trial sign-ups', goalNote: 'Last year’s offer brought in 74.',
      audience: 'Current followers and newsletter readers', chans: ['Instagram', 'LinkedIn', 'X'],
      messages: ['Our biggest offer of the year.', 'Plan a whole quarter in an afternoon.', 'Ends Monday at midnight.'],
      weeks: [{ w: 'Week 48', d: 'Nov 23 – 29', f: 'Teaser posts and waitlist', st: 'Planned', stCls: 's-draft' }, { w: 'Week 49', d: 'Nov 30 – Dec 6', f: 'Launch day and last-chance reminders', st: 'Planned', stCls: 's-draft' }],
      rows: [{ t: 'Waitlist teaser', ch: 'Instagram', f: 'Reel', st: 'Not started', stCls: 's-draft', d: 'Nov 24' }, { t: 'Why we’re doing this', ch: 'LinkedIn', f: 'Post', st: 'Not started', stCls: 's-draft', d: 'Nov 25' }, { t: 'Offer is live', ch: 'X', f: 'Thread', st: 'Not started', stCls: 's-draft', d: 'Nov 27' }, { t: 'Last chance', ch: 'Instagram', f: 'Story', st: 'Not started', stCls: 's-draft', d: 'Nov 30' }] },
    { name: 'Pingoo 2.0 launch', status: 'Completed', stCls: 's-live', dates: 'Jun 22 – Jul 5', pct: 100, doneLabel: '12 of 12 posts',
      summary: 'Two weeks introducing the new Pingoo. Reached 286K people and grew followers by 18%.',
      goal: 'Reach 250,000 people', goalNote: 'Finished at 286K. Goal beaten by 14%.',
      audience: 'Existing users and productivity creators', chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'],
      messages: ['Meet the new Pingoo.', 'One focus a week.', 'Know what to post next.'],
      weeks: [{ w: 'Week 26', d: 'Jun 22 – 28', f: 'Teasers and countdown', st: 'Worked', stCls: 's-pub' }, { w: 'Week 27', d: 'Jun 29 – Jul 5', f: 'Launch video and walkthroughs', st: 'Worked', stCls: 's-pub' }],
      rows: [{ t: 'Launch film', ch: 'YouTube', f: 'Video', st: 'Published', stCls: 's-pub', d: 'Jun 29' }, { t: 'What’s new in 60 seconds', ch: 'Instagram', f: 'Reel', st: 'Published', stCls: 's-pub', d: 'Jun 30' }, { t: 'Founder story', ch: 'LinkedIn', f: 'Post', st: 'Published', stCls: 's-pub', d: 'Jul 1' }, { t: 'Feature tour', ch: 'TikTok', f: 'Short video', st: 'Published', stCls: 's-pub', d: 'Jul 2' }] }
  ];
  const CONNECTED = [
    { n: 'Instagram', h: '@pingoo.app' }, { n: 'TikTok', h: '@pingoo.app' }, { n: 'LinkedIn', h: 'Pingoo · company page' },
    { n: 'YouTube', h: 'Pingoo' }, { n: 'X', h: '@pingooapp' }, { n: 'HubSpot', h: 'pingoo.app CRM', ab: 'HS', c: '#C2410C' }
  ];
  const BROWSE = [
    { n: 'Meta Ads', cat: 'ads', d: 'See how your Facebook and Instagram ads perform.', ab: 'MA', c: '#2D5BD8' },
    { n: 'Google Analytics', cat: 'ads', d: 'Find out which posts send people to your website.', ab: 'GA', c: '#A85A00' },
    { n: 'LinkedIn Ads', cat: 'ads', d: 'Add sponsored post results to your weekly report.', ab: 'LA', c: '#0A66C2' },
    { n: 'Google Drive', cat: 'prod', d: 'Use your images and videos right inside Create.', ab: 'GD', c: '#1E7B3A' },
    { n: 'Notion', cat: 'prod', d: 'Keep campaign briefs and notes in sync.', ab: 'N', c: '#0D0A26' },
    { n: 'Canva', cat: 'prod', d: 'Design covers and bring them in with one click.', ab: 'Ca', c: '#00737E' },
    { n: 'Slack', cat: 'prod', d: 'Get your weekly plan and results in a channel.', ab: 'Sl', c: '#4A154B' },
    { n: 'Zapier', cat: 'prod', d: 'Connect Pingoo to more than 5,000 apps.', ab: 'Za', c: '#B93A0B' },
    { n: 'Mailchimp', cat: 'crm', d: 'Turn your best posts into newsletter sections.', ab: 'Mc', c: '#6B4F00' },
    { n: 'Salesforce', cat: 'crm', d: 'See which posts bring in new leads.', ab: 'Sf', c: '#0B6FB8' }
  ];
  const TIPS = {
    home: { stat: '2.9×', t: 'Your Reels got 2.9× more engagement than your image posts over the last 30 days.', s: 'Reels got 2.9× more engagement than images.', q: 'Why video this week?', sq: 'Why video?' },
    planner: { stat: '1 week', t: 'A campaign sets the big goal. You only ever decide one week of it at a time.', s: 'Campaigns set the goal. You plan one week at a time.', q: 'How do campaigns and weekly plans fit together?', sq: 'How do campaigns work?' },
    create: { stat: '2 sec', t: 'Openings with a number keep more people watching your Reels past the first 2 seconds.', s: 'Number openings keep people watching past 2 sec.', q: 'Give me a stronger opening for the Reel', sq: 'Improve the opening' },
    calendar: { stat: '2×', t: 'Posts Tue–Thu, 10 AM–12 PM reach about twice as many people as posts at other times.', s: 'Tue–Thu, 10 AM–12 PM reaches about 2× more people.', q: 'What should I post on Friday?', sq: 'What to post Friday?' },
    results: { stat: '−21%', t: 'Video did well everywhere except LinkedIn, where it did 21% worse than your usual post.', s: 'Video worked everywhere except LinkedIn.', q: 'What did last week teach us?', sq: 'What did we learn?' },
    audience: { stat: '+32%', t: 'Productivity posts get 32% more saves than your average topic.', s: 'Productivity posts get 32% more saves.', q: 'Is my engagement going up?', sq: 'Is engagement up?' },
    team: { stat: '1 owner', t: 'When one person owns a post, it rarely gets stuck in drafts.', s: 'One owner per post keeps drafts moving.', q: 'Who should own this week’s posts?', sq: 'Who owns what?' },
    settings: { stat: 'Brand', t: 'Pingoo writes every caption in the tone you set under Brand. Keep it up to date.', s: 'Pingoo writes in the tone you set under Brand.', q: 'How does Pingoo use my brand?', sq: 'How is it used?' },
    integrations: { stat: '+GA', t: 'Google Analytics would show which posts actually send people to your website.', s: 'Google Analytics shows which posts drive site visits.', q: 'Which integration should I add first?', sq: 'Which to add first?' }
  };
  const COACH_QA = [
    { q: 'Why video this week?', a: 'Over the last 30 days your Reels got 2.9× more engagement than your image posts, across 14 Reels and 22 image posts. Your audience is paying attention to video right now, so this week’s plan leans into it.', act: 'home', actLabel: 'See this week’s plan' },
    { q: 'What should I post on Friday?', a: 'Friday is quieter for you, with about half of Thursday’s engagement. Keep it light: a short X thread with your wins from the week. Sarah already has a draft for it in the Calendar.', act: 'calendar', actLabel: 'Open Calendar' },
    { q: 'Is my engagement going up?', a: 'Yes. Your engagement rate is 4.8%, up from 4.2% two weeks ago. Most of that growth comes from Instagram Reels.', act: 'audience', actLabel: 'See Audience & Trends' },
    { q: 'Give me a stronger opening for the Reel', a: 'Try: “I tested 30 morning routines. 5 survived.” Starting with a number tells people exactly what they’ll get, so more of them keep watching.', act: 'create', actLabel: 'Open the draft' },
    { q: 'How do campaigns and weekly plans fit together?', a: 'A campaign sets the big goal and the dates, like “grow engagement before the end of the year”. Each Monday I suggest one plan that moves it forward, based on what worked the week before. So you never have to plan a whole month up front.', act: 'planner', actLabel: 'Open Campaign Planner' },
    { q: 'What did last week teach us?', a: 'Short video worked: your Reels and TikToks lifted engagement past the goal. LinkedIn was the exception. Video there did 21% worse than your usual post, so next time I’ll suggest a carousel for LinkedIn instead.', act: 'results', actLabel: 'See Results' },
    { q: 'Who should own this week’s posts?', a: 'Sarah wrote most of your best Reel openings lately, so she’s a good owner for the 3 videos. Keep the LinkedIn post with you, since it goes out from the company page.', act: 'team', actLabel: 'Open Team' },
    { q: 'How does Pingoo use my brand?', a: 'I read “What your brand does” to choose topics, use your tone of voice for captions and openings, and never use the words on your avoid list. If something sounds off, change it under Brand and the next plan will follow it.', act: 'settings', actLabel: 'Open Settings' },
    { q: 'Which integration should I add first?', a: 'Google Analytics. It shows which posts send people to your website, so I can plan for sign-ups, not just likes.', act: 'integrations', actLabel: 'Open Integrations' },
    { q: 'Why did LinkedIn get quieter?', a: 'Your last two LinkedIn posts were videos, and video there reaches fewer people than your carousels. Your week 38 carousel beat your LinkedIn average. Next time you post there, try a carousel.', act: 'audience', actLabel: 'See Audience & Trends' },
    { q: 'How do I show up in more AI answers?', a: 'AI assistants lean on pages that answer a question directly, and on posts people share and talk about. Your “Plan your week in 10 slides” carousel already answers “How do I plan a week of content?” almost word for word. Turn it into a LinkedIn post and a short guide on your website, and ask a few happy customers to mention Pingoo in their reviews. I’ll check the same 10 questions again next Monday.', act: 'create', actLabel: 'Open Create' },
    { q: 'What happens if I skip this week?', a: 'Nothing breaks. Your numbers keep coming in, and on Monday I’ll suggest a fresh plan. If this one didn’t fit, tell me why (too much time, wrong channel, not your topic) and I’ll avoid it next time.', act: 'home', actLabel: 'Back to Home' }
  ];
  return { A, B, C, D: Dd, W40, HIST, TEAM, SLOTS, OTHERS, CAMPS, CONNECTED, BROWSE, CH, TIPS, COACH_QA };
}
