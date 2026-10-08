// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: audience.
export function viewAudience(this: any, c: any): any {
  const { DN, s } = c;
  const HEAT = [[20, 46, 38, 30, 26, 18], [28, 88, 62, 40, 34, 22], [30, 92, 66, 44, 36, 24], [32, 100, 70, 46, 38, 26], [26, 58, 44, 34, 28, 20], [14, 30, 36, 32, 24, 16], [12, 24, 30, 28, 30, 20]];
  const HC = ['8–10 AM', '10–12', '12–2 PM', '2–4', '4–6', '6–8'];
  const HCL = ['8–10 AM', '10 AM–12 PM', '12–2 PM', '2–4 PM', '4–6 PM', '6–8 PM'];
  const DL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const heat = HEAT.map((row, di) => ({ d: DN[di], cells: row.map((v, hi) => ({
    tip: DN[di] + ' ' + HC[hi] + ' · ' + v + '%', cls: 'lv' + (v > 70 ? 3 : v >= 40 ? 2 : 1) + (s.heatSel[0] === di && s.heatSel[1] === hi ? ' is-sel' : ''),
    label: DL[di] + ' ' + HCL[hi] + ': ' + v + '% of peak activity',
    pick: () => { const h = this.state.heatSel; if (h[0] !== di || h[1] !== hi) this.setState({ heatSel: [di, hi] }); }
  })) }));
  const hv = HEAT[s.heatSel[0]][s.heatSel[1]];
  const heatSel = { title: DL[s.heatSel[0]] + ', ' + HCL[s.heatSel[1]], sub: hv + '% of your peak activity' + (hv >= 85 ? ' · one of your best times to post' : hv < 35 ? ' · a quiet time for your audience' : '') };
  return { HEAT, HC, HCL, DL, heat, hv, heatSel };
}
