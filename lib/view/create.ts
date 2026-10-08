// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: create.
export function viewCreate(this: any, c: any): any {
  const { s, raw, skippedArr, d } = c;
  const capKey = (i) => s.week + '-' + s.betIdx + '-' + i;
  const LIB = this.mediaLib();
  const isVid = (f) => /Reel|Short|Video|Reply|Live|Story/.test(f);
  const textOnly = (f) => /^(Post|Thread|Quote)$/.test(f);
  const planD = raw.drafts.map((dr, i) => {
    const key = capKey(i);
    const def = i === 0 ? (dr.fmt === 'Carousel' ? LIB[4] : isVid(dr.fmt) ? LIB[0] : null) : null;
    return { key: key, i: i, isPlan: true, t: dr.t, plat: dr.plat, fmt: dr.fmt, len: dr.len, c: dr.c,
      hi: (!s.useCategory && s.hooks[i] === 1) ? 0 : s.hooks[i], hook: dr.hooks[(!s.useCategory && s.hooks[i] === 1) ? 0 : s.hooks[i]], caption: s.captions[key] != null ? s.captions[key] : dr.cap,
      media: key in s.media ? s.media[key] : def, also: s.also[key] || [], approved: s.approved[i] && !skippedArr[i], skipped: !!skippedArr[i], posDay: (s.planDay && s.planDay[i] != null) ? s.planDay[i] : d.SLOTS[i][0], posWk: 0, posTime: d.SLOTS[i][1] };
  });
  const otherD = s.others.map((o, k) => {
    const key = 'o' + o.id;
    return { key: key, k: k, id: o.id, isPlan: false, t: o.t, plat: o.plat, fmt: o.fmt, len: '', c: '#5E5A7A', hook: '',
      caption: s.captions[key] != null ? s.captions[key] : '', media: s.media[key] || null, also: [], approved: !!s.otherReady[o.id],
      posDay: o.day != null ? o.day : 4, posWk: o.wk || 0, posTime: o.time || '3:00 PM' };
  });
  const C = s.selOther != null && otherD[s.selOther] ? otherD[s.selOther] : planD[s.sel];
  const draftBlock = (dd) => {
    if (!textOnly(dd.fmt) && !dd.media) return (isVid(dd.fmt) ? 'Add a video' : 'Add an image') + ' before you can ' + (dd.isPlan ? 'approve this draft' : 'mark it ready') + '.';
    if (dd.plat === 'X' && dd.caption.length > 280) return 'Shorten the caption to 280 characters for X.';
    return '';
  };
  const blockC = C.approved ? '' : draftBlock(C);
  const drafts = planD.map((dd) => ({
    n: '0' + (dd.i + 1), t: dd.t, plat: dd.plat, fmt: dd.fmt, len: dd.len, c: dd.c,
    sel: s.selOther == null && s.sel === dd.i, cls: s.selOther == null && s.sel === dd.i ? 'is-sel' : '',
    dotCls: dd.skipped ? 'skip' : dd.approved ? 'on' : '',
    tag: dd.skipped ? 'Skipped' : dd.approved ? 'Approved' : (draftBlock(dd) ? 'Needs media' : 'Draft'), tagCls: dd.skipped ? 'tag-skip' : dd.approved ? 'tag-ok' : (draftBlock(dd) ? 'tag-warn' : 'tag-draft'),
    skipCls: dd.skipped ? 'is-skipped' : '',
    pick: () => this.setState({ sel: dd.i, selOther: null, capExpanded: false, confirmWarn: false })
  }));
  const otherDrafts = otherD.map((dd) => ({
    t: dd.t, plat: dd.plat, fmt: dd.fmt, sel: s.selOther === dd.k, cls: s.selOther === dd.k ? 'is-sel' : '',
    tag: dd.approved ? 'Ready' : 'Not in plan', tagCls: dd.approved ? 'tag-ok' : 'tag-other',
    pick: () => this.setState({ selOther: dd.k, capExpanded: false })
  }));
  return { capKey, LIB, isVid, textOnly, planD, otherD, C, draftBlock, blockC, drafts, otherDrafts };
}
