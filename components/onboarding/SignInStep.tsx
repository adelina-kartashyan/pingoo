'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconApple, IconArrowRight, IconCaretDown, IconGoogle } from '@/components/icons';

export default function SignInStep() {
  const v = useVM();
  return (
    <div className="onb-card onb-signin">
      <img className="onb-mark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
      {' '}
      <h1 className="onb-h" tabIndex={-1}>Know what to post, every week.</h1>
      <p className="onb-p">Sign in and Pingoo turns your own results into one clear weekly plan.</p>
      <div className="onb-ssos">
        <button className="btn btn-out btn-block onb-sso" onClick={v.onb?.signIn}>
          <IconGoogle className="sso-ic" aria-hidden="true" />
          Continue with Google
        </button>
        <button className="btn btn-out btn-block onb-sso" onClick={v.onb?.signIn}>
          <IconApple className="sso-ic" aria-hidden="true" />
          Continue with Apple
        </button>
      </div>
      <div className="onb-or"><span>or</span></div>
      {' '}
      {when(v.onb?.formEmail) && (
        <>
          <label className="field">
            <span>Work email</span>
            <input className="input" type="email" autoComplete="email" placeholder="you@company.com" value={txt(v.onb?.email)} onChange={v.onb?.onEmail} />
          </label>
          {' '}
          <p className="ph-hint">We’ll email you a 6-digit code. No password needed.</p>
          {' '}
          <button className={`btn btn-acid btn-block ${txt(v.onb?.sendECls)}`} onClick={v.onb?.sendE}>
            Send code
            <IconArrowRight className="i arrow ph" aria-hidden="true" />
          </button>
          {' '}
          <button className="link-btn onb-swap" onClick={v.onb?.swapVia}>Use phone number instead</button>
        </>
      )}
      {' '}
      {when(v.onb?.formPhone) && (
        <>
          <div className="field">
            <span>Phone number</span>
            <div className={`ph-field ${txt(v.onb?.cc?.cls)}`}>
              <button
                type="button"
                className="ph-cc"
                onClick={v.onb?.cc?.toggle}
                aria-haspopup="listbox"
                aria-expanded={v.onb?.cc?.open}
                aria-label={`Country code, ${txt(v.onb?.cc?.n)}`}
              >
                <img className="ph-flag" src={txt(v.onb?.cc?.f)} alt="" />
                <span className="ph-dial">{txt(v.onb?.cc?.d)}</span>
                <IconCaretDown className="ph dd-car" aria-hidden="true" />
              </button>
              <input
                className="ph-in"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={txt(v.onb?.telPh)}
                value={txt(v.onb?.tel)}
                onChange={v.onb?.onTel}
                aria-label="Phone number"
               />
              {when(v.onb?.cc?.open) && (
                <>
                  <button type="button" className="dd-scrim" onClick={v.onb?.cc?.close} tabIndex={-1} aria-label="Close list" />
                  <div className="dd-list ph-list" role="listbox">
                    {(v.onb?.cc?.opts || []).map((c: any, index: number) => (
                      <button key={index} type="button" className={`dd-opt ph-opt ${txt(c?.cls)}`} role="option" aria-selected={c?.sel} onClick={c?.pick}>
                        <img className="ph-flag" src={txt(c?.f)} alt="" />
                        <span className="ph-n">{txt(c?.n)}</span>
                        <span className="ph-d">{txt(c?.d)}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="ph-hint">We’ll text you a 6-digit code. No password needed.</p>
          {' '}
          <button className={`btn btn-acid btn-block ${txt(v.onb?.sendCls)}`} onClick={v.onb?.send}>
            Send code
            <IconArrowRight className="i arrow ph" aria-hidden="true" />
          </button>
          {' '}
          <button className="link-btn onb-swap" onClick={v.onb?.swapVia}>Use email instead</button>
        </>
      )}
      {' '}
      {when(v.onb?.sent) && (
        <>
          <div className="ph-sent" role="status">
            <span>
              {txt(v.onb?.sentLead)}{' '}
              <b>{txt(v.onb?.sentTo)}</b>
            </span>
            <button className="link-btn" onClick={v.onb?.change}>Change</button>
          </div>
          {' '}
          <label className="field">
            <span>6-digit code</span>
            <input
              className="input ph-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              value={txt(v.onb?.code)}
              onChange={v.onb?.onCode}
             />
          </label>
          {' '}
          <button className={`btn btn-acid btn-block ${txt(v.onb?.verifyCls)}`} onClick={v.onb?.verify}>
            Verify and continue
            <IconArrowRight className="i arrow ph" aria-hidden="true" />
          </button>
          {' '}
          <p className="ph-hint">
            Didn’t get it?{' '}
            <button className="link-btn" onClick={v.onb?.resend}>Send again</button>
          </p>
        </>
      )}
      {' '}
      <p className="onb-fine">By continuing you agree to the Terms and Privacy Policy.</p>
    </div>
  );
}
