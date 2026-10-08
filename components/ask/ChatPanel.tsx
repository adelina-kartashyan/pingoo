'use client';

import { useVM, txt, when } from '@/lib/vm';

export default function ChatPanel() {
  const v = useVM();
  return (
    <div className="coach-grid">
      <div className="card chat">
        <div className="chat-head">
          <img className="face cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" style={{ width: '40px', height: '40px' } as any} />
          {' '}
          <div style={{ flex: '1' } as any}>
            <h2 className="sr">Chat with Pingoo</h2>
            <b style={{ display: 'block' } as any} aria-hidden="true">Pingoo</b>
            <span className="on">
              <i />
              Up to date · synced 12 min ago
            </span>
          </div>
          {' '}
          <button className="link-btn" onClick={v.resetChat}>New chat</button>
        </div>
        <div className="thread" ref={v.setThread} aria-live="polite">
          {(v.thread || []).map((m: any, index: number) => (
            <div key={index} className={`msg ${txt(m?.cls)}`}>
              {when(m?.isCoach) && (
                <img className="face cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
              )}
              {' '}
              <div className="bub">
                {txt(m?.text)}
                {when(m?.hasAction) && (
                  <div className="msg-act"><button className="btn btn-primary btn-sm" onClick={m?.act}>{txt(m?.actLabel)}</button></div>
                )}
              </div>
            </div>
          ))}
          {' '}
          {when(v.typing) && (
            <div className="msg msg-coach">
              <img className="face cmark" src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
              <div className="bub typing" role="status" aria-label="Pingoo is thinking">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="typing-t">{txt(v.typingText)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="chat-foot">
          <div className="qchips">
            {(v.coachQs || []).map((q: any, index: number) => (
              <button key={index} className="qchip" onClick={q?.ask}>{txt(q?.q)}</button>
            ))}
          </div>
          <form className="composer" onSubmit={v.sendCoach}>
            <label className="sr" htmlFor="coach-input">Message Pingoo</label>
            {' '}
            <input
              id="coach-input"
              className="input"
              type="text"
              placeholder="Ask about your plan, posts or numbers"
              value={txt(v.coachText)}
              onChange={v.onCoachText}
             />
            {' '}
            <button className="send" type="submit" aria-label="Send">
              <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                 />
                <path d="M11.4999 12.5L14.9999 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <aside className="side-col">
        <div className="card">
          <div className="card-h">
            <h3>Your goal</h3>
            <button className="link-btn" onClick={v.toggleGoalEdit}>{txt(v.goalBtn)}</button>
          </div>
          {' '}
          {when(v.goalEditing) && (
            <label className="field">
              <span>What should Pingoo help you with?</span>
              <input className="input" type="text" value={txt(v.goalText)} onChange={v.onGoalText} />
            </label>
          )}
          {' '}
          {when(v.goalView) && (
            <>
              <p className="goal-v">{txt(v.goalText)}</p>
              <p className="muted" style={{ fontSize: '14px', marginTop: '6px' } as any}>Pingoo uses this goal to choose every weekly plan.</p>
            </>
          )}
        </div>
        <div className="card">
          <div className="card-h"><h3>What changed this week</h3></div>
          <div className="changed">
            <span className="big">2.9×</span>
            <span>
              <b style={{ display: 'block' } as any}>Reels are pulling ahead</b>
              <span className="muted" style={{ fontSize: '14px' } as any}>More engagement than your image posts</span>
            </span>
          </div>
          <div className="changed">
            <span className="big">+32%</span>
            <span>
              <b style={{ display: 'block' } as any}>Productivity keeps winning</b>
              <span className="muted" style={{ fontSize: '14px' } as any}>More saves than your average topic</span>
            </span>
          </div>
          <div className="changed">
            <span className="big" style={{ color: '#CF3216' } as any}>−9%</span>
            <span>
              <b style={{ display: 'block' } as any}>LinkedIn got quieter</b>
              <span className="muted" style={{ fontSize: '14px' } as any}>Reach dropped for the second week</span>
              <button className="ask-link" onClick={v.askLinkedIn}>
                <img src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                Why? Ask Pingoo
              </button>
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Past recommendations</h3>
            <button className="link-btn" onClick={v.goResults}>All results</button>
          </div>
          {' '}
          {(v.history || []).map((h: any, index: number) => (
            <div key={index} className="rec">
              <span className="t">
                {txt(h?.t)}
                <span className="muted" style={{ display: 'block', fontSize: '13px', fontWeight: '400' } as any}>Week {txt(h?.w)}</span>
              </span>
              <span className={`verdict ${txt(h?.vk)}`}>{txt(h?.v)}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
