'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown, IconCheck, IconSparkles } from '@/components/icons';

export default function WizardSteps() {
  const v = useVM();
  return (
    <div className="modal-body">
      {when(v.wz?.s0) && (
        <div className="wz-pane">
          <label className="field">
            <span>Campaign name</span>
            <input className="input" type="text" placeholder="e.g. Spring product launch" value={txt(v.wz?.name)} onChange={v.wzName} />
          </label>
          {' '}
          <label className="field">
            <span>What's it about? (optional)</span>
            <textarea className="input" rows={3} placeholder="One or two sentences for your team" value={txt(v.wz?.summary)} onChange={v.wzSummary} />
          </label>
          {' '}
          <div className="wz-row">
            <div className="field" style={{ flex: '1', minWidth: '200px' } as any}>
              <span>Starts on</span>
              <div className={`dd ${txt(v.ddStart?.cls)}`}>
                <button
                  type="button"
                  className="input dd-btn"
                  onClick={v.ddStart?.toggle}
                  aria-haspopup="listbox"
                  aria-expanded={v.ddStart?.open}
                  aria-label="Start date"
                >
                  <span className="dd-v">{txt(v.ddStart?.label)}</span>
                  <IconCaretDown className="ph dd-car" aria-hidden="true" />
                </button>
                {when(v.ddStart?.open) && (
                  <>
                    <button type="button" className="dd-scrim" onClick={v.ddStart?.close} tabIndex={-1} aria-label="Close list" />
                    <div className="dd-list" role="listbox">
                      {(v.ddStart?.opts || []).map((o: any, index: number) => (
                        <button key={index} type="button" className={`dd-opt ${txt(o?.cls)}`} role="option" aria-selected={o?.sel} onClick={o?.pick}>
                          <span>{txt(o?.l)}</span>
                          <IconCheck className="ph dd-tick" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="field">
              <span>How long?</span>
              {' '}
              <div className="seg" role="group" aria-label="Campaign length">
                {(v.wz?.lenOpts || []).map((lo: any, index: number) => (
                  <button key={index} className={`seg-btn ${txt(lo?.cls)}`} aria-pressed={lo?.on} onClick={lo?.pick}>{txt(lo?.label)}</button>
                ))}
              </div>
            </div>
          </div>
          <p className="muted" style={{ fontSize: '14px' } as any}>Runs {txt(v.wz?.rangeText)}.</p>
        </div>
      )}
      {' '}
      {when(v.wz?.s1) && (
        <div className="wz-pane">
          <p className="wz-q">What should this campaign achieve?</p>
          <div className="goal-opts">
            {(v.wz?.goalOpts || []).map((go: any, index: number) => (
              <button key={index} className={`goal-opt ${txt(go?.cls)}`} aria-pressed={go?.on} onClick={go?.pick}>
                <b>{txt(go?.title)}</b>
                <span>{txt(go?.desc)}</span>
                <small>Now: {txt(go?.now)}</small>
              </button>
            ))}
          </div>
          {' '}
          <label className="field">
            <span>{txt(v.wz?.targetLabel)}</span>
            <input className="input" type="text" inputMode="decimal" placeholder={txt(v.wz?.sug)} value={txt(v.wz?.target)} onChange={v.wzTarget} />
          </label>
          {' '}
          <button className="coach-sug" onClick={v.wzUseSug}>
            <IconSparkles className="i i-s" aria-hidden="true" />
            <span>
              <b>Pingoo suggests {txt(v.wz?.sugLabel)}.</b>
              {' '}{txt(v.wz?.sugWhy)}
            </span>
          </button>
        </div>
      )}
      {' '}
      {when(v.wz?.s2) && (
        <div className="wz-pane">
          <label className="field">
            <span>Who is this campaign for?</span>
            <textarea
              className="input"
              rows={3}
              placeholder="e.g. Founders and small marketing teams, mostly 25–34"
              value={txt(v.wz?.audience)}
              onChange={v.wzAudience}
             />
          </label>
          {' '}
          <button className="coach-sug" onClick={v.wzUseAudience}>
            <IconSparkles className="i i-s" aria-hidden="true" />
            <span>
              <b>Use your current audience.</b>
              {' '}Founders and small marketing teams, mostly 25–34.
            </span>
          </button>
          {' '}
          <div className="field">
            <span>Channels</span>
            {' '}
            <div className="fchips">
              {(v.wz?.chanOpts || []).map((co: any, index: number) => (
                <button key={index} className={`fchip ${txt(co?.cls)}`} aria-pressed={co?.on} onClick={co?.pick}>
                  <span className={`mt mt-sm ch-${txt(co?.ab)}`} style={{ background: txt(co?.c) } as any}>{txt(co?.ab)}</span>
                  {txt(co?.n)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {' '}
      {when(v.wz?.s3) && (
        <div className="wz-pane">
          <p className="wz-q">
            What should people remember?{' '}
            <span className="muted" style={{ fontWeight: '400' } as any}>Pingoo uses these when it writes your drafts.</span>
          </p>
          {' '}
          <label className="field">
            <span>Message 1</span>
            <input className="input" type="text" value={txt(v.wz?.m0)} onChange={v.wzM0} placeholder="e.g. Small habits, big results." />
          </label>
          {' '}
          <label className="field">
            <span>Message 2</span>
            <input className="input" type="text" value={txt(v.wz?.m1)} onChange={v.wzM1} />
          </label>
          {' '}
          <label className="field">
            <span>Message 3</span>
            <input className="input" type="text" value={txt(v.wz?.m2)} onChange={v.wzM2} />
          </label>
          {' '}
          <button className="coach-sug" onClick={v.wzSuggestMsgs}>
            <IconSparkles className="i i-s" aria-hidden="true" />
            <span>
              <b>Write them for me.</b>
              {' '}Pingoo drafts three messages from your goal and audience.
            </span>
          </button>
        </div>
      )}
      {' '}
      {when(v.wz?.s4) && (
        <div className="wz-pane">
          <dl className="review">
            {(v.wz?.review || []).map((rv: any, index: number) => (
              <div key={index} className="rv-row">
                <dt>{txt(rv?.k)}</dt>
                <dd>{txt(rv?.v)}</dd>
                <button className="link-btn" onClick={rv?.edit}>Edit</button>
              </div>
            ))}
          </dl>
          <div className="coach-note">
            <img className="cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" style={{ width: '36px', height: '36px' } as any} />
            {' '}
            <p>
              <b>What happens next:</b>
              {' '}{txt(v.wz?.nextText)}
            </p>
          </div>
        </div>
      )}
      {' '}
      {when(v.wz?.hasErr) && (
        <p className="err" role="alert">{txt(v.wz?.err)}</p>
      )}
    </div>
  );
}
