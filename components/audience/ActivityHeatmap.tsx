'use client';

import { Fragment } from 'react';
import { useVM, txt } from '@/lib/vm';

export default function ActivityHeatmap() {
  const v = useVM();
  return (
    <div className="aud-grid">
      <div className="card">
        <div className="card-h">
          <h3>When your audience is active</h3>
          <span className="used-tag">
            <i />
            Used in this week's plan
          </span>
        </div>
        <div className="heat-top">
          <p className="muted" style={{ fontSize: '14px' } as any}>Share of your followers online, by day and time. Hover or tap a block.</p>
          <div className="heat-legend" aria-hidden="true">
            <span className="hlg">
              <span>Under 40%</span>
              <i className="lv1" />
            </span>
            {' '}
            <span className="hlg">
              <span>40–70%</span>
              <i className="lv2" />
            </span>
            {' '}
            <span className="hlg">
              <span>Over 70%</span>
              <i className="lv3" />
            </span>
          </div>
        </div>
        <div className="heat" role="grid" aria-label="Activity by day and time">
          {(v.heat || []).map((hr: any, index: number) => (
            <Fragment key={index}>
              <span className="hl">{txt(hr?.d)}</span>
              {' '}
              {(hr?.cells || []).map((cl: any, index: number) => (
                <button key={index} className={`cell ${txt(cl?.cls)}`} onClick={cl?.pick} onMouseEnter={cl?.pick} onFocus={cl?.pick} aria-label={cl?.label}>
                  <span className="cell-tip" aria-hidden="true">{txt(cl?.tip)}</span>
                </button>
              ))}
            </Fragment>
          ))}
          {' '}
          <span />
          {' '}
          {(v.heatCols || []).map((hc: any, index: number) => (
            <span key={index} className="hh">{txt(hc)}</span>
          ))}
        </div>
        <div className="heat-note">
          <b>{txt(v.heatSel?.title)}</b>
          <span className="muted">{txt(v.heatSel?.sub)}</span>
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Where they follow you</h3></div>
        <p className="muted chan-note">{txt(v.chanNote)}</p>
        <div className="pbars">
          {(v.chanSplit || []).map((cs: any, index: number) => (
            <div key={index} className="pbar">
              <div className="pbar-h">
                <span className="pbar-l">
                  <span className={`mt mt-sm ch-${txt(cs?.ab)}`} style={{ background: txt(cs?.c) } as any}>{txt(cs?.ab)}</span>
                  {txt(cs?.n)}
                </span>
                <span className="pbar-v">{txt(cs?.v)}</span>
              </div>
              <div className="pbar-t"><span className="pbar-f" style={{ width: txt(cs?.pw) } as any}><i /></span></div>
            </div>
          ))}
          <div className="pbar-scale" aria-hidden="true">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
            <span>40%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
