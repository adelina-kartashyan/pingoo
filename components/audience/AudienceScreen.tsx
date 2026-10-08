'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCaretDown, IconCrownSmall } from '@/components/icons';
import ActivityHeatmap from './ActivityHeatmap';
import AiVisibilityCard from './AiVisibilityCard';

// Audience & Trends: when people are online and what works.
export default function AudienceScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Audience &amp; Trends · last 30 days</p>
          <h1 className="h1" tabIndex={-1}>
            Who's listening,{' '}
            <em>and when.</em>
          </h1>
          <p className="lede">The facts behind your weekly plan: who follows you, when they show up, and what's working in your category right now.</p>
        </div>
      </div>
      {' '}
      {when(v.fresh) && (
        <div className="card empty-state">
          <img className="es-mark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
          <p className="label">Still learning</p>
          <h2 className="es-h">Trends appear after 2 weeks of posts.</h2>
          <p className="es-p">Pingoo needs a little history to spot when your audience is online and what they respond to. You’re on day 1.</p>
          <div className="es-meter" role="img" aria-label="Day 1 of 14">
            <div className="pbar-t"><span className="pbar-f" style={{ width: '7%' } as any} /></div>
            <span className="es-meter-l">Day 1 of 14</span>
          </div>
          <ul className="es-list">
            <li>When your audience is most active</li>
            <li>Which channels they follow you on</li>
            <li>What’s trending in your category</li>
            <li>How AI assistants describe your brand</li>
          </ul>
          <div className="es-acts"><button className="btn btn-out" onClick={v.goHome}>Back to this week’s plan</button></div>
        </div>
      )}
      {' '}
      {when(v.notFresh) && (
        <>
          <div className="aud-hero">
            <div className="aud-hero-t">
              <span className="used-tag">
                <i />
                Used in this week's plan
              </span>
              {' '}
              <h2>Your audience is most active Tue–Thu, 10 AM–12 PM.</h2>
              <p>41% of your weekly engagement happens in those 9 hours. That's why this week's plan posts then.</p>
              {' '}
              <button className="btn btn-acid aud-hero-btn" onClick={v.goHome}>
                See this week's plan
                <IconArrowRight className="i arrow ph" aria-hidden="true" />
              </button>
            </div>
            <div className="aud-hero-n">
              <b>41%</b>
              <span>of weekly engagement in 9 hours</span>
            </div>
          </div>
          <div className="kpis">
            {(v.kpis || []).map((k: any, index: number) => (
              <div key={index} className={`card kpi kpi2 is-${txt(k?.dirCls)}`}>
                <div className="kpi2-top">
                  <span className="kpi2-l">{txt(k?.l)}</span>
                  <b className="kpi2-v">{txt(k?.v)}</b>
                </div>
                <div className="kpi2-bot">
                  <span className="kpi2-d">
                    <svg className="kpi-arrow" width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true">
                      <rect className="kpi-arrow-bg" width="21" height="20" rx="10" />
                      <path d="M10.5 14.125V5.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.125 9.25L10.5 5.875L13.875 9.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <b>{txt(k?.pct)}</b>
                    {' '}{txt(k?.rest)}
                  </span>
                  <span className="kpi2-ic"><IconCrownSmall className="kpi-trend" aria-hidden="true" /></span>
                </div>
              </div>
            ))}
          </div>
          <ActivityHeatmap />
          <div className={`card trend-card fold ${txt(v.trendFold?.cls)}`} style={{ marginBottom: '16px' } as any}>
            <div className="card-h fold-h" onClick={v.trendFold?.toggle}>
              <h3><button type="button" className="fold-btn" aria-expanded={v.trendFold?.open}>Trending in your category</button></h3>
              <span className="muted" style={{ fontSize: '13px' } as any}>Productivity · this month</span>
              <IconCaretDown className="ph fold-car" aria-hidden="true" />
            </div>
            <div className="fold-b">
              <div className="fold-in">
                <p className="muted trend-sub">What the most-shared productivity posts have in common. {txt(v.trendNote)}</p>
                <div className="bento">
                  <div className="bc bc-a">
                    <span className="bc-ic bc-ic-lime" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M5 18V6M5 6l-2 2M9 18h4M11 18V6l-2 1.5M15 9a2.5 2.5 0 1 1 5 0c0 2.5-5 4-5 9h5" /></svg>
                    </span>
                    {' '}
                    <p className="bc-t">{txt(v.pat?.num?.name)}</p>
                    <p className="bc-d">{txt(v.pat?.num?.stat)}.</p>
                    <p className="bc-q">{txt(v.pat?.num?.ex)}</p>
                    <div className="bc-big bc-up">
                      {txt(v.pat?.num?.big)}
                      <span>this month</span>
                    </div>
                    <div className="bc-foot">
                      <span className={`tchip ${txt(v.pat?.num?.cls)}`}>
                        <i />
                        {txt(v.pat?.num?.status)}
                      </span>
                    </div>
                  </div>
                  <div className="bc bc-b">
                    <div className="bc-row">
                      <div>
                        <p className="bc-t">{txt(v.pat?.ba?.name)}</p>
                        <p className="bc-sub">{txt(v.pat?.ba?.ex)}</p>
                      </div>
                      <span className="bc-big bc-mid">{txt(v.pat?.ba?.big)}</span>
                    </div>
                    <div className="bc-row bc-row-f">
                      <span className="bc-small">{txt(v.pat?.ba?.stat)}</span>
                      <span className={`tchip ${txt(v.pat?.ba?.cls)}`}>
                        <i />
                        {txt(v.pat?.ba?.status)}
                      </span>
                    </div>
                  </div>
                  <div className="bc bc-c">
                    <div className="bc-dots" aria-hidden="true" />
                    <div className="bc-big bc-huge">{txt(v.pat?.list?.big)}</div>
                    <div className="bc-btm">
                      <p className="bc-t">{txt(v.pat?.list?.name)}</p>
                      <p className="bc-d">{txt(v.pat?.list?.ex)}. {txt(v.pat?.list?.stat)}.</p>
                      <span className={`tchip ${txt(v.pat?.list?.cls)}`}>
                        <i />
                        {txt(v.pat?.list?.status)}
                      </span>
                    </div>
                  </div>
                  <div className="bc bc-d2">
                    <div className="bc-row">
                      <div>
                        <p className="bc-t">{txt(v.pat?.stories?.name)}</p>
                        <p className="bc-sub">{txt(v.pat?.stories?.ex)}</p>
                      </div>
                      <span className="bc-tag-r">{txt(v.pat?.stories?.stat)}</span>
                    </div>
                    <div className="bc-row bc-row-f">
                      <span className="bc-big bc-down">{txt(v.pat?.stories?.big)}</span>
                      <span className={`tchip ${txt(v.pat?.stories?.cls)}`}>
                        <i />
                        {txt(v.pat?.stories?.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AiVisibilityCard />
        </>
      )}
    </section>
  );
}
