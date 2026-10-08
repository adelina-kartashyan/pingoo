// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: integrations.
export function viewIntegrations(this: any, c: any): any {
  const { d, m, s } = c;
  const connected = d.CONNECTED.map((c, i) => {
    const m = c.ab ? c : Object.assign({}, c, this.ch(c.n));
    const on = s.intOn[i]; const err = c.n === 'TikTok' && s.tiktokErr;
    return { n: c.n, h: c.h, ab: m.ab, c: m.c, on: on, err: err, ok: !err, cardCls: err ? 'is-err' : '', swCls: on ? 'is-on' : '', dot: err ? 'err-dot' : on ? 'on-dot' : 'off-dot', state: err ? 'Connection expired · posts to TikTok are paused' : on ? 'Syncing · updated 12 min ago' : 'Paused · Pingoo won’t use this data', reconnect: () => { this.setState({ tiktokErr: false }); this.showToast('TikTok reconnected. Posts will go out as planned.'); },
      toggle: () => { const a = this.state.intOn.slice(); a[i] = !a[i]; this.setState({ intOn: a }); this.showToast(c.n + (a[i] ? ' syncing again' : ' paused')); } };
  });
  const CATL = { ads: 'Ads & analytics', crm: 'CRM & sales', prod: 'Productivity' };
  const q = s.intQuery.trim().toLowerCase();
  const browse = d.BROWSE.filter((b) => (s.intCat === 'all' || b.cat === s.intCat) && (!q || b.n.toLowerCase().indexOf(q) > -1)).map((b) => {
    const added = !!s.intAdded[b.n];
    return Object.assign({}, b, { catLabel: CATL[b.cat], btn: added ? 'Connected ✓' : 'Connect', btnCls: added ? 'btn-ghost btn-conn' : 'btn-out',
      toggle: () => { const a = Object.assign({}, this.state.intAdded); a[b.n] = !a[b.n]; this.setState({ intAdded: a }); this.showToast(a[b.n] ? b.n + ' connected' : b.n + ' disconnected'); } });
  });
  const intCats = [['all', 'All'], ['ads', 'Ads & analytics'], ['crm', 'CRM & sales'], ['prod', 'Productivity']].map((c) => ({ label: c[1], on: s.intCat === c[0], cls: s.intCat === c[0] ? 'is-on' : '', pick: () => this.setState({ intCat: c[0] }) }));
  const connectedCount = s.intOn.filter(Boolean).length + Object.keys(s.intAdded).filter((k) => s.intAdded[k]).length;
  return { connected, CATL, q, browse, intCats, connectedCount };
}
