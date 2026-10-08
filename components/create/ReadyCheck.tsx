'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown } from '@/components/icons';

export default function ReadyCheck() {
  const v = useVM();
  return (
    <div className={`pv-ready ${txt(v.pv?.readyCls)}`}>
      <button className="pv-ready-h" onClick={v.toggleChecks} aria-expanded={v.pv?.ckOpen}>
        <span className="pv-dot" aria-hidden="true" />
        {' '}
        <b>{txt(v.pv?.readyLabel)}</b>
        {' '}
        <span className="muted pv-ready-s">{txt(v.pv?.readySub)}</span>
        {' '}
        <IconCaretDown className="i i-s pv-chev ph" aria-hidden="true" />
      </button>
      {' '}
      {when(v.pv?.ckOpen) && (
        <ul className="checks-list" aria-label="Checks for this post">
          {when(v.pv?.offPlan) && (
            <li className="ck ck-info">
              <span className="ck-ic" aria-hidden="true">i</span>
              {' '}
              <span className="ck-t">
                <b>{txt(v.pv?.chName)} isn't in this week's plan.</b>
                {' '}{txt(v.pv?.chNote)} Posting here won't count toward the plan's result.
              </span>
              {' '}
              <button className="link-btn" onClick={v.toggleAlso}>{txt(v.pv?.alsoLabel)}</button>
            </li>
          )}
          {' '}
          {(v.pv?.issues || []).map((w: any, index: number) => (
            <li key={index} className={`ck ck-${txt(w?.level)}`} onMouseEnter={w?.hi} onMouseLeave={v.clearHi}>
              <span className="ck-ic" aria-hidden="true">{txt(w?.icon)}</span>
              {' '}
              <span className="ck-t">{txt(w?.text)}</span>
              {' '}
              {when(w?.hasFix) && (
                <button className="link-btn" onClick={w?.fix} onFocus={w?.hi} onBlur={v.clearHi}>{txt(w?.fixLabel)}</button>
              )}
              {' '}
              {when(w?.hasAsk) && (
                <button className="ask-link" onClick={w?.ask}>
                  <img src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                  Ask Pingoo
                </button>
              )}
            </li>
          ))}
          {' '}
          {when(v.pv?.hasPassed) && (
            <>
              <li className="ck-passed-h"><button className="link-btn" onClick={v.togglePassed} aria-expanded={v.pv?.passedOpen}>{txt(v.pv?.passedLabel)}</button></li>
              {' '}
              {when(v.pv?.passedOpen) && (
                <>
                  {(v.pv?.passed || []).map((w: any, index: number) => (
                    <li key={index} className={`ck ck-${txt(w?.level)}`} onMouseEnter={w?.hi} onMouseLeave={v.clearHi}>
                      <span className="ck-ic" aria-hidden="true">{txt(w?.icon)}</span>
                      <span className="ck-t">{txt(w?.text)}</span>
                    </li>
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
