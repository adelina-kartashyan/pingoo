'use client';
import { useVM } from '@/lib/vm';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PageTop from './PageTop';
import ScreenView from './ScreenView';
import TabBar from './TabBar';
import Toast from './Toast';
import ProMoment from '@/components/pro/ProMoment';
import Onboarding from '@/components/onboarding/Onboarding';
import CampaignWizard from '@/components/planner/CampaignWizard';
import EndCampaignDialog from '@/components/planner/EndCampaignDialog';

// The app frame around every screen: sidebar, top bar, the current screen and the overlays.
export default function AppShell() {
  const v = useVM();
  // while a dialog is open, everything behind it is "inert": not clickable, not focusable, hidden from screen readers
  const behindDialog = v.bgHidden === 'true';
  return (
    <div className="app" style={{ fontFamily: 'Satoshi, Outfit, system-ui, sans-serif', color: '#0D0A26' }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Sidebar />
      <div className="main" inert={behindDialog}>
        <TopBar />
        <main className="content" id="main-content" tabIndex={-1}>
          <PageTop />
          <ScreenView />
        </main>
      </div>
      <ProMoment />
      <Onboarding />
      <TabBar />
      <CampaignWizard />
      <EndCampaignDialog />
      <Toast />
    </div>
  );
}
