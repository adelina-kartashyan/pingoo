// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: home checks.
export function viewHomeChecklist(this: any, c: any): any {
  const { accepted, skipped, goTo, approvedCount, planN, s, raw } = c;
  const checks = [
    { t: 'Pick this week’s plan', s: accepted ? 'Done' : (skipped ? 'Skipped this week' : 'Use it, swap it or skip it'), done: accepted, go: goTo('home') },
    { t: 'Approve your drafts', s: approvedCount + ' of ' + planN + ' approved', done: approvedCount > 0, go: goTo('create') },
    { t: 'Schedule your posts', s: s.live ? 'Scheduled' : raw.when, done: s.live, go: goTo('calendar') },
    { t: 'Check your results', s: s.resultsReady ? 'Done' : 'Sunday evening', done: s.resultsReady, go: goTo('results') }
  ].map((c) => Object.assign(c, { cls: c.done ? 'is-done' : '' }));
  const doneCount = checks.filter((c) => c.done).length;
  return { checks, doneCount };
}
