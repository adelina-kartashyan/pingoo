// @ts-nocheck — ported prototype logic; add types screen by screen.
/* eslint-disable @typescript-eslint/no-explicit-any */
// View values for: team.
export function viewTeam(this: any, c: any): any {
  const { allPosts, accepted, d, m, s } = c;
  const postsBy = [0, 0, 0, 0];
  allPosts.forEach((p) => { if (!p.isPlan || accepted) postsBy[p.ownerIdx] += 1; });
  const members = d.TEAM.map((m, i) => Object.assign({}, m, { dot: m.on ? 'on-dot' : 'off-dot', st: m.on ? 'Online' : 'Offline', posts: postsBy[i] === 1 ? '1 post' : postsBy[i] + ' posts' }));
  const invites = s.invites.map((iv, k) => ({ e: iv.e, r: iv.r, sent: iv.sent, i: iv.e.slice(0, 2).toUpperCase(),
    resend: () => this.showToast('Invite sent again to ' + iv.e),
    cancel: () => { this.setState({ invites: this.state.invites.filter((_, j) => j !== k) }); this.showToast('Invite cancelled'); } }));
  return { postsBy, members, invites };
}
