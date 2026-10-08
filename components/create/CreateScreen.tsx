'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconAdd, IconCancel, IconPencilEdit } from '@/components/icons';
import Editor from './Editor';
import PreviewPanel from './PreviewPanel';

// Create: this week’s drafts, preview and editor.
export default function CreateScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Create · {txt(v.bet?.title)}</p>
          <h1 className="h1" tabIndex={-1}>
            Three drafts,{' '}
            <em>ready for you.</em>
          </h1>
          <p className="lede">Pingoo wrote these for this week's plan. Check how each post will look, add your media and approve the ones you'd post.</p>
        </div>
      </div>
      {' '}
      {when(v.needAccept) && (
        <div className="banner banner-soft">
          <p>These drafts come from the plan Pingoo suggested. Approving one accepts the plan, so you don’t need to go back to Home.</p>
        </div>
      )}
      {' '}
      {when(v.showCreateHint) && (
        <div className="flow-hint" role="note">
          <span className="fh-step">
            <i>1</i>
            Pick a post
          </span>
          <span className="fh-arrow" aria-hidden="true">→</span>
          {' '}
          <span className="fh-step">
            <i>2</i>
            Check the preview
          </span>
          <span className="fh-arrow" aria-hidden="true">→</span>
          {' '}
          <span className="fh-step">
            <i>3</i>
            Approve
          </span>
          {' '}
          <button className="icon-btn fh-x" onClick={v.hideCreateHint} aria-label="Got it, hide this hint"><IconCancel className="i i-s" aria-hidden="true" /></button>
        </div>
      )}
      {' '}
      <div className={`create-grid cv-${txt(v.crView)}`}>
        <div className="cr-view" role="tablist" aria-label="Edit or preview">
          <button className={`cr-view-b ${txt(v.crEditCls)}`} role="tab" aria-selected={v.crIsEdit} onClick={v.crToEdit}>
            <IconPencilEdit className="i i-s" aria-hidden="true" />
            Edit
          </button>
          {' '}
          <button className={`cr-view-b ${txt(v.crPrevCls)}`} role="tab" aria-selected={v.crIsPrev} onClick={v.crToPrev}>
            <svg className="i i-s" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                stroke="currentColor"
                strokeWidth="1.5"
               />
              <path
                d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
               />
            </svg>
            Preview
          </button>
        </div>
        {' '}
        {/* Drafts */}
        {' '}
        <div className="drafts-col card">
          <div className="pv-h">
            <div>
              <h2>This week's plan</h2>
              <span className={`muted pv-sub dr-sub ${txt(v.draftsDone)}`}>
                {txt(v.draftsSub)}
                <span className="kb-hint">{txt(v.kbHint)}</span>
              </span>
            </div>
            <span className="dr-dots" aria-hidden="true">
              {(v.drafts || []).map((dd: any, index: number) => (
                <i key={index} className={txt(dd?.dotCls)} />
              ))}
            </span>
          </div>
          <div className="drafts" role="list">
            {(v.drafts || []).map((d: any, index: number) => (
              <button key={index} className={`draft ${txt(d?.cls)} ${txt(d?.skipCls)}`} onClick={d?.pick} role="listitem" aria-pressed={d?.sel}>
                <span className="thumb" style={{ background: txt(d?.c) } as any}>
                  <span className="mono">{txt(d?.n)}</span>
                  <b>{txt(d?.len)}</b>
                </span>
                {' '}
                <span>
                  <span className="draft-t">{txt(d?.t)}</span>
                  {' '}
                  <span className="draft-s">{txt(d?.plat)} · {txt(d?.fmt)}</span>
                  {' '}
                  <span className={`tag ${txt(d?.tagCls)}`}>{txt(d?.tag)}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="others">
            <p className="dc-sec">Other posts</p>
            {' '}
            {(v.otherDrafts || []).map((od: any, index: number) => (
              <button key={index} className={`draft draft-other ${txt(od?.cls)}`} onClick={od?.pick} aria-pressed={od?.sel}>
                <span className="thumb thumb-other"><span className="mono">+</span></span>
                {' '}
                <span>
                  <span className="draft-t">{txt(od?.t)}</span>
                  {' '}
                  <span className="draft-s">{txt(od?.plat)} · {txt(od?.fmt)}</span>
                  {' '}
                  <span className={`tag ${txt(od?.tagCls)}`}>{txt(od?.tag)}</span>
                </span>
              </button>
            ))}
            {' '}
            <button className="add-other" onClick={v.addOther}>
              <IconAdd className="i i-s" aria-hidden="true" />
              Other post
            </button>
            {' '}
            <p className="muted" style={{ fontSize: '13px', marginTop: '6px' } as any}>For anything outside the plan. It won't count toward the plan's result.</p>
          </div>
        </div>
        {' '}
        {/* Preview */}
        {' '}
        <PreviewPanel />
        {' '}
        {/* Editor */}
        {' '}
        <Editor />
      </div>
    </section>
  );
}
