'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCommentDots, IconGlobe, IconHeartFilled, IconLinkedInLike, IconMessageText, IconRemix, IconSendOutline } from '@/components/icons';

export default function PreviewLinkedIn() {
  const v = useVM();
  return (
    <div className="pv-card pv-li">
      <div className="li-head">
        <img className="li-av" src="/brand/pingoo-mark.svg" alt="" />
        <span className="li-who">
          <span className="li-name">
            <b>Pingoo</b>
            <span className="li-fol">· Following</span>
          </span>
          <span className="li-sub">{txt(v.pv?.liSub)}</span>
          <span className="li-time">
            Now ·
            <IconGlobe aria-hidden="true" className="li-globe" />
          </span>
        </span>
      </div>
      <p className="pv-text li-cap">
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
      <div className="li-acts" aria-hidden="true">
        <span>
          <IconHeartFilled aria-hidden="true" className="li-ic" />
          15
        </span>
        <span><IconCommentDots aria-hidden="true" className="li-ic" /></span>
        <span>
          <svg aria-hidden="true" className="li-ic" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.648438 10.4471V4.30298C0.648438 3.13266 1.55797 2.54751 3.37705 2.54751H8.33815M6.92085 4.80343L8.33815 2.54751L7.32558 0.263672M12.059 4.30298V10.4471C12.059 11.6174 11.2321 12.2026 9.57843 12.2026H4.61732M5.88264 14.0418L4.61732 12.2026L5.90023 10.1881"
              stroke="currentColor"
              strokeWidth="1.3"
             />
          </svg>
          1
        </span>
        <span><IconMessageText aria-hidden="true" className="li-ic" /></span>
        <span className="li-rxs">
          <IconRemix aria-hidden="true" className="li-rx" />
          <IconSendOutline aria-hidden="true" className="li-rx" />
          <IconLinkedInLike aria-hidden="true" className="li-rx" />
        </span>
      </div>
    </div>
  );
}
