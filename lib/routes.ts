// Screen name (used inside the engine) ↔ URL.
export const SCREEN_PATHS: Record<string, string> = {
  home: '/app',
  coach: '/app/ask',
  planner: '/app/planner',
  create: '/app/create',
  calendar: '/app/calendar',
  results: '/app/results',
  audience: '/app/audience',
  team: '/app/team',
  integrations: '/app/integrations',
  settings: '/app/settings',
};

export function pathForScreen(screen: string): string {
  return SCREEN_PATHS[screen] || '/app';
}

export function screenForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/app';
  const hit = Object.entries(SCREEN_PATHS).find(([, p]) => p === clean);
  return hit ? hit[0] : 'home';
}
