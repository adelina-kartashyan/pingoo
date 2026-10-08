'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconComment, IconVerifiedBlue } from '@/components/icons';

export default function PreviewX() {
  const v = useVM();
  return (
    <div className="pv-card pv-x">
      <img className="pv-av x-av" src="/brand/pingoo-mark.svg" alt="" />
      {' '}
      <div className="x-body">
        <div className="x-h">
          <b>Pingoo</b>
          <IconVerifiedBlue aria-hidden="true" className="x-ver" />
          <span className="x-handle">@pingoo</span>
          <span className="x-more" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <p className="pv-text">{txt(v.pv?.capFull)}</p>
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
        <p className="x-from" aria-hidden="true">From pingoo.app</p>
        <div className="x-acts" aria-hidden="true">
          <span>
            <IconComment aria-hidden="true" className="xi" />
            2
          </span>
          <span>
            <svg aria-hidden="true" className="xi" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.00036 6.75L3.75018 4.5L1.5 6.75M3.75018 4.5V12C3.75018 12.3978 3.90823 12.7794 4.18955 13.0607C4.47088 13.342 4.85244 13.5 5.2503 13.5H9.75066M12.0008 11.25L14.251 13.5L16.5012 11.25M14.251 13.5V6C14.251 5.60218 14.093 5.22064 13.8116 4.93934C13.5303 4.65804 13.1488 4.5 12.7509 4.5H8.25054"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
               />
            </svg>
            1
          </span>
          <span>
            <svg aria-hidden="true" className="xi" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.80802 14.9758C5.69206 13.3935 1.5 9.7761 1.5 6.52083C1.5 4.36922 3.07894 2.625 5.25 2.625C6.375 2.625 7.5 3 9 4.5C10.5 3 11.625 2.625 12.75 2.625C14.921 2.625 16.5 4.36922 16.5 6.52083C16.5 9.7761 12.308 13.3935 10.192 14.9758C9.47993 15.5082 8.52007 15.5082 7.80802 14.9758Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
            22
          </span>
          <span>
            <svg aria-hidden="true" className="xi" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.52734 8.37573V13.9329" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13.4766 6.54761L13.4766 13.9329" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.4961 10.106L10.4961 13.9329" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.51172 4.06738L7.51172 13.9329" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            302K
          </span>
          <span>
            <svg aria-hidden="true" className="xi" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.5 15.75L9 12.9375L4.5 15.75V3.375C4.5 3.22582 4.55926 3.08274 4.66475 2.97725C4.77024 2.87176 4.91332 2.8125 5.0625 2.8125H12.9375C13.0867 2.8125 13.2298 2.87176 13.3352 2.97725C13.4407 3.08274 13.5 3.22582 13.5 3.375V15.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
          </span>
          <span>
            <svg aria-hidden="true" className="xi" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 10.125V2.25M11.8125 5.0625L9 2.25L6.1875 5.0625M15.1875 10.125V14.625H2.8125V10.125"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
               />
            </svg>
          </span>
        </div>
        <p className={`pv-counter ${txt(v.pv?.countCls)}`}>{txt(v.pv?.count)} / 280</p>
      </div>
    </div>
  );
}
