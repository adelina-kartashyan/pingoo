'use client';

import { useVM, txt } from '@/lib/vm';
import { IconAnalytics, IconCalendar, IconHome, IconPencil, IconPingooFace } from '@/components/icons';

// Mobile bottom navigation.
export default function TabBar() {
  const v = useVM();
  return (
    <nav className="tabbar" aria-label="Main" inert={v.bgHidden === 'true'}>
      <button className={`tab ${txt(v.nav?.home)}`} onClick={v.goHome}>
        <IconHome className="i ic" aria-hidden="true" />
        Home
      </button>
      {' '}
      <button className={`tab ${txt(v.nav?.create)}`} onClick={v.goCreate}>
        <IconPencil className="i ic" aria-hidden="true" />
        Create
      </button>
      {' '}
      <button className={`tab ${txt(v.nav?.calendar)}`} onClick={v.goCalendar}>
        <IconCalendar className="i ic" aria-hidden="true" />
        Calendar
      </button>
      {' '}
      <button className={`tab ${txt(v.nav?.results)}`} onClick={v.goResults}>
        <IconAnalytics className="i ic" aria-hidden="true" />
        Results
      </button>
      {' '}
      <button className={`tab ${txt(v.nav?.coach)}`} onClick={v.goCoach} aria-label="Ask Pingoo" title="Ask Pingoo">
        <IconPingooFace className="i ic" aria-hidden="true" />
        Pingoo
      </button>
    </nav>
  );
}
