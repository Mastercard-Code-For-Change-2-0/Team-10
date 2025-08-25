import { useEffect, useState } from 'react'
import { decideMatch, listMatchSuggestions, listMatches } from '../../api/client.js'

export default function MatchingSuggestions() {
  const [rows, setRows] = useState([])
  const [tab, setTab] = useState('suggest')
  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const items = tab==='suggest' ? await listMatchSuggestions() : await listMatches()
        if (!ignore) setRows(items)
      } catch (e) { if (!ignore) setRows([]) }
    }
    load(); return () => { ignore = true }
  }, [tab])
  const act = async (m, decision) => {
    const donationId = m.donation?.id || m.donationId || (m.donation && m.donation._id)
    const requestId = m.request?.id || m.requestId || (m.request && m.request._id)
    await decideMatch({ donationId, requestId, decision })
    const items = tab==='suggest' ? await listMatchSuggestions() : await listMatches()
    setRows(items)
  }
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Matching Suggestions</h1>
      <div className="card" style={{ padding: 8, display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className={`pill ${tab==='suggest'?'':'btn-outline'}`} onClick={()=> setTab('suggest')}>Suggestions</button>
        <button className={`pill ${tab==='approved'?'':'btn-outline'}`} onClick={()=> setTab('approved')}>Decided</button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
        {rows.map(m => (
          <div key={m.id} className="card" style={{ padding: 12 }}>
            <div className="muted" style={{ marginBottom: 8 }}>Score: {m.score}</div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="card" style={{ padding: 10 }}>
                <strong>Donation</strong>
                <div>{m.donation?.title}</div>
                <div className="muted">{m.donation?.category} • Qty {m.donation?.quantity} • {m.donation?.city}</div>
              </div>
              <div className="card" style={{ padding: 10 }}>
                <strong>Request</strong>
                <div>{m.request?.title}</div>
                <div className="muted">{m.request?.category} • Qty {m.request?.quantity} • {m.request?.city}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="pill btn-outline" onClick={()=> act(m,'approved')}>Approve</button>
              <button className="pill btn-outline" onClick={()=> act(m,'rejected')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div></main>
  )
}
