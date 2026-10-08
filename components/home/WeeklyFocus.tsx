'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCalendar2, IconCaretDown, IconTick } from '@/components/icons';
import FocusAndChecklist from './FocusAndChecklist';

export default function WeeklyFocus() {
  const v = useVM();
  return (
    <section className="screen home">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Good afternoon, Teo</p>
          <h1 className="h1" tabIndex={-1}>
            One focus.{' '}
            <em>One week.</em>
          </h1>
          <p className="lede">Pingoo went through your last 30 days on 5 channels and picked the one move most likely to grow your engagement.</p>
        </div>
        <div className="wk-wrap">
          <button
            className={`wk-chip ${txt(v.wv?.chipCls)}`}
            onClick={v.toggleWeekMenu}
            aria-haspopup="menu"
            aria-expanded={v.weekMenuOpen}
            aria-label={`Week: ${txt(v.wv?.label)}, ${txt(v.wv?.dates)}. Change week`}
          >
            <IconCalendar2 className="i i-s" aria-hidden="true" />
            {' '}
            <span className="wk-l">{txt(v.wv?.label)}</span>
            <span className="wk-d">{txt(v.wv?.dates)}</span>
            {' '}
            <IconCaretDown className="i i-s wk-chev ph" aria-hidden="true" />
          </button>
          {' '}
          {when(v.weekMenuOpen) && (
            <div className="wk-menu" role="menu" aria-label="Choose a week">
              {(v.wv?.opts || []).map((wo: any, index: number) => (
                <button key={index} className={`wk-opt ${txt(wo?.cls)}`} role="menuitemradio" aria-checked={wo?.on} onClick={wo?.pick}>
                  <span>
                    <b style={{ display: 'block' } as any}>{txt(wo?.label)}</b>
                    <span className="muted" style={{ fontSize: '13px' } as any}>{txt(wo?.dates)} · {txt(wo?.sub)}</span>
                  </span>
                  {' '}
                  {when(wo?.on) && (
                    <IconTick className="i i-s" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <FocusAndChecklist />
      <div className="home-row">
        <div className="card">
          <div className="card-h">
            <h3>This week so far</h3>
            <span className="muted" style={{ fontSize: '13px' } as any}>vs last week</span>
          </div>
          <div className="stat-row">
            <span>Engagement rate</span>
            <span>
              <b>4.8%</b>
              {' '}
              <span className="up">↑ 0.6 pts</span>
            </span>
          </div>
          <div className="stat-row">
            <span>Reach</span>
            <span>
              <b>142.5K</b>
              {' '}
              <span className="up">↑ 12%</span>
            </span>
          </div>
          <div className="stat-row">
            <span>New followers</span>
            <span>
              <b>1,180</b>
              {' '}
              <span className="up">↑ 18%</span>
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Coming up</h3>
            <button className="link-btn link-ink" onClick={v.goCalendar}>Calendar</button>
          </div>
          {' '}
          {(v.comingUp || []).map((u: any, index: number) => (
            <div key={index} className="up-row">
              <span className={`mt ch-${txt(u?.ab)}`} style={{ background: txt(u?.c) } as any}>{txt(u?.ab)}</span>
              <span style={{ flex: '1', minWidth: '0' } as any}>
                <span className="t" style={{ display: 'block' } as any}>{txt(u?.t)}</span>
                <span className="s">{txt(u?.when)}</span>
              </span>
              <span className={`status ${txt(u?.stCls)}`}>{txt(u?.status)}</span>
            </div>
          ))}
        </div>
        <div className="card camp-card">
          <div className="card-h" style={{ marginBottom: '0' } as any}>
            <h3>Active campaign</h3>
            {when(v.homeCamp?.has) && (
              <span className="status s-pub">Active</span>
            )}
          </div>
          {' '}
          {when(v.homeCamp?.has) && (
            <>
              <p className="camp-name">{txt(v.homeCamp?.name)}</p>
              <p className="muted" style={{ fontSize: '14px' } as any}>{txt(v.homeCamp?.meta)}</p>
              <div className="bar"><span style={{ width: txt(v.homeCamp?.pct) } as any} /></div>
              <div className="camp-foot"><button className="link-btn link-ink" onClick={v.goPlanner}>Open in Campaign Planner</button></div>
            </>
          )}
          {' '}
          {when(v.homeCamp?.none) && (
            <>
              <p className="muted">No campaign is running. Weekly plans still work on their own, but a campaign gives them a shared goal.</p>
              {' '}
              <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' } as any} onClick={v.newCampaign}>Plan a campaign</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
