import { useMemo, useState } from 'react'
import { downloadReport } from '../../api/client.js'

export default function ReportsExport() {
  const [type, setType] = useState('Donations')
  const [format, setFormat] = useState('csv')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const apiType = useMemo(() => type.toLowerCase(), [type])

  const click = async (fmt) => {
    const res = await downloadReport({ type: apiType, format: fmt || format, from, to })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${apiType}.${fmt||format}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  return (
    <main className="section"><div className="container">
      <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Reports & Export</h1>
      <div className="card" style={{ padding: 12, display: 'grid', gap: 10 }}>
        <div className="grid grid-2">
          <div>
            <label>Report type</label>
            <select value={type} onChange={(e)=> setType(e.target.value)}>
              {['Donations','Requests','Matches'].map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label>Date range</label>
            <div className="grid grid-2">
              <input placeholder="From YYYY-MM-DD" value={from} onChange={e=> setFrom(e.target.value)} />
              <input placeholder="To YYYY-MM-DD" value={to} onChange={e=> setTo(e.target.value)} />
            </div>
          </div>
        </div>
        <div>
          <label>Format</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pill btn-outline" onClick={()=> click('csv')}>CSV</button>
            <button className="pill btn-outline" onClick={()=> click('json')}>JSON</button>
          </div>
        </div>
      </div>
    </div></main>
  )
}
