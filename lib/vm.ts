'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// The "view model" is everything the screens show: text, numbers, class names and click handlers.
// It is built by lib/view from the engine state and shared through React context.
import { createContext, useContext } from 'react';

export const VMContext = createContext<any>(null);

/** Read the current view model inside any component. */
export function useVM(): any {
  return useContext(VMContext);
}

/** Text for the page: hides null / undefined / false. */
export const txt = (x: any): string => (x === null || x === undefined || x === false ? '' : String(x));

/** Should a block show? Empty lists count as "no". */
export const when = (x: any): boolean => !!x && !(Array.isArray(x) && x.length === 0);

/** Boolean attributes (disabled, checked…) that may arrive as 'true' / 'false' strings. */
export const flag = (x: any): boolean => x === true || x === 'true';
