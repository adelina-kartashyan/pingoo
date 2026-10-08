'use client';

import { useVM, txt } from '@/lib/vm';
import { IconCancel, IconCaretDown, IconSparkles, IconTick } from '@/components/icons';

export default function AiVisibilityCard() {
  const v = useVM();
  return (
    <div className={`card ai-seen fold ${txt(v.aiFold?.cls)}`} style={{ marginBottom: '16px' } as any}>
      <div className="card-h fold-h" onClick={v.aiFold?.toggle}>
        <h3><button type="button" className="fold-btn" aria-expanded={v.aiFold?.open}>How AI sees your brand</button></h3>
        <span className="new-tag">New</span>
        <span className="muted ai-when">Checked every Monday · 10 questions</span>
        <IconCaretDown className="ph fold-car" aria-hidden="true" />
      </div>
      <div className="fold-b">
        <div className="fold-in">
          <p className="muted" style={{ fontSize: '14px', margin: '-4px 0 18px' } as any}>What AI assistants answer when people ask about tools like yours.</p>
          <div className="bento ai-bento">
            <div className="bc ab-score">
              <div className="bc-dots" aria-hidden="true" />
              {' '}
              <span className="bc-ic bc-ic-lime" aria-hidden="true"><IconSparkles  /></span>
              {' '}
              <div className="ab-big">
                <b>3</b>
                <span>/10</span>
              </div>
              <div className="bc-btm">
                <p className="bc-t">answers mention Pingoo</p>
                <p className="bc-d">Across the 10 questions we ask each assistant.</p>
                <span className="tchip tchip-up">
                  <i />
                  +1 since last month
                </span>
              </div>
            </div>
            <div className="bc ab-eng">
              <div className="bc-row">
                <p className="bc-t">By assistant</p>
                <span className="bc-small">Mentions out of 10</span>
              </div>
              <div className="pbars">
                <div className="pbar">
                  <div className="pbar-h">
                    <span className="pbar-l">ChatGPT</span>
                    <span className="pbar-v">4/10</span>
                  </div>
                  <div className="pbar-t"><span className="pbar-f" style={{ width: '40%' } as any}><i /></span></div>
                </div>
                <div className="pbar">
                  <div className="pbar-h">
                    <span className="pbar-l">Perplexity</span>
                    <span className="pbar-v">3/10</span>
                  </div>
                  <div className="pbar-t"><span className="pbar-f" style={{ width: '30%' } as any}><i /></span></div>
                </div>
                <div className="pbar">
                  <div className="pbar-h">
                    <span className="pbar-l">Google AI Overviews</span>
                    <span className="pbar-v">2/10</span>
                  </div>
                  <div className="pbar-t"><span className="pbar-f" style={{ width: '20%' } as any}><i /></span></div>
                </div>
                <div className="pbar-scale" aria-hidden="true">
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                </div>
              </div>
            </div>
            <div className="bc ab-desc">
              <div className="bc-row">
                <p className="bc-small">How they describe you</p>
                <span className="ai-acc">
                  <IconTick className="i i-s" aria-hidden="true" />
                  Accurate
                </span>
              </div>
              {' '}
              <q className="ab-q">A planning tool that suggests one thing to post each week, based on your own results.</q>
            </div>
            <div className="bc ab-qs">
              <p className="bc-t">Questions we check</p>
              <div className="ab-list">
                <div className="ai-q is-yes">
                  <span className="ai-ic"><IconTick className="i i-s" aria-hidden="true" /></span>
                  <span>“What tool tells me what to post?”</span>
                </div>
                <div className="ai-q is-yes">
                  <span className="ai-ic"><IconTick className="i i-s" aria-hidden="true" /></span>
                  <span>“AI marketing assistant for founders”</span>
                </div>
                <div className="ai-q is-no">
                  <span className="ai-ic"><IconCancel className="i i-s" aria-hidden="true" /></span>
                  <span>“Best social media planner for small teams”</span>
                </div>
                <div className="ai-q is-no">
                  <span className="ai-ic"><IconCancel className="i i-s" aria-hidden="true" /></span>
                  <span>“How do I plan a week of content?”</span>
                </div>
              </div>
              {' '}
              <button className="ask-link" onClick={v.askAI}>
                <img src="/brand/pingoo-mark.svg" alt="" aria-hidden="true" />
                <span className="al-long">How do I show up in more answers?</span>
                <span className="al-short">Show up in more answers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
