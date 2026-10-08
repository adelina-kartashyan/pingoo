'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAdd } from '@/components/icons';

export default function PreviewChannelTabs() {
  const v = useVM();
  return (
    <div className="pv-tabs-wrap">
      <div className="pv-tabs" role="group" aria-label={v.pv?.switchLabel}>
        {(v.pv?.chans || []).map((pc: any, index: number) => (
          <span key={index} className={`pv-tab-wrap ${txt(pc?.cls)}`}>
            <button className={`pv-tab ${txt(pc?.cls)}`} onClick={pc?.pick} aria-pressed={pc?.on} title={txt(pc?.n)}>
              <span className={`mt mt-sm ch-${txt(pc?.ab)}`} style={{ background: txt(pc?.c) } as any}>{txt(pc?.ab)}</span>
              <span className="pv-tab-l">{txt(pc?.n)}</span>
              {when(pc?.badge) && (
                <span className="pv-plan">{txt(pc?.badgeText)}</span>
              )}
            </button>
            {when(pc?.removable) && (
              <button className="pv-rm" onClick={pc?.remove} aria-label={`Remove ${txt(pc?.n)}`} title={`Remove ${txt(pc?.n)}`}>
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" /></svg>
              </button>
            )}
          </span>
        ))}
        {' '}
        <button
          className={`pv-tab pv-add ${txt(v.addChCls)}`}
          onClick={v.toggleAddCh}
          aria-expanded={v.addChOpen}
          title="Add a channel"
          aria-label="Add a channel"
        >
          <IconAdd className="i i-s" aria-hidden="true" />
        </button>
      </div>
      {' '}
      {when(v.addChOpen) && (
        <div className="pop add-ch-pop" role="menu">
          <p className="add-ch-h">Add a channel to preview</p>
          {' '}
          {(v.addChOpts || []).map((ao: any, index: number) => (
            <button key={index} className="add-ch-item" role="menuitem" onClick={ao?.pick}>
              <span className={`mt mt-sm ch-${txt(ao?.ab)}`} style={{ background: txt(ao?.c) } as any}>{txt(ao?.ab)}</span>
              <span>
                <b>{txt(ao?.n)}</b>
                <small>{txt(ao?.d)}</small>
              </span>
            </button>
          ))}
          {' '}
          {when(v.noAddCh) && (
            <p className="muted" style={{ fontSize: '13px', padding: '6px 10px' } as any}>All channels are added.</p>
          )}
          {' '}
          {when(v.hasExtraCh) && (
            <>
              <p className="add-ch-h add-ch-h2">Added</p>
              {' '}
              {(v.extraChList || []).map((xc: any, index: number) => (
                <div key={index} className="add-ch-item is-added">
                  <span className={`mt mt-sm ch-${txt(xc?.ab)}`} style={{ background: txt(xc?.c) } as any}>{txt(xc?.ab)}</span>
                  <span><b>{txt(xc?.n)}</b></span>
                  <button className="link-btn add-ch-rm" onClick={xc?.remove}>Remove</button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
