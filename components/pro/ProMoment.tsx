'use client';

import { useVM, when } from '@/lib/vm';
import { IconArrowRight, IconCheck, IconPingooColor } from '@/components/icons';

// Celebration shown right after upgrading to Pro.
export default function ProMoment() {
  const v = useVM();
  return (
    <>
      {when(v.proMoment) && (
        <div className="modal pro-moment" role="dialog" aria-modal="true" aria-labelledby="pm-title" aria-describedby="pm-desc">
          <button className="modal-scrim" onClick={v.closeProMoment} aria-label="Close" tabIndex={-1} />
          {' '}
          <div className="modal-panel pm-panel">
            <div className="pm-stage" aria-hidden="true">
              <span className="pm-burst" />
              {' '}
              <img className="pm-mono" src="/brand/pingoo-mark.svg" alt="" />
              {' '}
              <IconPingooColor className="pm-col" aria-hidden="true" />
            </div>
            <p className="eyebrow pm-k">Payment confirmed</p>
            <h2 id="pm-title" className="pm-h">Welcome to Pingoo Pro</h2>
            <p id="pm-desc" className="pm-p">Pingoo just got its colour. You’ll see it in your workspace from now on.</p>
            <ul className="set-feats pm-list">
              <li>
                <IconCheck className="ph" aria-hidden="true" />
                Unlimited weekly plans and swaps
              </li>
              <li>
                <IconCheck className="ph" aria-hidden="true" />
                Premium campaign templates
              </li>
              <li>
                <IconCheck className="ph" aria-hidden="true" />
                Advanced AI insights and AI search tracking
              </li>
            </ul>
            {' '}
            <button className="btn btn-acid btn-block pm-go" onClick={v.closeProMoment}>
              Start using Pro
              <IconArrowRight className="i arrow ph" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
