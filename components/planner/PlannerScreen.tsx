'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAdd } from '@/components/icons';
import IdeasBoard from './IdeasBoard';
import TeamNotes from './TeamNotes';
import WeekByWeek from './WeekByWeek';

// Campaign Planner: campaigns, weeks and ideas.
export default function PlannerScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Campaign Planner</p>
          <h1 className="h1" tabIndex={-1}>
            Big goals,{' '}
            <em>week by week.</em>
          </h1>
          <p className="lede">Set a campaign goal once. Pingoo turns it into a focused plan for each week and tracks how close you are.</p>
        </div>
        {' '}
        <button className="btn btn-primary" onClick={v.newCampaign}>
          <IconAdd className="i" aria-hidden="true" />
          New campaign
        </button>
      </div>
      <div className="planner-grid">
        <div className="camps" role="list">
          {(v.camps || []).map((cp: any, index: number) => (
            <button key={index} className={`camp ${txt(cp?.cls)}`} onClick={cp?.pick} role="listitem" aria-pressed={cp?.sel}>
              <span className={`status ${txt(cp?.stCls)}`}>{txt(cp?.status)}</span>
              {' '}
              <span className="t">{txt(cp?.name)}</span>
              {' '}
              <span className="s">{txt(cp?.dates)}</span>
              {' '}
              <span className={`tbar tb-${txt(cp?.tb)}`} role="img" aria-label={cp?.tbLabel}>
                {(cp?.ticks || []).map((tk: any, index: number) => (
                  <i key={index} className={`tk ${txt(tk?.cls)}`} style={{ animationDelay: txt(tk?.d) } as any} />
                ))}
              </span>
              {' '}
              <span className="tb-cap">{txt(cp?.tbLabel)}</span>
            </button>
          ))}
        </div>
        <div style={{ minWidth: '0' } as any}>
          <div className="camp-hero">
            <div style={{ minWidth: '0' } as any}>
              <span className="chip chip-dark">
                <span className="pip" />
                {txt(v.camp?.statusLabel)} · {txt(v.camp?.dates)}
              </span>
              {' '}
              <h2>{txt(v.camp?.name)}</h2>
              <p>{txt(v.camp?.summary)}</p>
              <ol className="life" aria-label="Campaign stage">
                {(v.camp?.life || []).map((lf: any, index: number) => (
                  <li key={index} className={txt(lf?.cls)} aria-current={lf?.current}>
                    <span className="ld" />
                    {txt(lf?.label)}
                  </li>
                ))}
              </ol>
              <div className="hero-acts">
                {(v.camp?.acts || []).map((a: any, index: number) => (
                  <button key={index} className={`btn btn-sm ${txt(a?.cls)}`} onClick={a?.run}>{txt(a?.label)}</button>
                ))}
              </div>
            </div>
            <div className="ring" role="img" aria-label={v.camp?.ringLabel}>
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle className="bg" cx="60" cy="60" r="50" />
                <circle className="fg" cx="60" cy="60" r="50" strokeDasharray="314.16" style={{ strokeDashoffset: txt(v.camp?.dash) } as any} />
              </svg>
              {' '}
              <div className="ctr">
                <span>
                  <b>{txt(v.camp?.pctStr)}</b>
                  <span>{txt(v.camp?.doneLabel)}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="tabs" role="tablist">
            {(v.planTabs || []).map((tb: any, index: number) => (
              <button key={index} className={`tab-btn ${txt(tb?.cls)}`} role="tab" aria-selected={tb?.on} onClick={tb?.pick}>{txt(tb?.label)}</button>
            ))}
          </div>
          {' '}
          {/* Overview */}
          {' '}
          {when(v.planTab?.overview) && (
            <WeekByWeek />
          )}
          {' '}
          {/* Weekly plans */}
          {' '}
          {/* Content */}
          {' '}
          {when(v.planTab?.content) && (
            <div className="card screen">
              {when(v.camp?.hasRows) && (
                <div className="tbl-wrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Content</th>
                        <th>Channel</th>
                        <th>Format</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(v.camp?.rows || []).map((r: any, index: number) => (
                        <tr key={index}>
                          <td style={{ fontWeight: '500' } as any}>{txt(r?.t)}</td>
                          <td>
                            <span className="cell-flex">
                              <span className={`mt mt-sm ch-${txt(r?.ab)}`} style={{ background: txt(r?.c) } as any}>{txt(r?.ab)}</span>
                              {txt(r?.ch)}
                            </span>
                          </td>
                          <td>{txt(r?.f)}</td>
                          <td><span className={`status ${txt(r?.stCls)}`}>{txt(r?.st)}</span></td>
                          <td className="muted">{txt(r?.d)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {' '}
              {when(v.camp?.noRows) && (
                <p className="muted">Posts show up here as soon as Pingoo plans the first week of this campaign.</p>
              )}
            </div>
          )}
          {' '}
          {/* Ideas */}
          {' '}
          {when(v.planTab?.ideas) && (
            <IdeasBoard />
          )}
          {' '}
          {/* Notes */}
          {' '}
          {when(v.planTab?.notes) && (
            <TeamNotes />
          )}
        </div>
      </div>
    </section>
  );
}
