/* eslint-disable @typescript-eslint/no-explicit-any */
// The Pingoo "engine": holds the app state and all actions.
// React screens never change state directly — they call actions from the view model,
// and the engine tells React to re-render (see lib/PingooProvider.tsx).
import { buildContent } from '@/data/content';
import { renderVals } from '@/lib/view';
import { initialState } from './initialState';
import { campaignsMethods } from './methods/campaigns';
import { coachMethods } from './methods/coach';
import { insightsMethods } from './methods/insights';
import { libraryMethods } from './methods/library';
import { lifecycleMethods } from './methods/lifecycle';
import { navigationMethods } from './methods/navigation';
import { onboardingMethods } from './methods/onboarding';
import { scheduleMethods } from './methods/schedule';

export interface Engine {
  [key: string]: any;
}

export class Engine {
  state: any;
  props: any = {};
  version = 0;
  /** set by the provider so engine.go() can change the URL */
  navigate?: (screen: string) => void;
  private listeners = new Set<() => void>();

  constructor(screen = 'home') {
    this.setCard = (el: any) => { this._card = el; };
    this.setThread = (el: any) => { this._thread = el; };
    this.noop = () => {};
    this.state = { ...initialState(this), screen };
  }

  /** Same contract as React's setState: shallow-merge a patch (or a function of the old state). */
  setState(patch: any) {
    const p = typeof patch === 'function' ? patch(this.state) : patch;
    if (!p) return;
    const prevScreen = this.state.screen;
    this.state = { ...this.state, ...p };
    if (this.state.screen !== prevScreen && this.navigate) this.navigate(this.state.screen);
    this.version++;
    this.listeners.forEach((fn) => fn());
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  getVersion = () => this.version;

  /** Sample content (plans, posts, team…) — built once. */
  D() {
    if (!this._d) this._d = buildContent();
    return this._d;
  }
}

Object.assign(
  Engine.prototype,
  campaignsMethods,
  coachMethods,
  insightsMethods,
  libraryMethods,
  lifecycleMethods,
  navigationMethods,
  onboardingMethods,
  scheduleMethods,
  { renderVals },
);
