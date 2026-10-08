// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: coach.
export function viewCoach(this: any, c: any): any {
  const { s, m, goTo } = c;
  const thread = (s.thread || this.initialThread()).map((m) => ({
    text: m.text, cls: m.from === 'me' ? 'msg-me' : 'msg-coach', isCoach: m.from !== 'me',
    hasAction: !!m.act, actLabel: m.actLabel || '', act: m.act ? goTo(m.act) : this.noop
  }));
  return { thread };
}
