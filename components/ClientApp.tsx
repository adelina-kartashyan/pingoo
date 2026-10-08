'use client';
import dynamic from 'next/dynamic';

// The product is an interactive app with no server data yet, so it renders in the browser only.
const PingooApp = dynamic(() => import('./PingooApp'), { ssr: false });

export default function ClientApp() {
  return <PingooApp />;
}
