'use client';

import { useVM, txt, when } from '@/lib/vm';

export default function WeekByWeek() {
  const v = useVM();
  return (
    <div className="screen">
      <div className="card tl-card">
        <div className="card-h">
          <h3>Week by week</h3>
          <span className="muted" style={{ fontSize: '13px' } as any}>One tick is one day · select a week for details</span>
        </div>
        <div className={`tl tb-${txt(v.camp?.tlKind)}`}>
          {(v.camp?.timeline || []).map((tw: any, index: number) => (
            <button key={index} className={`tl-wk ${txt(tw?.cls)}`} onClick={tw?.open} aria-label={tw?.label}>
              <span className="tl-ticks">
                {(tw?.ticks || []).map((tt: any, index: number) => (
                  <i key={index} className={`tk ${txt(tt?.cls)}`} style={{ animationDelay: txt(tt?.d) } as any} />
                ))}
              </span>
              {' '}
              <span className="tl-name">{txt(tw?.w)}</span>
              {' '}
              <span className="tl-date">{txt(tw?.d)}</span>
              {' '}
              <span className="tl-tip" role="presentation">
                <b>{txt(tw?.f)}</b>
                <span className={`status ${txt(tw?.stCls)}`}>{txt(tw?.st)}</span>
                {when(tw?.hasRes) && (
                  <span className="tl-res">{txt(tw?.res)}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="wk-merge">
        <div className="card">
          <div className="card-h">
            <h3>Progress to goal</h3>
            <span className="muted" style={{ fontSize: '14px' } as any}>{txt(v.camp?.prog?.label)}</span>
          </div>
          <div className="goal-track" role="img" aria-label={v.camp?.prog?.aria}>
            <span className="gt-fill" style={{ width: txt(v.camp?.prog?.nowW) } as any} />
            {' '}
            <span className="gt-goal" style={{ left: txt(v.camp?.prog?.goalL) } as any} />
          </div>
          <div className="gt-legend">
            <span>
              Start{' '}
              <b>{txt(v.camp?.prog?.baseStr)}</b>
            </span>
            <span>
              Now{' '}
              <b>{txt(v.camp?.prog?.nowStr)}</b>
            </span>
            <span>
              Goal{' '}
              <b>{txt(v.camp?.prog?.targetStr)}</b>
            </span>
          </div>
        </div>
        <div className="card">
          {(v.camp?.weeks || []).map((wk: any, index: number) => (
            <div key={index} className={`wk ${txt(wk?.cls)}`}>
              <span className="w">
                <b>{txt(wk?.w)}</b>
                <span>{txt(wk?.d)}</span>
              </span>
              {' '}
              <span className="f">
                {txt(wk?.f)}
                {(wk?.added || []).map((ad: any, index: number) => (
                  <span key={index} className="added">+ {txt(ad)}</span>
                ))}
              </span>
              {' '}
              <span className="wk-res">
                <span className={`status ${txt(wk?.stCls)}`}>{txt(wk?.st)}</span>
                <span className="muted" style={{ fontSize: '13px' } as any}>{txt(wk?.res)}</span>
                {when(wk?.isNow) && (
                  <button className="link-btn wk-home" onClick={wk?.goHome}>Open on Home</button>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      {' '}
      {when(v.camp?.hasWrap) && (
        <div className="wrapup">
          <div className="wrap-top">
            <span className={`verdict ${txt(v.camp?.wrap?.vk)}`}>{txt(v.camp?.wrap?.verdict)}</span>
            <span className="wrap-k">Campaign wrap-up</span>
          </div>
          <h3 className="wrap-h">{txt(v.camp?.wrap?.headline)}</h3>
          <dl className="wrap-stats">
            <div>
              <dt>Goal</dt>
              <dd>{txt(v.camp?.wrap?.goal)}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd className="acid">{txt(v.camp?.wrap?.result)}</dd>
            </div>
            <div>
              <dt>Best post</dt>
              <dd>{txt(v.camp?.wrap?.best)}</dd>
            </div>
          </dl>
          <ul className="wrap-list">
            {(v.camp?.wrap?.lessons || []).map((ls: any, index: number) => (
              <li key={index}>{txt(ls)}</li>
            ))}
          </ul>
          <div className="wrap-acts">
            <button className="btn btn-acid btn-sm" onClick={v.duplicateCamp}>Use as a template</button>
            {' '}
            <button className="btn btn-line btn-sm" onClick={v.downloadReport}>Download report</button>
          </div>
        </div>
      )}
      {' '}
      <div className="ov-grid">
        <div className="card">
          <p className="label">Goal</p>
          <p className="goal-v">{txt(v.camp?.goalText)}</p>
          <p className="muted" style={{ marginTop: '6px', fontSize: '14px' } as any}>{txt(v.camp?.goalNote)}</p>
        </div>
        <div className="card">
          <p className="label">Who it's for</p>
          <p className="goal-v">{txt(v.camp?.audience)}</p>
        </div>
        <div className="card">
          <p className="label" style={{ marginBottom: '12px' } as any}>Channels</p>
          <div className="chan-row">
            {(v.camp?.chans || []).map((ch: any, index: number) => (
              <span key={index} className="cchip">
                <span className={`mt mt-sm ch-${txt(ch?.ab)}`} style={{ background: txt(ch?.c) } as any}>{txt(ch?.ab)}</span>
                {txt(ch?.n)}
              </span>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="label" style={{ marginBottom: '12px' } as any}>Key messages</p>
          <ul className="msgs">
            {(v.camp?.messages || []).map((km: any, index: number) => (
              <li key={index}>{txt(km)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
