'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAdd, IconDelete, IconNext, IconUndo } from '@/components/icons';

export default function WeekGrid() {
  const v = useVM();
  return (
    <div className="cal-scroll">
      <div className="cal">
        {(v.days || []).map((dy: any, index: number) => (
          <div key={index} className={`day ${txt(dy?.cls)}`} onDragOver={dy?.dragOver} onDragEnter={dy?.dragEnter} onDrop={dy?.drop}>
            <div className="day-h">
              <b>{txt(dy?.num)}</b>
              <span>{txt(dy?.name)}</span>
              {when(dy?.isToday) && (
                <span className="today-pill">Today</span>
              )}
              {when(dy?.canAddHead) && (
                <button className="day-add-h" onClick={dy?.add} aria-label={`Add a post on ${txt(dy?.name)} ${txt(dy?.num)}`} title="Add a post">
                  <IconAdd aria-hidden="true" />
                </button>
              )}
            </div>
            {' '}
            {(dy?.posts || []).map((p: any, index: number) => (
              <article
                key={index}
                className={`ev ${txt(p?.cls)}`}
                draggable={p?.canMove}
                onDragStart={p?.dragStart}
                onDragEnd={p?.dragEnd}
                role="button"
                tabIndex={0}
                onClick={p?.open}
                onKeyDown={p?.openKey}
                aria-label={`Open ${txt(p?.t)}`}
                title={txt(p?.openHint)}
              >
                {when(p?.isPlan) && (
                  <span className="plan-tag">
                    <i />
                    This week's plan
                  </span>
                )}
                {when(p?.isOther) && (
                  <span className="plan-tag other-tag">
                    <i />
                    Not in plan
                  </span>
                )}
                {' '}
                <div className="ev-top">
                  <span className={`mt mt-sm ch-${txt(p?.ab)}`} style={{ background: txt(p?.c) } as any}>{txt(p?.ab)}</span>
                  <span>{txt(p?.time)} · {txt(p?.fmt)}</span>
                </div>
                <p className="ev-t">{txt(p?.t)}</p>
                {' '}
                <button className="ev-own" onClick={p?.cycle} aria-label={`Owner ${txt(p?.owner?.n)}. Tap to reassign`}>
                  <span className="av" style={{ background: txt(p?.owner?.c) } as any}>{txt(p?.owner?.i)}</span>
                  {txt(p?.owner?.n)}
                </button>
                {' '}
                <span className={`status ${txt(p?.stCls)}`}>{txt(p?.status)}</span>
                {' '}
                {when(p?.canSkip) && (
                  <button className="ev-del ev-skip" onClick={p?.skip} aria-label={`Skip ${txt(p?.t)}`} title="Skip this post"><IconNext aria-hidden="true" /></button>
                )}
                {when(p?.canRestore) && (
                  <button className="ev-del ev-restore" onClick={p?.restore} aria-label={`Bring back ${txt(p?.t)}`} title="Bring it back">
                    <IconUndo aria-hidden="true" />
                  </button>
                )}
                {when(p?.canDel) && (
                  <button className="ev-del" onClick={p?.del} aria-label={`Delete ${txt(p?.t)}`} title="Delete post"><IconDelete aria-hidden="true" /></button>
                )}
              </article>
            ))}
            {' '}
            {when(dy?.canAddEmpty) && (
              <button className="day-add" onClick={dy?.add} aria-label={`Add a post on ${txt(dy?.name)} ${txt(dy?.num)}`}>
                <IconAdd aria-hidden="true" />
                Add post
              </button>
            )}
            {when(dy?.pastEmpty) && (
              <p className="day-empty">Nothing posted</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
