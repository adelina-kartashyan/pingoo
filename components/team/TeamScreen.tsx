'use client';

import { useVM, txt, when } from '@/lib/vm';
import { IconCaretDown, IconCheck } from '@/components/icons';

// Team: members, roles and invites.
export default function TeamScreen() {
  const v = useVM();
  return (
    <section className="screen">
      <div className="head-row">
        <div className="page-head stagger">
          <p className="eyebrow">Team</p>
          <h1 className="h1" tabIndex={-1}>
            Everyone knows{' '}
            <em>what's theirs.</em>
          </h1>
          <h2 className="sr">Members and invites</h2>
          <p className="lede">Invite your team and give every post an owner, so nothing gets stuck in drafts.</p>
        </div>
      </div>
      <div className="team-grid">
        <div className="card">
          <div className="tabs" role="tablist">
            <button className={`tab-btn ${txt(v.teamTabCls?.members)}`} role="tab" aria-selected={v.teamTabOn?.members} onClick={v.teamTabMembers}>
              Members ({txt(v.memberCount)})
            </button>
            {' '}
            <button className={`tab-btn ${txt(v.teamTabCls?.invites)}`} role="tab" aria-selected={v.teamTabOn?.invites} onClick={v.teamTabInvites}>
              Pending invites ({txt(v.inviteCount)})
            </button>
          </div>
          {' '}
          {when(v.teamTabOn?.members) && (
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>This week</th>
                    <th>Last active</th>
                  </tr>
                </thead>
                <tbody>
                  {(v.members || []).map((mb: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <span className="cell-flex">
                          <span className="av" style={{ background: txt(mb?.c) } as any}>{txt(mb?.i)}</span>
                          <span>
                            <span style={{ display: 'block', fontWeight: '600' } as any}>{txt(mb?.n)}</span>
                            <span className="muted" style={{ fontSize: '13px' } as any}>{txt(mb?.e)}</span>
                          </span>
                        </span>
                      </td>
                      <td><span className="role">{txt(mb?.r)}</span></td>
                      <td>
                        <span className={txt(mb?.dot)} />
                        {txt(mb?.st)}
                      </td>
                      <td>{txt(mb?.posts)}</td>
                      <td className="muted">{txt(mb?.last)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {' '}
          {when(v.teamTabOn?.invites) && (
            <>
              {(v.invites || []).map((iv: any, index: number) => (
                <div key={index} className="rec screen">
                  <span className="av" style={{ background: '#D3CDF0', color: '#0D0A26' } as any}>{txt(iv?.i)}</span>
                  <span className="t">
                    {txt(iv?.e)}
                    <span className="muted" style={{ display: 'block', fontSize: '13px', fontWeight: '400' } as any}>{txt(iv?.r)} · {txt(iv?.sent)}</span>
                  </span>
                  <button className="link-btn" onClick={iv?.resend}>Resend</button>
                  <button className="link-btn" style={{ color: '#CF3216' } as any} onClick={iv?.cancel}>Cancel</button>
                </div>
              ))}
              {' '}
              {when(v.noInvites) && (
                <p className="muted">No pending invites.</p>
              )}
            </>
          )}
        </div>
        <aside className="side-col">
          <div className="card">
            <div className="card-h"><h3>Invite someone</h3></div>
            <form className="form" onSubmit={v.sendInvite}>
              <label className="field">
                <span>Email</span>
                <input className="input" type="email" placeholder="name@company.com" value={txt(v.inviteEmail)} onChange={v.onInviteEmail} />
              </label>
              {' '}
              <div className="field">
                <span>Role</span>
                <div className={`dd ${txt(v.ddRole?.cls)}`}>
                  <button
                    type="button"
                    className="input dd-btn"
                    onClick={v.ddRole?.toggle}
                    aria-haspopup="listbox"
                    aria-expanded={v.ddRole?.open}
                    aria-label="Role"
                  >
                    <span className="dd-v">{txt(v.ddRole?.label)}</span>
                    <IconCaretDown className="ph dd-car" aria-hidden="true" />
                  </button>
                  {when(v.ddRole?.open) && (
                    <>
                      <button type="button" className="dd-scrim" onClick={v.ddRole?.close} tabIndex={-1} aria-label="Close list" />
                      <div className="dd-list" role="listbox">
                        {(v.ddRole?.opts || []).map((o: any, index: number) => (
                          <button key={index} type="button" className={`dd-opt ${txt(o?.cls)}`} role="option" aria-selected={o?.sel} onClick={o?.pick}>
                            <span>{txt(o?.l)}</span>
                            <IconCheck className="ph dd-tick" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {' '}
              {when(v.inviteErr) && (
                <p className="err">Enter a valid email address.</p>
              )}
              {' '}
              <button className="btn btn-primary btn-block" type="submit">Send invite</button>
            </form>
          </div>
          <div className="card">
            <div className="card-h"><h3>Who can do what</h3></div>
            <div className="role-row">
              <b>Owner</b>
              <span>Everything, including billing.</span>
            </div>
            <div className="role-row">
              <b>Admin</b>
              <span>Manages people, campaigns and connections.</span>
            </div>
            <div className="role-row">
              <b>Editor</b>
              <span>Creates, approves and schedules posts.</span>
            </div>
            <div className="role-row">
              <b>Viewer</b>
              <span>Sees plans and results. Can't publish.</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
