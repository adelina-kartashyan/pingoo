'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCancel } from '@/components/icons';
import ChatPanel from './ChatPanel';

// Ask Pingoo: chat and what Pingoo has learned.
export default function AskScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Ask Pingoo</p>
          <h1 className="h1" tabIndex={-1}>
            Hi Teo. Here's{' '}
            <em>what I see.</em>
          </h1>
          <p className="lede">I turn your numbers into clear next steps and explain the reasons behind them. Ask me anything about your content.</p>
        </div>
      </div>
      <div className="tabs" role="tablist">
        {(v.coachTabs || []).map((ct: any, index: number) => (
          <button key={index} className={`tab-btn ${txt(ct?.cls)}`} role="tab" aria-selected={ct?.on} onClick={ct?.pick}>{txt(ct?.label)}</button>
        ))}
      </div>
      {' '}
      {when(v.coachTabOn?.chat) && (
        <ChatPanel />
      )}
      {' '}
      {when(v.coachTabOn?.learned) && (
        <div className="learned-grid screen">
          <div className="col">
            <div className="card">
              <div className="card-h">
                <h3>What works for you</h3>
                <span className="muted" style={{ fontSize: '13px' } as any}>{txt(v.lessonCount)}</span>
              </div>
              <p className="muted" style={{ fontSize: '14px', margin: '-6px 0 8px' } as any}>
                Every lesson comes from your own results. Pingoo uses confirmed lessons to pick each weekly plan.
              </p>
              {' '}
              {(v.lessonGroups || []).map((lg: any, index: number) => (
                <div key={index} className="lgroup">
                  <p className="lgroup-h">
                    <span className={`lstat ${txt(lg?.cls)}`}>{txt(lg?.label)}</span>
                    <span className="muted">{txt(lg?.hint)}</span>
                  </p>
                  {' '}
                  {(lg?.items || []).map((ls: any, index: number) => (
                    <div key={index} className="lesson">
                      <div className="lesson-main">
                        <p className="lesson-t">{txt(ls?.title)}</p>
                        <p className="muted" style={{ fontSize: '14px' } as any}>{txt(ls?.detail)}</p>
                        <p className="lesson-ev">
                          {txt(ls?.ev)}
                          <button className="link-btn" onClick={ls?.seeWeeks}>See results</button>
                        </p>
                      </div>
                      {' '}
                      {when(ls?.fixing) && (
                        <div className="lesson-fix">
                          <span className="muted" style={{ fontSize: '13px' } as any}>What's wrong with it?</span>
                          {' '}
                          <button className="btn btn-out btn-sm" onClick={ls?.retest}>It's outdated, test it again</button>
                          {' '}
                          <button className="btn btn-sm btn-danger" onClick={ls?.remove}>Remove it</button>
                          {' '}
                          <button className="link-btn" onClick={ls?.cancel}>Cancel</button>
                        </div>
                      )}
                      {' '}
                      {when(ls?.notFixing) && (
                        <button className="link-btn lesson-x" onClick={ls?.fix}>This isn't right</button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {' '}
              {when(v.hasRemoved) && (
                <div className="lgroup">
                  <p className="lgroup-h"><span className="lstat l-removed">Removed by you</span></p>
                  {' '}
                  {(v.removedLessons || []).map((rl: any, index: number) => (
                    <div key={index} className="lesson lesson-removed">
                      <p className="lesson-t">{txt(rl?.title)}</p>
                      <button className="link-btn" onClick={rl?.restore}>Restore</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <aside className="side-col">
            <div className="card">
              <div className="card-h">
                <h3>Your voice</h3>
                <span className="muted" style={{ fontSize: '13px' } as any}>From your 12 best posts</span>
              </div>
              <div className="traits">
                {(v.traits || []).map((tr: any, index: number) => (
                  <div key={index} className="trait">
                    <span>
                      <b style={{ display: 'block' } as any}>{txt(tr?.t)}</b>
                      <span className="muted" style={{ fontSize: '13px' } as any}>{txt(tr?.d)}</span>
                    </span>
                    <button className="icon-btn" onClick={tr?.remove} aria-label={`Stop writing like this: ${txt(tr?.t)}`}>
                      <IconCancel className="i i-s" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="field" style={{ marginTop: '14px' } as any}>
                <span>Tone</span>
                {' '}
                <div className="seg" role="group" aria-label="Tone">
                  {(v.toneOpts || []).map((to: any, index: number) => (
                    <button key={index} className={`seg-btn ${txt(to?.cls)}`} aria-pressed={to?.on} onClick={to?.pick}>{txt(to?.label)}</button>
                  ))}
                </div>
              </div>
              <div className="field" style={{ marginTop: '12px' } as any}>
                <span>Emoji</span>
                {' '}
                <div className="seg" role="group" aria-label="Emoji">
                  {(v.emojiOpts || []).map((eo: any, index: number) => (
                    <button key={index} className={`seg-btn ${txt(eo?.cls)}`} aria-pressed={eo?.on} onClick={eo?.pick}>{txt(eo?.label)}</button>
                  ))}
                </div>
              </div>
              <p className="label" style={{ margin: '18px 0 6px' } as any}>Learned from posts like</p>
              {' '}
              {(v.bestPosts || []).map((bp: any, index: number) => (
                <div key={index} className="rec">
                  <span className={`mt mt-sm ch-${txt(bp?.ab)}`} style={{ background: txt(bp?.c) } as any}>{txt(bp?.ab)}</span>
                  <span className="t">
                    {txt(bp?.t)}
                    <span className="muted" style={{ display: 'block', fontSize: '13px', fontWeight: '400' } as any}>{txt(bp?.meta)}</span>
                  </span>
                  <span className="up">{txt(bp?.lift)}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-h">
                <h3>Patterns from your category</h3>
                {' '}
                <button
                  className={`switch ${txt(v.catSwCls)}`}
                  role="switch"
                  aria-checked={v.useCategory}
                  aria-label="Use patterns from my category"
                  onClick={v.toggleCategory}
                 />
              </div>
              <p className="muted" style={{ fontSize: '14px', marginBottom: '8px' } as any}>{txt(v.catNote)}</p>
              {' '}
              {(v.patterns || []).map((pt: any, index: number) => (
                <div key={index} className="rec">
                  <span className="t">{txt(pt?.name)}</span>
                  <span className={`pstat ${txt(pt?.cls)}`}>{txt(pt?.status)}</span>
                </div>
              ))}
              {' '}
              <button className="link-btn" style={{ paddingLeft: '0', marginTop: '8px' } as any} onClick={v.goAudience}>See all trends</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
