// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: lessons.
export function viewLessons(this: any, c: any): any {
  const { s, raw, g } = c;
  const lessonsAll = this.lessonsData().map((l) => {
    const o = Object.assign({}, l, s.lessonOv[l.id] || {});
    if (l.id === 'video' && s.resultsReady && raw.kind === 'Video' && !s.lessonOv[l.id]) o.ev = 'Proven in 4 weeks · latest: week ' + s.week;
    return o;
  });
  const liveLessons = lessonsAll.filter((l) => !s.lessonRemoved[l.id]);
  const LG = [['confirmed', 'Confirmed', 'l-conf', 'Pingoo plans around these'], ['testing', 'Testing', 'l-test', 'Seen once or being checked again'], ['retired', 'Retired', 'l-ret', 'Didn’t work, so Pingoo stopped suggesting them']];
  const lessonGroups = LG.map((g) => ({
    label: g[1], cls: g[2], hint: g[3],
    items: liveLessons.filter((l) => l.status === g[0]).map((l) => ({
      title: l.title, detail: l.detail, ev: l.ev, fixing: s.lessonFix === l.id, notFixing: s.lessonFix !== l.id,
      fix: () => this.setState({ lessonFix: l.id }), cancel: () => this.setState({ lessonFix: null }),
      seeWeeks: () => this.go('results'),
      remove: () => { const r = Object.assign({}, this.state.lessonRemoved); r[l.id] = true; this.setState({ lessonRemoved: r, lessonFix: null }); this.showToast('Removed. Pingoo won’t use this lesson anymore.'); },
      retest: () => { const o = Object.assign({}, this.state.lessonOv); o[l.id] = { status: 'testing', ev: 'Retesting at your request · next result on Sunday' }; this.setState({ lessonOv: o, lessonFix: null }); this.showToast('Moved to Testing. Pingoo will check it again.'); }
    }))
  })).filter((g) => g.items.length);
  const removedLessons = lessonsAll.filter((l) => s.lessonRemoved[l.id]).map((l) => ({ title: l.title, restore: () => { const r = Object.assign({}, this.state.lessonRemoved); delete r[l.id]; this.setState({ lessonRemoved: r }); this.showToast('Lesson restored'); } }));
  const traits = this.traitsData().filter((t) => !s.traitsOff[t.t]).map((t) => ({ t: t.t, d: t.d, remove: () => { const o = Object.assign({}, this.state.traitsOff); o[t.t] = true; this.setState({ traitsOff: o }); this.showToast('Got it. Drafts won’t use “' + t.t.toLowerCase() + '” anymore.'); } }));
  return { lessonsAll, liveLessons, LG, lessonGroups, removedLessons, traits };
}
