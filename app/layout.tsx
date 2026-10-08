import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
// Styles load in this order on purpose: tokens first, then the app styles (later files refine earlier ones).
import '@/styles/tokens.css';
import '@/styles/app/01-base-sidebar-topbar.css';
import '@/styles/app/02-screens-home-ask-create.css';
import '@/styles/app/03-screens-calendar-results-planner.css';
import '@/styles/app/04-team-integrations-responsive.css';
import '@/styles/app/05-calm-system-buttons-shell.css';
import '@/styles/app/06-colour-states-cards.css';
import '@/styles/app/07-create-previews.css';
import '@/styles/app/08-previews-media-library.css';
import '@/styles/app/09-previews-calendar-audience.css';
import '@/styles/app/10-bento-motion-hover.css';
import '@/styles/app/11-polish-type-and-motion.css';
import '@/styles/app/12-polish-mobile-tablet.css';
import '@/styles/app/13-onboarding-states-a11y-pro.css';
import '@/styles/globals.css';
import '@/styles/landing.css';

export const metadata: Metadata = {
  title: 'Pingoo · Know what to post, every week',
  description: 'Pingoo turns your own results into one clear weekly content plan.',
  icons: { icon: '/brand/pingoo-mark.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0D0A26' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
