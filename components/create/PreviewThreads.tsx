'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconFacebookLike } from '@/components/icons';

export default function PreviewThreads() {
  const v = useVM();
  return (
    <div className="pv-card pv-th">
      <span className="th-avw">
        <img className="th-av" src="/brand/pingoo-mark.svg" alt="" />
        <span className="th-plus" aria-hidden="true">
          <svg viewBox="0 0 10 10"><path d="M5 1.5v7M1.5 5h7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </span>
      </span>
      {' '}
      <div className="th-body">
        <div className="th-head">
          <b>Pingoo</b>
          <span className="th-t">now</span>
          <svg aria-hidden="true" className="th-more" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.5" cy="6.5" r="1.5" fill="#A0A0A0" />
            <circle cx="7.5" cy="6.5" r="1.5" fill="#A0A0A0" />
            <circle cx="13.5" cy="6.5" r="1.5" fill="#A0A0A0" />
          </svg>
        </div>
        <p className="pv-text th-cap">
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
        <div className="th-acts" aria-hidden="true">
          <span>
            <svg aria-hidden="true" className="th-ic" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.43477 10.3719C1.54061 7.58028 2.58644 4.10945 5.51727 3.16611C7.05894 2.66861 8.96144 3.08361 10.0423 4.57445C11.0614 3.02861 13.0189 2.67195 14.5589 3.16611C17.4889 4.10945 18.5406 7.58028 17.6473 10.3719C16.2556 14.7969 11.3998 17.1019 10.0423 17.1019C8.68561 17.1019 3.87311 14.8486 2.43477 10.3719Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
            147
          </span>
          <span>
            <IconFacebookLike aria-hidden="true" className="th-ic" />
            46
          </span>
          <span>
            <svg aria-hidden="true" className="th-ic" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.601562 0.654583V4.71134H4.6596M1.00737 4.30566C2.83348 0.451745 10.2394 -1.77947 14.2974 4.71134M14.8047 14.8532V10.7965H10.7467M14.3989 11.2021C12.5728 15.0561 5.16685 17.2873 1.10882 10.7965"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
               />
            </svg>
            2
          </span>
          <span>
            <svg aria-hidden="true" className="th-ic th-sh" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5838 9.95961C13.5838 9.95961 7.98646 1.44236 11.8546 2.47909C15.1188 3.35405 24.305 8.43249 24.7707 9.95961C24.305 11.4867 15.1188 16.5652 11.8546 17.4401C7.98646 18.4769 13.5838 9.95961 13.5838 9.95961Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
              <path d="M13.5823 9.95966H24.7692" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            25
          </span>
        </div>
      </div>
    </div>
  );
}
