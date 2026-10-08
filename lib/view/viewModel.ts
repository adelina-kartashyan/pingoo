// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Top bar, shared shell values and the main view model object.
export function viewViewModel(this: any, c: any): any {
  const { raw, s, m, accepted, approvedCount, planN, goTo, nav, is, d, bet, skipped, checks, doneCount, lastRes, comingUp, thread, histAll, camps, camp, planTabs, homeCamp, CI, wz, g, endText, campNow, cRaw, drafts, otherDrafts, cur, pv, C, pvCh, library, aiResults, vid, needRatio, base, setMedia, blockC, skippedArr, days, chanFilters, isWeekView, calPosts, monthTotal, MN, mFirst, wkFirst, DN, monthCells, res, wins, statusTitle, statusSub, statusBtn, statusGo, HC, heat, heatSel, growth, patterns, planPlats, lessonGroups, removedLessons, liveLessons, traits, members, invites, connected, connectedCount, browse, intCats } = c;
  const MSGS = [
    { n: 'Sarah Kim', i: 'SK', c: '#CF3216', text: 'I can take Wednesday’s post. I’ll film it after lunch.', when: '12m', go: 'calendar' },
    { n: 'Mike Chen', i: 'MC', c: '#0D0A26', text: 'The TikTok cover is in the shared folder.', when: '1h', go: 'create' },
    { n: 'Emma Wilson', i: 'EW', c: '#0A66C2', text: 'Could Thursday go out at 10:30 instead?', when: 'Yesterday', go: 'calendar' }
  ];
  const NOTIFS = [
    { t: 'Your weekly plan is ready', s: 'Pingoo suggests: ' + raw.title, when: '2h', go: 'home' },
    { t: 'Last week’s results are in', s: 'Polish your Instagram profile · Worked', when: 'Sun', go: 'results' },
    { t: 'Mike joined the team', s: 'He can create and schedule posts', when: '2d', go: 'team' },
    { t: 'HubSpot synced', s: '214 contacts updated', when: '3d', go: 'integrations' }
  ];
  const msgUnread = s.msgRead ? 0 : 2, notifUnread = s.notifRead ? 0 : 2;
  const messages = MSGS.map((m, i) => Object.assign({}, m, { dot: !s.msgRead && i < 2 ? 'unread-dot' : 'read-dot', open: () => { this.go(m.go, { msgRead: true }); } }));
  const notifs = NOTIFS.map((n, i) => Object.assign({}, n, { dot: !s.notifRead && i < 2 ? 'unread-dot' : 'read-dot', open: () => { this.go(n.go, { notifRead: true }); } }));

  let calHint = false, calHintText = '', calHintBtn = '', calHintGo = this.noop;
  if (!accepted) { calHint = true; calHintText = 'Dashed posts are suggestions from Pingoo. Use the plan to add them to your week.'; calHintBtn = 'Use this plan'; calHintGo = () => { this.setState({ decision: 'accepted', approved: [false, false, false], sel: 0, live: false, resultsReady: false }); this.showToast('Plan set. Approve the drafts to schedule them.'); }; }
  else if (approvedCount < planN && !s.live) { calHint = true; calHintText = (planN - approvedCount) + ' plan ' + (planN - approvedCount === 1 ? 'post needs' : 'posts need') + ' approval before they can be scheduled.'; calHintBtn = 'Review drafts'; calHintGo = goTo('create'); }

  const acceptFn = () => {
    this.setState({ autoAccepted: false, decision: 'accepted', approved: [false, false, false], sel: 0, hooks: [0, 0, 0], live: false, resultsReady: false });
    this.showToast('Plan set. Your 3 drafts are ready in Create.');
  };

  const __v = {
    sideCls: (s.collapsed ? 'is-collapsed ' : '') + (s.menuOpen ? 'is-open' : ''),
    scrimCls: s.menuOpen ? 'is-on' : '',
    collapseLabel: s.collapsed ? 'Expand sidebar' : 'Collapse sidebar',
    toggleCollapse: () => this.setState({ collapsed: !s.collapsed }),
    openMenu: () => this.setState({ menuOpen: true, pop: null }),
    closeMenu: () => this.setState({ menuOpen: false }),
    nav: nav, is: is,
    goHome: goTo('home'), goCoach: goTo('coach'), goPlanner: goTo('planner'), goCreate: goTo('create'), goCalendar: goTo('calendar'),
    goResults: goTo('results'), goAudience: goTo('audience'), goTeam: goTo('team'), goIntegrations: goTo('integrations'),
    proClick: () => this.showToast('Pro plans open in Settings › Billing.'),
    coachUnread: !s.coachSeen,
    weekDates: this.weekDates(s.week),
    wv: (() => {
      const L = { '-1': 'Last week', '0': 'This week', '1': 'Next week' };
      const SUB = { '-1': 'Finished · ' + (s.lastRes || d.W40).learn.verdict, '0': accepted ? (s.live ? 'Live' : 'In progress') : 'Plan ready to pick', '1': 'Plan arrives Sunday' };
      const nEnd = this.dayDate(s.week + 1, 6);
      return {
        show: (s.screen === 'home' || s.screen === 'results'),
        label: L[String(s.weekView)], dates: this.weekDates(s.week + s.weekView), chipCls: s.weekView === 0 ? '' : 'is-other',
        past: s.weekView === -1, now: s.weekView === 0, next: s.weekView === 1,
        nextDates: this.weekDates(s.week + 1), nextEnd: 'Sun, ' + this.fmtD(nEnd),
        opts: [-1, 0, 1].map((o) => ({ label: L[String(o)], dates: this.weekDates(s.week + o), sub: SUB[String(o)], on: s.weekView === o, cls: s.weekView === o ? 'is-on' : '',
          pick: () => this.setState({ weekView: o, pop: null }) }))
      };
    })(),
    topWeekLabel: (s.screen === 'home' || s.screen === 'results') ? ({ '-1': 'Last week', '0': 'This week', '1': 'Next week' })[String(s.weekView)] : 'This week',
    topWeekDates: this.weekDates(s.week + ((s.screen === 'home' || s.screen === 'results') ? s.weekView : 0)),
    topWeekCls: (s.screen === 'home' || s.screen === 'results') && s.weekView !== 0 ? 'is-other' : '',
    weekMenuOpen: s.pop === 'week',
    toggleWeekMenu: () => this.setState({ pop: s.pop === 'week' ? null : 'week' }),
    weekNow: () => this.setState({ weekView: 0, pop: null }),

    askOpen: s.pop === 'ask', msgOpen: s.pop === 'msg', notifOpen: s.pop === 'notif',
    toggleAsk: () => this.setState({ pop: s.pop === 'ask' ? null : 'ask' }),
    toggleMsgs: () => { if (s.pop === 'msg' && Date.now() - (this._hovAt || 0) < 600) return; this.setState({ pop: s.pop === 'msg' ? null : 'msg' }); },
    toggleNotifs: () => { if (s.pop === 'notif' && Date.now() - (this._hovAt || 0) < 600) return; this.setState({ pop: s.pop === 'notif' ? null : 'notif' }); },
    msgHoverIn: () => this.hovOpen('msg'), notifHoverIn: () => this.hovOpen('notif'),
    popHoverIn: () => clearTimeout(this._hc), popHoverOut: () => this.hovClose(),
    meOpen: s.pop === 'me', meCls: s.pop === 'me' ? 'is-on' : '',
    crView: s.crView || 'edit', crIsEdit: (s.crView || 'edit') === 'edit', crIsPrev: s.crView === 'preview',
    crEditCls: (s.crView || 'edit') === 'edit' ? 'is-on' : '', crPrevCls: s.crView === 'preview' ? 'is-on' : '',
    crToEdit: () => this.setState({ crView: 'edit' }), crToPrev: () => this.setState({ crView: 'preview' }),
    toggleMe: () => this.setState({ pop: s.pop === 'me' ? null : 'me' }), closeMe: () => this.setState({ pop: null }),
    umConnected: (s.intOn || []).filter(Boolean).length,
    umProfile: () => this.go('team'),
    umBrand: () => { this.setState({ pop: null }); this.showToast('Brand settings: voice, colours and logo live here. Coming soon in this prototype.'); },
    umAccounts: () => this.go('integrations'),
    umNotifs: () => { this.setState({ pop: null }); this.showToast('Notification settings: email, in-app and weekly digest. Coming soon.'); },
    umPlan: () => { this.setState({ pop: null }); this.showToast('Pingoo Pro: premium campaign templates and advanced AI insights.'); },
    umHelp: () => this.go('coach'),
    umLogout: () => { this.setState({ pop: null }); this.showToast('Logged out. (Demo, you are still here.)'); },
    msgBtnCls: s.pop === 'msg' ? 'is-on' : '', notifBtnCls: s.pop === 'notif' ? 'is-on' : '',
    msgUnread: msgUnread, notifUnread: notifUnread, hasMsgUnread: msgUnread > 0, hasNotifUnread: notifUnread > 0,
    messages: messages, notifs: notifs,
    readAllMsgs: () => this.setState({ msgRead: true }), readAllNotifs: () => this.setState({ notifRead: true }),
    askSugs: d.COACH_QA.map((x) => ({ q: x.q, run: () => { this.go('coach'); this.askCoach(x.q); } })),

    showCoachBar: s.screen !== 'coach' && !s.tipsHidden, showCoachPill: s.screen !== 'coach' && s.tipsHidden,
    tip: (d.TIPS[s.screen] || {}).t || '', tipShort: (d.TIPS[s.screen] || {}).s || (d.TIPS[s.screen] || {}).t || '', tipStat: (d.TIPS[s.screen] || {}).stat || '', tipQ: (d.TIPS[s.screen] || {}).q || 'Ask Pingoo', tipQShort: (d.TIPS[s.screen] || {}).sq || (d.TIPS[s.screen] || {}).q || 'Ask Pingoo',
    askTip: () => this.askFrom((d.TIPS[s.screen] || {}).q || 'Why video this week?'),
    coachBtnCls: 'btn-coach',
    askLinkedIn: () => this.askFrom('Why did LinkedIn get quieter?'),
    askSkip: () => this.askFrom('What happens if I skip this week?'),
    askAI: () => this.askFrom('How do I show up in more AI answers?'),
    hideTips: () => this.setState({ tipsHidden: true }), showTips: () => this.setState({ tipsHidden: false }),

    bet: bet, betNum: s.betIdx + 1,
    betCls: (s.flipping ? 'is-flipping ' : '') + (accepted ? 'is-accepted' : ''),
    stampCls: accepted ? 'is-on' : '',
    showActions: !accepted && !skipped, accepted: accepted, skipped: skipped, needAccept: !accepted,
    setCard: this.setCard, setThread: this.setThread, noop: this.noop,
    spot: (e) => {
      if (!this._card) return;
      const r = this._card.getBoundingClientRect();
      this._card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      this._card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    },
    accept: acceptFn, acceptHere: acceptFn,
    swap: () => {
      if (s.flipping) return;
      this.setState({ flipping: true, evidenceOpen: false });
      clearTimeout(this._ft);
      this._ft = setTimeout(() => this.setState({ betIdx: (this.state.betIdx + 1) % 3, flipping: false, sel: 0 }), 280);
    },
    skip: () => { this.setState({ decision: 'skipped' }); this.showToast('Skipped. No drafts or posts this week.'); },
    undo: () => this.setState({ decision: null, live: false, resultsReady: false, approved: [false, false, false] }),
    evCls: s.evidenceOpen ? 'is-open' : '', evidenceOpen: s.evidenceOpen,
    toggleEvidence: () => this.setState({ evidenceOpen: !s.evidenceOpen }),
    checks: checks, doneCount: doneCount, doneW: (doneCount / 4 * 100) + '%',
    lastRes: lastRes, comingUp: comingUp,

    thread: thread, typing: s.typing, coachText: s.coachText, typingText: s.typingText || 'Reading your numbers…',
    coachQs: d.COACH_QA.map((x) => ({ q: x.q, ask: () => this.askCoach(x.q) })),
    onCoachText: (e) => this.setState({ coachText: e.target.value }),
    sendCoach: (e) => { if (e && e.preventDefault) e.preventDefault(); const t = this.state.coachText.trim(); if (t) this.askCoach(t); },
    resetChat: () => this.setState({ thread: null, typing: false }),
    goalText: s.goalText, goalEditing: s.goalEditing, goalView: !s.goalEditing, goalBtn: s.goalEditing ? 'Save' : 'Edit',
    onGoalText: (e) => this.setState({ goalText: e.target.value }),
    toggleGoalEdit: () => { if (s.goalEditing) this.showToast('Goal saved. Pingoo will use it from next week.'); this.setState({ goalEditing: !s.goalEditing }); },
    history: histAll,

    camps: camps, camp: camp, planTabs: planTabs, homeCamp: homeCamp,
    planTab: { overview: s.planTab === 'overview', weeks: s.planTab === 'weeks', content: s.planTab === 'content', ideas: s.planTab === 'ideas', notes: s.planTab === 'notes' },
    newCampaign: () => { this.go('planner'); this.openWizard(null); },
    duplicateCamp: () => this.openWizard(CI, 0, true),
    downloadReport: () => this.showToast('Report downloaded as PDF.'),
    ideaText: s.ideaText, onIdeaText: (e) => this.setState({ ideaText: e.target.value }),
    addIdea: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const t = this.state.ideaText.trim(); if (!t) return;
      this.updCamp(CI, (c) => { c.ideas = [{ t: t, ch: 'Any channel', f: 'Your idea', why: 'Pingoo will suggest the best format for it.', by: 'Teo', ab: 'TC', c: '#0D0A26' }].concat(c.ideas); return c; });
      this.setState({ ideaText: '' }); this.showToast('Idea added');
    },
    noteText: s.noteText, notePin: s.notePin,
    onNoteText: (e) => this.setState({ noteText: e.target.value }),
    onNotePin: (e) => this.setState({ notePin: e.target.checked }),
    postNote: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const t = this.state.noteText.trim(); if (!t) return;
      this.updCamp(CI, (c) => { c.notes = [{ a: 0, text: t, when: 'Just now', pinned: this.state.notePin, tag: '' }].concat(c.notes); return c; });
      this.setState({ noteText: '', notePin: false });
      this.showToast(t.indexOf('@') > -1 ? 'Note posted. Mentioned teammates get notified.' : 'Note posted');
    },
    wz: wz,
    wzClose: () => this.setState({ wz: this.blankWz() }),
    wzName: (e) => this.setWz({ name: e.target.value, err: '' }),
    wzSummary: (e) => this.setWz({ summary: e.target.value }),
    wzStart: (e) => this.setWz({ start: parseInt(e.target.value, 10) || 0 }),
    wzTarget: (e) => this.setWz({ target: e.target.value, err: '' }),
    wzUseSug: () => this.setWz({ target: g.sug, err: '' }),
    wzAudience: (e) => this.setWz({ audience: e.target.value }),
    wzUseAudience: () => this.setWz({ audience: 'Founders and small marketing teams, mostly 25–34' }),
    wzM0: (e) => this.setWz({ m0: e.target.value }), wzM1: (e) => this.setWz({ m1: e.target.value }), wzM2: (e) => this.setWz({ m2: e.target.value }),
    wzSuggestMsgs: () => {
      const M = { engagement: ['Small habits, big results.', 'Try it today, tell us tomorrow.', 'Made for busy people.'], reach: ['Built for small teams.', 'One focus a week.', 'Share it with someone who needs it.'],
        followers: ['New tips every Tuesday.', 'Follow for the full series.', 'Real work, no fluff.'], signups: ['Try it free for 14 days.', 'Plan a month in an afternoon.', 'No card needed.'] };
      const m = M[this.state.wz.goalType];
      this.setWz({ m0: m[0], m1: m[1], m2: m[2] });
    },
    wzBack: () => this.setWz({ step: Math.max(0, this.state.wz.step - 1), err: '' }),
    wzNext: () => {
      const st = this.state.wz.step, e = this.wzValidate(st);
      if (e) { this.setWz({ err: e }); return; }
      this.setWz({ step: st + 1, maxStep: Math.max(this.state.wz.maxStep, st + 1), err: '' });
    },
    wzDraft: () => this.wzFinish('draft'),
    wzSchedule: () => this.wzFinish('scheduled'),
    confirmEnd: s.confirmEnd, endText: endText,
    cancelEnd: () => this.setState({ confirmEnd: false }),
    doEnd: () => this.endCampaign(CI, campNow(cRaw), raw),

    drafts: drafts, otherDrafts: otherDrafts, cur: cur, pv: pv, hookNum: ((!s.useCategory && s.hooks[s.sel] === 1) ? 0 : s.hooks[s.sel]) + 1,
    hookCls: s.hookOut ? 'is-out' : 'is-in', hookLoad: !!s.hookLoad, hookReady: !s.hookLoad, hookBtnCls: s.hookLoad ? 'is-disabled' : '',
    onCaption: (e) => { const c = Object.assign({}, this.state.captions); c[C.key] = e.target.value; this.setState({ captions: c }); },
    toggleMore: () => this.setState({ capExpanded: !s.capExpanded }),
    draftsSub: approvedCount + ' of ' + planN + ' approved' + (planN < 3 ? ' · ' + (3 - planN) + ' skipped' : '') + (approvedCount === planN ? ' · all set' : ''), kbHint: approvedCount === planN ? '' : ' · J / K to switch',
    draftsDone: approvedCount === planN ? 'is-done' : '', planN: planN,
    overlay: s.overlay, toggleOverlay: () => this.setState({ overlay: !s.overlay }),
    toggleChecks: () => { const cur = (this._lastCkOpen !== undefined) ? this._lastCkOpen : true; this.setState({ ckOpen: !cur }); },
    togglePassed: () => this.setState({ passedOpen: !s.passedOpen }),
    clearHi: () => { if (this.state.pvHi) this.setState({ pvHi: null }); },
    toggleAlso: () => {
      const a = Object.assign({}, this.state.also), list = (a[C.key] || []).slice(), j = list.indexOf(pvCh);
      if (j > -1) list.splice(j, 1); else list.push(pvCh);
      a[C.key] = list; this.setState({ also: a });
      this.showToast(j > -1 ? 'Removed ' + pvCh + '.' : 'Also posting to ' + pvCh + '. It won’t count toward the plan’s result.');
    },
    addOther: () => {
      const id = s.otherSeq;
      const others = s.others.concat([{ id: id, t: 'Untitled post', plat: 'LinkedIn', fmt: 'Post' }]);
      this.setState({ others: others, otherSeq: id + 1, selOther: others.length - 1, capExpanded: false });
    },
    onOtherTitle: (e) => { const v = e.target.value; this.setState({ others: this.state.others.map((o, j) => j === C.k ? Object.assign({}, o, { t: v }) : o) }); },
    onOtherFmt: (e) => { const v = e.target.value; this.setState({ others: this.state.others.map((o, j) => j === C.k ? Object.assign({}, o, { fmt: v }) : o) }); },
    hookOpen: !!s.hookOpen, hookAccCls: s.hookOpen ? 'is-open' : '', toggleHookAcc: () => this.setState({ hookOpen: !s.hookOpen }),
    basedOpen: !!s.basedOpen, basedAccCls: s.basedOpen ? 'is-open' : '', toggleBasedAcc: () => this.setState({ basedOpen: !s.basedOpen }),
    showCreateHint: !s.createHintSeen && s.approved.filter(Boolean).length === 0, hideCreateHint: () => this.setState({ createHintSeen: true }),
    mediaOpen: s.mediaOpen, mediaAccCls: s.mediaOpen ? 'is-open' : '', toggleMedia: () => this.setState({ mediaOpen: !s.mediaOpen }),
    fitOpen: s.fitOpen, fitAccCls: s.fitOpen ? 'is-open' : '', toggleFit: () => this.setState({ fitOpen: !s.fitOpen }),
    mediaTabs: [['ai', 'AI Generate'], ['upload', 'Upload'], ['library', 'Library']].map((t) => ({ label: t[1], on: s.mediaTab === t[0], cls: s.mediaTab === t[0] ? 'is-on' : '', pick: () => this.setState({ mediaTab: t[0] }) })),
    mediaTabOn: { ai: s.mediaTab === 'ai', upload: s.mediaTab === 'upload', library: s.mediaTab === 'library' },
    library: library, aiResults: aiResults, aiLoading: s.aiLoading,
    aiPrompt: s.aiPrompt || ({ image: 'Cover for “' + C.t + '”, bright desk, soft morning light', video: 'Short clip for “' + C.t + '”, hands planning on a notebook', audio: 'Calm, upbeat background track for “' + C.t + '”' }[s.aiKind || (vid ? 'video' : 'image')]),
    onAiPrompt: (e) => this.setState({ aiPrompt: e.target.value }),
    aiBtn: s.aiLoading ? 'Generating…' : (s.aiResults.length ? 'Generate again' : 'Generate'),
    aiKinds: [['image', 'Image'], ['video', 'Video'], ['audio', 'Audio']].map((k) => { const on = (s.aiKind || (vid ? 'video' : 'image')) === k[0]; return { label: k[1], on: on, cls: on ? 'is-on' : '', pick: () => this.setState({ aiKind: k[0], aiResults: [], aiPrompt: '' }) }; }),
    aiPh: { image: 'Describe the image', video: 'Describe the video clip', audio: 'Describe the sound or music' }[s.aiKind || (vid ? 'video' : 'image')],
    aiNote: { image: vid ? 'On a video post, an AI image becomes the cover. The video still plays first.' : 'Three image options, sized for ' + C.plat + '.', video: 'Short clips, 9:16 and up to 15 seconds.', audio: 'Background tracks you can play under a video.' }[s.aiKind || (vid ? 'video' : 'image')],
    aiGenerate: () => {
      if (s.aiLoading) return;
      this.setState({ aiLoading: true });
      clearTimeout(this._ai);
      const ak = s.aiKind || (vid ? 'video' : 'image'), r = ak === 'video' ? '9:16' : (needRatio || '4:5'), TONES = ['#3B3355', '#1F3A4D', '#4D4226', '#2F4A3A', '#4A2F3F', '#2A2459'], base = (this._aiRun = (this._aiRun || 0) + 1) * 3;
      this._ai = setTimeout(() => this.setState({ aiLoading: false, aiResults: [0, 1, 2].map((n) => ({ name: 'ai-' + ak + '-' + (base + n - 2) + (ak === 'video' ? '.mp4' : ak === 'audio' ? '.mp3' : '.png'), kind: ak, ratio: ak === 'audio' ? '' : r, len: ak === 'video' ? ['0:08', '0:12', '0:15'][n] : ak === 'audio' ? ['0:30', '0:45', '1:00'][n] : '', tone: TONES[(base + n) % 6], ai: true })) }), 1300);
    },
    uploadTitle: s.uploading ? 'Reading your file…' : 'Choose a file',
    onUpload: (e) => { const fs = e && e.target ? e.target.files : null; if (!fs || !fs.length) return; this.setState({ uploading: true }); this.addLibFiles([fs[0]], C.key); },
    onLibAdd: (e) => { const fs = e && e.target ? e.target.files : null; if (!fs || !fs.length) return; this.addLibFiles(Array.from(fs), null); try { e.target.value = ''; } catch (x) {} },
    libSaved: !!s.libSaved,
    removeMedia: () => setMedia(C.key, null, 'Media removed'),
    showApprove: !s.confirmWarn && !C.skipped,
    skipCur: () => { if (C.isPlan) this.skipPlan(C.i, true); },
    restoreCur: () => { if (C.isPlan) this.skipPlan(C.i, false); },
    dragNextOn: !!s.dragging && !!s.dragNext, dropNextCls: s.dropNext ? 'is-drop' : '',
    nextOver: (e) => { if (this._drag && e && e.preventDefault) e.preventDefault(); },
    nextEnter: (e) => { if (this._drag) { if (e && e.preventDefault) e.preventDefault(); if (!this.state.dropNext) this.setState({ dropNext: true }); } },
    nextLeave: () => { if (this.state.dropNext) this.setState({ dropNext: false }); },
    nextDrop: (e) => { if (e && e.preventDefault) e.preventDefault(); const dg = this._drag; this._drag = null; this.setState({ dragging: false, dropDay: null, dragNext: false, dropNext: false }); if (dg && !dg.p.isPlan) this.movePost(dg.p, dg.p.day, s.calOff + 1); },
    onWhen: (e) => { const v = String(e && e.target ? e.target.value : ''); const m = v.split(':'); if (m.length !== 2) return; const wk = +m[0], day = +m[1];
      if (C.isPlan) this.movePost({ isPlan: true, planI: C.i, day: C.posDay, wk: 0 }, day, 0);
      else this.movePost({ otherK: C.k, day: C.posDay, wk: C.posWk }, day, wk); },
    deleteOther: () => { if (C.k != null) this.removeOther(C.k); },
    toastHasUndo: !!s.toastHasUndo, toastUndo: () => { const u = this._undo; this._undo = null; if (u) u(); },
    approveLabel: C.isPlan ? (C.approved ? 'Approved · tap to undo' : 'Approve this draft') : (C.approved ? 'Ready · tap to undo' : 'Mark as ready'),
    cantApprove: !!blockC,
    approveWhy: !!blockC || (C.isPlan && !accepted), approveWhyText: blockC || 'Approving this draft also accepts this week’s plan.',
    approvedCount: approvedCount,
    confirmWarn: !!s.confirmWarn, noConfirm: !s.confirmWarn,
    warnText: (this._warnN === 1 ? '1 warning' : this._warnN + ' warnings') + ' left.',
    cancelWarn: () => this.setState({ confirmWarn: false, ckOpen: true }),
    addChOpen: !!s.addChOpen, addChCls: s.addChOpen ? 'is-on' : '', toggleAddCh: () => this.setState({ addChOpen: !s.addChOpen }),
    addChOpts: (s.hiddenChans || []).filter((n) => n !== C.plat).map((n) => [n, 'Added back to the preview', true]).concat([['Facebook', 'Page posts and Reels'], ['Threads', 'Short text posts'], ['Bluesky', 'Short text posts'], ['Pinterest', 'Pins for evergreen ideas']].filter((x) => (s.extraChans || []).indexOf(x[0]) < 0)).map((x) => Object.assign({ n: x[0], d: x[1], pick: () => {
      if (x[2]) { this.setState({ hiddenChans: (this.state.hiddenChans || []).filter((h) => h !== x[0]), addChOpen: false }); this.showToast(x[0] + ' is back in the preview.'); return; }
      const ex = (s.extraChans || []).concat([x[0]]); const pc = Object.assign({}, this.state.prevCh); pc[C.key] = x[0];
      this.setState({ extraChans: ex, addChOpen: false, prevCh: pc, ckOpen: null, pvHi: null });
      this.showToast(x[0] + ' added to the preview. Connect it in Integrations to publish there.');
    } }, this.ch(x[0]))),
    hasExtraCh: (s.extraChans || []).length > 0, extraChList: (s.extraChans || []).map((n) => Object.assign({ n: n, remove: () => this.removeCh(n, C) }, this.ch(n))),
    noAddCh: ['Facebook', 'Threads', 'Bluesky', 'Pinterest'].every((n) => (s.extraChans || []).indexOf(n) > -1) && !(s.hiddenChans || []).filter((n) => n !== C.plat).length,
    _kbInit: (this._kb = { move: (d) => this.setState({ sel: ((s.selOther == null ? s.sel : 0) + d + 3) % 3, selOther: null, capExpanded: false, confirmWarn: false }), approve: () => this._approveFn && this._approveFn() }) && '',
    toggleApprove: this._approveFn = () => {
      if (!C.isPlan) {
        if (blockC) return;
        const r = Object.assign({}, this.state.otherReady); r[C.id] = !r[C.id]; this.setState({ otherReady: r });
        if (r[C.id]) this.showToast('Ready. It’s in the Calendar on Friday at 3 PM, marked “Not in plan”.');
        return;
      }
      if (blockC || skippedArr[s.sel]) return;
      if (!s.approved[s.sel] && this._warnN > 0 && !s.confirmWarn) { this.setState({ confirmWarn: true }); return; }
      const a = s.approved.slice(); a[s.sel] = !a[s.sel];
      let sel = s.sel;
      if (a[s.sel]) { const nx = [1, 2, 3].map((k) => (s.sel + k) % 3).find((k) => !a[k] && !skippedArr[k]); if (nx !== undefined) sel = nx; }
      const n = a.filter((x, i) => x && !skippedArr[i]).length;
      const patch = { approved: a, sel: sel, live: n === 0 ? false : s.live, capExpanded: false, confirmWarn: false };
      const autoNow = !accepted && a[s.sel];
      if (autoNow) Object.assign(patch, { decision: 'accepted', autoAccepted: true, resultsReady: false, live: false });
      if (n === 0 && s.autoAccepted && !s.live) Object.assign(patch, { decision: null, autoAccepted: false });
      this.setState(patch);
      if (autoNow) this.showToast('Plan accepted and draft approved · ' + n + ' of ' + planN + '. Pingoo will track this week’s results.');
      else if (a[s.sel]) this.showToast(n === planN ? (planN === 3 ? 'All 3 drafts approved. Time to schedule.' : 'All ' + planN + ' drafts approved. Time to schedule.') : 'Draft approved · ' + n + ' of ' + planN);
      else if (n === 0 && s.autoAccepted && !s.live) this.showToast('Back to a suggested plan. Nothing is scheduled.');
    },
    nextHook: () => {
      if (s.hookOut || s.hookLoad) return;
      if (s.offline) { this.showToast('You’re offline. Pingoo can write new lines once you’re back online.'); return; }
      this.setState({ hookLoad: true });
      clearTimeout(this._ht);
      this._ht = setTimeout(() => {
        const h = this.state.hooks.slice(); const i = this.state.sel; h[i] = (h[i] + 1) % 3; if (!this.state.useCategory && h[i] === 1) h[i] = 2;
        this.setState({ hooks: h, hookLoad: false });
      }, 900);
    },

    days: days, chanFilters: chanFilters,
    calCount: isWeekView
      ? calPosts.length + (calPosts.length === 1 ? ' post' : ' posts') + (s.calOff === 0 ? ' this week' : '')
      : monthTotal + (monthTotal === 1 ? ' post' : ' posts') + ' in ' + MN[mFirst.getMonth()],
    calHint: calHint && isWeekView && s.calOff === 0, calHintText: calHintText, calHintBtn: calHintBtn, calHintGo: calHintGo,
    calViewOn: { week: isWeekView, month: !isWeekView },
    calViewCls: { week: isWeekView ? 'is-on' : '', month: isWeekView ? '' : 'is-on' },
    viewWeek: () => this.setState({ calView: 'week' }),
    viewMonth: () => {
      const wk = this.dayDate(s.week + s.calOff, 0);
      this.setState({ calView: 'month', calMonth: (wk.getFullYear() - 2026) * 12 + wk.getMonth() - 9 });
    },
    calRange: isWeekView ? this.weekDates(s.week + s.calOff) + ', ' + wkFirst.getFullYear() : MN[mFirst.getMonth()] + ' ' + mFirst.getFullYear(),
    calPrevLabel: isWeekView ? 'Previous week' : 'Previous month', calNextLabel: isWeekView ? 'Next week' : 'Next month',
    calPrev: () => this.setState(isWeekView ? { calOff: s.calOff - 1 } : { calMonth: s.calMonth - 1 }),
    calNext: () => this.setState(isWeekView ? { calOff: s.calOff + 1 } : { calMonth: s.calMonth + 1 }),
    calToday: () => this.setState({ calOff: 0, calMonth: (base.getFullYear() - 2026) * 12 + base.getMonth() - 9 }),
    calAtNow: isWeekView ? s.calOff === 0 : (mFirst.getMonth() === base.getMonth() && mFirst.getFullYear() === base.getFullYear()),
    calEmpty: isWeekView && calPosts.length === 0,
    calNote: isWeekView && (s.calOff === 1 || s.calOff < 0),
    calNoteText: s.calOff < 0 ? 'You’re looking at a past week. These posts are already published.' : 'Pingoo suggests next week’s plan on Sunday evening, after this week’s results come in.',
    monthHead: DN, monthCells: monthCells,
    live: s.live, notLive: !s.live, publishing: s.publishing, cantGoLive: !accepted || approvedCount === 0 || s.publishing,
    goLiveLabel: s.publishing ? 'Scheduling…' : (approvedCount ? 'Schedule ' + approvedCount + (approvedCount === 1 ? ' post' : ' posts') : 'Schedule posts'),
    goLive: () => {
      if (!accepted || approvedCount === 0 || s.publishing) return;
      this.setState({ publishing: true });
      clearTimeout(this._pt);
      this._pt = setTimeout(() => {
        this.setState({ publishing: false, live: true });
        this.showToast(approvedCount + (approvedCount === 1 ? ' post' : ' posts') + ' scheduled. Owners will get reminders.');
      }, 900);
    },

    res: res, resultsReady: s.resultsReady && s.weekView === 0, winRate: wins + ' of ' + histAll.length + ' plans worked',
    showStatusCard: !s.resultsReady && s.weekView === 0, resShowHero: s.weekView !== 1, statusTitle: statusTitle, statusSub: statusSub, statusBtn: statusBtn, statusGo: statusGo,
    nextWeek: s.week + 1, nextBet: this.betsFor(s.week + 1)[0],
    startNext: () => {
      const r = this.fmt(raw, raw.result);
      this.go('home', {
        week: s.week + 1, weekView: 0, betIdx: 0, decision: null, evidenceOpen: false, approved: [false, false, false],
        hooks: [0, 0, 0], sel: 0, live: false, resultsReady: false,
        lastRes: Object.assign({ week: s.week }, raw),
        historyExtra: [{ w: s.week, t: raw.title, g: this.fmt(raw, raw.target) + ' ' + raw.metric.toLowerCase(), r: r, v: raw.learn.verdict, vk: raw.learn.vk }].concat(s.historyExtra)
      });
      this.showToast('Week ' + (s.week + 1) + ' plan is ready.');
    },

    kpis: [
      { l: 'Total audience', v: '142.5K', d: '↑ 12% vs last month', pct: '12%', rest: 'vs last month', dirCls: 'up', pts: '0,26 16,24 33,22 50,18 66,16 83,11 100,6' },
      { l: 'New followers', v: '4,210', d: '↑ 18% vs last month', pct: '18%', rest: 'vs last month', dirCls: 'up', pts: '0,28 16,25 33,26 50,19 66,17 83,12 100,8' },
      { l: 'Engagement rate', v: '4.8%', d: '↑ 0.6 pts vs last month', pct: '0.6 pts', rest: 'vs last month', dirCls: 'up', pts: '0,24 16,26 33,21 50,20 66,15 83,14 100,9' },
      { l: 'Average reach per post', v: '9,860', d: '↓ 3% vs last month', pct: '3%', rest: 'vs last month', dirCls: 'down', pts: '0,10 16,12 33,9 50,14 66,13 83,17 100,15' }
    ],
    heatCols: HC, heat: heat, heatSel: heatSel, growth: growth, patterns: patterns,
    pat: patterns.reduce((m, p) => { m[p.id] = Object.assign({ big: { num: '+40%', ba: '1.6×', list: '#1', stories: '−12%' }[p.id] || '' }, p); return m; }, {}),
    trendNote: s.useCategory ? 'Pingoo picks which to try.' : 'Turned off, so Pingoo only uses what’s proven for you.',
    chanSplit: [['Instagram', 38], ['TikTok', 24], ['LinkedIn', 18], ['YouTube', 12], ['X', 8]].map((x) => Object.assign({ n: x[0], v: x[1] + '%', w: (x[1] / 38 * 100) + '%', f: (x[1] / 38).toFixed(3), pw: (x[1] / 40 * 100) + '%' }, this.ch(x[0]))),
    chanNote: 'This week’s plan posts on ' + planPlats.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.',
    interests: [['Productivity', '32%'], ['Tools & apps', '21%'], ['Habits', '18%'], ['Remote work', '14%'], ['Design', '9%']].map((x) => ({ n: x[0], v: x[1], cls: x[0] === 'Productivity' ? 'is-used' : '' })),
    coachTabOn: { chat: s.coachTab === 'chat', learned: s.coachTab === 'learned' },
    coachTabs: [['chat', 'Chat'], ['learned', 'What I’ve learned']].map((t) => ({ label: t[1], on: s.coachTab === t[0], cls: s.coachTab === t[0] ? 'is-on' : '', pick: () => this.setState({ coachTab: t[0], lessonFix: null }) })),
    lessonGroups: lessonGroups, removedLessons: removedLessons, hasRemoved: removedLessons.length > 0,
    lessonCount: liveLessons.filter((l) => l.status === 'confirmed').length + ' confirmed · ' + liveLessons.filter((l) => l.status === 'testing').length + ' testing',
    traits: traits,
    toneOpts: ['More casual', 'As is', 'More formal'].map((t) => ({ label: t, on: s.voiceTone === t, cls: s.voiceTone === t ? 'is-on' : '', pick: () => { this.setState({ voiceTone: t }); this.showToast(t === 'As is' ? 'Drafts will keep your current tone.' : 'Next drafts will be ' + t.toLowerCase() + '.'); } })),
    emojiOpts: ['None', 'Light', 'More'].map((t) => ({ label: t, on: s.emoji === t, cls: s.emoji === t ? 'is-on' : '', pick: () => { this.setState({ emoji: t }); this.showToast(t === 'None' ? 'No emoji in future drafts.' : t === 'Light' ? 'One emoji at most, like now.' : 'Drafts will use a few more emoji.'); } })),
    bestPosts: [['How to plan content in 10 minutes', 'LinkedIn', 'LinkedIn · Carousel · Jun 22', '+72%'], ['Your desk doesn’t need to be pretty', 'Instagram', 'Instagram · Reel · Sep 18', '+58%'], ['3 tools that save me 10 hours a week', 'X', 'X · Post · Sep 20', '+56%']].map((x) => Object.assign({ t: x[0], meta: x[2], lift: x[3] }, this.ch(x[1]))),
    useCategory: s.useCategory, catSwCls: s.useCategory ? 'is-on' : '',
    catNote: s.useCategory ? 'Pingoo may try what’s working for others in productivity. A pattern only becomes a lesson after it works for you.' : 'Off. Pingoo only uses what’s proven on your own account.',
    toggleCategory: () => { this.setState({ useCategory: !s.useCategory }); this.showToast(s.useCategory ? 'Category patterns off. Drafts will only use your own style.' : 'Category patterns on.'); },
    goLearned: () => this.go('coach', { coachTab: 'learned' }),
    ages: [['18–24', 14], ['25–34', 46], ['35–44', 27], ['45+', 13]].map((x) => ({ n: x[0], v: x[1] + '%', w: (x[1] / 46 * 100) + '%', pw: (x[1] / 50 * 100) + '%' })),
    locs: [['United States', 34], ['United Kingdom', 12], ['Germany', 8], ['Canada', 7], ['India', 6]].map((x) => ({ n: x[0], v: x[1] + '%', w: (x[1] / 34 * 100) + '%', pw: (x[1] / 40 * 100) + '%' })),

    members: members, invites: invites, noInvites: invites.length === 0, memberCount: members.length, inviteCount: invites.length,
    teamTabOn: { members: s.teamTab === 'members', invites: s.teamTab === 'invites' },
    teamTabCls: { members: s.teamTab === 'members' ? 'is-on' : '', invites: s.teamTab === 'invites' ? 'is-on' : '' },
    teamTabMembers: () => this.setState({ teamTab: 'members' }), teamTabInvites: () => this.setState({ teamTab: 'invites' }),
    inviteEmail: s.inviteEmail, inviteRole: s.inviteRole, inviteErr: s.inviteErr,
    onInviteEmail: (e) => this.setState({ inviteEmail: e.target.value, inviteErr: false }),
    onInviteRole: (e) => this.setState({ inviteRole: e.target.value }),
    sendInvite: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const em = this.state.inviteEmail.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { this.setState({ inviteErr: true }); return; }
      this.setState({ invites: [{ e: em, r: this.state.inviteRole, sent: 'Sent just now' }].concat(this.state.invites), inviteEmail: '', teamTab: 'invites' });
      this.showToast('Invite sent to ' + em);
    },

    connected: connected, connectedCount: connectedCount, browse: browse, noBrowse: browse.length === 0, intCats: intCats,
    intQuery: s.intQuery, onIntQuery: (e) => this.setState({ intQuery: e.target.value }),
    requestInt: () => this.showToast('Thanks! We’ll email you when it’s available.'),

    toast: s.toast, toastCls: s.toastOn ? 'is-on' : ''
  };
  const mkDD = (id, opts, val, fn) => {
    const open = s.ddOpen === id; const sv = String(val);
    const curO = opts.find((o) => String(o.v) === sv) || opts[0] || { l: '' };
    return { open: open, cls: open ? 'is-open' : '', label: curO.l,
      toggle: () => this.setState({ ddOpen: open ? null : id }), close: () => this.setState({ ddOpen: null }),
      opts: opts.map((o) => { const sel = String(o.v) === sv; return { l: o.l, sel: sel, cls: sel ? 'is-sel' : '',
        pick: () => { this.setState({ ddOpen: null }); if (fn) fn({ target: { value: String(o.v) } }); } }; }) };
  };
  const cv = __v.cur || {};
  __v.ddFmt = mkDD('fmt', ['Post', 'Reel', 'Carousel', 'Thread'].map((x) => ({ v: x, l: x })), cv.fmt, __v.onOtherFmt);
  __v.ddWhen = mkDD('when', (cv.whenOpts || []).map((o) => ({ v: o.v, l: o.l })), cv.whenVal, __v.onWhen);
  __v.ddRole = mkDD('role', ['Editor', 'Admin', 'Viewer'].map((x) => ({ v: x, l: x })), __v.inviteRole, __v.onInviteRole);
  __v.ddStart = mkDD('start', ((__v.wz || {}).startOpts || []).map((o) => ({ v: o.v, l: o.label })), (__v.wz || {}).start, __v.wzStart);
  return { MSGS, NOTIFS, msgUnread, notifUnread, messages, notifs, calHint, calHintText, calHintBtn, calHintGo, acceptFn, __v, mkDD, cv };
}
