'use client';

import { useVM, txt, when, flag } from '@/lib/vm';
import { IconArrowRight, IconCancel } from '@/components/icons';
import WizardSteps from './WizardSteps';

// New / edit campaign dialog.
export default function CampaignWizard() {
  const v = useVM();
  return (
    <>
      {when(v.wz?.open) && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="wz-title">
          <button className="modal-scrim" onClick={v.wzClose} aria-label="Close" tabIndex={-1} />
          {' '}
          <div className="modal-panel">
            <div className="modal-head">
              <div>
                <p className="eyebrow">{txt(v.wz?.kicker)}</p>
                <h2 id="wz-title" className="modal-title">{txt(v.wz?.title)}</h2>
              </div>
              {' '}
              <button className="icon-btn" onClick={v.wzClose} aria-label="Close"><IconCancel className="i" aria-hidden="true" /></button>
            </div>
            <ol className="wz-steps" aria-label="Setup steps">
              {(v.wz?.steps || []).map((x: any, index: number) => (
                <li key={index} className={txt(x?.cls)} aria-current={x?.current}>
                  <button className="wz-step" onClick={x?.go} disabled={flag(x?.locked)}>
                    <span className="n">{txt(x?.n)}</span>
                    <span className="t">{txt(x?.label)}</span>
                  </button>
                </li>
              ))}
            </ol>
            <WizardSteps />
            <div className="modal-foot">
              {when(v.wz?.canBack) && (
                <button className="btn btn-out btn-sm" onClick={v.wzBack}>Back</button>
              )}
              {' '}
              <span style={{ flex: '1' } as any} />
              {' '}
              {when(v.wz?.notLast) && (
                <button className="btn btn-primary btn-sm" onClick={v.wzNext}>
                  Continue
                  <IconArrowRight className="i arrow ph" aria-hidden="true" />
                </button>
              )}
              {' '}
              {when(v.wz?.isLast) && (
                <>
                  <button className="btn btn-out btn-sm" onClick={v.wzDraft}>Save as draft</button>
                  {' '}
                  <button className="btn btn-primary btn-sm" onClick={v.wzSchedule}>{txt(v.wz?.finishLabel)}</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
