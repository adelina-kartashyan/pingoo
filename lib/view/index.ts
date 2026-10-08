/* eslint-disable @typescript-eslint/no-explicit-any */
// Builds everything the screens read (the "view model") from the current state.
// Each step is a small file in this folder; later steps can use values from earlier ones.
import { viewBase } from './base';
import { viewCreate } from './create';
import { viewPreview } from './preview';
import { viewCalendar } from './calendar';
import { viewCalendarMonth } from './calendarMonth';
import { viewResults } from './results';
import { viewHomeChecklist } from './homeChecklist';
import { viewCoach } from './coach';
import { viewPlanner } from './planner';
import { viewCampaignWizard } from './campaignWizard';
import { viewAudience } from './audience';
import { viewGrowthChart } from './growthChart';
import { viewCategoryPatterns } from './categoryPatterns';
import { viewLessons } from './lessons';
import { viewTeam } from './team';
import { viewIntegrations } from './integrations';
import { viewViewModel } from './viewModel';
import { viewSettings } from './settings';
import { viewAccountMenu } from './accountMenu';
import { viewStates } from './states';
import { viewOnboarding } from './onboarding';
import { viewLoadingOffline } from './loadingOffline';

export function renderVals(this: any): any {
  const c: any = {};
  Object.assign(c, viewBase.call(this, c));
  Object.assign(c, viewCreate.call(this, c));
  Object.assign(c, viewPreview.call(this, c));
  Object.assign(c, viewCalendar.call(this, c));
  Object.assign(c, viewCalendarMonth.call(this, c));
  Object.assign(c, viewResults.call(this, c));
  Object.assign(c, viewHomeChecklist.call(this, c));
  Object.assign(c, viewCoach.call(this, c));
  Object.assign(c, viewPlanner.call(this, c));
  Object.assign(c, viewCampaignWizard.call(this, c));
  Object.assign(c, viewAudience.call(this, c));
  Object.assign(c, viewGrowthChart.call(this, c));
  Object.assign(c, viewCategoryPatterns.call(this, c));
  Object.assign(c, viewLessons.call(this, c));
  Object.assign(c, viewTeam.call(this, c));
  Object.assign(c, viewIntegrations.call(this, c));
  Object.assign(c, viewViewModel.call(this, c));
  Object.assign(c, viewSettings.call(this, c));
  Object.assign(c, viewAccountMenu.call(this, c));
  Object.assign(c, viewStates.call(this, c));
  Object.assign(c, viewOnboarding.call(this, c));
  Object.assign(c, viewLoadingOffline.call(this, c));
  return c.__v;
}
