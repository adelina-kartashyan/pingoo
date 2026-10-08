'use client';

import { IconGlyph, IconGlyph2 } from '@/components/icons';

export default function TikTokRail() {
  return (
    <div className="tt-rail" aria-hidden="true">
      <span className="tt-av">
        <img src="/brand/pingoo-mark.svg" alt="" />
        <i>+</i>
      </span>
      {' '}
      <span className="tt-b">
        <IconGlyph className="tt-ic" aria-hidden="true" />
        <small>6,039</small>
      </span>
      {' '}
      <span className="tt-b">
        <IconGlyph2 className="tt-ic" aria-hidden="true" />
        <small>36</small>
      </span>
      {' '}
      <span className="tt-b">
        <svg className="tt-ic" aria-hidden="true" viewBox="0 0 32 37" fill="none">
          <path d="M29.7139 0C30.9709 0 31.9999 1.00896 32 2.24219V37L16 28.0303L0 37V2.24219C0.000131619 1.00896 1.02907 0 2.28613 0H29.7139Z" fill="currentColor" />
          <path d="M29.7139 0C30.9709 0 31.9999 1.00896 32 2.24219V37L16 28.0303L0 37V2.24219C0.000131619 1.00896 1.02907 0 2.28613 0H29.7139Z" stroke="currentColor" />
        </svg>
        <small>504</small>
      </span>
      {' '}
      <span className="tt-b">
        <svg className="tt-ic" aria-hidden="true" viewBox="0 0 39 34" fill="none">
          <path d="M39 16.4141L22.2861 32.8271V23.4482C13.0376 23.4482 5.90571 26.3793 0 34C2.34 18.8759 9.13756 10.6686 22.2861 9.37891V0L39 16.4141Z" fill="currentColor" />
          <path d="M39 16.4141L22.2861 32.8271V23.4482C13.0376 23.4482 5.90571 26.3793 0 34C2.34 18.8759 9.13756 10.6686 22.2861 9.37891V0L39 16.4141Z" stroke="currentColor" />
        </svg>
        <small>1,160</small>
      </span>
      {' '}
      <span className="tt-disc"><img src="/brand/pingoo-mark.svg" alt="" /></span>
    </div>
  );
}
