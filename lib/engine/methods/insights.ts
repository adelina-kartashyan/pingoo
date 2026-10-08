// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Read-only helpers for plans, results and formatting.
export const insightsMethods: Record<string, any> = {
  patternsData(this: any) {
    return [
      { id: 'num', name: 'Number + result openings', ex: 'Opens with a test and an outcome: “I tried 30 ___. 5 stuck.”', stat: 'Used by 3 of the 10 most-shared productivity posts this month', trend: '+40% this month', status: 'plan' },
      { id: 'ba', name: 'Before-and-after Reels', ex: 'The messy version first, then the fixed one, in under 20 seconds', stat: 'Shared 1.6× more than the average productivity post', trend: 'Rising', status: 'untried' },
      { id: 'list', name: 'Save-worthy checklists', ex: 'A carousel that ends with a one-page checklist', stat: 'The most-saved format in productivity', trend: 'Steady', status: 'proven' },
      { id: 'stories', name: 'Daily Story series', ex: 'Five Stories in a row, one tip each', stat: 'Still common in productivity, but losing reach', trend: '−12% this month', status: 'failed' }
    ];
  },

  lessonsData(this: any) {
    return [
      { id: 'video', title: 'Short video wins on Instagram and TikTok', detail: 'Your Reels average 2.9× the engagement of your image posts.', ev: 'Proven in 3 weeks · latest: week 39', status: 'confirmed' },
      { id: 'time', title: 'Tue–Thu, 10 AM–12 PM is your best time', detail: '41% of your weekly engagement lands in those hours.', ev: 'Proven in 6 weeks', status: 'confirmed' },
      { id: 'topic', title: 'Productivity is your strongest topic', detail: 'It gets 32% more saves than your average post.', ev: 'Proven in 5 weeks', status: 'confirmed' },
      { id: 'checklist', title: 'Checklists get saved', detail: 'Carousels that end with a checklist are your most-saved posts. Learned from a category pattern.', ev: 'Proven in 2 weeks · weeks 36 and 38', status: 'confirmed' },
      { id: 'li', title: 'LinkedIn prefers carousels over video', detail: 'Your week 38 carousel beat your LinkedIn average. Video there hasn’t been tested enough yet.', ev: 'Seen once · checking again', status: 'testing' },
      { id: 'bio', title: 'A clear bio turns visitors into followers', detail: 'Your follow rate from profile visits rose from 6.1% to 7.4%.', ev: 'Seen once · week 40', status: 'testing' },
      { id: 'stories', title: 'Daily Stories don’t get replies', detail: 'Week 37 got 17 replies against a goal of 40. Also falling across your category.', ev: 'Didn’t work in 2 weeks', status: 'retired' }
    ];
  },

  traitsData(this: any) {
    return [
      { t: 'Short sentences', d: 'Usually under 10 words' },
      { t: 'Opens with a number', d: 'In 7 of your 12 best posts' },
      { t: 'Talks to “you”', d: 'Friendly, second person' },
      { t: 'Ends with a question', d: 'Invites people to reply' }
    ];
  },

  betsFor(this: any, week) { const d = this.D(); return week % 2 === 1 ? [d.A, d.B, d.C] : [d.D, d.B, d.C]; },

  fmt(this: any, r, v) { return r.unit === '%' ? v.toFixed(1) + '%' : Math.round(v).toLocaleString('en-US'); },

  ch(this: any, n) { return this.D().CH[n] || { ab: n.slice(0, 2), c: '#5E5A7A' }; },

  dayDate(this: any, week, i) { return new Date(2026, 9, 5 + (week - 41) * 7 + i); },

  weekDates(this: any, week) {
    const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const a = this.dayDate(week, 0), b = this.dayDate(week, 6);
    return M[a.getMonth()] + ' ' + a.getDate() + ' – ' + (a.getMonth() === b.getMonth() ? '' : M[b.getMonth()] + ' ') + b.getDate();
  },

  dayTip(this: any, i) {
    return [['8:30 AM', 'Monday mornings get your best saves.'], ['12:00 PM', 'Tuesdays are one of your best days, especially at lunch.'], ['9:00 AM', 'Wednesday mornings bring steady reach.'], ['6:00 PM', 'Thursday evenings are your best time, about 40% more reach.'], ['12:00 PM', 'Friday lunch gets the most comments, with a bit less reach.'], ['10:00 AM', 'Saturdays get about 30% less reach for you.'], ['5:00 PM', 'Sunday evenings are quieter, good for a weekly recap.']][i] || ['12:00 PM', ''];
  },

  runCount(this: any) {
    if (this._raf) cancelAnimationFrame(this._raf);
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1500);
      this.setState({ prog: p === 1 ? 1 : 1 - Math.pow(2, -10 * p) });
      if (p < 1) this._raf = requestAnimationFrame(step);
    };
    this.setState({ prog: 0 });
    this._raf = requestAnimationFrame(step);
  },
};
