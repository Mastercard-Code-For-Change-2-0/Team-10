import { useEffect, useState } from 'react'
import { decideVerification, listVerification, seedIfEmpty } from '../../store/fakeApi.js'
import { MOCK_DONATIONS } from '../../utils/mockDonations.js'

export default function VerificationQueue() {
  const [rows, setRows] = useState([])
  useEffect(() => { seedIfEmpty({ mocks: MOCK_DONATIONS }); setRows(listVerification()) }, [])
  const act = (id, d) => { decideVerification(id, d); setRows(listVerification()) }
  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Verification Queue</h1>
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead><tr><th>ID</th><th>Org</th><th>Reg No.</th><th>City</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.orgName}</td>
                <td>{r.regNo}</td>
                <td>{r.city}</td>
                <td>{r.status}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="pill btn-outline" onClick={()=> act(r.id,'approved')}>Approve</button>
                  <button className="pill btn-outline" onClick={()=> act(r.id,'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></main>
  )
}
