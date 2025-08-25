import { useEffect, useState } from 'react'
import { listNotifications, markNotificationRead, seedIfEmpty } from '../store/fakeApi.js'
import { MOCK_DONATIONS } from '../utils/mockDonations.js'

export default function Notifications() {
  const [items, setItems] = useState([])
  useEffect(() => { seedIfEmpty({ mocks: MOCK_DONATIONS }); setItems(listNotifications()) }, [])
  const mark = (id) => { markNotificationRead(id); setItems(listNotifications()) }
  return (
    <main className="section"><div className="container" style={{ maxWidth: 720 }}>
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Notifications</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 8 }}>
        {items.map(n => (
          <div key={n.id} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: n.read? .6: 1 }}>
            <span>{n.text}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="muted">{n.ts}</span>
              {!n.read && <button className="pill btn-outline" onClick={()=> mark(n.id)}>Mark read</button>}
            </div>
          </div>
        ))}
      </div>
    </div></main>
  )
}
