// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Campaign planner: building, editing, launching and ending campaigns.
export const campaignsMethods: Record<string, any> = {
  campsInit(this: any) {
    return [
      { id: 'autumn', name: 'Autumn productivity series', status: 'active', si: -1, len: 4, start: 'Oct 5', end: 'Nov 1', weekIdx: 0,
        summary: 'Four weeks of practical productivity content to grow engagement before the end of the year.',
        goalType: 'engagement', target: '6.5', goalText: 'Reach a 6.5% engagement rate', goalNote: 'Started at 4.8%. Pingoo plans each week to close the gap.',
        prog: { label: 'Engagement rate', base: 4.8, now: 4.8, target: 6.5, unit: '%' },
        audience: 'Founders and small marketing teams, mostly 25–34', chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'],
        messages: ['Small habits, big results.', 'Plan less, post better.', 'Tools that give you time back.'],
        weeks: [
          { w: 'Week 41', d: 'Oct 5 – 11', f: '@current', added: [] },
          { w: 'Week 42', d: 'Oct 12 – 18', f: 'Pingoo plans this after week 41’s results', added: [] },
          { w: 'Week 43', d: 'Oct 19 – 25', f: 'Planned after week 42’s results', added: [] },
          { w: 'Week 44', d: 'Oct 26 – Nov 1', f: 'Best-of recap and wrap-up', added: [] }
        ],
        rows: '@plan',
        ideas: [
          { t: 'Before and after: one week of time blocking', ch: 'Instagram', f: 'Reel', why: 'Before-and-after posts get 1.6× more shares on your account.', by: 'Pingoo' },
          { t: 'Ask me anything: productivity tools', ch: 'YouTube', f: 'Live', why: 'There are 112 unanswered questions in your comments.', by: 'Pingoo' },
          { t: 'Rate my desk setup', ch: 'Instagram', f: 'Story poll', why: 'Stories with polls get 3× more replies than plain Stories.', by: 'Pingoo' },
          { t: 'The 4-day content week', ch: 'LinkedIn', f: 'Carousel', why: 'Carousels are your best-performing format on LinkedIn.', by: 'Pingoo' }
        ],
        notes: [
          { a: 1, text: 'No paid ads during this campaign. We want to see what organic can do first.', when: 'Oct 2', pinned: true, tag: 'Whole campaign' },
          { a: 2, text: '@Teo I can film all three videos on Tuesday morning if the scripts are ready by Monday.', when: 'Today, 11:20', pinned: false, tag: 'Week 41' },
          { a: 0, text: 'LinkedIn posts go out from the company page, not personal profiles.', when: 'Oct 1', pinned: false, tag: '' }
        ],
        wrap: null },
      { id: 'bf', name: 'Black Friday offer', status: 'draft', si: 6, len: 2, start: 'Nov 23', end: 'Dec 6', weekIdx: 0,
        summary: 'Our biggest offer of the year, with a waitlist first and launch-week reminders after.',
        goalType: 'signups', target: '120', goalText: 'Get 120 trial sign-ups', goalNote: 'Last year’s offer brought in 74.',
        prog: { label: 'Trial sign-ups', base: 0, now: 0, target: 120, unit: '' },
        audience: 'Current followers and newsletter readers', chans: ['Instagram', 'LinkedIn', 'X'],
        messages: ['Our biggest offer of the year.', 'Plan a whole quarter in an afternoon.', 'Ends Monday at midnight.'],
        weeks: [{ w: 'Week 48', d: 'Nov 23 – 29', f: 'Teaser posts and waitlist', added: [] }, { w: 'Week 49', d: 'Nov 30 – Dec 6', f: 'Launch day and last-chance reminders', added: [] }],
        rows: [{ t: 'Waitlist teaser', ch: 'Instagram', f: 'Reel', st: 'Not started', stCls: 's-draft', d: 'Nov 24' }, { t: 'Why we’re doing this', ch: 'LinkedIn', f: 'Post', st: 'Not started', stCls: 's-draft', d: 'Nov 25' }, { t: 'The offer is live', ch: 'X', f: 'Thread', st: 'Not started', stCls: 's-draft', d: 'Nov 27' }, { t: 'Last chance', ch: 'Instagram', f: 'Story', st: 'Not started', stCls: 's-draft', d: 'Nov 30' }],
        ideas: [
          { t: 'Countdown Stories for the last 3 days', ch: 'Instagram', f: 'Story', why: 'Countdown stickers send reminders to everyone who taps them.', by: 'Pingoo' },
          { t: 'Customer story: a quarter planned in one afternoon', ch: 'LinkedIn', f: 'Post', why: 'Customer stories are your most-shared LinkedIn posts.', by: 'Pingoo' }
        ],
        notes: [{ a: 3, text: 'Legal needs to check the offer wording before Nov 16.', when: 'Sep 29', pinned: true, tag: 'Whole campaign' }],
        wrap: null },
      { id: 'launch', name: 'Pingoo 2.0 launch', status: 'completed', si: -1, len: 2, start: 'Jun 22', end: 'Jul 5', weekIdx: 1,
        summary: 'Two weeks introducing the new Pingoo to existing users and productivity creators.',
        goalType: 'reach', target: '250000', goalText: 'Reach 250,000 people', goalNote: 'Finished at 286K, 14% past the goal.',
        prog: { label: 'People reached', base: 0, now: 286000, target: 250000, unit: '' },
        audience: 'Existing users and productivity creators', chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'],
        messages: ['Meet the new Pingoo.', 'One focus a week.', 'Know what to post next.'],
        weeks: [{ w: 'Week 26', d: 'Jun 22 – 28', f: 'Teasers and countdown', res: '118K reached', done: 'Worked', added: [] }, { w: 'Week 27', d: 'Jun 29 – Jul 5', f: 'Launch film and walkthroughs', res: '168K reached', done: 'Worked', added: [] }],
        rows: [{ t: 'Launch film', ch: 'YouTube', f: 'Video', st: 'Published', stCls: 's-pub', d: 'Jun 29' }, { t: 'What’s new in 60 seconds', ch: 'Instagram', f: 'Reel', st: 'Published', stCls: 's-pub', d: 'Jun 30' }, { t: 'Founder story', ch: 'LinkedIn', f: 'Post', st: 'Published', stCls: 's-pub', d: 'Jul 1' }, { t: 'Feature tour', ch: 'TikTok', f: 'Short video', st: 'Published', stCls: 's-pub', d: 'Jul 2' }],
        ideas: [],
        notes: [{ a: 1, text: 'Wrap-up: the launch film did best by far. Let’s reuse that format for the next launch.', when: 'Jul 6', pinned: true, tag: 'Wrap-up' }],
        wrap: { verdict: 'Goal beaten', vk: 'v-good', headline: '286K people reached, 14% past the goal.', goal: '250K people', result: '286K people', best: 'Launch film · YouTube · 92K views',
          lessons: ['Two weeks of teasers built a waitlist of 1,900 people', 'The launch film did best on YouTube and LinkedIn', 'Reels with captions beat Reels without by 40%'] } }
    ];
  },

  goalTypes(this: any) {
    const n = (v) => Math.round(v).toLocaleString('en-US');
    const k = (v) => v >= 1000 ? (v / 1000).toFixed(v >= 100000 ? 0 : 1).replace('.0', '') + 'K' : n(v);
    return {
      engagement: { title: 'Engagement', desc: 'More likes, comments, saves and shares', now: '4.8%', unit: '%', base: 4.8, label: 'Engagement rate', sug: '6.0', sugLabel: 'a 6.0% engagement rate',
        sugWhy: 'Your rate grew 0.6 points last month, so 6.0% is ambitious but realistic.', targetLabel: 'Target engagement rate (%)', text: (t) => 'Reach a ' + t.toFixed(1) + '% engagement rate' },
      reach: { title: 'Reach', desc: 'Get in front of more new people', now: '142.5K a week', unit: '', base: 142500, label: 'People reached per week', sug: '180000', sugLabel: '180K people a week',
        sugWhy: 'That’s 26% more than now and close to your best week this year.', targetLabel: 'People reached per week', text: (t) => 'Reach ' + k(t) + ' people a week' },
      followers: { title: 'Followers', desc: 'Grow your audience', now: '1,180 a week', unit: '', base: 1180, label: 'New followers per week', sug: '1500', sugLabel: '1,500 new followers a week',
        sugWhy: 'Your follower growth is up 18%, so 1,500 a week is within reach.', targetLabel: 'New followers per week', text: (t) => 'Gain ' + n(t) + ' new followers a week' },
      signups: { title: 'Sign-ups', desc: 'Turn followers into customers', now: '18 a week', unit: '', base: 18, label: 'Sign-ups per week', sug: '30', sugLabel: '30 sign-ups a week',
        sugWhy: 'Connect Google Analytics so Pingoo can see which posts bring in sign-ups.', targetLabel: 'Sign-ups from social per week', text: (t) => 'Get ' + n(t) + ' sign-ups a week from social' }
    };
  },

  ideasFor(this: any, type) {
    const I = {
      engagement: [{ t: 'Open with a question', ch: 'Instagram', f: 'Reel', why: 'Posts that open with a question get 2× more comments on your account.', by: 'Pingoo' }, { t: 'Behind-the-scenes Story series', ch: 'Instagram', f: 'Story', why: 'Stories with polls get 3× more replies than plain Stories.', by: 'Pingoo' }],
      reach: [{ t: 'Collab post with a creator your size', ch: 'Instagram', f: 'Reel', why: 'Collab posts show up for both audiences.', by: 'Pingoo' }, { t: 'Repost your best Reel on TikTok', ch: 'TikTok', f: 'Short video', why: 'Your last repost reached 22% more people.', by: 'Pingoo' }],
      followers: [{ t: 'Pinned “Start here” Reel', ch: 'Instagram', f: 'Reel', why: 'Your pinned Reel turned 7.4% of profile visitors into followers.', by: 'Pingoo' }, { t: 'A weekly series with a name', ch: 'TikTok', f: 'Series', why: 'Named series give people a reason to follow for the next part.', by: 'Pingoo' }],
      signups: [{ t: 'Customer story with one clear link', ch: 'LinkedIn', f: 'Post', why: 'Customer stories are your most-shared LinkedIn posts.', by: 'Pingoo' }, { t: 'Free template in exchange for an email', ch: 'Instagram', f: 'Carousel', why: 'Your planning template is your most-saved post.', by: 'Pingoo' }]
    };
    return I[type].slice();
  },

  startDate(this: any, i) { return new Date(2026, 9, 12 + 7 * i); },

  fmtD(this: any, dt) { const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return M[dt.getMonth()] + ' ' + dt.getDate(); },

  parseNum(this: any, v) { const x = parseFloat(String(v || '').replace(/[^0-9.]/g, '')); return isNaN(x) ? 0 : x; },

  fmtProg(this: any, p, v) {
    if (p.unit === '%') return v.toFixed(1) + '%';
    return v >= 1000 ? (v / 1000).toFixed(v >= 100000 ? 0 : 1).replace('.0', '') + 'K' : Math.round(v).toLocaleString('en-US');
  },

  setWz(this: any, patch) { this.setState({ wz: Object.assign({}, this.state.wz, patch) }); },

  updCamp(this: any, idx, fn) { this.setState({ camps: this.state.camps.map((c, i) => i === idx ? fn(Object.assign({}, c)) : c) }); },

  blankWz(this: any) {
    return { open: false, step: 0, maxStep: 0, editIdx: -1, name: '', summary: '', start: 0, len: 4, goalType: 'engagement', target: '', audience: '',
      chans: { Instagram: true, TikTok: true, LinkedIn: true, YouTube: false, X: false }, m0: '', m1: '', m2: '', err: '' };
  },

  openWizard(this: any, idx, step, asTemplate) {
    const w = this.blankWz();
    w.open = true;
    if (idx != null && idx >= 0) {
      const c = this.state.camps[idx];
      const chans = {}; ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'].forEach((n) => { chans[n] = c.chans.indexOf(n) > -1; });
      Object.assign(w, {
        name: asTemplate ? c.name + ' (copy)' : c.name, summary: c.summary, start: c.si >= 0 && !asTemplate ? c.si : 0,
        len: [2, 4, 6].indexOf(c.len) > -1 ? c.len : 4, goalType: c.goalType, target: c.target,
        audience: c.audience, chans: chans, m0: c.messages[0] || '', m1: c.messages[1] || '', m2: c.messages[2] || '',
        editIdx: asTemplate ? -1 : idx, step: step || 0, maxStep: 4
      });
    }
    this.setState({ wz: w, pop: null });
  },

  wzValidate(this: any, step) {
    const W = this.state.wz;
    if (step === 0 && !W.name.trim()) return 'Give your campaign a name.';
    if (step === 1 && !(this.parseNum(W.target) > 0)) return 'Enter a target, or use Pingoo’s suggestion.';
    if (step === 2 && !Object.keys(W.chans).some((k) => W.chans[k])) return 'Pick at least one channel.';
    return '';
  },

  wzFinish(this: any, status) {
    for (let st = 0; st < 3; st++) { const e = this.wzValidate(st); if (e) { this.setWz({ step: st, err: e }); return; } }
    const W = this.state.wz, GT = this.goalTypes(), g = GT[W.goalType], t = this.parseNum(W.target);
    const start = this.startDate(W.start), end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + W.len * 7 - 1);
    const sun = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 1);
    const prev = W.editIdx >= 0 ? this.state.camps[W.editIdx] : null;
    let weeks;
    if (prev && prev.si === W.start && prev.len === W.len) weeks = prev.weeks;
    else {
      weeks = [];
      for (let i = 0; i < W.len; i++) {
        const a = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i * 7), b = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 6);
        weeks.push({ w: 'Week ' + (42 + W.start + i), d: this.fmtD(a) + ' – ' + (a.getMonth() === b.getMonth() ? b.getDate() : this.fmtD(b)),
          f: i === 0 ? 'Pingoo plans this on Sunday, ' + this.fmtD(sun) : 'Planned after week ' + (41 + W.start + i) + '’s results', added: [] });
      }
    }
    const msgs = [W.m0, W.m1, W.m2].map((m) => m.trim()).filter(Boolean);
    const data = {
      name: W.name.trim(), si: W.start, len: W.len, start: this.fmtD(start), end: this.fmtD(end),
      summary: W.summary.trim() || 'A ' + W.len + '-week campaign to ' + g.text(t).charAt(0).toLowerCase() + g.text(t).slice(1) + '.',
      goalType: W.goalType, target: String(t), goalText: g.text(t), goalNote: 'Currently ' + g.now + '. Pingoo plans each week to close the gap.',
      prog: { label: g.label, base: g.base, now: g.base, target: t, unit: g.unit },
      audience: W.audience.trim() || 'Not set yet', chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'].filter((n) => W.chans[n]),
      messages: msgs.length ? msgs : ['Add your first key message.'], weeks: weeks
    };
    let camps, idx;
    if (prev) {
      camps = this.state.camps.map((c, i) => i === W.editIdx ? Object.assign({}, c, data, { status: status }) : c);
      idx = W.editIdx;
    } else {
      camps = this.state.camps.concat([Object.assign({ id: 'c' + Date.now(), status: status, weekIdx: 0, rows: [], ideas: this.ideasFor(W.goalType), notes: [], wrap: null }, data)]);
      idx = camps.length - 1;
    }
    this.setState({ camps: camps, campIdx: idx, planTab: 'overview', wz: this.blankWz(), screen: 'planner' });
    this.showToast(status === 'scheduled' ? 'Campaign scheduled. It starts on Mon, ' + this.fmtD(start) + '.' : 'Saved as a draft. Finish it whenever you’re ready.');
  },

  lifeSet(this: any, idx, status) {
    const c = this.state.camps[idx];
    if (status === 'scheduled' && !(this.parseNum(c.target) > 0)) { this.openWizard(idx, 1); return; }
    this.updCamp(idx, (x) => { x.status = status; if (status === 'active') x.weekIdx = 0; return x; });
    this.showToast(status === 'scheduled' ? 'Scheduled. Pingoo will plan week 1 the Sunday before it starts.' : 'Campaign started. Pingoo is planning week 1 now.');
  },

  endCampaign(this: any, idx, nowV, raw) {
    const c = this.state.camps[idx], p = c.prog;
    const met = nowV >= p.target;
    const lessons = c.id === 'autumn'
      ? (this.state.resultsReady ? raw.learn.points.slice() : ['Week 1 was still running, so the results are partial', 'Short video led engagement again', 'Keep Tue–Thu mornings for your next campaign'])
      : ['The campaign ended before Pingoo had enough data', 'Weekly plans, ideas and notes are all saved', 'Use it as a template to start again in a few clicks'];
    this.updCamp(idx, (x) => {
      x.status = 'completed';
      x.weeks = x.weeks.map((w, i) => i < x.weekIdx ? Object.assign({}, w, { done: 'Done' }) : i === x.weekIdx ? Object.assign({}, w, { done: 'Done', f: w.f === '@current' ? raw.title : w.f, res: w.f === '@current' ? (this.state.resultsReady ? this.fmt(raw, raw.result) + ' · ' + raw.learn.verdict : 'Partial week') : w.res }) : Object.assign({}, w, { cancelled: true, res: '—' }));
      x.prog = Object.assign({}, p, { now: nowV });
      x.wrap = { verdict: met ? 'Goal reached' : 'Ended early', vk: met ? 'v-good' : 'v-mid',
        headline: met ? this.fmtProg(p, nowV) + ', goal reached.' : 'Ended at ' + this.fmtProg(p, nowV) + ', on the way to ' + this.fmtProg(p, p.target) + '.',
        goal: this.fmtProg(p, p.target) + ' · ' + p.label.toLowerCase(), result: this.fmtProg(p, nowV),
        best: c.id === 'autumn' ? raw.drafts[0].t + ' · ' + raw.drafts[0].plat : 'Not enough data yet', lessons: lessons };
      x.goalNote = 'Ended at ' + this.fmtProg(p, nowV) + '.';
      return x;
    });
    this.setState({ confirmEnd: false, planTab: 'overview' });
    this.showToast('Campaign ended. Pingoo wrote the wrap-up.');
  },
};
