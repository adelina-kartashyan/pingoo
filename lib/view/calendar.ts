// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: calendar.
export function viewCalendar(this: any, c: any): any {
  const { raw, s, skippedArr, accepted, d } = c;
  const planPosts = raw.drafts.map((dr, i) => {
    const ok = s.approved[i], sk = !!skippedArr[i];
    const status = sk ? 'Skipped' : !accepted ? 'Suggested' : !ok ? 'Needs approval' : (s.live ? 'Scheduled' : 'Ready to schedule');
    const stCls = sk ? 's-skip' : !accepted ? 's-sugg' : !ok ? 's-need' : (s.live ? 's-live' : 's-ready');
    return { day: (s.planDay && s.planDay[i] != null) ? s.planDay[i] : d.SLOTS[i][0], time: d.SLOTS[i][1], t: dr.t, plat: dr.plat, fmt: dr.fmt, isPlan: true, ownerIdx: s.owners[i], status: status, stCls: stCls, planI: i, off: !accepted || !ok || sk, skipped: sk };
  });
  const imported = {}; s.others.forEach((o) => { if (o.src != null) imported[o.src] = true; });
  const otherPosts = d.OTHERS.map((o, si) => ({ day: (s.staticDay && s.staticDay[si] != null) ? s.staticDay[si] : o.day, time: o.time, t: o.t, plat: o.plat, fmt: o.fmt, isPlan: false, ownerIdx: o.owner, srcI: si, st: o.st,
    status: o.st === 'pub' ? 'Published' : o.st === 'sched' ? 'Scheduled' : 'Draft', stCls: o.st === 'pub' ? 's-pub' : o.st === 'sched' ? 's-live' : 's-draft', off: false })).filter((p) => !imported[p.srcI] && !(s.deletedSrc || {})[p.srcI]);
  const extraOther = s.others.map((o, k) => Object.assign({}, o, { k: k })).filter((o) => (s.otherReady[o.id] || o.src != null || o.day != null) && !o.wk).map((o) => ({ day: o.day != null ? o.day : 4, time: o.time || '3:00 PM', t: o.t, plat: o.plat, fmt: o.fmt, isPlan: false, isOther: true, ownerIdx: o.owner != null ? o.owner : 0, otherK: o.k,
    status: s.otherReady[o.id] ? (s.live || o.st === 'sched' ? 'Scheduled' : 'Ready') : (o.st === 'sched' ? 'Scheduled' : 'Draft'), stCls: s.otherReady[o.id] ? (s.live || o.st === 'sched' ? 's-live' : 's-ready') : (o.st === 'sched' ? 's-live' : 's-draft'), off: false }));
  const allPosts = planPosts.concat(otherPosts).concat(extraOther).map((p) => Object.assign(p, this.ch(p.plat), {
    owner: d.TEAM[p.ownerIdx], cls: (p.isPlan ? 'is-plan ' : '') + (p.off ? 'is-off ' : '') + (p.skipped ? 'is-skipped' : ''),
    canSkip: !!p.isPlan && !p.skipped, canRestore: !!p.skipped,
    canMove: p.st !== 'pub' && !p.skipped ? 'true' : 'false',
    dragStart: (e) => { if (p.st === 'pub' || p.skipped) { if (e && e.preventDefault) e.preventDefault(); return; } this._drag = { p: Object.assign({}, p, { wk: p.otherK != null ? ((this.state.others[p.otherK] || {}).wk || 0) : 0 }) }; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', p.t); } catch (x) {} this.setState({ dragging: true, dragNext: !p.isPlan }); },
    dragEnd: () => { this._drag = null; this.setState({ dragging: false, dropDay: null, dragNext: false, dropNext: false }); },
    skip: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.skipPlan(p.planI, true); },
    restore: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.skipPlan(p.planI, false); },
    openHint: p.st === 'pub' ? 'See how it did' : 'Open in Create',
    canDel: !p.isPlan && p.st !== 'pub',
    del: (e) => { if (e && e.stopPropagation) e.stopPropagation(); if (p.otherK != null) this.removeOther(p.otherK); else if (p.srcI != null) this.removeStatic(p.srcI, p.t); },
    open: () => {
      if (p.isPlan) { this.go('create', { sel: p.planI, selOther: null, capExpanded: false, confirmWarn: false }); return; }
      if (p.otherK != null) { this.go('create', { selOther: p.otherK, capExpanded: false, confirmWarn: false }); return; }
      if (p.st === 'pub') { this.go('results'); this.showToast('“' + p.t + '” is already published. Here’s how it did.'); return; }
      const id = this.state.otherSeq, src = d.OTHERS[p.srcI];
      const others = this.state.others.concat([{ id: id, t: src.t, plat: src.plat, fmt: src.fmt, src: p.srcI, day: src.day, time: src.time, st: src.st, owner: src.owner }]);
      const rd = Object.assign({}, this.state.otherReady); if (src.st === 'sched') rd[id] = true;
      this.go('create', { others: others, otherSeq: id + 1, otherReady: rd, selOther: others.length - 1, capExpanded: false, confirmWarn: false });
    },
    openKey: (e) => { if (e && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.currentTarget && e.currentTarget.click(); } },
    cycle: (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (!p.isPlan) { this.showToast('Only this week’s plan posts can be reassigned here.'); return; }
      const o = this.state.owners.slice(); o[p.planI] = (o[p.planI] + 1) % 3;
      this.setState({ owners: o });
      this.showToast(p.t + ' → ' + d.TEAM[o[p.planI]].n);
    }
  }));
  const DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const EXTRA = {
    '-1': [
      { day: 0, time: '9:00 AM', t: 'Monday motivation', plat: 'X', fmt: 'Quote', st: 'pub', owner: 1 },
      { day: 1, time: '10:30 AM', t: 'Polish your bio in 5 minutes', plat: 'Instagram', fmt: 'Reel', st: 'pub', owner: 0 },
      { day: 2, time: '11:00 AM', t: 'Pinned Reel: start here', plat: 'Instagram', fmt: 'Reel', st: 'pub', owner: 2 },
      { day: 3, time: '10:00 AM', t: '3 tools that save me 10 hours', plat: 'X', fmt: 'Post', st: 'pub', owner: 1 },
      { day: 4, time: '12:00 PM', t: 'How to plan content in 10 minutes', plat: 'LinkedIn', fmt: 'Carousel', st: 'pub', owner: 0 },
      { day: 6, time: '5:00 PM', t: 'Weekly recap', plat: 'LinkedIn', fmt: 'Carousel', st: 'pub', owner: 0 }
    ],
    '-2': [
      { day: 1, time: '10:00 AM', t: 'Your top Reel, now on TikTok', plat: 'TikTok', fmt: 'Short video', st: 'pub', owner: 2 },
      { day: 3, time: '11:00 AM', t: 'Desk setup tour', plat: 'Instagram', fmt: 'Reel', st: 'pub', owner: 2 },
      { day: 4, time: '12:00 PM', t: 'Friday wins thread', plat: 'X', fmt: 'Thread', st: 'pub', owner: 1 }
    ],
    '1': [
      { day: 2, time: '4:00 PM', t: 'Office hours: your questions, live', plat: 'YouTube', fmt: 'Live', st: 'sched', owner: 0 },
      { day: 4, time: '12:00 PM', t: 'Friday wins thread', plat: 'X', fmt: 'Thread', st: 'draft', owner: 1 }
    ],
    '2': [
      { day: 2, time: '4:00 PM', t: 'Office hours: your questions, live', plat: 'YouTube', fmt: 'Live', st: 'sched', owner: 0 }
    ]
  };
  const weekPosts = (off) => {
    if (off === 0) return allPosts;
    const mine = s.others.map((o, k) => Object.assign({}, o, { k: k })).filter((o) => o.wk === off).map((o) => Object.assign({ day: o.day, time: o.time, t: o.t, plat: o.plat, fmt: o.fmt, isPlan: false, isOther: true, ownerIdx: 0,
      status: s.otherReady[o.id] ? 'Ready' : 'Draft', stCls: s.otherReady[o.id] ? 's-ready' : 's-draft', owner: d.TEAM[0], cls: '', openHint: 'Open in Create', canDel: true, canMove: 'true', otherK: o.k,
      dragStart: (e) => { this._drag = { p: { otherK: o.k, t: o.t, day: o.day, wk: o.wk } }; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', o.t); } catch (x) {} this.setState({ dragging: true, dragNext: true }); },
      dragEnd: () => { this._drag = null; this.setState({ dragging: false, dropDay: null, dragNext: false, dropNext: false }); }, del: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.removeOther(o.k); },
      open: () => this.go('create', { selOther: o.k, capExpanded: false, confirmWarn: false }), openKey: (e) => { if (e && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.go('create', { selOther: o.k }); } },
      cycle: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.showToast('Open the post to change its owner.'); } }, this.ch(o.plat)));
    return (EXTRA[String(off)] || []).map((o) => Object.assign({ day: o.day, time: o.time, t: o.t, plat: o.plat, fmt: o.fmt, isPlan: false, ownerIdx: o.owner,
      status: o.st === 'pub' ? 'Published' : o.st === 'sched' ? 'Scheduled' : 'Draft', stCls: o.st === 'pub' ? 's-pub' : o.st === 'sched' ? 's-live' : 's-draft',
      owner: d.TEAM[o.owner], cls: '', canMove: 'false', dragStart: (e) => { if (e && e.preventDefault) e.preventDefault(); }, dragEnd: () => {}, openHint: o.st === 'pub' ? 'See how it did' : 'Open in Create',
      open: () => { if (o.st === 'pub') { this.go('results'); this.showToast('“' + o.t + '” is already published. Here’s how it did.'); } else this.showToast('Go to that week to edit “' + o.t + '”.'); },
      openKey: () => {},
      cycle: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.showToast(o.st === 'pub' ? 'This post is already published.' : 'Open the post to change its owner.'); } }, this.ch(o.plat))).concat(mine);
  };
  const byChan = (p) => s.chan === 'All' || p.plat === s.chan;
  const todayStr = new Date().toDateString();
  const filtered = allPosts.filter(byChan);
  const calPosts = weekPosts(s.calOff).filter(byChan);
  const days = DN.map((n, i) => {
    const posts = calPosts.filter((p) => p.day === i).sort((a, b) => (a.time.indexOf('PM') > -1) - (b.time.indexOf('PM') > -1));
    const dt = this.dayDate(s.week + s.calOff, i);
    const isToday = dt.toDateString() === todayStr;
    const t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const past = dt < t0;
    const BEST = this.dayTip(i);
    const add = () => {
      const id = this.state.otherSeq;
      const others = this.state.others.concat([{ id: id, t: 'New post for ' + DN[i] + ' ' + dt.getDate(), plat: s.chan !== 'All' ? s.chan : 'Instagram', fmt: 'Post', day: i, time: BEST[0], wk: s.calOff }]);
      this.go('create', { others: others, otherSeq: id + 1, selOther: others.length - 1, capExpanded: false, confirmWarn: false });
      this.showToast('New post for ' + DN[i] + ' at ' + BEST[0] + '.');
    };
    const canDrop = !past;
    return { name: n, num: dt.getDate(), posts: posts, empty: posts.length === 0, isToday: isToday, add: add,
      dragOver: (e) => { if (this._drag && canDrop && e && e.preventDefault) { e.preventDefault(); try { e.dataTransfer.dropEffect = 'move'; } catch (x) {} } },
      dragEnter: (e) => { if (this._drag && canDrop) { if (e && e.preventDefault) e.preventDefault(); if (this.state.dropDay !== i) this.setState({ dropDay: i }); } else if (this._drag && this.state.dropDay !== null) this.setState({ dropDay: null }); },
      drop: (e) => { if (e && e.preventDefault) e.preventDefault(); const dg = this._drag; this._drag = null; this.setState({ dragging: false, dropDay: null, dragNext: false, dropNext: false }); if (dg && canDrop) this.movePost(dg.p, i, s.calOff); },
      canAddEmpty: posts.length === 0 && !past, canAddHead: posts.length > 0 && !past, pastEmpty: posts.length === 0 && past,
      cls: (s.dragging ? (canDrop ? 'can-drop ' : 'no-drop ') : '') + (s.dropDay === i ? 'is-drop ' : '') + (posts.some((p) => p.isPlan) ? 'is-plan ' : '') + (posts.length === 0 && !isToday && past ? 'is-empty ' : '') + (isToday ? 'is-today' : '') };
  });
  return { planPosts, imported, otherPosts, extraOther, allPosts, DN, MN, EXTRA, weekPosts, byChan, todayStr, filtered, calPosts, days };
}
