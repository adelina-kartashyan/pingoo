// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Sign-up and onboarding flow.
export const onboardingMethods: Record<string, any> = {
  startOnb(this: any) { clearInterval(this._oi); this.setState({ onb: { step: 0, acc: {}, what: '', tone: 'Friendly', goal: 'engagement', prog: 0 }, pop: null, menuOpen: false }); },

  onbSet(this: any, patch) { this.setState({ onb: Object.assign({}, this.state.onb, patch) }); },

  onbScan(this: any) {
    clearInterval(this._oi); this.onbSet({ step: 4, prog: 0 });
    this._oi = setInterval(() => { const o = this.state.onb; if (!o) { clearInterval(this._oi); return; } const p = Math.min(100, (o.prog || 0) + 4); this.onbSet({ prog: p }); if (p >= 100) clearInterval(this._oi); }, 90);
  },

  onbFinish(this: any) { clearInterval(this._oi); clearTimeout(this._lt); this.setState({ onb: null, fresh: true, screen: 'home', tipsHidden: false, pageLoading: true }); this._lt = setTimeout(() => { this.setState({ pageLoading: false }); this.showToast('Your first weekly plan is ready.'); }, 1500); },
};
