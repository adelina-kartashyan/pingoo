'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCalendar2, IconCaretDown, IconCheck, IconTick } from '@/components/icons';

// Results: did last week’s plan work?
export default function ResultsScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Results</p>
          <h1 className="h1" tabIndex={-1}>
            Did it{' '}
            <em>work?</em>
          </h1>
          <p className="lede">Every weekly plan ends with a clear answer and one lesson. That lesson shapes next week's plan.</p>
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
      {' '}
      {when(v.fresh) && (
        <div className="card empty-state">
          <img className="es-mark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
          <p className="label">No results yet</p>
          <h2 className="es-h">Your first results arrive Sunday.</h2>
          <p className="es-p">Pingoo measures a week’s plan once its posts are live. Here’s what’s left before then:</p>
          <ol className="es-steps">
            <li className="is-done">
              <span className="es-dot"><IconCheck className="ph" aria-hidden="true" /></span>
              Connect your accounts
            </li>
            <li className="is-done">
              <span className="es-dot"><IconCheck className="ph" aria-hidden="true" /></span>
              Get your first weekly plan
            </li>
            <li>
              <span className="es-dot">3</span>
              Approve the drafts in Create
            </li>
            <li>
              <span className="es-dot">4</span>
              Schedule them in Calendar
            </li>
          </ol>
          <div className="es-acts">
            <button className="btn btn-acid" onClick={v.goCreate}>
              Approve drafts
              <IconArrowRight className="i arrow ph" aria-hidden="true" />
            </button>
            <button className="btn btn-out" onClick={v.goCalendar}>Open Calendar</button>
          </div>
        </div>
      )}
      {' '}
      {when(v.notFresh) && (
        <>
          {when(v.wv?.next) && (
            <div className="card status-card">
              <div className="txt">
                <b>Next week hasn't started yet.</b>
                <span>Its results show up here once the week ends on {txt(v.wv?.nextEnd)}.</span>
              </div>
              {' '}
              <button className="btn btn-primary" onClick={v.weekNow}>Back to this week</button>
            </div>
          )}
          {' '}
          {when(v.showStatusCard) && (
            <div className="card status-card">
              <div className="txt">
                <b>{txt(v.statusTitle)}</b>
                <span>{txt(v.statusSub)}</span>
              </div>
              {' '}
              <button className="btn btn-primary" onClick={v.statusGo}>
                {txt(v.statusBtn)}
                <IconArrowRight className="i arrow ph" aria-hidden="true" />
              </button>
            </div>
          )}
          {' '}
          {when(v.resShowHero) && (
            <div className="res-grid">
              <article className="res-hero">
                <div className="res-top">
                  <span className="chip chip-dark">
                    <span className="pip" />
                    {txt(v.res?.label)}
                  </span>
                  <span className={`verdict ${txt(v.res?.learn?.vk)}`}>{txt(v.res?.learn?.verdict)}</span>
                </div>
                <p style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' } as any}>{txt(v.res?.title)}</p>
                <p className="res-metric">{txt(v.res?.metric)}</p>
                <p className="res-num">{txt(v.res?.now)}</p>
                <p className="res-sub">Started at {txt(v.res?.baseStr)} · goal {txt(v.res?.targetStr)}</p>
                <p className="res-scope">{txt(v.res?.scope)}</p>
                <div className="track" role="img" aria-label={v.res?.trackLabel}>
                  <span className="fill" style={{ width: txt(v.res?.fillW) } as any} />
                  {' '}
                  <span className="mark" style={{ left: txt(v.res?.baseL) } as any}><i>Start</i></span>
                  {' '}
                  <span className="mark mark-t" style={{ left: txt(v.res?.targetL) } as any}><i>Goal</i></span>
                </div>
              </article>
              <article className="card res-learn">
                <img className="mascot cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                {' '}
                <p className="label">What Pingoo learned</p>
                <h2 className="learn-h">{txt(v.res?.learn?.headline)}</h2>
                <ul className="learn-list">
                  {(v.res?.points || []).map((pt: any, index: number) => (
                    <li key={index}>
                      <span className="mono">{txt(pt?.n)}</span>
                      <span>{txt(pt?.t)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          )}
          {' '}
          {when(v.resultsReady) && (
            <article className="next">
              <span className="ghost-num" aria-hidden="true">{txt(v.nextWeek)}</span>
              {' '}
              <div>
                <p className="eyebrow">Next week's plan · built from this lesson</p>
                <h2>{txt(v.nextBet?.title)}</h2>
                <p>{txt(v.nextBet?.hyp)}</p>
              </div>
              {' '}
              <button className="btn btn-acid" onClick={v.startNext}>
                Start next week
                <IconArrowRight className="i arrow ph" aria-hidden="true" />
              </button>
            </article>
          )}
          {' '}
          <div className="card history">
            <div className="card-h">
              <h3>Past weekly plans</h3>
              <span className="muted" style={{ fontSize: '14px' } as any}>{txt(v.winRate)}</span>
            </div>
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Week</th>
                    <th>Plan</th>
                    <th>Goal</th>
                    <th>Result</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {(v.history || []).map((h: any, index: number) => (
                    <tr key={index}>
                      <td className="muted">Week {txt(h?.w)}</td>
                      <td style={{ fontWeight: '500' } as any}>{txt(h?.t)}</td>
                      <td className="muted">{txt(h?.g)}</td>
                      <td style={{ fontWeight: '600' } as any}>{txt(h?.r)}</td>
                      <td><span className={`verdict ${txt(h?.vk)}`}>{txt(h?.v)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
