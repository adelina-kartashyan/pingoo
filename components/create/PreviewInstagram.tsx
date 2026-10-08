'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconGlyph5, IconSoundOff } from '@/components/icons';

export default function PreviewInstagram() {
  const v = useVM();
  return (
    <div className="pv-card pv-ig">
      <div className="ig-head2">
        <span className="ig-ring"><img src="/brand/pingoo-mark.svg" alt="" /></span>
        {' '}
        <span className="ig-who">
          <span className="ig-name">
            pingoo.app
            <span className="ig-check" aria-hidden="true" />
          </span>
          <span className="ig-audio">
            <svg className="ig-note" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            pingoo.app · Original audio
          </span>
        </span>
        {' '}
        <span className="ig-menu" aria-hidden="true">
          <i />
          <i />
        </span>
      </div>
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
        {' '}
        {when(v.pv?.empty) && (
          <span className="pv-ph">No image yet</span>
        )}
        {' '}
        {when(v.pv?.isVideoMedia) && (
          <span className="ig-mute" aria-hidden="true"><IconSoundOff aria-hidden="true" /></span>
        )}
      </div>
      {' '}
      {when(v.pv?.isCarousel) && (
        <div className="pv-dots" aria-hidden="true">
          <i className="on" />
          <i />
          <i />
          <i />
          <i />
          <i className="sm" />
        </div>
      )}
      {' '}
      <div className="ig-acts" aria-hidden="true">
        <span>
          <svg aria-hidden="true" className="ig-ic" viewBox="0 0 27 27" fill="none">
            <path
              d="M11.5134 23.0346C7.98677 20.3975 1 14.3685 1 8.943C1 5.35699 3.63157 2.44995 7.25 2.44995C9.125 2.44995 11 3.07495 13.5 5.57495C16 3.07495 17.875 2.44995 19.75 2.44995C23.3684 2.44995 26 5.35699 26 8.943C26 14.3685 19.0133 20.3975 15.4866 23.0346C14.2999 23.922 12.7001 23.922 11.5134 23.0346Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
             />
          </svg>
          14
        </span>
        <span>
          <svg aria-hidden="true" className="ig-ic" viewBox="0 0 27 27" fill="none">
            <path
              d="M13.5 1.0498C6.57244 1.0498 1.0498 6.2537 1.0498 13.0859C1.04983 19.9182 6.57246 25.1221 13.5 25.1221C15.5625 25.1221 17.4852 24.6617 19.2754 23.8838L19.625 23.7314L19.9912 23.8398L25.4902 25.46L24.0811 20.3203L23.958 19.8701L24.209 19.4775C25.3554 17.6841 25.9502 15.4026 25.9502 13.0859C25.9502 6.2537 20.4276 1.0498 13.5 1.0498Z"
              stroke="currentColor"
              strokeWidth="2.1"
             />
          </svg>
          1
        </span>
        <span>
          <svg aria-hidden="true" className="ig-ic" viewBox="0 0 27 27" fill="none">
            <path
              d="M8.5 21.625H14.125C18.2344 21.625 20.289 21.625 21.672 20.49C21.9251 20.2822 22.1573 20.0501 22.365 19.797C23.5 18.414 23.5 16.3594 23.5 12.25M18.5 5.375H12.875C8.76565 5.375 6.71097 5.375 5.32804 6.50995C5.07486 6.71773 4.84273 6.94986 4.63495 7.20304C3.5 8.58598 3.5 10.6407 3.5 14.75M15.375 1C15.375 1 19.75 4.22214 19.75 5.37504C19.75 6.52793 15.375 9.75 15.375 9.75M11.625 17.25C11.625 17.25 7.25001 20.4721 7.25 21.625C7.24999 22.7779 11.625 26 11.625 26"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
             />
          </svg>
        </span>
        <span><IconGlyph5 aria-hidden="true" className="ig-ic" /></span>
        <span className="ig-r">
          <svg aria-hidden="true" className="ig-ic ig-bm" viewBox="0 0 23 24" fill="none">
            <path
              d="M20.9736 1.0498V20.8037L11.7012 12.7383L11.0117 12.1387L10.3223 12.7383L1.0498 20.8037V1.0498H20.9736Z"
              stroke="currentColor"
              strokeWidth="2.1"
             />
          </svg>
        </span>
      </div>
      <p className="pv-text ig-cap">
        <b>Pingoo</b>
        {' '}{txt(v.pv?.capShort)}
        {when(v.pv?.cut) && (
          <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
        )}
      </p>
      <p className="ig-time">Just now</p>
    </div>
  );
}
