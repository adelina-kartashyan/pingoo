'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconGlobeSmall, IconLinkedInComment, IconShareForward, IconThumbUp, IconVerified } from '@/components/icons';

export default function PreviewFacebook() {
  const v = useVM();
  return (
    <div className="pv-card pv-fb">
      <div className="fb-head">
        <img className="fb-av" src="/brand/pingoo-mark.svg" alt="" />
        <span className="fb-who">
          <span className="fb-name">
            <b>Pingoo</b>
            <IconVerified aria-hidden="true" className="fb-ver" />
          </span>
          <span className="fb-time">
            Just now ·
            <IconGlobeSmall aria-hidden="true" className="fb-globe" />
          </span>
        </span>
        <span className="fb-tools" aria-hidden="true">
          <span className="fb-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="fb-x">×</span>
        </span>
      </div>
      <p className="pv-text fb-cap">
        {txt(v.pv?.capShort)}
        {when(v.pv?.cut) && (
          <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
        )}
      </p>
      {' '}
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
      <div className="fb-stats" aria-hidden="true">
        <span className="fb-rxs">
          <IconLinkedInComment aria-hidden="true" className="fb-rx" />
          <svg aria-hidden="true" className="fb-rx" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="21" fill="#FF5378" />
            <path d="M21.1016 32.7065C19.9291 32.2287 7.5 25.0448 7.5 16.6079C7.5 8.17098 16.95 6.76483 21 13.7956C25.05 6.76483 34.5 8.17098 34.5 16.6079C34.5 25.0448 22.0892 32.1305 21.1016 32.7065Z" fill="white" />
          </svg>
          <span>86</span>
        </span>
        <span>9 comments · 3 shares</span>
      </div>
      <div className="fb-acts" aria-hidden="true">
        <span>
          <IconThumbUp aria-hidden="true" className="fb-ic" />
          Like
        </span>
        <span>
          <svg aria-hidden="true" className="fb-ic" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.5 2.02539C39.5234 2.02539 48.9744 13.096 48.9746 26.7139C48.9746 30.9735 46.7235 35.3618 44.1074 40.3447L43.7422 41.04L43.9414 41.7998L45.5576 47.957L37.5879 45.4268L37.0107 45.2441L36.4287 45.4072C15.9378 51.1469 2.02569 37.4068 2.02539 24.2861C2.02539 17.4912 4.39172 11.9707 8.40918 8.14453C12.4355 4.31005 18.2816 2.02539 25.5 2.02539Z"
              stroke="currentColor"
              strokeWidth="4.05"
              strokeLinecap="round"
             />
          </svg>
          Comment
        </span>
        <span>
          <IconShareForward aria-hidden="true" className="fb-ic" />
          Share
        </span>
      </div>
    </div>
  );
}
