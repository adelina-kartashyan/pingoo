// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Ask Pingoo chat.
export const coachMethods: Record<string, any> = {
  initialThread(this: any) {
    return [
      { from: 'coach', text: 'Morning, Teo. Last week your Reels got 2.9× more engagement than your image posts, and your profile visits beat the goal.' },
      { from: 'coach', text: 'So this week I suggest one focus: post 3 short videos, Tuesday to Thursday, between 10 AM and 12 PM. It should take about 3 hours.', act: 'home', actLabel: 'See this week’s plan' }
    ];
  },

  askFrom(this: any, q, ans) { this.go('coach'); this.askCoach(q, ans); },

  askCoach(this: any, q, ans) {
    const d = this.D();
    const thread = (this.state.thread || this.initialThread()).concat([{ from: 'me', text: q }]);
    const hit = ans || d.COACH_QA.find((x) => x.q === q);
    if (this.state.offline) { this.setState({ thread: thread.concat([{ from: 'coach', text: 'You’re offline, so I can’t check your numbers right now. Ask again once you’re back online and I’ll pick it up.' }]), typing: false }); return; }
    this.setState({ thread: thread, typing: true, coachText: '', typingText: 'Reading your numbers…' });
    clearTimeout(this._ct); clearTimeout(this._ct2);
    this._ct2 = setTimeout(() => { if (this.state.typing) this.setState({ typingText: 'Comparing with your best weeks…' }); }, 900);
    this._ct = setTimeout(() => {
      const reply = hit ? { from: 'coach', text: hit.a, act: hit.act, actLabel: hit.actLabel }
        : { from: 'coach', text: 'Here’s what your numbers point to: short video, Tuesday to Thursday mornings, and productivity topics. Want me to turn that into a draft?', act: 'create', actLabel: 'Open Create' };
      this.setState({ thread: this.state.thread.concat([reply]), typing: false });
    }, 1900);
  },
};
