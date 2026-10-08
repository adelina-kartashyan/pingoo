'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAnalytics, IconApps, IconCalendar, IconCancel, IconCrown, IconHome, IconPencil, IconPingooColor, IconPingooFace, IconSettings, IconTask, IconUserGroup } from '@/components/icons';

// Left navigation (collapsible on desktop, a drawer on mobile).
export default function Sidebar() {
  const v = useVM();
  return (
    <>
      <aside className={`side ${txt(v.sideCls)}`} aria-label="Main navigation" inert={v.bgHidden === 'true'}>
        <div className="side-head">
          <div className="brand">
            <img className="logo-full" src="/brand/pingoo-logo.svg" alt="Pingoo" />
            <img className="logo-mark" src="/brand/pingoo-mark.svg" alt="Pingoo" />
          </div>
          {' '}
          <button className="icon-btn toggle" onClick={v.toggleCollapse} aria-label={v.collapseLabel} title={txt(v.collapseLabel)}>
            <svg className="i ic" viewBox="0 0 27 27" fill="none" aria-hidden="true">
              <path
                d="M8.95818 4.88599V21.1728M4.07215 4.88599H21.9876C22.4373 4.88599 22.8019 5.25058 22.8019 5.70032V20.3584C22.8019 20.8082 22.4373 21.1728 21.9876 21.1728H4.07215C3.6224 21.1728 3.25781 20.8082 3.25781 20.3584V5.70032C3.25781 5.25058 3.6224 4.88599 4.07215 4.88599Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
          </button>
          {' '}
          <button className="icon-btn close-menu" onClick={v.closeMenu} aria-label="Close menu"><IconCancel className="i" aria-hidden="true" /></button>
        </div>
        <p className="side-sec lbl side-sec-first">Overview</p>
        <nav className="nav" aria-label="Overview">
          <button className={`nav-item ${txt(v.nav?.home)}`} onClick={v.goHome} title="Home">
            <IconHome className="i ic" aria-hidden="true" />
            <span className="lbl">Home</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.coach)}`} onClick={v.goCoach} title="Ask Pingoo">
            <IconPingooFace className="i ic" aria-hidden="true" />
            <span className="lbl">Ask Pingoo</span>
            {when(v.coachUnread) && (
              <span className="lbl badge-n">1</span>
            )}
          </button>
        </nav>
        <p className="side-sec lbl">Plan &amp; create</p>
        <nav className="nav" aria-label="Plan and create">
          <button className={`nav-item ${txt(v.nav?.planner)}`} onClick={v.goPlanner} title="Campaign Planner">
            <IconTask className="i ic" aria-hidden="true" />
            <span className="lbl">Campaign Planner</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.create)}`} onClick={v.goCreate} title="Create">
            <IconPencil className="i ic" aria-hidden="true" />
            <span className="lbl">Create</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.calendar)}`} onClick={v.goCalendar} title="Calendar">
            <IconCalendar className="i ic" aria-hidden="true" />
            <span className="lbl">Calendar</span>
            {when(v.live) && (
              <span className="lbl dot-live" aria-label="Posts live" />
            )}
          </button>
        </nav>
        <p className="side-sec lbl">Insights</p>
        <nav className="nav" aria-label="Insights">
          <button className={`nav-item ${txt(v.nav?.results)}`} onClick={v.goResults} title="Results">
            <IconAnalytics className="i ic" aria-hidden="true" />
            <span className="lbl">Results</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.audience)}`} onClick={v.goAudience} title="Audience & Trends">
            <IconUserGroup className="i ic" aria-hidden="true" />
            <span className="lbl">Audience &amp; Trends</span>
          </button>
        </nav>
        <p className="side-sec lbl">Workspace</p>
        <nav className="nav" aria-label="Workspace">
          <button className={`nav-item ${txt(v.nav?.team)}`} onClick={v.goTeam} title="Team">
            <svg className="i ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 14C7 14 4 16.5 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.5 17 14 12 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
            <span className="lbl">Team</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.integrations)}`} onClick={v.goIntegrations} title="Integrations">
            <IconApps className="i ic" aria-hidden="true" />
            <span className="lbl">Integrations</span>
          </button>
          {' '}
          <button className={`nav-item ${txt(v.nav?.settings)}`} onClick={v.goSettings} title="Settings">
            <IconSettings className="i ic" aria-hidden="true" />
            <span className="lbl">Settings</span>
          </button>
        </nav>
        <div className="side-foot">
          {when(v.isFree) && (
            <div className="pro">
              <div className="pro-title">
                <IconCrown className="i" aria-hidden="true" />
                <span className="lbl">Upgrade to Pro</span>
              </div>
              <p className="lbl">Unlock premium campaign templates and advanced AI insights.</p>
              {' '}
              <button className="pro-btn lbl" onClick={v.proClick}>See Pro plans</button>
            </div>
          )}
          {' '}
          {when(v.isPro) && (
            <button className="pro pro-on" onClick={v.proClick} aria-label="Pingoo Pro. Manage plan">
              <IconPingooColor className="pro-mark" aria-hidden="true" />
              <span className="lbl pro-on-t">
                <b>Pingoo Pro</b>
                <span>Renews Nov 8</span>
              </span>
            </button>
          )}
        </div>
      </aside>
      <button className={`scrim ${txt(v.scrimCls)}`} onClick={v.closeMenu} aria-label="Close menu" tabIndex={-1} />
    </>
  );
}
