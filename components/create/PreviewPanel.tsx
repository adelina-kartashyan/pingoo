'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAiSearch, IconLayers, IconMoreSmall, IconShareNodes, IconThreadsComment } from '@/components/icons';
import PreviewBluesky from './PreviewBluesky';
import PreviewChannelTabs from './PreviewChannelTabs';
import PreviewFacebook from './PreviewFacebook';
import PreviewInstagram from './PreviewInstagram';
import PreviewLinkedIn from './PreviewLinkedIn';
import PreviewThreads from './PreviewThreads';
import PreviewX from './PreviewX';
import ReadyCheck from './ReadyCheck';
import VerticalVideoPreview from './VerticalVideoPreview';

export default function PreviewPanel() {
  const v = useVM();
  return (
    <div className="pv-col card">
      <div className="pv-h">
        <div>
          <h2>Preview</h2>
          <span className="muted pv-sub">{txt(v.pv?.sub)}</span>
        </div>
      </div>
      <PreviewChannelTabs />
      <div className={`pv-stage ${txt(v.pv?.hiCls)}`} style={{ '--pv-key': txt(v.pv?.key) } as any}>
        {/* Vertical video: Reels, TikTok, Shorts — each with its own chrome */}
        {' '}
        {when(v.pv?.isVert) && (
          <>
            <VerticalVideoPreview />
            {' '}
            <button
              className={`pv-layers ${txt(v.pv?.layersCls)}`}
              onClick={v.toggleOverlay}
              aria-pressed={v.overlay}
              title="Show what the app covers"
              aria-label="Show what the app covers"
            >
              <IconLayers className="i" aria-hidden="true" />
            </button>
          </>
        )}
        {' '}
        {/* Instagram feed / carousel */}
        {' '}
        {when(v.pv?.isIg) && (
          <PreviewInstagram />
        )}
        {' '}
        {/* LinkedIn (real layout) */}
        {' '}
        {when(v.pv?.isLinkedIn) && (
          <PreviewLinkedIn />
        )}
        {' '}
        {/* Facebook (real layout) */}
        {' '}
        {when(v.pv?.isFb) && (
          <PreviewFacebook />
        )}
        {' '}
        {/* Bluesky (real layout) */}
        {' '}
        {when(v.pv?.isBs) && (
          <PreviewBluesky />
        )}
        {' '}
        {/* Pinterest (real layout) */}
        {' '}
        {when(v.pv?.isPi) && (
          <div className="pv-card pv-pi">
            <div className="pi-pin">
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
              <svg aria-hidden="true" className="pi-back" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="45.7" height="45.5" rx="16" fill="#EDEDED" />
                <path d="M26.8516 12.75L16.8516 22.75L26.8516 32.75" stroke="#080808" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              <IconAiSearch aria-hidden="true" className="pi-vs" />
            </div>
            <div className="pi-acts" aria-hidden="true">
              <span>
                <svg aria-hidden="true" className="pi-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.92251 12.4459C1.84951 9.09595 3.10451 4.93095 6.62151 3.79895C8.47151 3.20195 10.7545 3.69995 12.0515 5.48895C13.2745 3.63395 15.6235 3.20595 17.4715 3.79895C20.9875 4.93095 22.2495 9.09595 21.1775 12.4459C19.5075 17.7559 13.6805 20.5219 12.0515 20.5219C10.4235 20.5219 4.64851 17.8179 2.92251 12.4459Z"
                    stroke="#080808"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                   />
                </svg>
                5
              </span>
              <span><IconThreadsComment aria-hidden="true" className="pi-ic" /></span>
              <span><IconShareNodes aria-hidden="true" className="pi-ic pi-sh" /></span>
              <span><IconMoreSmall aria-hidden="true" className="pi-ic pi-mo" /></span>
              <span className="pi-save">Save</span>
            </div>
            <div className="pi-by">
              <img className="pi-av" src="/brand/pingoo-mark.svg" alt="" />
              <span>Pingoo</span>
            </div>
            <p className="pi-title">{txt(v.pv?.linkTitle)}</p>
            <p className="pv-text pi-cap">
              {txt(v.pv?.capShort)}
              {when(v.pv?.cut) && (
                <button className="more" onClick={v.toggleMore}>{txt(v.pv?.moreLabel)}</button>
              )}
            </p>
            <div className="pi-visit" aria-hidden="true">Visit site</div>
            <p className="pi-more-h" aria-hidden="true">More to explore</p>
            <div className="pi-grid" aria-hidden="true">
              <i />
              <i />
            </div>
          </div>
        )}
        {' '}
        {/* Threads (real layout) */}
        {' '}
        {when(v.pv?.isTh) && (
          <PreviewThreads />
        )}
        {' '}
        {/* Generic card (fallback for any other channel) */}
        {' '}
        {when(v.pv?.isLiCard) && (
          <div className="pv-card">
            <div className="pv-head">
              <img className="pv-av pv-sq" src="/brand/pingoo-mark.svg" alt="" />
              <span>
                <b style={{ display: 'block' } as any}>Pingoo</b>
                <small className="muted">{txt(v.pv?.liSub)}</small>
              </span>
              <span className="pv-more" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
            <p className="pv-text">
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
            <p className="li-react" aria-hidden="true">
              <span className="li-dots">
                <i />
                <i />
              </span>
              {txt(v.pv?.liReact)}
            </p>
            <div className="pv-foot" aria-hidden="true">
              {(v.pv?.liActs || []).map((la: any, index: number) => (
                <span key={index}>{txt(la)}</span>
              ))}
            </div>
          </div>
        )}
        {' '}
        {/* X */}
        {' '}
        {when(v.pv?.isX) && (
          <PreviewX />
        )}
        {' '}
        {/* Not possible on this channel */}
        {' '}
        {when(v.pv?.isNa) && (
          <div className="pv-card pv-na">
            <b>{txt(v.pv?.naTitle)}</b>
            <p className="muted">{txt(v.pv?.naText)}</p>
          </div>
        )}
      </div>
      <ReadyCheck />
    </div>
  );
}
