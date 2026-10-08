'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconBookmark, IconGlyph3, IconGlyph4, IconHeartOutline, IconVideo } from '@/components/icons';
import TikTokRail from './TikTokRail';

export default function VerticalVideoPreview() {
  const v = useVM();
  return (
    <div className={`pv-vert ${txt(v.pv?.vertCls)}`}>
      <div className="pv-media pv-fill" style={{ background: txt(v.pv?.tone) } as any}>
        {when(v.pv?.hasVideoUrl) && (
          <video className="pv-real" src={txt(v.pv?.url)} autoPlay muted loop playsInline />
        )}
        {' '}
        {when(v.pv?.hasImgUrl) && (
          <img className="pv-real" src={txt(v.pv?.url)} alt={txt(v.pv?.alt)} />
        )}
        {' '}
        {when(v.pv?.placeholder) && (
          <span className="pv-ph">
            <IconVideo className="i" aria-hidden="true" />
            {txt(v.pv?.mediaLabel)}
          </span>
        )}
        {' '}
        {when(v.pv?.empty) && (
          <span className="pv-ph">No video yet</span>
        )}
      </div>
      {' '}
      {when(v.pv?.vIG) && (
        <>
          <div className="vt-top" aria-hidden="true">
            <b className="vt-title">Reels</b>
            <span className="vt-r">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" /></svg>
            </span>
          </div>
          <div className="pv-rail" aria-hidden="true">
            <span className="vr">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" /></svg>
              <small>1.2K</small>
            </span>
            <span className="vr">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" /></svg>
              <small>48</small>
            </span>
            <span className="vr">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" /></svg>
              <small />
            </span>
            <span className="vr">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h.01M12 12h.01M19 12h.01" /></svg>
              <small />
            </span>
            <img className="pv-rail-av sq" src="/brand/pingoo-mark.svg" alt="" />
          </div>
          <div className="pv-bottom">
            <div className="vt-who">
              <img className="vt-av" src="/brand/pingoo-mark.svg" alt="" />
              <b>pingoo.app</b>
              <span className="vt-follow">Follow</span>
            </div>
            <p className="vt-cap">
              {txt(v.pv?.capShort)}
              {when(v.pv?.cut) && (
                <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
              )}
            </p>
            <p className="vt-audio">
              <svg className="pv-ic" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18V6l10-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM19 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
              pingoo.app · Original audio
            </p>
          </div>
        </>
      )}
      {' '}
      {when(v.pv?.vTT) && (
        <>
          <div className="tt-top" aria-hidden="true">
            <span>Explore</span>
            <span>Following</span>
            <b>For you</b>
            <svg className="tt-search" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </div>
          <TikTokRail />
          <div className="pv-bottom tt-bottom">
            <b>pingoo.app</b>
            <p className="vt-cap">
              {txt(v.pv?.capShort)}
              {when(v.pv?.cut) && (
                <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
              )}
            </p>
            <span className="tt-trans">See translation</span>
          </div>
        </>
      )}
      {' '}
      {when(v.pv?.vYT) && (
        <>
          <div className="ys-top" aria-hidden="true">
            <svg className="ys-top-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            <b>Shorts</b>
            <span className="ys-r">
              <svg className="ys-top-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l4 6M21 9l-4 6" /></svg>
              <svg className="ys-top-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" /></svg>
              <svg className="ys-top-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5h.01M12 12h.01M12 19h.01" /></svg>
            </span>
          </div>
          <div className="ys-rail" aria-hidden="true">
            <span className="ys-b">
              <IconHeartOutline className="ys-ic" aria-hidden="true" />
              <small>1.3K</small>
            </span>
            {' '}
            <span className="ys-b">
              <IconGlyph3 className="ys-ic" aria-hidden="true" />
              <small>68</small>
            </span>
            {' '}
            <span className="ys-b">
              <IconBookmark className="ys-ic" aria-hidden="true" />
              <small>Save</small>
            </span>
            {' '}
            <span className="ys-b">
              <svg className="ys-ic" aria-hidden="true" viewBox="0 0 28 28" fill="none">
                <path
                  d="M3.75489 23.286C7.06873 21.3969 9.53667 17.3892 16.1533 17.3892V22.5618L24.7743 13.9408L16.1533 5.31982V10.4924C10.4634 10.4924 4.06104 15.912 2.54907 22.9262C2.52814 23.017 2.53504 23.1811 2.61835 23.261C2.70167 23.341 2.66768 23.3497 2.82309 23.3878C2.97849 23.426 3.15255 23.4367 3.32008 23.4184C3.4876 23.4001 3.63989 23.3537 3.75489 23.286Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                 />
              </svg>
              <small>Share</small>
            </span>
            {' '}
            <span className="ys-b">
              <IconGlyph4 className="ys-ic" aria-hidden="true" />
              <small>9</small>
            </span>
          </div>
          <div className="pv-bottom ys-bottom">
            <div className="vt-who">
              <img className="ys-av" src="/brand/pingoo-mark.svg" alt="" />
              <b>@pingoo</b>
              <span className="ys-sub">Subscribe</span>
            </div>
            <p className="vt-cap">
              {txt(v.pv?.capShort)}
              {when(v.pv?.cut) && (
                <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
              )}
            </p>
          </div>
          <div className="ys-comment" aria-hidden="true">
            <span className="ys-me">P</span>
            <span className="ys-ph">Comment…</span>
            <span className="ys-emo">❤️</span>
            <span className="ys-emo">😅</span>
            <span className="ys-emo">😢</span>
            <span className="ys-thumb">
              {when(v.pv?.hasImgUrl) && (
                <img src={txt(v.pv?.url)} alt="" />
              )}
              {when(v.pv?.hasVideoUrl) && (
                <video src={txt(v.pv?.url)} muted playsInline preload="metadata" />
              )}
            </span>
          </div>
        </>
      )}
      {' '}
      {when(v.pv?.hasHook) && (
        <p className={`pv-hook ${txt(v.hookCls)}`}>{txt(v.pv?.hook)}</p>
      )}
      {' '}
      {when(v.overlay) && (
        <>
          <div className="pv-zone z-right"><span>Buttons</span></div>
          <div className="pv-zone z-bottom"><span>Caption and profile</span></div>
          <div className="pv-zone z-top"><span>Header</span></div>
        </>
      )}
    </div>
  );
}
