// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: Loading & offline.
export function viewLoadingOffline(this: any, c: any): any {
  const { __v, s } = c;
  __v.pageLoading = !!s.pageLoading;
  if (s.pageLoading) { const off = {}; Object.keys(__v.is || {}).forEach((k) => { off[k] = false; }); __v.is = off; __v.showCoachBar = false; __v.showCoachPill = false; }
  const tOpen = s.trendOpen !== false, aOpen = !!s.aiOpen;
  __v.trendFold = { open: tOpen, cls: tOpen ? 'is-open' : '', toggle: () => this.setState({ trendOpen: !tOpen }) };
  __v.aiFold = { open: aOpen, cls: aOpen ? 'is-open' : '', toggle: () => this.setState({ aiOpen: !aOpen }) };
  __v.offline = !!s.offline;
  __v.retryNet = () => { let on = true; try { on = navigator.onLine !== false; } catch (e) {} if (on && s.offline) { this.setState({ offline: false }); this.showToast('Back online. Everything is synced.'); } else this.showToast('Still offline. We’ll keep trying.'); };
  __v.netOnCls = s.offline ? '' : 'is-on'; __v.netOffCls = s.offline ? 'is-on' : '';
  __v.netOn = () => this.setState({ offline: false }); __v.netOff = () => this.setState({ offline: true });
  return { tOpen, aOpen };
}
