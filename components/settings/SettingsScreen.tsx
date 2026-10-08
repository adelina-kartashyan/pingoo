'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown, IconCheck } from '@/components/icons';
import PlanAndBilling from './PlanAndBilling';

// Settings: profile, brand, notifications and billing.
export default function SettingsScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Settings</p>
          <h1 className="h1" tabIndex={-1}>
            Your account,{' '}
            <em>your brand.</em>
          </h1>
          <h2 className="sr">{txt(v.setTabName)}</h2>
          <p className="lede">Profile, the brand Pingoo writes for, what we notify you about, and your plan.</p>
        </div>
      </div>
      <div className="tabs" role="tablist">
        {(v.setTabs || []).map((tb: any, index: number) => (
          <button key={index} className={`tab-btn ${txt(tb?.cls)}`} role="tab" aria-selected={tb?.on} onClick={tb?.pick}>{txt(tb?.label)}</button>
        ))}
      </div>
      {' '}
      {when(v.setOn?.profile) && (
        <div className="set-grid">
          <div className="card set-card">
            <div className="set-avatar">
              <span className="av av-me set-av">TC</span>
              <div>
                <b>Teo Casper</b>
                <span className="muted">Owner · Pingoo workspace</span>
              </div>
              <button className="btn btn-out btn-sm" onClick={v.changePhoto}>Change photo</button>
            </div>
            <div className="set-fields">
              <label className="field">
                <span>Full name</span>
                <input className="input" type="text" defaultValue='Teo Casper' />
              </label>
              {' '}
              <label className="field">
                <span>Email</span>
                <input className="input" type="email" defaultValue='teo@pingoo.app' />
              </label>
              {' '}
              <div className="field">
                <span>Time zone</span>
                <div className={`dd ${txt(v.ddTz?.cls)}`}>
                  <button
                    type="button"
                    className="input dd-btn"
                    onClick={v.ddTz?.toggle}
                    aria-haspopup="listbox"
                    aria-expanded={v.ddTz?.open}
                    aria-label="Time zone"
                  >
                    <span className="dd-v">{txt(v.ddTz?.label)}</span>
                    <IconCaretDown className="ph dd-car" aria-hidden="true" />
                  </button>
                  {when(v.ddTz?.open) && (
                    <>
                      <button type="button" className="dd-scrim" onClick={v.ddTz?.close} tabIndex={-1} aria-label="Close list" />
                      <div className="dd-list" role="listbox">
                        {(v.ddTz?.opts || []).map((o: any, index: number) => (
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
                <span>Role</span>
                <p className="set-static">
                  Owner{' '}
                  <span className="muted">· can manage billing and team</span>
                </p>
              </div>
            </div>
            <div className="set-foot"><button className="btn btn-primary" onClick={v.saveProfile}>Save changes</button></div>
          </div>
          <div className="card set-card set-proto">
            <p className="label">Prototype</p>
            <h3 className="set-h">Preview the app as…</h3>
            <p className="muted set-p">Switch to a brand-new account to see the empty states, try the app offline, or replay the onboarding.</p>
            <div className="seg" role="group" aria-label="Account data">
              <button className={`seg-btn ${txt(v.dataSampleCls)}`} onClick={v.dataSample}>Sample account</button>
              <button className={`seg-btn ${txt(v.dataNewCls)}`} onClick={v.dataNew}>New account</button>
            </div>
            <p className="set-sub">Plan</p>
            <div className="seg" role="group" aria-label="Plan">
              <button className={`seg-btn ${txt(v.planFreeCls)}`} onClick={v.downgrade} aria-pressed={v.isFree}>Free</button>
              <button className={`seg-btn ${txt(v.planProCls)}`} onClick={v.setPro} aria-pressed={v.isPro}>Pro</button>
            </div>
            <p className="set-sub">Connection</p>
            <div className="seg" role="group" aria-label="Connection">
              <button className={`seg-btn ${txt(v.netOnCls)}`} onClick={v.netOn}>Online</button>
              <button className={`seg-btn ${txt(v.netOffCls)}`} onClick={v.netOff}>Offline</button>
            </div>
            {' '}
            <button className="btn btn-out btn-sm set-replay" onClick={v.replayOnb}>Replay onboarding</button>
          </div>
        </div>
      )}
      {' '}
      {when(v.setOn?.brand) && (
        <div className="set-grid">
          <div className="card set-card">
            <h3 className="set-h">How Pingoo writes for you</h3>
            <p className="muted set-p">Pingoo uses this for captions, openings and replies. Change it any time.</p>
            <div className="set-fields">
              <label className="field">
                <span>What does your brand do?</span>
                <textarea className="input" rows={3} value={txt(v.brandWhat)} onChange={v.onBrandWhat} />
              </label>
              {' '}
              <div className="field">
                <span>Tone of voice</span>
                <div className="seg" role="group" aria-label="Tone of voice">
                  {(v.toneOpts || []).map((t: any, index: number) => (
                    <button key={index} className={`seg-btn ${txt(t?.cls)}`} onClick={t?.pick}>{txt(t?.l)}</button>
                  ))}
                </div>
              </div>
              {' '}
              <label className="field">
                <span>Words to avoid</span>
                <input className="input" type="text" value={txt(v.brandAvoid)} onChange={v.onBrandAvoid} />
              </label>
            </div>
            <div className="set-foot"><button className="btn btn-primary" onClick={v.saveBrand}>Save brand</button></div>
          </div>
          <div className="card set-card">
            <h3 className="set-h">Brand kit</h3>
            <p className="muted set-p">Used on covers and image posts Pingoo drafts.</p>
            <div className="kit-row">
              <span className="kit-logo"><img src="/brand/pingoo-mark.svg" alt="Pingoo logo" /></span>
              <div>
                <b>Logo</b>
                <span className="muted">SVG · 2 KB</span>
              </div>
              <button className="btn btn-out btn-sm" onClick={v.changePhoto}>Replace</button>
            </div>
            <div className="kit-colors">
              <span className="kit-sw" style={{ background: '#0D0A26' } as any} />
              <span className="kit-sw" style={{ background: '#CCFF4D' } as any} />
              <span className="kit-sw" style={{ background: '#F7F7F5' } as any} />
              <span className="kit-cap">Ink · Lime · Paper</span>
            </div>
            <p className="muted set-p" style={{ marginTop: '14px' } as any}>Fonts: Satoshi for headings and text.</p>
          </div>
        </div>
      )}
      {' '}
      {when(v.setOn?.notifs) && (
        <div className="card set-card set-narrow">
          <h3 className="set-h">Tell me when…</h3>
          {' '}
          {(v.notifRows || []).map((nr: any, index: number) => (
            <div key={index} className="set-row">
              <div>
                <b>{txt(nr?.t)}</b>
                <span className="muted">{txt(nr?.d)}</span>
              </div>
              <button className={`switch ${txt(nr?.swCls)}`} role="switch" aria-checked={nr?.on} aria-label={nr?.t} onClick={nr?.toggle} />
            </div>
          ))}
        </div>
      )}
      {' '}
      {when(v.setOn?.billing) && (
        <PlanAndBilling />
      )}
    </section>
  );
}
