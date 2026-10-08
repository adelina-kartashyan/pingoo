'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// Connects the engine to React: re-renders when state changes, keeps the URL and
// the current screen in sync, manages focus, and runs the engine's mount / update hooks.
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Engine } from '@/lib/engine/Engine';
import { pathForScreen, screenForPath } from '@/lib/routes';
import { VMContext } from '@/lib/vm';

const TITLES: Record<string, string> = {
  home: 'Home', coach: 'Ask Pingoo', planner: 'Campaign Planner', create: 'Create', calendar: 'Calendar',
  results: 'Results', audience: 'Audience & Trends', team: 'Team', integrations: 'Integrations', settings: 'Settings',
};

const FOCUSABLE = 'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export default function PingooProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<Engine | null>(null);
  if (!ref.current) ref.current = new Engine(screenForPath(pathname));
  const engine = ref.current;
  // handy for debugging in the browser console: pingoo.state
  if (typeof window !== 'undefined') (window as any).pingoo = engine;

  useSyncExternalStore(engine.subscribe, engine.getVersion, engine.getVersion);

  // engine → URL. Screens switch instantly in the browser; the native history API updates
  // the address bar without asking the server for a new page (Next.js keeps usePathname in sync).
  engine.navigate = (screen: string) => {
    const target = pathForScreen(screen);
    if (target !== window.location.pathname) window.history.pushState(null, '', target);
  };

  // URL → engine (back / forward buttons, typed URLs)
  useEffect(() => {
    const screen = screenForPath(pathname);
    if (engine.state.screen !== screen) engine.setState({ screen });
  }, [pathname, engine]);

  // tab title follows the screen
  const screen = engine.state.screen;
  useEffect(() => {
    document.title = `${TITLES[screen] || 'Pingoo'} · Pingoo`;
  }, [screen]);

  useEffect(() => {
    engine.componentDidMount();
    return () => engine.componentWillUnmount();
  }, [engine]);

  useEffect(() => {
    engine.componentDidUpdate();
  });

  const vm = engine.renderVals();

  // Dialogs: move focus into a dialog when it opens, and back to where it was when it closes.
  const dialogOpen = vm.bgHidden === 'true';
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (dialogOpen) {
      const active = document.activeElement as HTMLElement | null;
      if (active && !active.closest('[aria-modal="true"]')) lastFocus.current = active;
      const id = window.setTimeout(() => {
        const dialogs = document.querySelectorAll<HTMLElement>('[aria-modal="true"]');
        const dlg = dialogs[dialogs.length - 1];
        if (!dlg || dlg.contains(document.activeElement)) return;
        const first = dlg.querySelector<HTMLElement>(FOCUSABLE);
        (first || dlg).focus({ preventScroll: true });
      }, 50);
      return () => window.clearTimeout(id);
    }
    const back = lastFocus.current;
    lastFocus.current = null;
    if (back === null) return undefined;
    const id = window.setTimeout(() => {
      if (back.isConnected && !back.closest('[inert]')) back.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>('#main-content h1')?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(id);
  }, [dialogOpen]);

  // after the "building your first plan" skeleton, put focus on the new page heading
  const loading = !!vm.pageLoading;
  const wasLoading = useRef(false);
  useEffect(() => {
    if (wasLoading.current && !loading) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('#main-content h1')?.focus({ preventScroll: true }));
    }
    wasLoading.current = loading;
  }, [loading]);

  return <VMContext.Provider value={vm}>{children}</VMContext.Provider>;
}
