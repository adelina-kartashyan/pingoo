'use client';

import { useVM, txt, when } from '@/lib/vm';

// Integrations: connected channels and tools.
export default function IntegrationsScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Integrations</p>
          <h1 className="h1" tabIndex={-1}>
            Connect your tools.{' '}
            <em>Plan smarter.</em>
          </h1>
          <h2 className="sr">Your connections</h2>
          <p className="lede">The more Pingoo can see, the better its plans get. You choose what to connect, and you can pause anything at any time.</p>
        </div>
      </div>
      <div className="card-h" style={{ marginBottom: '14px' } as any}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.03em' } as any}>Connected ({txt(v.connectedCount)})</h3>
      </div>
      <div className="int-grid">
        {(v.connected || []).map((ci: any, index: number) => (
          <div key={index} className={`card int-card ${txt(ci?.cardCls)}`}>
            <div className="int-top">
              <span className={`mt mt-lg ch-${txt(ci?.ab)}`} style={{ background: txt(ci?.c) } as any}>{txt(ci?.ab)}</span>
              <span>
                <span className="nm" style={{ display: 'block' } as any}>{txt(ci?.n)}</span>
                <span className="hd">{txt(ci?.h)}</span>
              </span>
              {' '}
              {when(ci?.ok) && (
                <button className={`switch ${txt(ci?.swCls)}`} role="switch" aria-checked={ci?.on} aria-label={`${txt(ci?.n)} sync`} onClick={ci?.toggle} />
              )}
              {when(ci?.err) && (
                <button className="btn btn-out btn-sm int-fix" onClick={ci?.reconnect}>
                  <svg className="i i-s" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                     />
                  </svg>
                  Reconnect
                </button>
              )}
            </div>
            {' '}
            <span className="int-state">
              <span className={txt(ci?.dot)} />
              {txt(ci?.state)}
            </span>
          </div>
        ))}
      </div>
      <div className="int-tools">
        <h2>Browse integrations</h2>
        {' '}
        <label className="search">
          <span className="sr">Search integrations</span>
          <svg className="i i-s" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 17L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
             />
          </svg>
          <input className="input" type="text" placeholder="Search integrations" value={txt(v.intQuery)} onChange={v.onIntQuery} />
        </label>
      </div>
      <div className="fchips" style={{ marginBottom: '16px' } as any} role="group" aria-label="Filter integrations">
        {(v.intCats || []).map((ic: any, index: number) => (
          <button key={index} className={`fchip ${txt(ic?.cls)}`} onClick={ic?.pick} aria-pressed={ic?.on}>{txt(ic?.label)}</button>
        ))}
      </div>
      <div className="int-grid">
        {(v.browse || []).map((bi: any, index: number) => (
          <div key={index} className="card int-card">
            <div className="int-top">
              <span className={`mt mt-lg ch-${txt(bi?.ab)}`} style={{ background: txt(bi?.c) } as any}>{txt(bi?.ab)}</span>
              <span>
                <span className="nm" style={{ display: 'block' } as any}>{txt(bi?.n)}</span>
                <span className="hd">{txt(bi?.catLabel)}</span>
              </span>
            </div>
            <p className="int-desc">{txt(bi?.d)}</p>
            {' '}
            <button className={`btn ${txt(bi?.btnCls)} btn-sm btn-block`} onClick={bi?.toggle}>{txt(bi?.btn)}</button>
          </div>
        ))}
      </div>
      {' '}
      {when(v.noBrowse) && (
        <p className="muted" style={{ padding: '12px 0' } as any}>No integrations match “{txt(v.intQuery)}”.</p>
      )}
      {' '}
      <div className="card req">
        <div className="txt">
          <b style={{ display: 'block', fontSize: '17px' } as any}>Don't see the tool you need?</b>
          <span className="muted">Tell us what you use and we'll let you know when it's ready.</span>
        </div>
        {' '}
        <button className="btn btn-out" onClick={v.requestInt}>Request an integration</button>
      </div>
    </section>
  );
}
