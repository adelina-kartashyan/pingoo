'use client';

import { useVM, txt, when } from '@/lib/vm';

export default function IdeasBoard() {
  const v = useVM();
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: '12px' } as any}>
      <form className="card idea-add" onSubmit={v.addIdea}>
        <label className="sr" htmlFor="idea-input">Add your own idea</label>
        {' '}
        <input
          id="idea-input"
          className="input"
          type="text"
          placeholder="Add your own idea for this campaign"
          value={txt(v.ideaText)}
          onChange={v.onIdeaText}
         />
        {' '}
        <button className="btn btn-primary btn-sm" type="submit">Add idea</button>
      </form>
      {' '}
      {(v.camp?.ideas || []).map((idea: any, index: number) => (
        <div key={index} className="card idea">
          <div className="idea-main">
            <span className={`mt ch-${txt(idea?.ab)}`} style={{ background: txt(idea?.c) } as any}>{txt(idea?.ab)}</span>
            {' '}
            <div style={{ flex: '1', minWidth: '0' } as any}>
              <p className="idea-t">{txt(idea?.t)}</p>
              <p className="muted" style={{ fontSize: '14px' } as any}>{txt(idea?.ch)} · {txt(idea?.f)}</p>
              <p className="idea-why">
                <span className="by">{txt(idea?.by)}</span>
                {' '}{txt(idea?.why)}
              </p>
            </div>
          </div>
          <div className="idea-acts">
            <button className="btn btn-ghost btn-sm" onClick={idea?.toggle} aria-expanded={idea?.open}>Add to a week</button>
            {' '}
            <button className="btn btn-out btn-sm" onClick={idea?.dismiss}>Dismiss</button>
          </div>
          {' '}
          {when(idea?.open) && (
            <div className="week-pick">
              <span className="muted" style={{ fontSize: '14px' } as any}>Add to:</span>
              {' '}
              {(idea?.weeks || []).map((wp: any, index: number) => (
                <button key={index} className="fchip" onClick={wp?.add}>{txt(wp?.label)}</button>
              ))}
              {' '}
              {when(idea?.noWeeks) && (
                <span className="muted" style={{ fontSize: '14px' } as any}>No upcoming weeks in this campaign.</span>
              )}
            </div>
          )}
        </div>
      ))}
      {' '}
      {when(v.camp?.noIdeas) && (
        <p className="muted" style={{ padding: '8px 4px' } as any}>No ideas waiting. Pingoo adds new ones every Sunday.</p>
      )}
    </div>
  );
}
