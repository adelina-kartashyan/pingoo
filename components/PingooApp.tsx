'use client';
import PingooProvider from '@/lib/PingooProvider';
import AppShell from '@/components/layout/AppShell';

export default function PingooApp() {
  return (
    <PingooProvider>
      <AppShell />
    </PingooProvider>
  );
}
