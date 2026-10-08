// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Navigation, hover menus and toasts.
export const navigationMethods: Record<string, any> = {
  go(this: any, screen, extra) {
    this.setState(Object.assign({ screen: screen, menuOpen: false, pop: null }, extra || {}));
    if (screen === 'coach') this.setState({ coachSeen: true });
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
    if (screen === 'results') this.runCount();
  },

  goSettings(this: any, tab) { this.go('settings', { setTab: tab || 'profile' }); },

  hovOpen(this: any, name) {
    clearTimeout(this._hc);
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    if (this.state.pop !== name) { this._hovAt = Date.now(); this._hovPop = name; this.setState({ pop: name }); }
  },

  hovClose(this: any) {
    clearTimeout(this._hc);
    this._hc = setTimeout(() => { if (this._hovPop && this.state.pop === this._hovPop) this.setState({ pop: null }); this._hovPop = null; }, 260);
  },

  showToast(this: any, msg, undo) {
    this._undo = undo || null;
    this.setState({ toast: msg, toastOn: true, toastHasUndo: !!undo });
    clearTimeout(this._tt);
    this._tt = setTimeout(() => this.setState({ toastOn: false, toastHasUndo: false }), undo ? 5000 : 2600);
  },
};
