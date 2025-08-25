export default function ReportsExport() {
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Reports & Export</h1>
      <div className="card" style={{ padding: 12, display: 'grid', gap: 10 }}>
        <div className="grid grid-2">
          <div>
            <label>Report type</label>
            <select>
              {['Donations','Requests','Matches','Transactions'].map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label>Date range</label>
            <input placeholder="YYYY-MM-DD to YYYY-MM-DD" />
          </div>
        </div>
        <div>
          <label>Format</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pill btn-outline">Excel</button>
            <button className="pill btn-outline">PDF</button>
            <button className="pill">Send to email</button>
          </div>
        </div>
      </div>
    </div></main>
  )
}
