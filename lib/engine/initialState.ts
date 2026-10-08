/* eslint-disable @typescript-eslint/no-explicit-any */
// Everything the app remembers while you click around (no backend yet).
export function initialState(engine: any): any {
  return {
    screen: 'home', collapsed: false, menuOpen: false, pop: null, tipsHidden: false, crView: 'edit', setTab: 'profile', notif: { plan: true, planMail: true, results: true, comments: true, digest: false }, brandWhat: 'A planning tool that tells small teams what to post each week, based on their own results.', brandTone: 'Friendly', brandAvoid: 'hustle, grind', tzVal: 'yerevan', fresh: false, tiktokErr: true, onb: null,
    week: 41, betIdx: 0, flipping: false, decision: null, evidenceOpen: false,
    sel: 0, hooks: [0, 0, 0], hookOut: false, approved: [false, false, false], skipped: [false, false, false], owners: [0, 1, 2], captions: {}, weekView: 0, gHover: null, useCategory: true, coachTab: 'chat', lessonFix: null, lessonOv: {}, lessonRemoved: {}, traitsOff: {}, voiceTone: 'As is', emoji: 'Light', media: {}, covers: {}, prevCh: {}, also: {}, overlay: false, mediaOpen: true, fitOpen: false, mediaTab: 'library', aiPrompt: '', aiLoading: false, aiResults: [], aiKind: null, sounds: {}, uploading: false, others: [], otherReady: {}, selOther: null, capExpanded: false, otherSeq: 1,
    publishing: false, live: false, resultsReady: false, prog: 1,
    toast: '', toastOn: false,
    lastRes: null, historyExtra: [],
    thread: null, typing: false, coachText: '', coachSeen: false,
    goalText: 'Grow engagement and build brand awareness', goalEditing: false,
    campIdx: 0, planTab: 'overview', camps: engine.campsInit(), wz: engine.blankWz(), confirmEnd: false, ideaPick: null, ideaText: '', noteText: '', notePin: false,
    chan: 'All', heatSel: [3, 1], calOff: 0, calView: 'week', calMonth: 0,
    teamTab: 'members', invites: [{ e: 'alex@pingoo.app', r: 'Editor', sent: 'Sent 2 days ago' }], inviteEmail: '', inviteRole: 'Editor', inviteErr: false,
    intOn: [true, true, true, true, true, true], intAdded: {}, intCat: 'all', intQuery: '',
    msgRead: false, notifRead: false, ckOpen: null, passedOpen: false, pvHi: null, hookOpen: false, basedOpen: false, createHintSeen: false, confirmWarn: false, extraChans: [], hiddenChans: [], addChOpen: false, libExtra: [], libEdit: null, libSaved: false
  };
}
