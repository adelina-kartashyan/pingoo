'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown, IconCheck, IconTick } from '@/components/icons';
import EditorFooter from './EditorFooter';
import MediaSection from './MediaSection';
import OpeningLine from './OpeningLine';

export default function Editor() {
  const v = useVM();
  return (
    <div className="editor card">
      <div className="pv-h ed-h">
        <div>
          <h2>Edit post</h2>
          <span className="muted pv-sub">{txt(v.cur?.t)}</span>
        </div>
      </div>
      {' '}
      {when(v.cur?.isOther) && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' } as any}>
          <label className="field">
            <span>Post title (only your team sees this)</span>
            <input className="input" type="text" value={txt(v.cur?.t)} onChange={v.onOtherTitle} />
          </label>
          {' '}
          <div className="field">
            <span>Format</span>
            <div className={`dd ${txt(v.ddFmt?.cls)}`}>
              <button
                type="button"
                className="input dd-btn"
                onClick={v.ddFmt?.toggle}
                aria-haspopup="listbox"
                aria-expanded={v.ddFmt?.open}
                aria-label="Format"
              >
                <span className="dd-v">{txt(v.ddFmt?.label)}</span>
                <IconCaretDown className="ph dd-car" aria-hidden="true" />
              </button>
              {when(v.ddFmt?.open) && (
                <>
                  <button type="button" className="dd-scrim" onClick={v.ddFmt?.close} tabIndex={-1} aria-label="Close list" />
                  <div className="dd-list" role="listbox">
                    {(v.ddFmt?.opts || []).map((o: any, index: number) => (
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
          <p className="muted" style={{ fontSize: '13px' } as any}>Choose the channel with the tabs above the preview.</p>
        </div>
      )}
      {' '}
      {when(v.cur?.hasWhenPick) && (
        <div className="card when-card">
          <div className="field">
            <span>When</span>
            <div className={`dd ${txt(v.ddWhen?.cls)}`}>
              <button
                type="button"
                className="input dd-btn"
                onClick={v.ddWhen?.toggle}
                aria-haspopup="listbox"
                aria-expanded={v.ddWhen?.open}
                aria-label="Move this post to another day"
              >
                <span className="dd-v">{txt(v.ddWhen?.label)}</span>
                <IconCaretDown className="ph dd-car" aria-hidden="true" />
              </button>
              {when(v.ddWhen?.open) && (
                <>
                  <button type="button" className="dd-scrim" onClick={v.ddWhen?.close} tabIndex={-1} aria-label="Close list" />
                  <div className="dd-list" role="listbox">
                    {(v.ddWhen?.opts || []).map((o: any, index: number) => (
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
          <p className="when-tip">Pingoo: {txt(v.cur?.whenTip)}</p>
          <p className="muted when-note">{txt(v.cur?.whenNote)}</p>
        </div>
      )}
      {' '}
      <div className="card cap-card">
        <label className="field">
          <span>Caption</span>
          <textarea className="input" rows={5} value={txt(v.cur?.caption)} onChange={v.onCaption} placeholder="Write your caption" />
        </label>
        {' '}
        <p className="count" style={{ marginTop: '6px' } as any}>{txt(v.cur?.capHint)}</p>
      </div>
      {' '}
      {/* Media (folded) */}
      {' '}
      <MediaSection />
      {' '}
      {/* Why it fits (folded) */}
      {' '}
      {when(v.cur?.hasHook) && (
        <OpeningLine />
      )}
      {' '}
      {when(v.cur?.isPlan) && (
        <div className={`acc ${txt(v.basedAccCls)}`}>
          <button className="acc-h" onClick={v.toggleBasedAcc} aria-expanded={v.basedOpen}>
            <span className="acc-t">Why Pingoo wrote it this way</span>
            {' '}
            <span className="acc-s">{txt(v.cur?.basedSum)}</span>
            {' '}
            <IconCaretDown className="i i-s chev ph" aria-hidden="true" />
          </button>
          {' '}
          <div className="acc-b">
            <div className="acc-in">
              <div className="acc-pad based">
                <button className="based-row" onClick={v.goLearned}>
                  <span className="mt mt-sm" style={{ background: '#0D0A26' } as any}>TC</span>
                  <span>{txt(v.cur?.basedVoice)}</span>
                </button>
                {' '}
                {when(v.cur?.hasPattern) && (
                  <button className="based-row" onClick={v.goAudience}>
                    <span className="mt mt-sm" style={{ background: '#0D0A26' } as any}>↗</span>
                    <span>{txt(v.cur?.basedPattern)}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {' '}
      {when(v.cur?.isPlan) && (
        <div className={`acc ${txt(v.fitAccCls)}`}>
          <button className="acc-h" onClick={v.toggleFit} aria-expanded={v.fitOpen}>
            <span className="acc-t">Fits this week's plan</span>
            {' '}
            <span className="acc-s acc-ok">3 of 3</span>
            {' '}
            <IconCaretDown className="i i-s chev ph" aria-hidden="true" />
          </button>
          {' '}
          <div className="acc-b">
            <div className="acc-in">
              <div className="acc-pad fit">
                {(v.bet?.fits || []).map((f: any, index: number) => (
                  <div key={index} className="fit-row">
                    <span className="ok"><IconTick className="i i-s" aria-hidden="true" /></span>
                    {txt(f)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {' '}
      {when(v.cur?.isOther) && (
        <div className="notplan">
          <b>Not part of this week's plan.</b>
          {' '}It won't count toward the plan's result, but Pingoo still tracks how it does and tells you if it's worth turning into a plan.
        </div>
      )}
      {' '}
      <EditorFooter />
    </div>
  );
}
