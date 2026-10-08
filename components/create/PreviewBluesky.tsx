'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconGlobeTiny, IconLinkedInSend, IconReactionInsight, IconReactionLike, IconReactionLove } from '@/components/icons';

export default function PreviewBluesky() {
  const v = useVM();
  return (
    <div className="pv-card pv-bs">
      <img className="bs-av" src="/brand/pingoo-mark.svg" alt="" />
      {' '}
      <div className="bs-body">
        <div className="bs-head">
          <b>Pingoo</b>
          <svg aria-hidden="true" className="bs-ver" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" fill="#1083FE" />
            <path d="M4.6 8.3l2.2 2.1 4.6-4.7" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="bs-h">@pingoo.bsky.social</span>
          <span className="bs-t">now</span>
        </div>
        <p className="pv-text bs-cap">
          {txt(v.pv?.capShort)}
          {when(v.pv?.cut) && (
            <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
          )}
        </p>
        <p className="bs-link">pingoo.app/blog/{txt(v.pv?.slug)}…</p>
        <div className="bs-embed">
          {when(v.pv?.showMedia) && (
            <div className={`pv-media r-${txt(v.pv?.ratioCls)}`} style={{ background: txt(v.pv?.tone) } as any}>
              {when(v.pv?.hasImgUrl) && (
                <img className="pv-real" src={txt(v.pv?.url)} alt={txt(v.pv?.alt)} />
              )}
              {' '}
              {when(v.pv?.hasVideoUrl) && (
                <video className="pv-real" src={txt(v.pv?.url)} autoPlay muted loop playsInline />
              )}
              {' '}
              {when(v.pv?.placeholder) && (
                <span className="pv-ph">{txt(v.pv?.mediaLabel)}</span>
              )}
            </div>
          )}
          {' '}
          <div className="bs-meta">
            <b>{txt(v.pv?.linkTitle)}</b>
            <span className="bs-desc">Plan a week of posts in one sitting, then let the results shape the next.</span>
            <span className="bs-dom">
              <IconGlobeTiny aria-hidden="true" className="bs-globe" />
              pingoo.app
            </span>
          </div>
        </div>
        <div className="bs-acts" aria-hidden="true">
          <span>
            <IconLinkedInSend aria-hidden="true" className="bs-ic" />
            2
          </span>
          <span>
            <svg aria-hidden="true" className="bs-ic" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_292_1038)">
                <path
                  d="M5.33235 6L3.33219 4L1.33203 6M3.33219 4V10.6667C3.33219 11.0203 3.47268 11.3594 3.72275 11.6095C3.97282 11.8595 4.31198 12 4.66563 12H8.66595M10.6661 10L12.6663 12L14.6664 10M12.6663 12V5.33333C12.6663 4.97971 12.5258 4.64057 12.2757 4.39052C12.0256 4.14048 11.6865 4 11.3328 4H7.33251"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                 />
              </g>
              <defs><clipPath id="clip0_292_1038"><rect width="16" height="16" fill="white" /></clipPath></defs>
            </svg>
            4
          </span>
          <span>
            <IconReactionLike aria-hidden="true" className="bs-ic" />
            9
          </span>
          <span className="bs-end">
            <IconReactionInsight aria-hidden="true" className="bs-ic" />
            <svg aria-hidden="true" className="bs-ic" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.6229 4.95898L14.1642 8.50039L10.6229 12.0418M14.1642 8.50039H5.66508C4.91371 8.50039 4.19311 8.79888 3.66181 9.3302C3.13051 9.86151 2.83203 10.5821 2.83203 11.3335V12.7501"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
               />
            </svg>
            <IconReactionLove aria-hidden="true" className="bs-ic" />
          </span>
        </div>
      </div>
    </div>
  );
}
