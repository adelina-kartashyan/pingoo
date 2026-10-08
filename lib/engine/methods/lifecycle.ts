// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Mount / unmount / update hooks: keyboard support, drag-to-scroll, online status, focus management.
export const lifecycleMethods: Record<string, any> = {
  componentDidMount(this: any) {
    this._initLib();
    this._key = (e) => {
      // ── Keyboard navigation for dropdowns, the country picker and the top-bar menus ──
      try {
        const LIST = '.dd-list, .pop';
        const ae = document.activeElement;
        const inList = ae && ae.closest ? ae.closest(LIST) : null;
        const isTrig = ae && ae.getAttribute && (ae.hasAttribute('aria-haspopup') || ae.hasAttribute('aria-expanded'));
        const items = (box) => [...box.querySelectorAll('button, a[href], [role="option"], [role="menuitem"]')].filter((b) => b.tabIndex !== -1 && !b.disabled && b.offsetParent !== null && !b.classList.contains('dd-scrim') && !b.classList.contains('um-scrim'));
        const listFor = (t) => { const host = t.closest('.dd, .ph-field, .ask-wrap, .top-actions'); if (!host) return null; return host.querySelector(LIST); };
        const k = e.key;
        const tl = ae && ae.closest ? ae.closest('[role="tablist"]') : null;
        if (tl && (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End')) {
          const tabs = [...tl.querySelectorAll('[role="tab"]')].filter((t) => t.offsetParent !== null); let i = tabs.indexOf(ae);
          if (i > -1) { e.preventDefault(); i = k === 'ArrowRight' ? (i + 1) % tabs.length : k === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : k === 'Home' ? 0 : tabs.length - 1; tabs[i].focus(); tabs[i].click(); return; }
        }
        if (inList && (k === 'ArrowDown' || k === 'ArrowUp' || k === 'Home' || k === 'End')) {
          const its = items(inList); if (its.length) { e.preventDefault(); let i = its.indexOf(ae.closest('button, a, [role]') || ae); if (k === 'ArrowDown') i = (i + 1) % its.length; else if (k === 'ArrowUp') i = (i - 1 + its.length) % its.length; else if (k === 'Home') i = 0; else i = its.length - 1; its[i].focus(); return; }
        }
        if (inList && k.length === 1 && /[a-z]/i.test(k) && inList.matches('.dd-list') && !e.metaKey && !e.ctrlKey) {
          const its = items(inList); const cur = its.indexOf(ae); const ord = its.slice(cur + 1).concat(its.slice(0, cur + 1));
          const hit = ord.find((b) => (b.textContent || '').trim().toLowerCase().startsWith(k.toLowerCase())); if (hit) { e.preventDefault(); hit.focus(); return; }
        }
        if (isTrig && !inList && (k === 'ArrowDown' || k === 'ArrowUp')) {
          const open = ae.getAttribute('aria-expanded') === 'true'; const box = open ? listFor(ae) : null;
          e.preventDefault();
          if (box) { const its = items(box); const sel = box.querySelector('.is-sel'); (k === 'ArrowUp' ? its[its.length - 1] : (sel && its.includes(sel) ? sel : its[0])).focus(); }
          else { this._kbOpen = ae; ae.click(); }
          return;
        }
        if (isTrig && !inList && (k === 'Enter' || k === ' ') && ae.getAttribute('aria-expanded') !== 'true') { this._kbOpen = ae; }
        if (k === 'Tab' && inList && inList.matches('.dd-list')) { this.setState({ ddOpen: null }); }
        if ((k === 'Enter' || k === ' ') && inList && inList.matches('.dd-list')) { const host = inList.closest('.dd, .ph-field'); const t = host && host.querySelector('.dd-btn, .ph-cc'); if (t) setTimeout(() => { try { if (t.isConnected) t.focus(); } catch (er) {} }, 60); }
        if (k === 'Escape' && (this.state.ddOpen || this.state.pop)) {
          const trig = inList ? (inList.closest('.dd, .ph-field') ? inList.closest('.dd, .ph-field').querySelector('.dd-btn, .ph-cc') : document.querySelector('.top [aria-expanded="true"]')) : (isTrig ? ae : null);
          if (trig) setTimeout(() => { try { trig.focus(); } catch (er) {} }, 30);
        }
      } catch (er) {}
      const tg = e.target || {}; const typing = /INPUT|TEXTAREA|SELECT/.test(tg.tagName || '') || tg.isContentEditable;
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && this.state.screen === 'create' && this._kb) {
        const k = (e.key || '').toLowerCase();
        if (k === 'j') { e.preventDefault(); this._kb.move(1); return; }
        if (k === 'k') { e.preventDefault(); this._kb.move(-1); return; }
        if (k === 'a') { e.preventDefault(); this._kb.approve(); return; }
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); this.setState({ pop: this.state.pop === 'ask' ? null : 'ask' }); }
      else if (e.key === 'Escape' && this.state.proMoment) this.setState({ proMoment: false });
      else if (e.key === 'Escape' && this.state.ddOpen) this.setState({ ddOpen: null });
      else if (e.key === 'Escape' && this.state.pop) this.setState({ pop: null });
    };
    try { window.addEventListener('keydown', this._key); } catch (e) {}
    this._net = () => { try { this.setState({ offline: navigator.onLine === false }); } catch (e) {} };
    try { window.addEventListener('online', this._net); window.addEventListener('offline', this._net); } catch (e) {}
    this._drag = null;
    this._pd = (e) => { const el = e.target && e.target.closest ? e.target.closest('.drafts, .camps, .tabs, .pv-tabs, .qchips') : null; if (!el || e.pointerType === 'touch' || el.scrollWidth <= el.clientWidth + 2) return; this._drag = { el: el, x: e.clientX, sl: el.scrollLeft, moved: false }; };
    this._pm = (e) => { const d = this._drag; if (!d) return; const dx = e.clientX - d.x; if (!d.moved && Math.abs(dx) > 5) { d.moved = true; d.el.classList.add('is-dragging'); } if (d.moved) d.el.scrollLeft = d.sl - dx; };
    this._snap = (el) => { const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0; const kids = [...el.children].filter((c) => c.offsetWidth); if (!kids.length) return; const base = kids[0].offsetLeft - pad; let best = 0, bd = 1e9; kids.forEach((c) => { const t = c.offsetLeft - pad - base; const dd = Math.abs(t - el.scrollLeft); if (dd < bd) { bd = dd; best = t; } }); const max = el.scrollWidth - el.clientWidth; el.scrollTo({ left: Math.min(best, max), behavior: 'smooth' }); };
    this._pu = () => { const d = this._drag; if (!d) return; d.el.classList.remove('is-dragging'); if (d.moved) this._snap(d.el); if (d.moved) { const stop = (ev) => { ev.stopPropagation(); ev.preventDefault(); }; d.el.addEventListener('click', stop, { capture: true, once: true }); setTimeout(() => d.el.removeEventListener('click', stop, { capture: true }), 0); } this._drag = null; };
    try { document.addEventListener('pointerdown', this._pd); document.addEventListener('pointermove', this._pm); document.addEventListener('pointerup', this._pu); } catch (e) {}
  },

  componentWillUnmount(this: any) { try { window.removeEventListener('keydown', this._key); window.removeEventListener('online', this._net); window.removeEventListener('offline', this._net); document.removeEventListener('pointerdown', this._pd); document.removeEventListener('pointermove', this._pm); document.removeEventListener('pointerup', this._pu); } catch (e) {} [this._tt, this._ft, this._ht, this._pt, this._ct, this._ct2, this._hc, this._lt].forEach((t) => clearTimeout(t)); clearInterval(this._oi); [].forEach((t) => clearTimeout(t)); if (this._raf) cancelAnimationFrame(this._raf); },

  componentDidUpdate(this: any) {
    // Screen readers: on a page change, move focus to the new page's heading so the change is announced
    if (this._ls !== this.state.screen) { const first = this._ls === undefined; this._ls = this.state.screen; if (!first && !this.state.onb) setTimeout(() => { try { const h1 = document.querySelector('#main-content h1'); if (h1) h1.focus({ preventScroll: true }); } catch (er) {} }, 60); }
    if (this._pmWas && !this.state.proMoment) { setTimeout(() => { try { const b = document.querySelector('.set-pro-acts .btn, .um-ws, .pro.pro-on'); if (b) b.focus({ preventScroll: true }); } catch (er) {} }, 60); }
    this._pmWas = !!this.state.proMoment;
    if (this._pmFocus) { this._pmFocus = false; setTimeout(() => { try { const b = document.querySelector('.pm-go'); if (b) b.focus(); } catch (er) {} }, 60); }
    if (this._kbOpen) { const t = this._kbOpen; this._kbOpen = null; setTimeout(() => { try { if (t.getAttribute('aria-expanded') !== 'true') return; const host = t.closest('.dd, .ph-field, .ask-wrap, .top-actions'); const box = host && host.querySelector('.dd-list, .pop'); if (!box) return; const its = [...box.querySelectorAll('button, a[href]')].filter((b) => b.tabIndex !== -1 && b.offsetParent !== null && !b.classList.contains('dd-scrim')); const sel = box.querySelector('.is-sel'); (sel && its.includes(sel) ? sel : its[0]).focus(); } catch (er) {} }, 40); }
    if (this._thread && this.state.screen === 'coach') { this._thread.scrollTop = this._thread.scrollHeight; } },
};
