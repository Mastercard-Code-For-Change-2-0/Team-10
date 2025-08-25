import { useEffect, useState } from 'react'
import { decideMatch, listMatches, seedIfEmpty } from '../../store/fakeApi.js'
import { MOCK_DONATIONS } from '../../utils/mockDonations.js'

export default function MatchingSuggestions() {
  const [rows, setRows] = useState([])
  useEffect(() => { seedIfEmpty({ mocks: MOCK_DONATIONS }); setRows(listMatches()) }, [])
  const act = (id, d) => { decideMatch(id, d); setRows(listMatches()) }
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Matching Suggestions</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
        {rows.map(m => (
          <div key={m.id} className="card" style={{ padding: 12 }}>
            <div className="muted" style={{ marginBottom: 8 }}>Score: {m.score}</div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="card" style={{ padding: 10 }}>
                <strong>Donation</strong>
                <div>{m.donation.title}</div>
                <div className="muted">{m.donation.category} • Qty {m.donation.quantity} • {m.donation.city}</div>
              </div>
              <div className="card" style={{ padding: 10 }}>
                <strong>Request</strong>
                <div>{m.request.title}</div>
                <div className="muted">{m.request.category} • Qty {m.request.quantity} • {m.request.city}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="pill btn-outline" onClick={()=> act(m.id,'approved')}>Approve</button>
              <button className="pill btn-outline" onClick={()=> act(m.id,'rejected')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div></main>
  )
}
