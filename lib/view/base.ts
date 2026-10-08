// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Shared values every screen needs (this week’s plan, navigation).
export function viewBase(this: any, c: any): any {
  const s = this.state, d = this.D();
  const bets = this.betsFor(s.week);
  const raw = bets[s.betIdx];
  const accepted = s.decision === 'accepted', skipped = s.decision === 'skipped';
  const skippedArr = s.skipped || [false, false, false];
  const approvedCount = s.approved.filter((x, i) => x && !skippedArr[i]).length;
  const planN = 3 - skippedArr.filter(Boolean).length;
  const goTo = (k) => () => this.go(k);
  const navCls = (k) => (s.screen === k ? 'is-active' : '');
  const screens = ['home', 'coach', 'planner', 'create', 'calendar', 'results', 'audience', 'team', 'integrations', 'settings'];
  const is = {}; screens.forEach((k) => { is[k] = s.screen === k; });
  const nav = {}; screens.forEach((k) => { nav[k] = navCls(k); });

  const bet = Object.assign({}, raw, {
    baseStr: this.fmt(raw, raw.base), targetStr: this.fmt(raw, raw.target),
    evidence: raw.evidence.map((e, i) => ({ n: '0' + (i + 1), label: e.label, detail: e.detail, stat: e.stat, w: e.pct + '%', d: (0.15 + i * 0.12) + 's' }))
  });
  return { s, d, bets, raw, accepted, skipped, skippedArr, approvedCount, planN, goTo, navCls, screens, is, nav, bet };
}
