// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: planner.
export function viewPlanner(this: any, c: any): any {
  const { s, raw, planPosts, DN, d, res, accepted, skipped, goTo, m } = c;
  const CI = Math.min(s.campIdx, s.camps.length - 1);
  const cRaw = s.camps[CI];
  const LIFE = ['draft', 'scheduled', 'active', 'completed'];
  const STAT = { draft: ['Draft', 's-draft'], scheduled: ['Scheduled', 's-ready'], active: ['Active', 's-pub'], completed: ['Completed', 's-live'] };
  const campNow = (c) => (c.id === 'autumn' && c.status === 'active' && s.resultsReady ? raw.result : c.prog.now);
  const campPct = (c) => c.status === 'completed' ? 100 : c.status === 'active' ? Math.round((c.weekIdx + 1) / c.weeks.length * 100) : 0;
  const planRows = raw.drafts.map((dr, i) => ({ t: dr.t, ch: dr.plat, f: dr.fmt, st: planPosts[i].status, stCls: planPosts[i].stCls, d: DN[d.SLOTS[i][0]] + ', Oct ' + this.dayDate(s.week, d.SLOTS[i][0]).getDate() }))
    .concat([{ t: 'Office hours: your questions, live', ch: 'YouTube', f: 'Live', st: 'Scheduled', stCls: 's-live', d: 'Wed, Oct 7' }, { t: 'Weekly recap', ch: 'LinkedIn', f: 'Carousel', st: 'Draft', stCls: 's-draft', d: 'Sun, Oct 11' }]);
  const WST = { 'This week': 's-ready', 'Next': 's-draft', 'Later': 's-draft', 'Planned': 's-draft', 'Done': 's-pub', 'Worked': 's-pub', 'Cancelled': 's-sugg' };
  const weeksView = cRaw.weeks.map((w, i) => {
    let st;
    if (w.cancelled) st = 'Cancelled';
    else if (cRaw.status === 'completed') st = w.done || 'Done';
    else if (cRaw.status === 'active') st = i < cRaw.weekIdx ? 'Done' : i === cRaw.weekIdx ? 'This week' : i === cRaw.weekIdx + 1 ? 'Next' : 'Later';
    else st = 'Planned';
    let f = w.f, res = w.res || '';
    if (f === '@current') {
      f = accepted ? raw.title : skipped ? 'Skipped this week' : raw.title + ' (suggested)';
      if (cRaw.status === 'active') res = s.resultsReady ? this.fmt(raw, raw.result) + ' · ' + raw.learn.verdict : s.live ? 'Live · results on Sunday' : accepted ? 'In progress' : 'Waiting for you to pick the plan';
    }
    return { w: w.w, d: w.d, f: f, res: res, st: st, stCls: WST[st] || 's-draft', added: w.added || [], cls: st === 'This week' ? 'is-now' : '', isNow: st === 'This week', goHome: goTo('home') };
  });
  const pr = cRaw.prog, prNow = campNow(cRaw), prMax = Math.max(pr.target, prNow) * 1.08;
  const ideaWeeks = cRaw.status === 'completed' ? [] : cRaw.weeks.map((w, i) => ({ w: w, i: i })).filter((x) => !x.w.cancelled && (cRaw.status !== 'active' || x.i >= cRaw.weekIdx));
  const notesSorted = cRaw.notes.map((n, k) => ({ n: n, k: k })).sort((a, b) => (b.n.pinned ? 1 : 0) - (a.n.pinned ? 1 : 0) || a.k - b.k);
  const tlKind = cRaw.status === 'active' ? 'active' : cRaw.status === 'completed' ? 'done' : 'draft';
  const timeline = weeksView.map((w, i) => {
    const filled = cRaw.status === 'completed' ? !w.cancelled && w.st !== 'Cancelled' : cRaw.status === 'active' ? i <= cRaw.weekIdx : false;
    return { w: w.w, d: w.d, f: w.f, st: w.st, res: w.res, hasRes: !!w.res, stCls: w.stCls,
      cls: (i === (cRaw.weekIdx || 0) && cRaw.status === 'active' ? 'is-now' : '') + (w.st === 'Cancelled' ? ' is-cancel' : ''),
      ticks: [0, 1, 2, 3, 4, 5, 6].map((k) => ({ cls: filled ? 'on' : '', d: (filled ? (i * 7 + k) * 0.02 : 0).toFixed(2) + 's' })),
      label: w.w + ', ' + w.d + ': ' + w.f + '. ' + w.st + (w.res ? ', ' + w.res : ''),
      open: (i === (cRaw.weekIdx || 0) && cRaw.status === 'active') ? goTo('home') : (w.res ? goTo('results') : () => this.showToast(w.w + ': ' + w.f + (w.st ? ' · ' + w.st : ''))) };
  });
  const camp = {
    timeline: timeline, tlKind: tlKind,
    name: cRaw.name, summary: cRaw.summary, dates: cRaw.start + ' – ' + cRaw.end,
    statusLabel: STAT[cRaw.status][0],
    life: LIFE.map((l, i) => ({ label: STAT[l][0], cls: i < LIFE.indexOf(cRaw.status) ? 'is-done' : i === LIFE.indexOf(cRaw.status) ? 'is-on' : '', current: l === cRaw.status ? 'step' : 'false' })),
    acts: (cRaw.status === 'draft' ? [
        { label: 'Continue setup', cls: 'btn-line', run: () => this.openWizard(CI, 0) },
        { label: 'Schedule campaign', cls: 'btn-acid', run: () => this.lifeSet(CI, 'scheduled') }]
      : cRaw.status === 'scheduled' ? [
        { label: 'Edit details', cls: 'btn-line', run: () => this.openWizard(CI, 0) },
        { label: 'Start now', cls: 'btn-acid', run: () => this.lifeSet(CI, 'active') }]
      : cRaw.status === 'active' ? [
        { label: 'Go to this week’s plan', cls: 'btn-acid', run: goTo('home') },
        { label: 'End campaign', cls: 'btn-line', run: () => this.setState({ confirmEnd: true }) }]
      : [{ label: 'Use as a template', cls: 'btn-acid', run: () => this.openWizard(CI, 0, true) }]),
    pctStr: campPct(cRaw) + '%', dash: (314.16 * (1 - campPct(cRaw) / 100)).toFixed(1),
    doneLabel: cRaw.status === 'active' ? 'Week ' + (cRaw.weekIdx + 1) + ' of ' + cRaw.weeks.length : cRaw.status === 'scheduled' ? 'Starts ' + cRaw.start : cRaw.status === 'draft' ? 'Not started' : 'Finished',
    ringLabel: campPct(cRaw) + '% complete',
    goalText: cRaw.goalText, goalNote: cRaw.goalNote, audience: cRaw.audience,
    chans: cRaw.chans.map((n) => Object.assign({ n: n }, this.ch(n))),
    messages: cRaw.messages,
    hasWrap: !!cRaw.wrap, wrap: cRaw.wrap || { lessons: [] },
    prog: {
      label: pr.label, baseStr: this.fmtProg(pr, pr.base), nowStr: this.fmtProg(pr, prNow), targetStr: this.fmtProg(pr, pr.target),
      nowW: (prNow / prMax * 100).toFixed(1) + '%', goalL: (pr.target / prMax * 100).toFixed(1) + '%',
      aria: pr.label + ': ' + this.fmtProg(pr, prNow) + ' of a ' + this.fmtProg(pr, pr.target) + ' goal'
    },
    weeks: weeksView,
    rows: (cRaw.rows === '@plan' ? planRows : cRaw.rows).map((r) => Object.assign({}, r, this.ch(r.ch))),
    ideas: cRaw.ideas.map((idea, k) => {
      const key = CI + '-' + k;
      const m = idea.ab ? { ab: idea.ab, c: idea.c } : this.ch(idea.ch);
      return { t: idea.t, ch: idea.ch, f: idea.f, why: idea.why, by: idea.by === 'Pingoo' ? 'Pingoo:' : 'Added by ' + idea.by + '.', ab: m.ab, c: m.c,
        open: s.ideaPick === key, noWeeks: ideaWeeks.length === 0,
        toggle: () => this.setState({ ideaPick: this.state.ideaPick === key ? null : key }),
        dismiss: () => { this.updCamp(CI, (c) => { c.ideas = c.ideas.filter((_, j) => j !== k); return c; }); this.setState({ ideaPick: null }); this.showToast('Idea dismissed'); },
        weeks: ideaWeeks.map((x) => ({ label: x.w.w, add: () => {
          this.updCamp(CI, (c) => { c.weeks = c.weeks.map((w, j) => j === x.i ? Object.assign({}, w, { added: (w.added || []).concat([idea.t]) }) : w); c.ideas = c.ideas.filter((_, j) => j !== k); return c; });
          this.setState({ ideaPick: null }); this.showToast('Added to ' + x.w.w + '. Pingoo will build it into that week’s plan.');
        } }))
      };
    }),
    notes: notesSorted.map((x) => {
      const n = x.n, who = d.TEAM[n.a];
      return { n: who.n, i: who.i, c: who.c, when: n.when, text: n.text, pinned: !!n.pinned, hasTag: !!n.tag, tag: n.tag || '', mine: n.a === 0,
        cls: n.pinned ? 'is-pinned' : '', pinLabel: n.pinned ? 'Unpin' : 'Pin as decision',
        pin: () => this.updCamp(CI, (c) => { c.notes = c.notes.map((m, j) => j === x.k ? Object.assign({}, m, { pinned: !m.pinned }) : m); return c; }),
        del: () => { this.updCamp(CI, (c) => { c.notes = c.notes.filter((_, j) => j !== x.k); return c; }); this.showToast('Note deleted'); } };
    })
  };
  camp.hasRows = camp.rows.length > 0; camp.noRows = !camp.hasRows;
  camp.noIdeas = camp.ideas.length === 0; camp.noNotes = camp.notes.length === 0;
  const camps = s.camps.map((c, i) => ({ name: c.name, status: STAT[c.status][0], stCls: STAT[c.status][1], dates: c.start + ' – ' + c.end, pctStr: campPct(c) + '%', tb: (c.status === 'active' ? 'active' : c.status === 'completed' ? 'done' : 'draft'),
    ticks: (() => { const wk = (c.weeks && c.weeks.length) || c.len || 4, n = wk * 7, on = Math.round(campPct(c) / 100 * n); return Array.from({ length: n }, (_, k) => ({ cls: (k < on ? 'on' : (k === on && c.status === 'active' ? 'nx' : '')) + ((k + 1) % 7 === 0 && k < n - 1 ? ' wk-end' : ''), d: (k < on ? k * 0.025 : 0).toFixed(3) + 's' })); })(),
    tbLabel: (() => { const wk = (c.weeks && c.weeks.length) || c.len || 4; return c.status === 'completed' ? 'All ' + wk + ' weeks done' : c.status === 'active' ? 'Week ' + (c.weekIdx + 1) + ' of ' + wk : 'Not started · ' + wk + ' weeks'; })(),
    sel: i === CI, cls: i === CI ? 'is-sel' : '', pick: () => this.setState({ campIdx: i, planTab: 'overview', ideaPick: null }) }));
  const planTabs = [['overview', 'Overview'], ['content', 'Content'], ['ideas', 'Ideas (' + cRaw.ideas.length + ')'], ['notes', 'Notes (' + cRaw.notes.length + ')']]
    .map((t) => ({ label: t[1], on: s.planTab === t[0], cls: s.planTab === t[0] ? 'is-on' : '', pick: () => this.setState({ planTab: t[0], ideaPick: null }) }));
  const endText = cRaw.status === 'active'
    ? 'Week ' + (cRaw.weekIdx + 1) + ' of ' + cRaw.weeks.length + ' is running.' + (cRaw.weeks.length - cRaw.weekIdx - 1 > 0 ? ' The remaining ' + (cRaw.weeks.length - cRaw.weekIdx - 1) + ' weeks will be cancelled.' : '') + ' Everything already posted, plus all notes and ideas, stays saved. Pingoo will write a wrap-up.'
    : '';
  const activeCamp = s.camps.find((c) => c.status === 'active');
  const homeCamp = activeCamp
    ? { has: true, none: false, name: activeCamp.name, meta: activeCamp.start + ' – ' + activeCamp.end + ' · Week ' + (activeCamp.weekIdx + 1) + ' of ' + activeCamp.weeks.length + ' · ' + activeCamp.goalText, pct: campPct(activeCamp) + '%' }
    : { has: false, none: true };
  return { CI, cRaw, LIFE, STAT, campNow, campPct, planRows, WST, weeksView, pr, prNow, prMax, ideaWeeks, notesSorted, tlKind, timeline, camp, camps, planTabs, endText, activeCamp, homeCamp };
}
