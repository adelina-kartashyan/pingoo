'use client';

import { useVM, txt, when, flag } from '@/lib/vm';
import { IconArrowRight, IconDelete, IconNext, IconUndo } from '@/components/icons';

export default function EditorFooter() {
  const v = useVM();
  return (
    <div className="ed-foot">
      {when(v.confirmWarn) && (
        <div className="warn-confirm" role="alert">
          <p>
            <b>{txt(v.warnText)}</b>
            {' '}Approve anyway, or fix them first?
          </p>
          <div className="wc-acts">
            <button className="btn btn-sm btn-line" onClick={v.cancelWarn}>Fix first</button>
            <button className="btn btn-sm btn-acid" onClick={v.toggleApprove}>Approve anyway</button>
          </div>
        </div>
      )}
      {when(v.cur?.isSkipped) && (
        <div className="skip-box">
          <b>You skipped this post.</b>
          <span>It won’t be scheduled and doesn’t count toward this week’s result. Pingoo noted it for next week.</span>
          <button className="btn btn-line btn-block" onClick={v.restoreCur}>
            <IconUndo className="i i-s" aria-hidden="true" />
            Bring it back
          </button>
        </div>
      )}
      {when(v.showApprove) && (
        <button className="btn btn-acid btn-block btn-approve" onClick={v.toggleApprove} disabled={flag(v.cantApprove)}>{txt(v.approveLabel)}</button>
      )}
      {' '}
      {when(v.approveWhy) && (
        <p className="muted approve-why" style={{ fontSize: '13px', textAlign: 'center', marginTop: '12px' } as any}>{txt(v.approveWhyText)}</p>
      )}
      {' '}
      {when(v.cur?.planActive) && (
        <button className="btn-skip-post" onClick={v.skipCur}>
          <IconNext className="i i-s" aria-hidden="true" />
          Skip this post
        </button>
      )}
      {when(v.cur?.isOther) && (
        <button className="btn-del-post" onClick={v.deleteOther}>
          <IconDelete className="i i-s" aria-hidden="true" />
          Delete this post
        </button>
      )}
      {' '}
      <button className="btn btn-out btn-block gtc" onClick={v.goCalendar}>
        <span className="gtc-t">Go to Calendar</span>
        <span className="gtc-n">{txt(v.approvedCount)} of {txt(v.planN)} approved</span>
        <IconArrowRight className="i arrow ph" aria-hidden="true" />
      </button>
    </div>
  );
}
