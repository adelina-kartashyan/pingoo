'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCancel } from '@/components/icons';

// Above every page: offline bar, loading skeleton and the Pingoo tip bar.
export default function PageTop() {
  const v = useVM();
  return (
    <>
      {when(v.offline) && (
        <div className="net-bar" role="status">
          <svg className="i i-s" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M5.78 7.79C3.6 8.64 2 10.72 2 13.17C2 16.39 4.69 19 8 19H17.5C18.04 19 18.56 18.92 19.05 18.77M22 15.29C21.95 13.47 20.58 11.95 18.79 11.6C18.74 11.59 18.71 11.55 18.71 11.5C18.4 7.85 15.32 5 11.56 5C10.66 5 9.79 5.16 9 5.46"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
             />
          </svg>
          <span>
            <b>You’re offline.</b>
            {' '}
            <span className="net-long">Your plan is still here. Changes will sync when you’re back.</span>
            <span className="net-short">Changes sync when you’re back.</span>
          </span>
          <button className="link-btn" onClick={v.retryNet}>Retry</button>
        </div>
      )}
      {when(v.pageLoading) && (
        <div className="skel-page" role="status" aria-live="polite" aria-label="Loading your first weekly plan">
          <div className="skel-coach">
            <span className="skel skel-av" />
            <span className="skel skel-line" style={{ width: '46%' } as any} />
            <span className="skel skel-btn" />
          </div>
          <div className="skel-hero">
            <span className="skel skel-line skel-sm" style={{ width: '120px' } as any} />
            <span className="skel skel-line skel-xl" style={{ width: '58%' } as any} />
            <span className="skel skel-line" style={{ width: '38%' } as any} />
          </div>
          <div className="skel-grid">
            <div className="skel-card">
              <span className="skel skel-line skel-sm" style={{ width: '40%' } as any} />
              <span className="skel skel-line skel-lg" style={{ width: '70%' } as any} />
              <span className="skel skel-line" style={{ width: '90%' } as any} />
              <span className="skel skel-line" style={{ width: '60%' } as any} />
            </div>
            <div className="skel-card">
              <span className="skel skel-line skel-sm" style={{ width: '40%' } as any} />
              <span className="skel skel-line skel-lg" style={{ width: '70%' } as any} />
              <span className="skel skel-line" style={{ width: '90%' } as any} />
              <span className="skel skel-line" style={{ width: '60%' } as any} />
            </div>
            <div className="skel-card">
              <span className="skel skel-line skel-sm" style={{ width: '40%' } as any} />
              <span className="skel skel-line skel-lg" style={{ width: '70%' } as any} />
              <span className="skel skel-line" style={{ width: '90%' } as any} />
              <span className="skel skel-line" style={{ width: '60%' } as any} />
            </div>
          </div>
          <p className="skel-note">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            Pingoo is putting your first plan together…
          </p>
        </div>
      )}
      {when(v.showCoachBar) && (
        <div className="coachbar" role="note">
          <img className="face cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
          {' '}
          <p className="txt">
            <b className="tip-stat">{txt(v.tipStat)}</b>
            <span className="tip-t tip-long">{txt(v.tip)}</span>
            <span className="tip-t tip-short">{txt(v.tipShort)}</span>
          </p>
          <div className="acts">
            <button className={`btn ${txt(v.coachBtnCls)} tip-q`} onClick={v.askTip} title={`Ask Pingoo: ${txt(v.tipQ)}`}>
              <span className="tip-q-t tip-long">{txt(v.tipQ)}</span>
              <span className="tip-q-t tip-short">{txt(v.tipQShort)}</span>
              <IconArrowRight className="i i-s arrow ph" aria-hidden="true" />
            </button>
            {' '}
            <button className="icon-btn" onClick={v.hideTips} aria-label="Hide Pingoo tips"><IconCancel className="i i-s" aria-hidden="true" /></button>
          </div>
        </div>
      )}
      {when(v.showCoachPill) && (
        <button className="coach-pill" onClick={v.showTips}>
          <img className="cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
          Show Pingoo tips
        </button>
      )}
    </>
  );
}
