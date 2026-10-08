// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: wizard.
export function viewCampaignWizard(this: any, c: any): any {
  const { s, m } = c;
  const W = s.wz, GT = this.goalTypes();
  const WSTEPS = ['Basics', 'Goal', 'Audience', 'Messages', 'Review'];
  const wStart = this.startDate(W.start), wEnd = new Date(wStart.getFullYear(), wStart.getMonth(), wStart.getDate() + W.len * 7 - 1);
  const wSun = new Date(wStart.getFullYear(), wStart.getMonth(), wStart.getDate() - 1);
  const g = GT[W.goalType];
  const wChans = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'];
  const wz = {
    open: W.open, kicker: W.editIdx >= 0 ? 'Edit campaign' : 'New campaign', title: W.name.trim() || 'Untitled campaign',
    steps: WSTEPS.map((label, i) => ({ n: i < W.step ? '✓' : String(i + 1), label: label, cls: i < W.step ? 'is-done' : i === W.step ? 'is-on' : '', current: i === W.step ? 'step' : 'false', locked: i > W.maxStep, go: () => this.setWz({ step: i, err: '' }) })),
    s0: W.step === 0, s1: W.step === 1, s2: W.step === 2, s3: W.step === 3, s4: W.step === 4,
    name: W.name, summary: W.summary, start: String(W.start),
    startOpts: [0, 1, 2, 3, 4, 5, 6].map((i) => ({ v: String(i), label: 'Mon, ' + this.fmtD(this.startDate(i)) })),
    lenOpts: [2, 4, 6].map((n) => ({ label: n + ' weeks', on: W.len === n, cls: W.len === n ? 'is-on' : '', pick: () => this.setWz({ len: n }) })),
    rangeText: 'Mon, ' + this.fmtD(wStart) + ' to Sun, ' + this.fmtD(wEnd),
    goalOpts: Object.keys(GT).map((k) => ({ title: GT[k].title, desc: GT[k].desc, now: GT[k].now, on: W.goalType === k, cls: W.goalType === k ? 'is-on' : '', pick: () => this.setWz({ goalType: k, target: '', err: '' }) })),
    targetLabel: g.targetLabel, sug: g.sug, sugLabel: g.sugLabel, sugWhy: g.sugWhy, target: W.target,
    audience: W.audience,
    chanOpts: wChans.map((n) => Object.assign({ n: n, on: !!W.chans[n], cls: W.chans[n] ? 'is-on' : '', pick: () => { const c = Object.assign({}, this.state.wz.chans); c[n] = !c[n]; this.setWz({ chans: c, err: '' }); } }, this.ch(n))),
    m0: W.m0, m1: W.m1, m2: W.m2,
    review: [
      { k: 'Name', v: W.name, edit: () => this.setWz({ step: 0 }) },
      { k: 'Dates', v: this.fmtD(wStart) + ' – ' + this.fmtD(wEnd) + ' · ' + W.len + ' weeks', edit: () => this.setWz({ step: 0 }) },
      { k: 'Goal', v: this.parseNum(W.target) > 0 ? g.text(this.parseNum(W.target)) : 'Not set', edit: () => this.setWz({ step: 1 }) },
      { k: 'Audience', v: W.audience.trim() || 'Not set yet', edit: () => this.setWz({ step: 2 }) },
      { k: 'Channels', v: wChans.filter((n) => W.chans[n]).join(', ') || 'None', edit: () => this.setWz({ step: 2 }) },
      { k: 'Key messages', v: [W.m0, W.m1, W.m2].filter((m) => m.trim()).join(' · ') || 'None yet', edit: () => this.setWz({ step: 3 }) }
    ],
    nextText: 'Pingoo will suggest the first weekly plan on Sunday, ' + this.fmtD(wSun) + ', and your team gets a heads-up the same day. You can change anything until the campaign starts.',
    hasErr: !!W.err, err: W.err, canBack: W.step > 0, notLast: W.step < 4, isLast: W.step === 4,
    finishLabel: W.editIdx >= 0 && s.camps[W.editIdx] && s.camps[W.editIdx].status === 'scheduled' ? 'Save changes' : 'Schedule campaign'
  };
  return { W, GT, WSTEPS, wStart, wEnd, wSun, g, wChans, wz };
}
