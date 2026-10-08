// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Moving, skipping and removing posts in the weekly plan.
export const scheduleMethods: Record<string, any> = {
  movePost(this: any, p, day, wk) {
    const st = this.state, D = this.D();
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const fromWk = p.wk || 0, toWk = wk == null ? fromWk : wk;
    if (p.day === day && fromWk === toWk) return;
    if (p.isPlan && toWk !== 0) { this.showToast('Plan posts stay in this week. Skip it instead if it can’t happen.'); return; }
    const snap = { planDay: st.planDay || {}, staticDay: st.staticDay || {}, others: st.others, otherSeq: st.otherSeq, otherReady: st.otherReady, selOther: st.selOther };
    if (p.isPlan) { const pd = Object.assign({}, st.planDay || {}); pd[p.planI] = day; this.setState({ planDay: pd }); }
    else if (p.otherK != null) this.setState({ others: st.others.map((o, j) => j === p.otherK ? Object.assign({}, o, { day: day, wk: toWk, time: o.time || this.dayTip(day)[0] }) : o) });
    else if (p.srcI != null) {
      const src = D.OTHERS[p.srcI], id = st.otherSeq;
      const rd = Object.assign({}, st.otherReady); if (src.st === 'sched') rd[id] = true;
      this.setState({ others: st.others.concat([{ id: id, t: src.t, plat: src.plat, fmt: src.fmt, src: p.srcI, day: day, wk: toWk, time: src.time, st: src.st, owner: src.owner }]), otherSeq: id + 1, otherReady: rd });
    } else return;
    const wkTxt = toWk === fromWk ? '' : toWk === 0 ? ' this week' : toWk === 1 ? ' next week' : toWk > 1 ? ' in ' + toWk + ' weeks' : '';
    this.showToast('Moved to ' + DAYS[day] + wkTxt + '. Pingoo: ' + this.dayTip(day)[1], () => this.setState(Object.assign({}, snap, { toastOn: false, toastHasUndo: false })));
  },

  skipPlan(this: any, i, on) {
    const st = this.state, sk = (st.skipped || [false, false, false]).slice();
    if (on && sk.filter((x) => !x).length <= 1) { this.showToast('Keep at least one post in this week’s plan.'); return; }
    const snap = { skipped: st.skipped || [false, false, false], approved: st.approved, sel: st.sel };
    sk[i] = !!on;
    const ap = st.approved.slice(); if (on) ap[i] = false;
    let sel = st.sel; if (on && st.selOther == null && sel === i) { const nx = [1, 2].map((k) => (i + k) % 3).find((k) => !sk[k]); if (nx !== undefined) sel = nx; }
    this.setState({ skipped: sk, approved: ap, sel: on ? sel : st.sel, confirmWarn: false });
    const D = this.D(), dr = this.betsFor(st.week)[st.betIdx].drafts[i];
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const nm = dr ? DAYS[D.SLOTS[i][0]] + '’s ' + dr.fmt.toLowerCase() : 'This post';
    if (on) this.showToast('Skipped ' + nm + '. Pingoo noted it for next week.', () => this.setState(Object.assign({}, snap, { toastOn: false, toastHasUndo: false })));
    else this.showToast(nm.charAt(0).toUpperCase() + nm.slice(1) + ' is back in the plan.');
  },

  removeOther(this: any, k) {
    const st = this.state, o = st.others[k]; if (!o) return;
    const snap = { others: st.others, selOther: st.selOther, otherReady: st.otherReady, deletedSrc: st.deletedSrc || {} };
    const rd = Object.assign({}, st.otherReady); delete rd[o.id];
    const ds = Object.assign({}, st.deletedSrc || {}); if (o.src != null) ds[o.src] = true;
    let so = st.selOther; if (so === k) so = null; else if (so != null && so > k) so = so - 1;
    this.setState({ others: st.others.filter((x, j) => j !== k), selOther: so, otherReady: rd, deletedSrc: ds, capExpanded: false, confirmWarn: false });
    this.showToast('“' + o.t + '” deleted.', () => this.setState(Object.assign({}, snap, { toastOn: false, toastHasUndo: false })));
  },

  removeStatic(this: any, si, t) {
    const snap = Object.assign({}, this.state.deletedSrc || {});
    const ds = Object.assign({}, snap); ds[si] = true;
    this.setState({ deletedSrc: ds });
    this.showToast('“' + t + '” deleted.', () => this.setState({ deletedSrc: snap, toastOn: false, toastHasUndo: false }));
  },
};
