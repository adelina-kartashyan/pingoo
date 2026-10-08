'use client';

import { useVM, txt, when, flag } from '@/lib/vm';
import { IconArrowRight, IconCaretRight } from '@/components/icons';
import WeekGrid from './WeekGrid';

// Calendar: week and month views of scheduled posts.
export default function CalendarScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Calendar</p>
          <h1 className="h1" tabIndex={-1}>
            Your week,{' '}
            <em>scheduled.</em>
          </h1>
          <p className="lede">This week's plan sits in the hours your audience is most active. Tap a person to hand a post to someone else.</p>
        </div>
        {' '}
        {when(v.notLive) && (
          <button className="btn btn-primary" onClick={v.goLive} disabled={flag(v.cantGoLive)}>
            {when(v.publishing) && (
              <span className="spinner" />
            )}
            {txt(v.goLiveLabel)}
          </button>
        )}
      </div>
      {' '}
      {when(v.calHint) && (
        <div className="banner">
          <p>{txt(v.calHintText)}</p>
          <button className="btn btn-primary btn-sm" onClick={v.calHintGo}>{txt(v.calHintBtn)}</button>
        </div>
      )}
      {' '}
      <div className="cal-bar cal-time">
        <div className="seg seg-range" role="group" aria-label="Choose dates">
          <button className="seg-btn icon" onClick={v.calPrev} aria-label={v.calPrevLabel}>
            <svg className="i i-s ph" viewBox="0 0 256 256" aria-hidden="true">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
            </svg>
          </button>
          {' '}
          <span className="seg-label" aria-live="polite">{txt(v.calRange)}</span>
          {' '}
          <button className="seg-btn icon" onClick={v.calNext} aria-label={v.calNextLabel}><IconCaretRight className="i i-s ph" aria-hidden="true" /></button>
        </div>
        <div className="seg" role="group" aria-label="Calendar view">
          <button className={`seg-btn ${txt(v.calViewCls?.week)}`} aria-pressed={v.calViewOn?.week} onClick={v.viewWeek}>Week</button>
          {' '}
          <button className={`seg-btn ${txt(v.calViewCls?.month)}`} aria-pressed={v.calViewOn?.month} onClick={v.viewMonth}>Month</button>
        </div>
        {' '}
        <button className="btn btn-out btn-sm" onClick={v.calToday} disabled={flag(v.calAtNow)}>This week</button>
      </div>
      <div className="cal-bar">
        <div className="fchips" role="group" aria-label="Filter by channel">
          {(v.chanFilters || []).map((cf: any, index: number) => (
            <button key={index} className={`fchip ${txt(cf?.cls)}`} onClick={cf?.pick} aria-pressed={cf?.on}>{txt(cf?.label)}</button>
          ))}
        </div>
        {' '}
        <span className="muted" style={{ fontSize: '14px' } as any}>{txt(v.calCount)}</span>
      </div>
      {' '}
      {when(v.calNote) && (
        <div className="banner"><p>{txt(v.calNoteText)}</p></div>
      )}
      {' '}
      {when(v.calViewOn?.month) && (
        <div className="card month-card screen">
          <div className="month">
            {(v.monthHead || []).map((mh: any, index: number) => (
              <span key={index} className="mh">{txt(mh)}</span>
            ))}
            {' '}
            {(v.monthCells || []).map((mc: any, index: number) => (
              <button key={index} className={`mcell ${txt(mc?.cls)}`} onClick={mc?.pick} aria-label={mc?.label}>
                <span className="mnum">{txt(mc?.num)}</span>
                {' '}
                {(mc?.items || []).map((mi: any, index: number) => (
                  <span key={index} className="mitem">
                    <span className={`mt mtile ch-${txt(mi?.ab)}`} style={{ backgroundColor: txt(mi?.c) } as any} title={txt(mi?.plat)} />
                    <span className="mtxt">{txt(mi?.t)}</span>
                  </span>
                ))}
                {' '}
                {when(mc?.more) && (
                  <span className="mmore">+{txt(mc?.moreN)} more</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {' '}
      {when(v.calViewOn?.week) && (
        <>
          {when(v.calEmpty) && (
            <div className="empty" style={{ marginBottom: '16px' } as any}>
              <h2>Nothing scheduled for these dates.</h2>
              <p>Posts appear here once a weekly plan covers this week, or when you schedule something yourself.</p>
            </div>
          )}
          {' '}
          {when(v.dragNextOn) && (
            <div
              className={`drop-next ${txt(v.dropNextCls)}`}
              onDragOver={v.nextOver}
              onDragEnter={v.nextEnter}
              onDragLeave={v.nextLeave}
              onDrop={v.nextDrop}
            >
              <IconArrowRight className="ph" aria-hidden="true" />
              Drop here to move it to next week, same day
            </div>
          )}
          {' '}
          <WeekGrid />
        </>
      )}
      {' '}
      {when(v.live) && (
        <div className="live-banner">
          <div className="txt">
            <h3>Your plan is live.</h3>
            <p>Everyone gets a reminder 30 minutes before their post. Pingoo will have your results ready on Sunday evening.</p>
          </div>
          {' '}
          <button className="btn btn-acid" onClick={v.goResults}>
            Go to Results
            <IconArrowRight className="i arrow ph" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
