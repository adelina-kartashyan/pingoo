# Pingoo

An AI marketing app that tells you **what to post every week**. Pingoo reads your own results and turns them into one clear weekly plan, drafts the posts, schedules them and tells you on Sunday whether it worked.

This is a working design prototype built with **Next.js + React + TypeScript**. All data is sample data. There is no backend yet.

---

## Run it on your computer

You need [Node.js](https://nodejs.org) (the LTS version) and [VS Code](https://code.visualstudio.com).

1. Open this folder in VS Code (**File → Open Folder…**).
2. Open the terminal (**Terminal → New Terminal**) and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open **http://localhost:3000**. The landing page has an **Open the app** button, or go straight to **http://localhost:3000/app**.

Edit any file and save. The browser updates by itself.

## Put it online (Vercel)

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), sign in with GitHub and choose **Add New → Project**.
3. Pick the repository and click **Deploy**. Vercel detects Next.js on its own, so no settings are needed.

Every push to GitHub redeploys the site automatically.

---

## How the code is organised

```
app/                      Pages. Each folder is a URL.
  page.tsx                /            landing page (placeholder for now)
  layout.tsx              fonts, global styles, <html>
  app/                    /app         the product
    layout.tsx            wraps every app page in the app frame
    page.tsx              /app          Home
    ask/ create/ calendar/ results/ audience/ planner/ team/ integrations/ settings/

components/
  layout/                 AppShell, Sidebar, TopBar, TabBar (mobile), PageTop, Toast
  home/ ask/ create/ …    one folder per screen: <Name>Screen.tsx plus its parts
  onboarding/ pro/        overlays: sign-up flow, Pro celebration
  icons/                  every icon as a small React component

lib/
  engine/                 app state and actions (what happens when you click)
    Engine.ts             the state container
    initialState.ts       starting state
    methods/              actions, grouped by topic (campaigns, schedule, coach…)
  view/                   turns state into what the screens show (the "view model")
  PingooProvider.tsx      connects the engine to React and keeps the URL in sync
  vm.ts                   useVM() hook + tiny helpers used in components
  routes.ts               screen name ↔ URL

data/content.ts           sample plans, posts, team, tips and Pingoo answers

styles/
  tokens.css              design tokens: colours, radius, shadow, motion
  app/01-…13-*.css        app styles, loaded in this order (later files refine earlier ones)
  globals.css             font + page basics
  landing.css             landing page placeholder

public/                   logos, channel icons, the Satoshi font
```

### How a screen works

1. Components read everything from the view model: `const v = useVM();`
2. They show values (`{txt(v.bet.title)}`) and call actions (`onClick={v.approve}`).
3. The action changes state in the engine, the view model is rebuilt, and React re-renders.

To change how something **looks**, edit the component or its CSS. To change what it **does**, find the action in `lib/view/*` or `lib/engine/methods/*`.

### Design tokens

All brand values live in `styles/tokens.css`: ink `#0D0A26`, lime `#CCFF4D` (only ever a fill under ink text), coral `#CF3216`, plus hover and selected greys. These are the same names the Figma variables will use.

---

## Notes and next steps

- **Ported from the prototype.** The logic in `lib/engine/methods` and `lib/view` was moved over 1:1 and is not fully typed yet (`// @ts-nocheck` at the top of those files). Adding types screen by screen is a good next step.
- **Styles.** The CSS is the prototype's, split into ordered files. A later step is moving each part next to its component (CSS Modules).
- **Accessibility.** The app supports keyboard use, visible focus rings, screen-reader labels and announced page changes, and all text meets WCAG AA contrast.
- **Debugging.** In the browser console, `pingoo.state` shows the current app state.
