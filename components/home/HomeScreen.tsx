'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAlert, IconCalendar2, IconCaretDown, IconTick } from '@/components/icons';
import WeeklyFocus from './WeeklyFocus';

// Home: this week’s focus and your weekly checklist.
export default function HomeScreen() {
  const v = useVM();
  return (
    <>
      {when(v.tiktokErr) && (
        <div className="err-banner" role="alert">
          <span className="err-ic"><IconAlert className="i" aria-hidden="true" /></span>
          <p>
            <b>TikTok disconnected.</b>
            {' '}The connection expired, so 1 post this week can’t publish. Reconnect to keep the plan on track.
          </p>
          <div className="err-acts">
            <button className="btn btn-primary btn-sm" onClick={v.reconnectTikTok}>Reconnect TikTok</button>
            <button className="link-btn" onClick={v.reconnectGo}>View integrations</button>
          </div>
        </div>
      )}
      {when(v.wv?.past) && (
        <section className="screen">
          <div className="head-row">
            <div className="page-head stagger">
              <p className="eyebrow">Last week · Week {txt(v.lastRes?.week)}</p>
              <h1 className="h1" tabIndex={-1}>
                Last week,{' '}
                <em>in review.</em>
              </h1>
              <p className="lede">This week is finished and read-only. Here's what you planned and how it went.</p>
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
          <article className="past-card">
            <div className="res-top">
              <span className="chip chip-dark">
                <span className="pip" />
                Week {txt(v.lastRes?.week)} plan
              </span>
              <span className={`verdict ${txt(v.lastRes?.learn?.vk)}`}>{txt(v.lastRes?.learn?.verdict)}</span>
            </div>
            <h2 className="past-t">{txt(v.lastRes?.title)}</h2>
            <dl className="past-stats">
              <div>
                <dt>{txt(v.lastRes?.metric)}</dt>
                <dd className="acid">{txt(v.lastRes?.resultStr)}</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>{txt(v.lastRes?.targetStr)}</dd>
              </div>
            </dl>
            <p className="past-lesson">
              <b>Lesson:</b>
              {' '}{txt(v.lastRes?.learn?.headline)}
            </p>
            <div className="hero-acts">
              <button className="btn btn-acid btn-sm" onClick={v.goResults}>See full results</button>
              {' '}
              <button className="btn btn-line btn-sm" onClick={v.weekNow}>Back to this week</button>
            </div>
          </article>
        </section>
      )}
      {when(v.wv?.next) && (
        <section className="screen">
          <div className="head-row">
            <div className="page-head stagger">
              <p className="eyebrow">Next week · {txt(v.wv?.nextDates)}</p>
              <h1 className="h1" tabIndex={-1}>
                Next week is{' '}
                <em>still open.</em>
              </h1>
              <p className="lede">Pingoo picks next week's plan on Sunday evening, after this week's results are in. Here's where it's leaning so far.</p>
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
          <div className="card next-preview">
            <span className="used-tag">
              <i />
              Early idea · may change
            </span>
            {' '}
            <h2 className="past-t" style={{ color: '#0D0A26' } as any}>{txt(v.nextBet?.title)}</h2>
            <p className="muted">{txt(v.nextBet?.hyp)}</p>
            <div className="hero-acts"><button className="btn btn-primary btn-sm" onClick={v.weekNow}>Back to this week</button></div>
          </div>
        </section>
      )}
      {when(v.wv?.now) && (
        <WeeklyFocus />
      )}
    </>
  );
}
