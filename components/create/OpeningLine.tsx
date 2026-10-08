'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown, IconShuffle } from '@/components/icons';

export default function OpeningLine() {
  const v = useVM();
  return (
    <div className={`acc ${txt(v.hookAccCls)}`}>
      <button className="acc-h" onClick={v.toggleHookAcc} aria-expanded={v.hookOpen}>
        <span className="acc-t">Opening line</span>
        {' '}
        <span className="acc-s">“{txt(v.cur?.hook)}”</span>
        {' '}
        <IconCaretDown className="i i-s chev ph" aria-hidden="true" />
      </button>
      {' '}
      <div className="acc-b">
        <div className="acc-in">
          <div className="acc-pad">
            <p className="label">{txt(v.cur?.hookLabel)} · option {txt(v.hookNum)} of 3</p>
            {' '}
            {when(v.hookLoad) && (
              <div className="skel-hook" role="status" aria-label="Pingoo is writing a new opening line">
                <span className="skel skel-l1" />
                <span className="skel skel-l2" />
                <span className="skel-note">
                  <i className="dots">
                    <i />
                    <i />
                    <i />
                  </i>
                  Pingoo is writing a new line…
                </span>
              </div>
            )}
            {' '}
            {when(v.hookReady) && (
              <>
                <p className={`hook ${txt(v.hookCls)}`}>“{txt(v.cur?.hook)}”</p>
                <p className="hook-src">{txt(v.cur?.hookSrc)}</p>
              </>
            )}
            {' '}
            <button className={`btn btn-ghost btn-block btn-sm ${txt(v.hookBtnCls)}`} onClick={v.nextHook} aria-busy={v.hookLoad}>
              <IconShuffle className="i i-s" aria-hidden="true" />
              Try another one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
