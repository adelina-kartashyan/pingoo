'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconArrowRight, IconCaretDown, IconCaretRight, IconCreditCard, IconHelpCircle, IconLink, IconLogOut, IconMessage, IconNotification, IconPaintBoard, IconPingooColor, IconSparkles } from '@/components/icons';

// Top bar: current week, Ask Pingoo search, messages, notifications and the account menu.
export default function TopBar() {
  const v = useVM();
  return (
    <header className="top">
      <button className="icon-btn menu-btn" onClick={v.openMenu} aria-label="Open menu">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {' '}
      <div className={`week ${txt(v.topWeekCls)}`} aria-live="polite">
        <span className="k">{txt(v.topWeekLabel)}</span>
        <span className="week-dates">{txt(v.topWeekDates)}</span>
      </div>
      <div className="ask-wrap">
        <button className="ask" onClick={v.toggleAsk} aria-expanded={v.askOpen}>
          <IconSparkles className="i" aria-hidden="true" />
          <span className="ask-text">Ask Pingoo anything…</span>
          <kbd className="ask-kbd" aria-label="Shortcut: Command K">⌘K</kbd>
        </button>
        {' '}
        {when(v.askOpen) && (
          <div className="pop pop-ask">
            <div className="ask-sugs">
              {(v.askSugs || []).map((s: any, index: number) => (
                <button key={index} className="sug" onClick={s?.run}>
                  <span>{txt(s?.q)}</span>
                  <IconArrowRight className="i i-s ph" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="top-actions">
        <button
          className={`pill-btn ${txt(v.msgBtnCls)}`}
          onClick={v.toggleMsgs}
          onMouseEnter={v.msgHoverIn}
          onMouseLeave={v.popHoverOut}
          aria-label={`Messages, ${txt(v.msgUnread)} unread`}
          aria-expanded={v.msgOpen}
        >
          <IconMessage className="i" aria-hidden="true" />
          {when(v.hasMsgUnread) && (
            <span className="count">{txt(v.msgUnread)}</span>
          )}
        </button>
        {' '}
        <button
          className={`pill-btn ${txt(v.notifBtnCls)}`}
          onClick={v.toggleNotifs}
          onMouseEnter={v.notifHoverIn}
          onMouseLeave={v.popHoverOut}
          aria-label={`Notifications, ${txt(v.notifUnread)} unread`}
          aria-expanded={v.notifOpen}
        >
          <IconNotification className="i" aria-hidden="true" />
          {when(v.hasNotifUnread) && (
            <span className="count">{txt(v.notifUnread)}</span>
          )}
        </button>
        {' '}
        <button
          className={`me ${txt(v.meCls)}`}
          onClick={v.toggleMe}
          aria-label="Account menu: Teo Casper"
          aria-haspopup="menu"
          aria-expanded={v.meOpen}
        >
          <span className="av av-me">TC</span>
          <span className="me-name">Teo Casper</span>
          <IconCaretDown className="i i-s me-chev ph" aria-hidden="true" />
        </button>
        {' '}
        {when(v.meOpen) && (
          <>
            <button className="um-scrim" onClick={v.closeMe} aria-label="Close account menu" tabIndex={-1} />
            {' '}
            <div className="pop um" role="menu" aria-label="Account">
              <div className="um-head" style={{ '--i': '0' } as any}>
                <span className="av av-me um-av">TC</span>
                {' '}
                <span className="um-who">
                  <b>Teo Casper</b>
                  <span>teo@pingoo.app</span>
                </span>
              </div>
              {' '}
              <button className={`um-ws ${txt(v.proCls)}`} style={{ '--i': '1' } as any} onClick={v.umPlan}>
                {when(v.isFree) && (
                  <img className="um-ws-logo um-ws-img" src="/brand/pingoo-mark.svg" alt="" />
                )}
                {when(v.isPro) && (
                  <IconPingooColor className="um-ws-logo um-ws-col" aria-hidden="true" />
                )}
                <span className="um-ws-n">
                  <b>Pingoo workspace</b>
                  <span>{txt(v.planName)}</span>
                </span>
                <span className="um-tag">{txt(v.planTag)}</span>
              </button>
              {' '}
              <div className="um-sep" />
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '2' } as any} onClick={v.umProfile}>
                <span className="um-ic">
                  <svg className="i i-s" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M12 14C7 14 4 16.5 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.5 17 14 12 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                     />
                  </svg>
                </span>
                <span className="um-l">Profile</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '3' } as any} onClick={v.umBrand}>
                <span className="um-ic"><IconPaintBoard className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Brand settings</span>
                <span className="um-sub">Voice, colours, logo</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '4' } as any} onClick={v.umAccounts}>
                <span className="um-ic"><IconLink className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Connected accounts</span>
                <span className="um-count">{txt(v.umConnected)}</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '5' } as any} onClick={v.umNotifs}>
                <span className="um-ic"><IconNotification className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Notification settings</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <div className="um-sep" />
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '6' } as any} onClick={v.umPlan}>
                <span className="um-ic"><IconCreditCard className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Plan &amp; billing</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <button className="um-item" role="menuitem" style={{ '--i': '7' } as any} onClick={v.umHelp}>
                <span className="um-ic"><IconHelpCircle className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Help &amp; feedback</span>
                <IconCaretRight className="i i-s um-arw ph" aria-hidden="true" />
              </button>
              {' '}
              <div className="um-sep" />
              {' '}
              <button className="um-item um-out" role="menuitem" style={{ '--i': '8' } as any} onClick={v.umLogout}>
                <span className="um-ic"><IconLogOut className="i i-s" aria-hidden="true" /></span>
                <span className="um-l">Log out</span>
              </button>
            </div>
          </>
        )}
        {' '}
        {when(v.msgOpen) && (
          <div className="pop pop-hov" onMouseEnter={v.popHoverIn} onMouseLeave={v.popHoverOut}>
            <div className="pop-head">
              <b>Messages</b>
              <button className="link-btn" onClick={v.readAllMsgs}>Mark all as read</button>
            </div>
            {' '}
            {(v.messages || []).map((m: any, index: number) => (
              <button key={index} className="pop-item" onClick={m?.open}>
                <span className="av" style={{ background: txt(m?.c) } as any}>{txt(m?.i)}</span>
                {' '}
                <span style={{ flex: '1', minWidth: '0' } as any}>
                  <span className="t" style={{ display: 'block' } as any}>{txt(m?.n)}</span>
                  <span className="s" style={{ display: 'block' } as any}>{txt(m?.text)}</span>
                </span>
                {' '}
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' } as any}>
                  <span className="when">{txt(m?.when)}</span>
                  <span className={txt(m?.dot)} />
                </span>
              </button>
            ))}
          </div>
        )}
        {' '}
        {when(v.notifOpen) && (
          <div className="pop pop-hov" onMouseEnter={v.popHoverIn} onMouseLeave={v.popHoverOut}>
            <div className="pop-head">
              <b>Notifications</b>
              <button className="link-btn" onClick={v.readAllNotifs}>Mark all as read</button>
            </div>
            {' '}
            {(v.notifs || []).map((n: any, index: number) => (
              <button key={index} className="pop-item" onClick={n?.open}>
                <span className="ni"><IconSparkles className="i i-s" aria-hidden="true" /></span>
                {' '}
                <span style={{ flex: '1', minWidth: '0' } as any}>
                  <span className="t" style={{ display: 'block' } as any}>{txt(n?.t)}</span>
                  <span className="s" style={{ display: 'block' } as any}>{txt(n?.s)}</span>
                </span>
                {' '}
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' } as any}>
                  <span className="when">{txt(n?.when)}</span>
                  <span className={txt(n?.dot)} />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
