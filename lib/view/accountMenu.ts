// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: account menu → real destinations (no more dead ends).
export function viewAccountMenu(this: any, c: any): any {
  const { __v } = c;
  __v.umProfile = () => this.goSettings('profile');
  __v.umBrand = () => this.goSettings('brand');
  __v.umNotifs = () => this.goSettings('notifs');
  __v.umPlan = () => this.goSettings('billing');
  __v.umLogout = () => this.startOnb();
  __v.proClick = () => this.goSettings('billing');
  return {  };
}
