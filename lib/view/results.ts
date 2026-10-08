// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: results.
export function viewResults(this: any, c: any): any {
  const { s, d, raw, readyOthers, accepted, goTo, approvedCount, planN } = c;
  const histAll = s.historyExtra.concat(d.HIST);
  const last = s.lastRes || d.W40;
  const resRaw = (s.resultsReady && s.weekView === 0) ? Object.assign({ week: s.week }, raw) : last;
  const max = Math.max(resRaw.target, resRaw.result) * 1.12;
  const now = resRaw.base + (resRaw.result - resRaw.base) * s.prog;
  const res = {
    label: s.resultsReady ? 'This week · Week ' + s.week : 'Last week · Week ' + resRaw.week,
    title: resRaw.title, metric: resRaw.metric, learn: resRaw.learn,
    points: resRaw.learn.points.map((t, i) => ({ n: '0' + (i + 1), t: t })).concat(s.resultsReady && readyOthers.length ? [{ n: '0' + (resRaw.learn.points.length + 1), t: 'Your post “' + readyOthers[0].t + '”, outside the plan, did 1.8× better than usual. Worth testing as a plan.' }] : []),
    scope: s.resultsReady ? 'Measured on the plan’s posts only. All posts this week' + (readyOthers.length ? ', including ' + readyOthers.length + ' outside the plan' : '') + ': ' + this.fmt(resRaw, resRaw.result - 0.6) + '.' : 'Measured on the plan’s posts only. Other posts count toward your overall numbers, not the verdict.',
    now: this.fmt(resRaw, now), baseStr: this.fmt(resRaw, resRaw.base), targetStr: this.fmt(resRaw, resRaw.target),
    fillW: (now / max * 100).toFixed(2) + '%', baseL: (resRaw.base / max * 100) + '%', targetL: (resRaw.target / max * 100) + '%',
    trackLabel: resRaw.metric + ': ' + this.fmt(resRaw, resRaw.result) + ', goal ' + this.fmt(resRaw, resRaw.target)
  };
  const lastRes = { week: last.week, title: last.title, learn: last.learn, metric: last.metric, resultStr: this.fmt(last, last.result), targetStr: this.fmt(last, last.target) };
  const wins = histAll.filter((h) => h.vk === 'v-good').length;

  let statusTitle, statusSub, statusBtn, statusGo;
  if (!accepted) { statusTitle = 'This week’s plan hasn’t started yet.'; statusSub = 'Pick a plan on Home and you’ll see its results here on Sunday.'; statusBtn = 'Go to Home'; statusGo = goTo('home'); }
  else if (!s.live) { statusTitle = 'This week’s plan isn’t live yet.'; statusSub = approvedCount ? approvedCount + ' of ' + planN + ' drafts approved. Schedule them to start tracking.' : 'Approve your drafts and schedule them to start tracking.'; statusBtn = approvedCount ? 'Go to Calendar' : 'Review drafts'; statusGo = goTo(approvedCount ? 'calendar' : 'create'); }
  else { statusTitle = 'This week’s plan is live.'; statusSub = 'Pingoo is tracking every post. Your full report arrives Sunday evening.'; statusBtn = 'Preview Sunday’s report'; statusGo = () => { this.setState({ resultsReady: true }); this.runCount(); this.showToast('Here’s how this week went.'); }; }
  return { histAll, last, resRaw, max, now, res, lastRes, wins, statusTitle, statusSub, statusBtn, statusGo };
}
