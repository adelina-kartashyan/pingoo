import Link from 'next/link';

// Placeholder landing page. The real one will reuse the app's components and tokens.
export default function Landing() {
  return (
    <main className="landing">
      <div className="landing-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="landing-logo" src="/brand/pingoo-logo.svg" alt="Pingoo" />
        <h1>Know what to post, every week.</h1>
        <p>Pingoo reads your own results and turns them into one clear weekly content plan.</p>
        <Link className="landing-cta" href="/app">
          Open the app
          <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
          </svg>
        </Link>
        <p className="landing-note">Landing page coming soon · this is a design prototype with sample data</p>
      </div>
    </main>
  );
}
