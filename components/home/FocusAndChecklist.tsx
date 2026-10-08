'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCaretDown, IconCaretRight, IconShuffle, IconTick, IconUndo } from '@/components/icons';

export default function FocusAndChecklist() {
  const v = useVM();
  return (
    <div className="bet-grid">
      <div className="col">
        <article className={`bet ${txt(v.betCls)}`} ref={v.setCard} onMouseMove={v.spot} aria-live="polite">
          <img className="bet-mark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
          {' '}
          <div className={`stamp ${txt(v.stampCls)}`} aria-hidden="true">Locked in</div>
          <div className="bet-top">
            <span className="chip chip-dark">
              <span className="pip" />
              This week's focus · {txt(v.bet?.kind)}
            </span>
          </div>
          <div className="bet-body">
            <h2 className="bet-title">{txt(v.bet?.title)}</h2>
            <p className="bet-hyp">{txt(v.bet?.hyp)}</p>
          </div>
          <dl className="bet-stats">
            <div>
              <dt>Goal</dt>
              <dd>
                <span className="from">{txt(v.bet?.baseStr)}</span>
                {' '}→{' '}
                <span className="to">{txt(v.bet?.targetStr)}</span>
              </dd>
              <small>{txt(v.bet?.metric)}</small>
            </div>
            <div>
              <dt>Best time</dt>
              <dd>{txt(v.bet?.when)}</dd>
            </div>
            <div>
              <dt>Time needed</dt>
              <dd>{txt(v.bet?.effort)}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{txt(v.bet?.conf)}</dd>
            </div>
          </dl>
          {' '}
          {when(v.showActions) && (
            <div className="bet-actions">
              <button className="btn btn-acid" onClick={v.accept}>
                Use this plan
                <IconArrowRight className="i arrow ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="btn btn-line" onClick={v.swap}>
                <IconShuffle className="i" aria-hidden="true" />
                Show another idea
              </button>
              {' '}
              <button className="btn btn-text" onClick={v.skip}>Skip this week</button>
              {' '}
              <span className="meta">Idea {txt(v.betNum)} of 3 · one plan a week</span>
            </div>
          )}
          {' '}
          {when(v.accepted) && (
            <div className="bet-actions">
              <button className="btn btn-acid" onClick={v.goCreate}>
                Review your 3 drafts
                <IconArrowRight className="i arrow ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="btn btn-text" onClick={v.undo}>Change plan</button>
              {' '}
              <span className="meta">Results on Sunday</span>
            </div>
          )}
          {' '}
          {when(v.skipped) && (
            <div className="skip-note">
              <span>
                Skipped. Pingoo keeps watching your numbers and will suggest a fresh plan on Monday.{' '}
                <button className="ask-link" onClick={v.askSkip}>
                  <img src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                  Tell Pingoo why
                </button>
              </span>
              {' '}
              <button className="btn btn-line" onClick={v.undo}>
                <IconUndo className="i" aria-hidden="true" />
                Undo
              </button>
            </div>
          )}
        </article>
        <section className={`evidence ${txt(v.evCls)}`}>
          <button className="ev-toggle" onClick={v.toggleEvidence} aria-expanded={v.evidenceOpen}>
            <span className="ev-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {' '}
            <span>
              <b>Why this plan?</b>
              {' '}
              <span className="sub">3 reasons from your last 30 days</span>
            </span>
            {' '}
            <IconCaretDown className="i chev ph" aria-hidden="true" />
          </button>
          {' '}
          <div className="ev-body">
            <div className="ev-inner">
              <div className="ev-list">
                {(v.bet?.evidence || []).map((e: any, index: number) => (
                  <div key={index} className="ev-row">
                    <span className="ev-n mono">{txt(e?.n)}</span>
                    {' '}
                    <div>
                      <p className="ev-label">{txt(e?.label)}</p>
                      <p className="ev-detail">{txt(e?.detail)}</p>
                      <div className="ev-bar"><span className="ev-fill" style={{ '--w': txt(e?.w), '--d': txt(e?.d) } as any} /></div>
                    </div>
                    {' '}
                    <span className="ev-stat">{txt(e?.stat)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <aside className="side-col">
        <div className="card">
          <div className="card-h">
            <h3>Your week</h3>
            <span className="muted" style={{ fontSize: '14px' } as any}>{txt(v.doneCount)} of 4 done</span>
          </div>
          <div className="meter"><span style={{ width: txt(v.doneW) } as any} /></div>
          <div className="checks">
            {(v.checks || []).map((c: any, index: number) => (
              <button key={index} className={`chk ${txt(c?.cls)}`} onClick={c?.go}>
                <span className="chk-box"><IconTick className="i i-s" aria-hidden="true" /></span>
                {' '}
                <span>
                  <span className="chk-t">{txt(c?.t)}</span>
                  <span className="chk-s">{txt(c?.s)}</span>
                </span>
                {' '}
                <IconCaretRight className="i i-s go ph" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="card lastwk">
          <div className="lastwk-head">
            <p className="label">Last week's plan</p>
            <span className={`verdict ${txt(v.lastRes?.learn?.vk)}`}>{txt(v.lastRes?.learn?.verdict)}</span>
          </div>
          <p className="lastwk-t">{txt(v.lastRes?.title)}</p>
          <p className="last-v">{txt(v.lastRes?.resultStr)}</p>
          <p className="muted" style={{ fontSize: '14px' } as any}>{txt(v.lastRes?.metric)} · goal was {txt(v.lastRes?.targetStr)}</p>
          {' '}
          <button className="link-btn link-ink" onClick={v.goResults}>See full results</button>
        </div>
      </aside>
    </div>
  );
}
