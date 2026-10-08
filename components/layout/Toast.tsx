'use client';

import { useVM, txt, when } from '@/lib/vm';

// Small confirmation message at the bottom of the screen.
export default function Toast() {
  const v = useVM();
  return (
    <div className={`toast ${txt(v.toastCls)}`} role="status" aria-live="polite">
      <span className="pip" />
      {txt(v.toast)}
      {when(v.toastHasUndo) && (
        <button className="toast-undo" onClick={v.toastUndo}>Undo</button>
      )}
    </div>
  );
}
