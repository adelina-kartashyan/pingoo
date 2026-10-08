'use client';

import { useVM, txt, when, flag } from '@/lib/vm';

export default function TeamNotes() {
  const v = useVM();
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: '12px' } as any}>
      <form className="card note-form" onSubmit={v.postNote}>
        <span className="av" style={{ background: '#0D0A26' } as any}>TC</span>
        {' '}
        <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '10px' } as any}>
          <label className="sr" htmlFor="note-input">Write a note for the team</label>
          {' '}
          <textarea
            id="note-input"
            className="input"
            rows={3}
            placeholder="Write a note for the team. Use @name to mention someone."
            value={txt(v.noteText)}
            onChange={v.onNoteText}
           />
          {' '}
          <div className="note-foot">
            <label className="check">
              <input type="checkbox" checked={flag(v.notePin)} onChange={v.onNotePin} />
              <span>Pin as a decision</span>
            </label>
            {' '}
            <button className="btn btn-primary btn-sm" type="submit">Post note</button>
          </div>
        </div>
      </form>
      {' '}
      {(v.camp?.notes || []).map((nt: any, index: number) => (
        <article key={index} className={`card note ${txt(nt?.cls)}`}>
          <span className="av" style={{ background: txt(nt?.c) } as any}>{txt(nt?.i)}</span>
          {' '}
          <div style={{ flex: '1', minWidth: '0' } as any}>
            <div className="note-h">
              <b>{txt(nt?.n)}</b>
              <span className="muted">{txt(nt?.when)}</span>
              {when(nt?.pinned) && (
                <span className="decision">Decision</span>
              )}
              {when(nt?.hasTag) && (
                <span className="ntag">{txt(nt?.tag)}</span>
              )}
            </div>
            <p className="note-t">{txt(nt?.text)}</p>
            <div className="note-acts">
              <button className="link-btn" onClick={nt?.pin}>{txt(nt?.pinLabel)}</button>
              {' '}
              {when(nt?.mine) && (
                <button className="link-btn" style={{ color: '#CF3216' } as any} onClick={nt?.del}>Delete</button>
              )}
            </div>
          </div>
        </article>
      ))}
      {' '}
      {when(v.camp?.noNotes) && (
        <p className="muted" style={{ padding: '8px 4px' } as any}>No notes yet. Share decisions and context here so the whole team sees them.</p>
      )}
    </div>
  );
}
