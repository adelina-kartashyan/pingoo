// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: growth chart.
export function viewGrowthChart(this: any, c: any): any {
  const { s } = c;
  const GV = []; let gv = 127500;
  for (let k = 0; k < 30; k++) { gv += 380 + Math.round(Math.sin(k * 1.3) * 260) + (k % 7 === 2 ? 900 : 0); GV.push(gv); }
  const gy = (v) => 180 - ((v - 125000) / 20000) * 160;
  const gPts = GV.map((v, k) => (k / 29 * 600).toFixed(1) + ',' + gy(v).toFixed(1));
  const gIdx = s.gHover == null ? 29 : s.gHover;
  const gDate = (k) => { const dt = new Date(2026, 8, 5 + k); return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt.getMonth()] + ' ' + dt.getDate(); };
  const growth = {
    line: gPts.join(' '), area: 'M0,200 L' + gPts.join(' L') + ' L600,200 Z',
    dotX: (gIdx / 29 * 100).toFixed(2) + '%', dotY: (gy(GV[gIdx]) / 200 * 100).toFixed(2) + '%',
    val: (GV[gIdx] / 1000).toFixed(1) + 'K', date: ' · ' + gDate(gIdx),
    tipCls: gIdx > 24 ? 'at-end' : gIdx < 4 ? 'at-start' : '', total: (GV[29] / 1000).toFixed(1) + 'K', pct: '+' + Math.round((GV[29] - GV[0]) / GV[0] * 100) + '%', dateOnly: gDate(gIdx),
    marks: [0, 7, 14, 21, 29].filter((k) => k !== gIdx).map((k) => ({ x: (k / 29 * 100).toFixed(2) + '%', y: (gy(GV[k]) / 200 * 100).toFixed(2) + '%' })),
    xs: [0, 7, 14, 21, 29].map((k) => ({ l: gDate(k), cls: Math.abs(k - gIdx) <= 3 ? 'is-on' : '' })),
    cols: GV.map((v, k) => ({ label: gDate(k) + ': ' + (v / 1000).toFixed(1) + 'K followers', pick: () => { if (this.state.gHover !== k) this.setState({ gHover: k }); } }))
  };
  return { GV, gv, gy, gPts, gIdx, gDate, growth };
}
