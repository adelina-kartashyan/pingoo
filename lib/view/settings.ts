// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: Settings.
export function viewSettings(this: any, c: any): any {
  const { s, __v, mkDD } = c;
  const st = s.setTab || 'profile';
  __v.setTabName = { profile: 'Profile', brand: 'Brand', notifs: 'Notifications', billing: 'Plan and billing' }[st] || 'Settings';
  __v.setTabs = [['profile', 'Profile'], ['brand', 'Brand'], ['notifs', 'Notifications'], ['billing', 'Plan & billing']].map((t) => ({ label: t[1], cls: st === t[0] ? 'is-on' : '', on: st === t[0], pick: () => this.setState({ setTab: t[0] }) }));
  __v.setOn = { profile: st === 'profile', brand: st === 'brand', notifs: st === 'notifs', billing: st === 'billing' };
  __v.ddTz = mkDD('tz', [{ v: 'yerevan', l: 'Yerevan · GMT+4' }, { v: 'london', l: 'London · GMT+1' }, { v: 'berlin', l: 'Berlin · GMT+2' }, { v: 'ny', l: 'New York · GMT−4' }, { v: 'la', l: 'Los Angeles · GMT−7' }], s.tzVal, (e) => this.setState({ tzVal: e.target.value }));
  __v.saveProfile = () => this.showToast('Profile saved.');
  __v.changePhoto = () => this.showToast('Photo upload opens here.');
  __v.brandWhat = s.brandWhat; __v.onBrandWhat = (e) => this.setState({ brandWhat: e.target.value });
  __v.brandAvoid = s.brandAvoid; __v.onBrandAvoid = (e) => this.setState({ brandAvoid: e.target.value });
  __v.toneOpts = ['Friendly', 'Expert', 'Playful', 'Bold'].map((t) => ({ l: t, cls: s.brandTone === t ? 'is-on' : '', on: s.brandTone === t, pick: () => this.setState({ brandTone: t }) }));
  __v.saveBrand = () => this.showToast('Brand saved. Pingoo will use it from the next plan.');
  const NF = [['plan', 'Your weekly plan is ready', 'Sunday evening, so you can start Monday with a plan.'], ['planMail', 'Also send the plan by email', 'A short email with the plan and one-click approve.'], ['results', 'Results are in', 'When a week’s results are measured.'], ['comments', 'A teammate comments on a post', 'Replies and mentions on drafts you own.'], ['digest', 'Monthly summary email', 'Your best posts and what Pingoo learned this month.']];
  __v.notifRows = NF.map((r) => { const on = !!(s.notif || {})[r[0]]; return { t: r[1], d: r[2], on: on, swCls: on ? 'is-on' : '', toggle: () => { const n = Object.assign({}, this.state.notif); n[r[0]] = !n[r[0]]; this.setState({ notif: n }); } }; });
  const isPro = !!s.pro;
  __v.isPro = isPro; __v.isFree = !isPro; __v.proCls = isPro ? 'is-pro' : '';
  __v.planName = isPro ? 'Pro plan' : 'Free plan'; __v.planTag = isPro ? 'Pro' : 'Upgrade';
  __v.planFreeCls = isPro ? '' : 'is-on'; __v.planProCls = isPro ? 'is-on' : '';
  __v.proMoment = !!s.proMoment;
  __v.bgHidden = !!(s.onb || s.proMoment || s.confirmEnd || (__v.wz && __v.wz.open)) ? 'true' : 'false';
  __v.upgrade = () => { this._pmFocus = true; this.setState({ pro: true, proMoment: true, pop: null }); };
  __v.setPro = () => this.setState({ pro: true });
  __v.downgrade = () => { if (s.pro) this.showToast('Back on the Free plan. Pingoo is black and white again.'); this.setState({ pro: false, proMoment: false }); };
  __v.closeProMoment = () => { this.setState({ proMoment: false }); this.showToast('You’re on Pro. Look for the colourful Pingoo in your workspace.'); };
  __v.manageBilling = () => this.showToast('Billing portal would open here.');
  __v.dataSample = () => this.setState({ fresh: false }); __v.dataNew = () => this.setState({ fresh: true });
  __v.dataSampleCls = s.fresh ? '' : 'is-on'; __v.dataNewCls = s.fresh ? 'is-on' : '';
  __v.replayOnb = () => this.startOnb();
  __v.goSettings = () => this.goSettings('profile');
  return { st, NF, isPro };
}
