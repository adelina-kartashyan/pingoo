// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: Empty & error states.
export function viewStates(this: any, c: any): any {
  const { __v, s } = c;
  __v.fresh = !!s.fresh; __v.notFresh = !s.fresh;
  __v.tiktokErr = !!s.tiktokErr;
  __v.reconnectTikTok = () => { this.setState({ tiktokErr: false }); this.showToast('TikTok reconnected. Posts will go out as planned.'); };
  __v.reconnectGo = () => { this.go('integrations'); };
  return {  };
}
