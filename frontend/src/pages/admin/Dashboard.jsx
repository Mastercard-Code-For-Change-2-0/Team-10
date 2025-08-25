import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <main className="section"><div className="container" style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Admin Console</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {[{to:'/admin/moderation',title:'Moderation Queue',desc:'Review flags for text/images'},
          {to:'/admin/matching',title:'Matching Suggestions',desc:'Approve or reject matches'},
          {to:'/admin/verification',title:'Verification Queue',desc:'Verify receiver organizations'},
          {to:'/admin/reports',title:'Reports & Export',desc:'Excel/PDF/email reports'}]
          .map(c => (
            <Link to={c.to} key={c.to} className="card" style={{ padding: 16, display: 'grid', gap: 6 }}>
              <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>{c.title}</div>
              <div className="muted">{c.desc}</div>
            </Link>
        ))}
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Live Metrics</div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[['Donations','124'],['Requests','96'],['Matches','44'],['Pending Verifications','12']].map(([k,v]) => (
            <div key={k} className="card" style={{ padding: 12 }}>
              <div className="muted" style={{ fontSize: 12 }}>{k}</div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div></main>
  )
}
