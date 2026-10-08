'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCheck } from '@/components/icons';
import SignInStep from './SignInStep';

// Sign-up and first-run setup (5 steps).
export default function Onboarding() {
  const v = useVM();
  return (
    <>
      {when(v.onbOpen) && (
        <div className="onb" role="dialog" aria-modal="true" aria-label="Set up Pingoo">
          <div className="onb-top">
            <img className="onb-logo" src="/brand/pingoo-logo.svg" alt="Pingoo" />
            {' '}
            {when(v.onb?.showProg) && (
              <div className="onb-prog">
                <span className="onb-step">{txt(v.onb?.stepLabel)}</span>
                <div className="onb-bar"><span style={{ width: txt(v.onb?.progW) } as any} /></div>
              </div>
            )}
            {' '}
            <button className="onb-skip link-btn" onClick={v.onb?.skip}>Skip for now</button>
          </div>
          <div className={`onb-body ${txt(v.onb?.bodyCls)}`}>
            {when(v.onb?.s0) && (
              <SignInStep />
            )}
            {' '}
            {when(v.onb?.s1) && (
              <div className="onb-card">
                <h1 className="onb-h" tabIndex={-1}>Connect your accounts</h1>
                <p className="onb-p">
                  Connect at least one channel. Pingoo reads your past posts there to learn what works for you. You can add more later in Integrations.
                </p>
                <div className="onb-list">
                  {(v.onb?.accs || []).map((a: any, index: number) => (
                    <div key={index} className={`onb-row ${txt(a?.cls)}`}>
                      <span className={`mt ch-${txt(a?.ab)}`} style={{ background: txt(a?.c) } as any}>{txt(a?.ab)}</span>
                      <span className="onb-row-t">
                        <b>{txt(a?.n)}</b>
                        <span className="muted">{txt(a?.sub)}</span>
                      </span>
                      {when(a?.off) && (
                        <button className="btn btn-out btn-sm onb-con" onClick={a?.toggle}>Connect</button>
                      )}
                      {when(a?.on) && (
                        <button className="onb-done" onClick={a?.toggle} aria-label={`Disconnect ${txt(a?.n)}`}>
                          <span className="onb-done-ic"><IconCheck className="ph" aria-hidden="true" /></span>
                          Connected
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="onb-foot">
                  <span className="muted">{txt(v.onb?.accCount)}</span>
                  <button className={`btn btn-acid ${txt(v.onb?.nextCls)}`} onClick={v.onb?.next1} aria-disabled={v.onb?.cantAcc}>
                    Continue
                    <IconArrowRight className="i arrow ph" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            {' '}
            {when(v.onb?.s2) && (
              <div className="onb-card">
                <h1 className="onb-h" tabIndex={-1}>Tell Pingoo about your brand</h1>
                <p className="onb-p">A sentence is enough. Pingoo uses it to write posts that sound like you.</p>
                {' '}
                <label className="field">
                  <span>What do you do, and for whom?</span>
                  <textarea
                    className="input"
                    rows={3}
                    placeholder="e.g. A planning app that helps small teams post consistently"
                    value={txt(v.onb?.what)}
                    onChange={v.onb?.onWhat}
                   />
                </label>
                {' '}
                <div className="field onb-tone">
                  <span>Tone of voice</span>
                  <div className="seg" role="group" aria-label="Tone of voice">
                    {(v.onb?.tones || []).map((t: any, index: number) => (
                      <button key={index} className={`seg-btn ${txt(t?.cls)}`} onClick={t?.pick}>{txt(t?.l)}</button>
                    ))}
                  </div>
                </div>
                <div className="onb-foot">
                  <button className="btn btn-text" onClick={v.onb?.back}>Back</button>
                  <button className="btn btn-acid" onClick={v.onb?.next2}>
                    Continue
                    <IconArrowRight className="i arrow ph" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            {' '}
            {when(v.onb?.s3) && (
              <div className="onb-card">
                <h1 className="onb-h" tabIndex={-1}>What should Pingoo grow first?</h1>
                <p className="onb-p">Each weekly plan will aim at this. You can change it any time.</p>
                <div className="onb-goals" role="radiogroup" aria-label="Main goal">
                  {(v.onb?.goals || []).map((g: any, index: number) => (
                    <button key={index} className={`onb-goal ${txt(g?.cls)}`} role="radio" aria-checked={g?.sel} onClick={g?.pick}>
                      <span className="onb-radio" />
                      <span>
                        <b>{txt(g?.t)}</b>
                        <span className="muted">{txt(g?.d)}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="onb-foot">
                  <button className="btn btn-text" onClick={v.onb?.back}>Back</button>
                  <button className="btn btn-acid" onClick={v.onb?.next3}>
                    Build my first plan
                    <IconArrowRight className="i arrow ph" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            {' '}
            {when(v.onb?.s4) && (
              <div className="onb-card onb-scan">
                <img className="onb-mark is-pulse" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                {' '}
                <h1 className="onb-h" tabIndex={-1}>Pingoo is reading your posts…</h1>
                <p className="onb-p">This takes a few seconds. Your first weekly plan will be waiting on Home.</p>
                <div className="onb-scanbar"><span style={{ width: txt(v.onb?.prog) } as any} /></div>
                <span className="onb-pct">{txt(v.onb?.progN)}</span>
                {' '}
                <ul className="onb-scanlist">
                  {(v.onb?.scan || []).map((sc: any, index: number) => (
                    <li key={index} className={txt(sc?.cls)}>
                      <span className="onb-sdot"><IconCheck className="ph" aria-hidden="true" /></span>
                      {txt(sc?.t)}
                    </li>
                  ))}
                </ul>
                {' '}
                {when(v.onb?.done) && (
                  <button className="btn btn-acid btn-block" onClick={v.onb?.finish}>
                    See my first plan
                    <IconArrowRight className="i arrow ph" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
