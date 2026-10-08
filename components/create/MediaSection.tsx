'use client';

import { useVM, txt, when, flag } from '@/lib/vm';
import { IconAdd, IconCaretDown, IconDelete, IconImage, IconMusicNote, IconPencilEdit, IconPlay, IconTick, IconUpload } from '@/components/icons';

export default function MediaSection() {
  const v = useVM();
  return (
    <div className={`acc media-acc ${txt(v.mediaAccCls)}`}>
      <button className="acc-h" onClick={v.toggleMedia} aria-expanded={v.mediaOpen}>
        <span className="acc-t">Media</span>
        {' '}
        <span className={`acc-s ${txt(v.cur?.mediaSumCls)}`}>{txt(v.cur?.mediaSummary)}</span>
        {' '}
        <IconCaretDown className="i i-s chev ph" aria-hidden="true" />
      </button>
      {' '}
      <div className="acc-b">
        <div className="acc-in">
          <div className="acc-pad">
            <div className="seg" role="group" aria-label="Media source" style={{ marginBottom: '14px' } as any}>
              {(v.mediaTabs || []).map((mt: any, index: number) => (
                <button key={index} className={`seg-btn ${txt(mt?.cls)}`} aria-pressed={mt?.on} onClick={mt?.pick}>{txt(mt?.label)}</button>
              ))}
            </div>
            {' '}
            {when(v.mediaTabOn?.library) && (
              <div className="lib">
                <label className="lib-add">
                  <input className="file-in" type="file" accept="image/*,video/*" multiple onChange={v.onLibAdd} />
                  {' '}
                  <span className="lib-frame lib-add-frame">
                    <IconAdd className="lib-plus" aria-hidden="true" />
                    <span>Add</span>
                  </span>
                  {' '}
                  <span className="lib-n">Add files</span>
                  {' '}
                  <span className="lib-m">Images or videos</span>
                </label>
                {' '}
                {(v.library || []).map((lb: any, index: number) => (
                  <div key={index} className="lib-cell">
                    <button className={`lib-item ${txt(lb?.cls)}`} onClick={lb?.pick} aria-pressed={lb?.on}>
                      <span className="lib-frame">
                        {when(lb?.thumbImg) && (
                          <img className="lib-real" src={txt(lb?.url)} alt="" />
                        )}
                        {' '}
                        {when(lb?.thumbVid) && (
                          <video className="lib-real" src={txt(lb?.url)} muted playsInline preload="metadata" />
                        )}
                        {' '}
                        {when(lb?.audioThumb) && (
                          <span className="lib-audio"><IconMusicNote className="lib-note" aria-hidden="true" /></span>
                        )}
                        {when(lb?.shapeThumb) && (
                          <span className={`lib-shape s-${txt(lb?.ratioCls)}`}>
                            {when(lb?.isVid) && (
                              <IconPlay className="lib-ic" aria-hidden="true" />
                            )}
                            {when(lb?.notVid) && (
                              <IconImage className="lib-ic img" aria-hidden="true" />
                            )}
                          </span>
                        )}
                        {' '}
                        {when(lb?.isNewTag) && (
                          <span className="lib-new">New</span>
                        )}
                        {' '}
                        {when(lb?.isAiTag) && (
                          <span className="lib-ai">AI</span>
                        )}
                        {when(lb?.hasLen) && (
                          <span className="lib-len">{txt(lb?.len)}</span>
                        )}
                        {' '}
                        <span className="lib-check" aria-hidden="true"><IconTick  /></span>
                      </span>
                      {' '}
                      {when(lb?.notEditing) && (
                        <span className="lib-n">{txt(lb?.name)}</span>
                      )}
                      {' '}
                      <span className="lib-m">{txt(lb?.meta)}</span>
                    </button>
                    {' '}
                    {when(lb?.editing) && (
                      <input
                        className="lib-rename"
                        type="text"
                        value={txt(lb?.name)}
                        aria-label="File name"
                        onBlur={lb?.saveName}
                        onKeyDown={lb?.keyName}
                        autoFocus
                       />
                    )}
                    {' '}
                    {when(lb?.mine) && (
                      <span className="lib-acts">
                        <button className="lib-act" onClick={lb?.startEdit} aria-label={`Rename ${txt(lb?.name)}`} title="Rename"><IconPencilEdit aria-hidden="true" /></button>
                        {' '}
                        <button className="lib-act lib-del" onClick={lb?.del} aria-label={`Delete ${txt(lb?.name)}`} title="Delete"><IconDelete aria-hidden="true" /></button>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {' '}
            {when(v.mediaTabOn?.upload) && (
              <label className="drop">
                <input className="file-in" type="file" accept="image/*,video/*" onChange={v.onUpload} />
                {' '}
                <IconUpload className="i" aria-hidden="true" />
                {' '}
                <b>{txt(v.uploadTitle)}</b>
                {' '}
                <span className="muted" style={{ fontSize: '13px' } as any}>Video or image from your computer. Pingoo checks the size and ratio for you.</span>
              </label>
            )}
            {' '}
            {when(v.mediaTabOn?.ai) && (
              <div className="ai">
                <div className="ai-kinds" role="group" aria-label="What to generate">
                  {(v.aiKinds || []).map((ak: any, index: number) => (
                    <button key={index} className={`ai-kind ${txt(ak?.cls)}`} aria-pressed={ak?.on} onClick={ak?.pick}>{txt(ak?.label)}</button>
                  ))}
                </div>
                <p className="muted ai-note">{txt(v.aiNote)}</p>
                <div className="ai-row">
                  <label className="sr" htmlFor="ai-prompt">{txt(v.aiPh)}</label>
                  {' '}
                  <input id="ai-prompt" className="input" type="text" value={txt(v.aiPrompt)} onChange={v.onAiPrompt} placeholder={txt(v.aiPh)} />
                  {' '}
                  <button className="btn btn-primary btn-sm" onClick={v.aiGenerate} disabled={flag(v.aiLoading)}>
                    {when(v.aiLoading) && (
                      <span className="spinner" />
                    )}
                    {txt(v.aiBtn)}
                  </button>
                </div>
                <div className="lib">
                  {(v.aiResults || []).map((ar: any, index: number) => (
                    <button key={index} className={`lib-item ${txt(ar?.cls)}`} onClick={ar?.pick} aria-pressed={ar?.on}>
                      <span className="lib-frame">
                        {when(ar?.isAudio) && (
                          <span className="lib-audio"><IconMusicNote className="lib-note" aria-hidden="true" /></span>
                        )}
                        {' '}
                        {when(ar?.notAudio) && (
                          <span className={`lib-shape s-${txt(ar?.ratioCls)}`}>
                            {when(ar?.isVid) && (
                              <IconPlay className="lib-ic" aria-hidden="true" />
                            )}
                            {when(ar?.isImg) && (
                              <IconImage className="lib-ic img" aria-hidden="true" />
                            )}
                          </span>
                        )}
                        {' '}
                        <span className="lib-ai">AI</span>
                        {' '}
                        {when(ar?.hasLen) && (
                          <span className="lib-len">{txt(ar?.len)}</span>
                        )}
                        {' '}
                        <span className="lib-check" aria-hidden="true"><IconTick  /></span>
                      </span>
                      {' '}
                      <span className="lib-n">{txt(ar?.name)}</span>
                      {' '}
                      <span className="lib-m">{txt(ar?.meta)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {' '}
            {when(v.cur?.hasMedia) && (
              <button className="link-btn" style={{ color: '#CF3216', paddingLeft: '0', marginTop: '10px' } as any} onClick={v.removeMedia}>Remove media</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
