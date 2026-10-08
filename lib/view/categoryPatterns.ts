// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: category patterns.
export function viewCategoryPatterns(this: any, c: any): any {
  const { s, raw } = c;
  const PSTAT = { plan: 'In this week’s drafts', proven: 'Proven for you', untried: 'Not tried yet', failed: 'Didn’t work for you', off: 'Turned off' };
  const patterns = this.patternsData().map((p) => {
    const st = !s.useCategory && (p.status === 'plan' || p.status === 'untried') ? 'off' : p.status;
    return Object.assign({}, p, { status: PSTAT[st], cls: 'ps-' + st, trendCls: p.trend.charAt(0) === '−' ? 'down' : 'up' });
  });
  const planPlats = raw.drafts.map((x) => x.plat).filter((x, i, a) => a.indexOf(x) === i);
  return { PSTAT, patterns, planPlats };
}
