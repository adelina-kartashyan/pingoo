import type { ReactNode } from 'react';
import ClientApp from '@/components/ClientApp';

// Every /app URL shows the same app; the current screen is chosen from the URL inside it.
// The page files in this folder only exist so each screen has its own address and tab title.
export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ClientApp />
      {children}
    </>
  );
}
