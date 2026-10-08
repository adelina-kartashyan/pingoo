// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Media library: uploads, AI images, renaming and removing files.
export const libraryMethods: Record<string, any> = {
  mediaLib(this: any) {
    return [
      { name: 'morning-habits_final.mp4', kind: 'video', ratio: '9:16', len: '0:28', secs: 28, tone: '#2A2459' },
      { name: 'desk-broll_wide.mp4', kind: 'video', ratio: '16:9', len: '0:41', secs: 41, tone: '#1F3A4D' },
      { name: 'office-hours_clip.mp4', kind: 'video', ratio: '9:16', len: '2:45', secs: 165, tone: '#4A2F3F' },
      { name: 'tools-screen-recording.mov', kind: 'video', ratio: '16:9', len: '1:12', secs: 72, tone: '#2F4A3A' },
      { name: 'planner-template.png', kind: 'image', ratio: '4:5', len: '', secs: 0, tone: '#4D4226' },
      { name: 'team-photo.jpg', kind: 'image', ratio: '1:1', len: '', secs: 0, tone: '#3B3355' }
    ];
  },

  ratioFrom(this: any, w, h) { const r = (w || 9) / (h || 16); return r < 0.7 ? '9:16' : r < 0.9 ? '4:5' : r < 1.2 ? '1:1' : '16:9'; },

  async _initLib() {
    try {
      const c = window.claude; if (!c || !c.use) return;
      const [db, assets] = await Promise.all([c.use('db'), c.use('assets')]);
      this._db = db; this._assets = assets;
      if (!db) return;
      const snap = await db.collection('library').orderBy('at', 'desc').limit(60).get();
      const items = snap.docs.map((d) => { const v = d.data() || {}; return { lid: d.id, name: String(v.name || 'Untitled'), kind: v.kind === 'video' ? 'video' : 'image', ratio: String(v.ratio || '1:1'), len: String(v.len || ''), secs: Number(v.secs) || 0, tone: '#2A2459', url: v.asset ? '/_blob/' + v.asset : '', asset: v.asset || '', src: String(v.src || 'upload'), at: Number(v.at) || 0 }; });
      const local = this.state.libExtra.filter((x) => !items.some((y) => y.lid === x.lid));
      this.setState({ libExtra: local.concat(items), libSaved: !!assets });
    } catch (e) { /* storage not available here: library stays for this session */ }
  },

  _libSave(this: any, item, file) {
    const db = this._db, assets = this._assets; if (!db) return;
    (async () => {
      try {
        let asset = item.asset || '';
        if (file && assets) { const up = await assets.upload(file); asset = up.id; this.setState({ libExtra: this.state.libExtra.map((x) => x.lid === item.lid ? Object.assign({}, x, { asset: asset, url: up.url }) : x) }); }
        await db.collection('library').doc(item.lid).set({ name: item.name, kind: item.kind, ratio: item.ratio, len: item.len, secs: item.secs, asset: asset, src: item.src, at: item.at });
      } catch (e) { this.showToast('Couldn’t save ' + item.name + ' to the library. It’s still here for this session.'); }
    })();
  },

  addLibFiles(this: any, files, attachKey) {
    Array.from(files || []).forEach((f, k) => {
      const kindF = f.type.indexOf('video') === 0 ? 'video' : 'image', url = URL.createObjectURL(f);
      const done = (w, h, dur) => {
        const secs = Math.round(dur || 0);
        const item = { lid: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), name: f.name, kind: kindF, ratio: this.ratioFrom(w, h), len: secs ? Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0') : '', secs: secs, tone: '#2A2459', url: url, asset: '', src: 'upload', at: Date.now() + k, isNew: true };
        const patch = { libExtra: [item].concat(this.state.libExtra), uploading: false };
        if (attachKey && k === 0) { const mm = Object.assign({}, this.state.media); mm[attachKey] = item; patch.media = mm; }
        this.setState(patch);
        this._libSave(item, f);
      };
      if (kindF === 'video') { const v = document.createElement('video'); v.preload = 'metadata'; v.onloadedmetadata = () => done(v.videoWidth, v.videoHeight, v.duration); v.onerror = () => done(9, 16, 0); v.src = url; }
      else { const im = new Image(); im.onload = () => done(im.naturalWidth, im.naturalHeight, 0); im.onerror = () => done(4, 5, 0); im.src = url; }
    });
    const n = (files || []).length; if (n) this.showToast(n === 1 ? 'Added to your library.' : n + ' files added to your library.');
  },

  addLibAI(this: any, it) {
    if (this.state.libExtra.some((x) => x.name === it.name)) return;
    const item = Object.assign({}, it, { lid: 'a' + Date.now().toString(36), src: 'ai', at: Date.now(), isNew: true, asset: '', url: it.url || '' });
    this.setState({ libExtra: [item].concat(this.state.libExtra) });
    this._libSave(item, null);
  },

  removeLib(this: any, lid) {
    const it = this.state.libExtra.find((x) => x.lid === lid); if (!it) return;
    const mm = Object.assign({}, this.state.media); Object.keys(mm).forEach((k) => { if (mm[k] && mm[k].lid === lid) mm[k] = null; });
    this.setState({ libExtra: this.state.libExtra.filter((x) => x.lid !== lid), media: mm, libEdit: null });
    this.showToast(it.name + ' deleted from your library.');
    const db = this._db, assets = this._assets;
    (async () => { try { if (db) await db.collection('library').doc(lid).delete(); if (assets && it.asset) await assets.delete(it.asset); } catch (e) {} })();
  },

  renameLib(this: any, lid, name) {
    const nm = String(name || '').trim(); if (!nm) { this.setState({ libEdit: null }); return; }
    const it = this.state.libExtra.find((x) => x.lid === lid); if (!it) return;
    const nu = Object.assign({}, it, { name: nm });
    this.setState({ libExtra: this.state.libExtra.map((x) => x.lid === lid ? nu : x), libEdit: null });
    this._libSave(nu, null);
  },

  removeCh(this: any, n, C) {
    const ex = (this.state.extraChans || []).filter((x) => x !== n);
    const BUILT = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'];
    const hid = BUILT.indexOf(n) > -1 ? (this.state.hiddenChans || []).concat([n]) : (this.state.hiddenChans || []);
    const pc = Object.assign({}, this.state.prevCh);
    Object.keys(pc).forEach((k) => { if (pc[k] === n) delete pc[k]; });
    this.setState({ extraChans: ex, hiddenChans: hid, prevCh: pc, ckOpen: null, pvHi: null });
    this.showToast(n + ' removed from the preview.');
  },
};
