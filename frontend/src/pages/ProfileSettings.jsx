export default function ProfileSettings() {
  return (
    <main className="section"><div className="container" style={{ maxWidth: 820 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Profile & Settings</h1>
      <div className="grid grid-2" style={{ marginTop: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <strong>Profile</strong>
          <label style={{ marginTop: 8 }}>Name</label>
          <input placeholder="Your name" />
          <label style={{ marginTop: 8 }}>Phone</label>
          <input placeholder="+91…" />
          <label style={{ marginTop: 8 }}>Language</label>
          <select>
            <option>EN</option><option>HI</option><option>MR</option>
          </select>
        </div>
        <div className="card" style={{ padding: 12 }}>
          <strong>Organization</strong>
          <label style={{ marginTop: 8 }}>Org name</label>
          <input placeholder="If receiver" />
          <label style={{ marginTop: 8 }}>Registration No.</label>
          <input placeholder="80G/CSR etc." />
          <label style={{ marginTop: 8 }}>Documents</label>
          <input type="file" multiple />
        </div>
        <div className="card" style={{ padding: 12 }}>
          <strong>Notifications</strong>
          <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
            <label><input type="checkbox" defaultChecked /> Email</label>
            <label><input type="checkbox" defaultChecked /> Push</label>
            <label><input type="checkbox" /> SMS</label>
          </div>
        </div>
        <div className="card" style={{ padding: 12 }}>
          <strong>Security</strong>
          <label style={{ marginTop: 8 }}>Change password</label>
          <input type="password" placeholder="••••••••" />
        </div>
      </div>
    </div></main>
  )
}
