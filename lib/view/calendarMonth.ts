// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: month view.
export function viewCalendarMonth(this: any, c: any): any {
  const { s, weekPosts, byChan, todayStr, MN, allPosts, accepted, DN } = c;
  const base = this.dayDate(s.week, 0);
  const mFirst = new Date(2026, 9 + s.calMonth, 1);
  const mLast = new Date(mFirst.getFullYear(), mFirst.getMonth() + 1, 0);
  const gridStart = new Date(mFirst.getFullYear(), mFirst.getMonth(), 1 - ((mFirst.getDay() + 6) % 7));
  const cellCount = Math.ceil((((mFirst.getDay() + 6) % 7) + mLast.getDate()) / 7) * 7;
  let monthTotal = 0;
  const monthCells = [];
  for (let k = 0; k < cellCount; k++) {
    const dt = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + k);
    const diff = Math.round((dt - base) / 864e5);
    const off = Math.floor(diff / 7), idx = ((diff % 7) + 7) % 7;
    const posts = weekPosts(off).filter(byChan).filter((p) => p.day === idx);
    const inMonth = dt.getMonth() === mFirst.getMonth();
    if (inMonth) monthTotal += posts.length;
    monthCells.push({
      num: dt.getDate(),
      items: posts.slice(0, 3).map((p) => ({ t: p.t, c: p.c, ab: p.ab, plat: p.plat })),
      more: posts.length > 3, moreN: posts.length - 3,
      cls: (inMonth ? '' : 'is-out ') + (off === 0 ? 'is-week ' : '') + (dt.toDateString() === todayStr ? 'is-today' : ''),
      label: MN[dt.getMonth()] + ' ' + dt.getDate() + ': ' + (posts.length ? posts.length + (posts.length === 1 ? ' post' : ' posts') : 'nothing scheduled') + '. Open week',
      pick: () => this.setState({ calView: 'week', calOff: off })
    });
  }
  const isWeekView = s.calView === 'week';
  const wkFirst = this.dayDate(s.week + s.calOff, 0);
  const chanFilters = ['All', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'].map((c) => ({ label: c, on: s.chan === c, cls: s.chan === c ? 'is-on' : '', pick: () => this.setState({ chan: c }) }));
  const comingUp = allPosts.filter((p) => p.status !== 'Published' && (!p.isPlan || accepted)).sort((a, b) => a.day - b.day).slice(0, 3)
    .map((p) => ({ t: p.t, when: DN[p.day] + ', ' + p.time, ab: p.ab, c: p.c, status: p.status, stCls: p.stCls }));
  return { base, mFirst, mLast, gridStart, cellCount, monthTotal, monthCells, isWeekView, wkFirst, chanFilters, comingUp };
}
