'use client';

import { useVM, txt, when } from '@/lib/vm';

// Confirmation before ending a campaign early.
export default function EndCampaignDialog() {
  const v = useVM();
  return (
    <>
      {when(v.confirmEnd) && (
        <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="end-title">
          <button className="modal-scrim" onClick={v.cancelEnd} aria-label="Keep the campaign running" tabIndex={-1} />
          {' '}
          <div className="modal-panel modal-sm">
            <h2 id="end-title" className="modal-title">End “{txt(v.camp?.name)}” now?</h2>
            <p className="muted" style={{ margin: '10px 0 18px' } as any}>{txt(v.endText)}</p>
            <div className="modal-foot" style={{ padding: '0', border: '0' } as any}>
              <span style={{ flex: '1' } as any} />
              {' '}
              <button className="btn btn-out btn-sm" onClick={v.cancelEnd}>Keep it running</button>
              {' '}
              <button className="btn btn-sm btn-danger" onClick={v.doEnd}>End campaign</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
