import { useEffect, useState } from 'react'
import { decideModeration, listModeration, seedIfEmpty } from '../../store/fakeApi.js'
import { MOCK_DONATIONS } from '../../utils/mockDonations.js'

export default function ModerationQueue() {
  const [items, setItems] = useState([])
  useEffect(() => { seedIfEmpty({ mocks: MOCK_DONATIONS }); setItems(listModeration()) }, [])
  const act = (id, d) => { decideModeration(id, d); setItems(listModeration()) }
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Moderation Queue</h1>
      <p className="muted">Flagged text and images awaiting review.</p>
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead><tr><th>ID</th><th>Type</th><th>Ref</th><th>Flags</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td><a href={row.type==='donation'?`/donations/${row.refId}`:`/requests/${row.refId}`}>{row.refId}</a></td>
                <td>{row.flags.map(f => `${f.kind}:${f.severity}`).join(', ')}</td>
                <td>{row.status}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="pill btn-outline" onClick={()=> act(row.id,'approved')}>Approve</button>
                  <button className="pill btn-outline" onClick={()=> act(row.id,'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></main>
  )
}
