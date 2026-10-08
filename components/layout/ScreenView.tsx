'use client';
import type { ComponentType } from 'react';
import { useVM } from '@/lib/vm';
import HomeScreen from '@/components/home/HomeScreen';
import AskScreen from '@/components/ask/AskScreen';
import PlannerScreen from '@/components/planner/PlannerScreen';
import CreateScreen from '@/components/create/CreateScreen';
import CalendarScreen from '@/components/calendar/CalendarScreen';
import ResultsScreen from '@/components/results/ResultsScreen';
import AudienceScreen from '@/components/audience/AudienceScreen';
import TeamScreen from '@/components/team/TeamScreen';
import IntegrationsScreen from '@/components/integrations/IntegrationsScreen';
import SettingsScreen from '@/components/settings/SettingsScreen';

// Which component draws each screen. Switching screens happens instantly in the browser;
// the URL is updated alongside it (see lib/PingooProvider.tsx).
const SCREENS: Record<string, ComponentType> = {
  home: HomeScreen,
  coach: AskScreen,
  planner: PlannerScreen,
  create: CreateScreen,
  calendar: CalendarScreen,
  results: ResultsScreen,
  audience: AudienceScreen,
  team: TeamScreen,
  integrations: IntegrationsScreen,
  settings: SettingsScreen,
};

export default function ScreenView() {
  const v = useVM();
  // while the first plan is "loading" after onboarding, only the skeleton shows
  if (v.pageLoading) return null;
  const key = Object.keys(SCREENS).find((k) => v.is?.[k]) || 'home';
  const Screen = SCREENS[key];
  return <Screen />;
}
