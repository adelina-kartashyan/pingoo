'use client';

import { useVM, when } from '@/lib/vm';
import { IconArrowRight, IconCheck, IconPingooColor } from '@/components/icons';

export default function PlanAndBilling() {
  const v = useVM();
  return (
    <div className="set-grid">
      <div className="card set-card">
        {when(v.isFree) && (
          <>
            <p className="label">Current plan</p>
            <h3 className="set-h set-plan">
              Free{' '}
              <span className="muted">· $0 / month</span>
            </h3>
            <div className="pbars set-usage">
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">Weekly plans</span>
                  <span className="pbar-v">1 of 1 this week</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '100%' } as any} /></div>
              </div>
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">AI generations</span>
                  <span className="pbar-v">12 of 20 this month</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '60%' } as any} /></div>
              </div>
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">Team seats</span>
                  <span className="pbar-v">4 of 5</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '80%' } as any} /></div>
              </div>
            </div>
            <div className="set-invoices">
              <b>Invoices</b>
              <p className="muted">No invoices yet. They’ll show up here once you upgrade.</p>
            </div>
          </>
        )}
        {when(v.isPro) && (
          <>
            <p className="label">Current plan</p>
            <h3 className="set-h set-plan">
              Pro{' '}
              <span className="muted">· $19 / month</span>
            </h3>
            <div className="pbars set-usage">
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">Weekly plans</span>
                  <span className="pbar-v">Unlimited</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '12%' } as any} /></div>
              </div>
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">AI generations</span>
                  <span className="pbar-v">12 · unlimited</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '6%' } as any} /></div>
              </div>
              <div className="pbar">
                <div className="pbar-h">
                  <span className="pbar-l">Team seats</span>
                  <span className="pbar-v">4 of 15</span>
                </div>
                <div className="pbar-t"><span className="pbar-f" style={{ width: '27%' } as any} /></div>
              </div>
            </div>
            <div className="set-invoices">
              <b>Invoices</b>
              <div className="inv-row">
                <span>Oct 8, 2026 · Pro monthly</span>
                <span className="inv-amt">$19.00</span>
                <span className="status s-pub">Paid</span>
              </div>
            </div>
          </>
        )}
      </div>
      {' '}
      {when(v.isFree) && (
        <div className="card set-card set-pro">
          <span className="new-tag">Pro</span>
          {' '}
          <h3 className="set-h set-plan">
            $19{' '}
            <span className="muted">/ month</span>
          </h3>
          <ul className="set-feats">
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
            <li>
              <IconCheck className="ph" aria-hidden="true" />
              Unlimited AI image and video generations
            </li>
          </ul>
          {' '}
          <button className="btn btn-acid btn-block" onClick={v.upgrade}>
            Upgrade to Pro
            <IconArrowRight className="i arrow ph" aria-hidden="true" />
          </button>
        </div>
      )}
      {' '}
      {when(v.isPro) && (
        <div className="card set-card set-pro set-pro-on">
          <IconPingooColor className="set-pro-mark" aria-hidden="true" />
          {' '}
          <span className="new-tag">You’re on Pro</span>
          {' '}
          <h3 className="set-h">Thanks for backing Pingoo.</h3>
          <p className="muted set-p">Your mascot got its colour. Everything below is unlocked for the whole workspace.</p>
          <ul className="set-feats">
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
          <div className="set-pro-acts">
            <button className="btn btn-out" onClick={v.manageBilling}>Manage billing</button>
            <button className="link-btn" onClick={v.downgrade}>Switch back to Free</button>
          </div>
        </div>
      )}
    </div>
  );
}
