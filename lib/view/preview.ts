// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: preview.
export function viewPreview(this: any, c: any): any {
  const { s, C, isVid, textOnly, LIB } = c;
  const LIM = { Instagram: 125, TikTok: 100, YouTube: 100, LinkedIn: 210, X: 280, Facebook: 240, Threads: 500, Bluesky: 300, Pinterest: 100 };
  const pvCh = s.prevCh[C.key] || C.plat;
  const vid = isVid(C.fmt), m = C.media;
  let kind;
  if (pvCh === 'TikTok') kind = textOnly(C.fmt) ? 'na' : 'vert';
  else if (pvCh === 'YouTube') kind = vid ? 'vert' : 'na';
  else if (pvCh === 'Instagram') kind = (!vid && textOnly(C.fmt) && !m) ? 'na' : 'ig';
  else if (pvCh === 'LinkedIn' || ['Facebook', 'Threads', 'Bluesky', 'Pinterest'].indexOf(pvCh) > -1) kind = 'li';
  else kind = 'x';
  const lim = LIM[pvCh], capText = C.caption || '';
  const dispLim = kind === 'vert' ? Math.min(lim, 60) : lim;
  let capShort = capText;
  if (kind !== 'x' && !s.capExpanded && capText.length > dispLim) {
    capShort = capText.slice(0, dispLim); const sp = capShort.lastIndexOf(' ');
    if (sp > dispLim - 25) capShort = capShort.slice(0, sp);
    capShort = capShort.replace(/\s+$/, '') + '…';
  }
  const moreWord = pvCh === 'LinkedIn' ? 'see more' : 'more';
  const needRatio = kind === 'vert' ? '9:16' : kind === 'ig' ? (vid ? '9:16' : '4:5') : null;
  const ratioCls = kind === 'ig' ? (m && m.ratio === '1:1' && !vid ? '11' : '45') : (m ? m.ratio.replace(':', '') : '169');
  const CHNOTE = {
    Instagram: 'Instagram is your biggest audience, so it’s usually worth it.',
    TikTok: 'TikTok is your second-biggest audience and suits short video.',
    LinkedIn: vid ? 'Your videos did 21% worse on LinkedIn last time.' : 'Carousels are your best format on LinkedIn.',
    YouTube: 'Shorts reach 12% of your audience, your smallest video channel.',
    X: vid ? 'Video on X reaches about a third of your usual audience.' : 'Text posts usually do well for you on X.',
    Facebook: 'Pingoo has no Facebook results for you yet, so it can’t predict how this will do.',
    Threads: 'Threads is new for you. Pingoo will start learning after your first posts.',
    Bluesky: 'Bluesky is new for you. Pingoo will start learning after your first posts.',
    Pinterest: 'Pinterest suits evergreen how-to posts. Pingoo has no results for you there yet.'
  };
  const setMedia = (key, item, msg) => { const mm = Object.assign({}, this.state.media); mm[key] = item ? Object.assign({}, item) : null; this.setState({ media: mm }); if (msg) this.showToast(msg); };
  const pvChecks = [];
  const ICON = { err: '!', warn: '!', ok: '✓', info: 'i' };
  const ckAsk = (text) => {
    if (/first sentence/.test(text)) return { q: 'How do I fix the start of this caption?', a: 'Lead with the result, then explain. For example: “3 tools gave me a day back every week.” That fits before the cut, and your posts that open with the result get more saves.', act: 'create', actLabel: 'Back to the draft' };
    if (/45 seconds/.test(text)) return { q: 'How do I shorten this video?', a: 'Cut the intro and start on the first tip. Your Reels that get to the point in the first 2 seconds are watched to the end 1.8× more often. Aim for 30–40 seconds.', act: 'create', actLabel: 'Back to the draft' };
    return { q: 'How do I fix this?', a: text + ' The quickest fix is in the draft itself. I can suggest a version that works for this channel.', act: 'create', actLabel: 'Back to the draft' };
  };
  const addCk = (level, text, fixLabel, fix) => { const askable = (level === 'warn' || level === 'err') && !fix; const qa = askable ? ckAsk(text) : null; pvChecks.push({ level: level, icon: ICON[level], text: text, hasFix: !!fix, fixLabel: fixLabel || '', fix: fix || this.noop, hasAsk: askable, ask: askable ? () => this.askFrom(qa.q, qa) : this.noop, area: /caption|sentence|characters|thread|opening line/i.test(text) ? 'cap' : 'media' }); };
  const openMedia = () => this.setState({ mediaOpen: true, mediaTab: 'library' });
  if (kind !== 'na') {
    if (!m && !textOnly(C.fmt)) addCk('err', (vid ? 'Add a video' : 'Add an image') + ' before this can go out.', 'Add media', openMedia);
    if (m && needRatio && m.ratio !== needRatio && !(kind === 'ig' && m.ratio === '1:1')) {
      addCk('warn', 'This ' + (m.kind === 'video' ? 'video' : 'image') + ' is ' + m.ratio + '. ' + pvCh + ' shows ' + needRatio + ', so ' + (m.ratio === '16:9' || m.ratio === '1:1' ? 'the sides will be cut off.' : 'the top and bottom will be cut off.'),
        'Crop to ' + needRatio, () => setMedia(C.key, Object.assign({}, m, { ratio: needRatio, cropped: true }), 'Cropped to ' + needRatio + '. Pingoo kept the subject centred.'));
    }
    if (m && m.cropped && m.ratio === needRatio) addCk('ok', 'Cropped to ' + needRatio + ' for ' + pvCh + '.');
    if (m && kind === 'vert' && m.secs > 45) addCk('warn', 'Your short videos under 45 seconds get 2.1× more plays. This one is ' + m.len + '.');
    if (kind === 'x' && capText.length > 280) addCk('err', 'X allows 280 characters. Cut ' + (capText.length - 280) + ' more, or turn it into a thread.');
    else if (kind === 'x' && capText) addCk('ok', 'Fits in one post. ' + (280 - capText.length) + ' characters to spare.');
    else if (kind !== 'x' && capText) {
      const fe = capText.search(/[.!?\n]/), end = fe === -1 ? capText.length : fe + 1;
      if (end > lim) addCk('warn', 'Your first sentence is cut off before “' + moreWord + '”. Put the key point up front.');
      else addCk('ok', 'Your first sentence shows before “' + moreWord + '”. ' + pvCh + ' shows the first ' + lim + ' characters.');
    }
    if (!capText) addCk('info', 'No caption yet.');
    if (kind === 'vert' && !!C.hook && C.isPlan) addCk('ok', 'Your opening line sits clear of the app’s buttons.');
  }
  const alsoOn = C.also.indexOf(pvCh) > -1;
  const NA = {
    TikTok: ['TikTok needs a video or photos', 'This draft is a ' + C.fmt.toLowerCase() + '. Switch the format or pick another channel.'],
    YouTube: ['YouTube needs a video', 'This draft is a ' + C.fmt.toLowerCase() + ', so it can’t go to YouTube Shorts.'],
    Instagram: ['Instagram needs an image or video', 'Add media to see how this post will look on Instagram.']
  };
  const pv = {
    isVideoMedia: vid,
    vIG: kind === 'vert' && pvCh !== 'TikTok' && pvCh !== 'YouTube', vTT: kind === 'vert' && pvCh === 'TikTok', vYT: kind === 'vert' && pvCh === 'YouTube', vertCls: (m && m.url) ? 'is-real' : 'is-ph',
    isVert: kind === 'vert', isIg: kind === 'ig', isLi: kind === 'li', isX: kind === 'x', isNa: kind === 'na',
    switchLabel: C.isPlan ? 'Preview on' : 'Post to',
    chans: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'].filter((n) => (s.hiddenChans || []).indexOf(n) < 0 || n === C.plat).concat(s.extraChans || []).map((n) => Object.assign({
      n: n, on: pvCh === n, cls: (pvCh === n ? 'is-on' : ''),
      removable: n !== C.plat, remove: () => this.removeCh(n, C),
      badge: n === C.plat || C.also.indexOf(n) > -1, badgeText: n === C.plat ? (C.isPlan ? 'Plan' : 'Posts here') : 'Also',
      pick: () => {
        const p = Object.assign({}, this.state.prevCh); p[C.key] = n;
        const patch = { prevCh: p, capExpanded: false, ckOpen: null, pvHi: null };
        if (!C.isPlan) patch.others = this.state.others.map((o, j) => j === C.k ? Object.assign({}, o, { plat: n }) : o);
        this.setState(patch);
      }
    }, this.ch(n))),
    tone: m ? m.tone : '#E9E6F7', url: (m && m.url) || '', alt: m ? m.name : '',
    hasVideoUrl: !!(m && m.url && m.kind === 'video'), hasImgUrl: !!(m && m.url && m.kind === 'image'),
    placeholder: !!(m && !m.url), empty: !m, mediaLabel: m ? m.name + (m.len ? ' · ' + m.len : '') : '',
    hasHook: !!C.hook && C.isPlan && !textOnly(C.fmt), hook: C.hook,
    capShort: capShort, capFull: capText, cut: kind !== 'x' && capText.length > dispLim, moreLabel: s.capExpanded ? ' less' : ' ' + moreWord,
    ratioCls: ratioCls, isCarousel: C.fmt === 'Carousel', slides: parseInt(C.len, 10) || 8, showMedia: !!m,
    count: capText.length, countCls: capText.length > 280 ? 'over' : '',
    offPlan: C.isPlan && pvCh !== C.plat && kind !== 'na', chName: pvCh, chNote: CHNOTE[pvCh],
    alsoLabel: alsoOn ? 'Posting here too · Undo' : 'Also post here', alsoCls: alsoOn ? 'btn-ghost' : 'btn-out',
    naTitle: (NA[pvCh] || ['', ''])[0], naText: (NA[pvCh] || ['', ''])[1],
    checks: pvChecks
  };
  {
    const hiOf = (w) => () => { if (this.state.pvHi !== w.area) this.setState({ pvHi: w.area }); };
    const issues = pvChecks.filter((w) => w.level === 'err' || w.level === 'warn').map((w) => Object.assign({}, w, { hi: hiOf(w) }));
    const passed = pvChecks.filter((w) => w.level === 'ok' || w.level === 'info').map((w) => Object.assign({}, w, { hi: hiOf(w) }));
    const nIss = issues.length, ready = nIss === 0 && kind !== 'na';
    this._warnN = issues.filter((w) => w.level === 'warn').length;
    pv.issues = issues; pv.passed = passed; pv.hasPassed = passed.length > 0;
    pv.passedOpen = !!s.passedOpen; pv.passedLabel = (s.passedOpen ? 'Hide ' : '') + passed.length + (passed.length === 1 ? ' check passed' : ' checks passed');
    pv.readyLabel = kind === 'na' ? 'Can’t post here yet' : ready ? 'Ready to post' : nIss + (nIss === 1 ? ' thing to fix' : ' things to fix');
    pv.readySub = (pv.offPlan ? 'Not in this week’s plan' : '') ;
    pv.readyCls = kind === 'na' ? 'is-na' : ready ? 'is-ready' : 'is-fix';
    pv.ckOpen = s.ckOpen === null || s.ckOpen === undefined ? !ready || pv.offPlan : !!s.ckOpen;
    this._lastCkOpen = pv.ckOpen;
    pv.hiCls = s.pvHi ? 'hi-' + s.pvHi : '';
    pv.layersCls = s.overlay ? 'is-on' : '';
    pv.key = '"' + pvCh + '"';
    pv.sub = (C.isPlan ? 'How it will look on ' : 'Posting to ') + pvCh;
    const LIX = { LinkedIn: ['1,240 followers', '128 · 14 comments', ['Like', 'Comment', 'Repost', 'Send']], Facebook: ['Just now · Public', '86 · 9 comments · 3 shares', ['Like', 'Comment', 'Share']], Threads: ['@pingoo.app · now', '42 likes · 6 replies', ['Like', 'Reply', 'Repost', 'Share']], Bluesky: ['@pingoo.bsky.social · now', '31 likes · 4 reposts', ['Reply', 'Repost', 'Like', 'Share']], Pinterest: ['Pingoo · 2.3K followers', '57 saves', ['Save', 'Share', 'Visit site']] };
    const lx = LIX[pvCh] || LIX.LinkedIn; pv.liSub = lx[0]; pv.liReact = lx[1]; pv.liActs = lx[2]; pv.isLinkedIn = pv.isLi && pvCh === 'LinkedIn'; pv.isFb = pv.isLi && pvCh === 'Facebook'; pv.isBs = pv.isLi && pvCh === 'Bluesky'; pv.linkTitle = C.t; pv.slug = String(C.t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 18); pv.isPi = pv.isLi && pvCh === 'Pinterest'; pv.isTh = pv.isLi && pvCh === 'Threads'; pv.isLiCard = pv.isLi && ['LinkedIn', 'Facebook', 'Bluesky', 'Pinterest', 'Threads'].indexOf(pvCh) < 0;
  }
  const capMax = pvCh === 'X' ? 280 : pvCh === 'LinkedIn' ? 3000 : 2200;
  const cur = {
    isPlan: C.isPlan, isOther: !C.isPlan, isSkipped: !!C.skipped, planActive: C.isPlan && !C.skipped, t: C.t, fmt: C.fmt, isVideo: vid, hasWhenPick: !C.skipped, whenVal: C.posWk + ':' + C.posDay, whenTip: this.dayTip(C.posDay)[1],
    whenNote: C.isPlan ? 'Plan posts stay in this week. Posts at ' + C.posTime + '.' : 'Posts at ' + C.posTime + '. It won’t count toward this week’s plan result.',
    whenOpts: (function (self) { const out = [], t0 = new Date(); t0.setHours(0, 0, 0, 0); const DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let w = 0; w <= (C.isPlan ? 0 : 2); w++) for (let dd = 0; dd < 7; dd++) { const dt = self.dayDate(s.week + w, dd); const isCur = w === C.posWk && dd === C.posDay; if (dt < t0 && !isCur) continue;
        out.push({ v: w + ':' + dd, sel: isCur, l: DN[dd] + ', ' + MN[dt.getMonth()] + ' ' + dt.getDate() + (w === 0 ? '' : w === 1 ? ' · next week' : ' · in 2 weeks') + (dd === 3 ? ' · best day' : '') }); }
      return out; })(this),
    hookSrc: C.isPlan ? ['Your style: short and punchy', 'Category pattern: number + result openings', 'Your style: talks to “you”'][C.hi] : '',
    basedVoice: 'Your voice, learned from “How to plan content in 10 minutes” (+72%)',
    basedSum: 'Your voice' + (C.isPlan && s.useCategory && C.hi === 1 ? ' + 1 pattern' : ''),
    hasPattern: C.isPlan && s.useCategory && C.hi === 1, basedPattern: 'Number + result openings · top hook in productivity this month',
    hasHook: C.isPlan && !textOnly(C.fmt), hookLabel: vid ? 'On-screen opening line' : 'First slide headline', hook: C.hook,
    caption: capText, capHint: capText.length.toLocaleString('en-US') + ' / ' + capMax.toLocaleString('en-US') + ' · ' + pvCh + ' shows the first ' + lim + ' characters',
    hasMedia: !!m,
    mediaSummary: m ? (m.kind === 'video' ? 'Video · ' : 'Image · ') + m.name + (s.covers[C.key] ? ' · cover set' : '') : (textOnly(C.fmt) ? 'Optional' : 'Nothing attached yet'),
    mediaSumCls: m ? 'acc-ok' : (textOnly(C.fmt) ? '' : 'acc-err')
  };
  const library = s.libExtra.concat(LIB).map((it) => {
    const on = !!(m && m.name === it.name);
    const mine = !!it.lid, hasUrl = !!it.url;
    return { mine: mine, isNewTag: !!it.isNew, editing: mine && s.libEdit === it.lid, notEditing: !(mine && s.libEdit === it.lid), thumbImg: hasUrl && it.kind === 'image', thumbVid: hasUrl && it.kind === 'video', noThumb: !hasUrl, audioThumb: it.kind === 'audio', shapeThumb: !hasUrl && it.kind !== 'audio', isAiTag: it.src === 'ai', hasLen: !!it.len && it.kind !== 'image', url: it.url || '',
      startEdit: () => this.setState({ libEdit: it.lid }), del: () => this.removeLib(it.lid), saveName: (e) => this.renameLib(it.lid, e && e.target ? e.target.value : ''), keyName: (e) => { if (e && e.key === 'Enter') { e.preventDefault(); this.renameLib(it.lid, e.target.value); } else if (e && e.key === 'Escape') this.setState({ libEdit: null }); },
      name: it.name, tone: it.tone, ratioCls: it.ratio.replace(':', ''), kindLabel: it.kind === 'video' ? '▶ ' + it.len : 'Image', meta: (it.kind === 'audio' ? 'Audio · ' + it.len : it.ratio + ' · ' + (it.src === 'ai' ? 'AI ' : '') + (it.kind === 'video' ? 'video' : 'image')).replace(/^(\d+:\d+ · )([a-z])/, (x, a, b) => a + b.toUpperCase()), isVid: it.kind === 'video', notVid: it.kind === 'image', len: it.len,
      on: it.kind === 'audio' ? !!(s.sounds && s.sounds[C.key] && s.sounds[C.key].name === it.name) : on, cls: (it.kind === 'audio' ? !!(s.sounds && s.sounds[C.key] && s.sounds[C.key].name === it.name) : on) ? 'is-on' : '', pick: () => { if (it.kind === 'audio') { const sd = Object.assign({}, this.state.sounds); sd[C.key] = it; this.setState({ sounds: sd }); this.showToast('Soundtrack set: ' + it.name); } else setMedia(C.key, it, 'Attached ' + it.name); } };
  });
  const aiResults = s.aiResults.map((it) => {
    const on = !!((m && m.name === it.name) || (s.covers[C.key] && s.covers[C.key].name === it.name));
    const isA = it.kind === 'audio', onA = isA && !!(s.sounds && s.sounds[C.key] && s.sounds[C.key].name === it.name), on2 = isA ? onA : on;
    return { name: it.name, tone: it.tone, ratioCls: String(it.ratio || '').replace(':', ''), isAudio: isA, notAudio: !isA, isVid: it.kind === 'video', isImg: it.kind === 'image', hasLen: !!it.len, len: it.len || '',
      meta: isA ? 'AI audio · ' + it.len : it.ratio + ' · AI ' + (it.kind === 'video' ? 'video · ' + it.len : 'image'), on: on2, cls: on2 ? 'is-on' : '',
      pick: () => {
        if (isA) { const sd = Object.assign({}, this.state.sounds); sd[C.key] = it; this.setState({ sounds: sd }); this.showToast('Soundtrack set. It plays under your video.'); this.addLibAI(it); return; }
        if (it.kind === 'video') { setMedia(C.key, it, 'Attached ' + it.name); this.addLibAI(it); return; }
        if (vid) { const cv = Object.assign({}, this.state.covers); cv[C.key] = it; this.setState({ covers: cv }); this.showToast('Cover image set. The video still plays first.'); }
        else setMedia(C.key, it, 'Attached ' + it.name);
        this.addLibAI(it);
      } };
  });
  const readyOthers = s.others.filter((o) => s.otherReady[o.id]);
  return { LIM, pvCh, vid, m, kind, lim, capText, dispLim, capShort, moreWord, needRatio, ratioCls, CHNOTE, setMedia, pvChecks, ICON, ckAsk, addCk, openMedia, alsoOn, NA, pv, capMax, cur, library, aiResults, readyOthers };
}
