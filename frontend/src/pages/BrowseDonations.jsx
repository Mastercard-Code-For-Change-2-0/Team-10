import { useMemo, useState } from 'react'
import DonationCard from '../components/DonationCard.jsx'
import { MOCK_DONATIONS, CATEGORIES, CONDITIONS } from '../utils/mockDonations.js'
import { useI18n } from '../contexts/I18nContext.jsx'

function Drawer({ open, onClose, item }) {
  if (!open || !item) return null
  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.42)' }} onClick={onClose}>
      <div className="card" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'min(520px, 100%)', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: 240, objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: 'var(--brand-primary)' }}>{item.title}</h2>
            <button className="pill btn-outline" onClick={onClose}>Close</button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>{item.description}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            <span className="chip">{item.category}</span>
            <span className="chip">{item.condition}</span>
            <span className="chip">Qty: {item.quantity}</span>
            <span className="chip">{item.city}</span>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button className="pill" style={{ background: 'linear-gradient(135deg, #19486A, #0e2c42)' }}>Express interest</button>
            <button className="pill btn-outline">Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrowseDonations() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [cond, setCond] = useState('All')
  const [city, setCity] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [page, setPage] = useState(1)
  const pageSize = 12
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)

  const cities = useMemo(() => ['All', ...Array.from(new Set(MOCK_DONATIONS.map(d => d.city)))], [])

  const filtered = useMemo(() => {
    let list = [...MOCK_DONATIONS]
    if (q) list = list.filter(d => d.title.toLowerCase().includes(q.toLowerCase()) || d.description.toLowerCase().includes(q.toLowerCase()))
    if (cat !== 'All') list = list.filter(d => d.category === cat)
    if (cond !== 'All') list = list.filter(d => d.condition === cond)
    if (city !== 'All') list = list.filter(d => d.city === city)
    if (sort === 'Newest') list.sort((a,b) => b.createdAt - a.createdAt)
    if (sort === 'Oldest') list.sort((a,b) => a.createdAt - b.createdAt)
    if (sort === 'Quantity') list.sort((a,b) => b.quantity - a.quantity)
    return list
  }, [q, cat, cond, city, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)

  const onCard = (item) => { setCurrent(item); setOpen(true) }

  return (
    <main className="section">
      <div className="container">
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>{t('requests')} · Browse Donations</h1>
        <div className="card" style={{ padding: 12, display: 'grid', gap: 10 }}>
          <div className="grid" style={{ gridTemplateColumns: '1fr 220px 220px 220px', gap: 10 }}>
            <input placeholder="Search donations…" value={q} onChange={(e)=>{ setQ(e.target.value); setPage(1) }} />
            <select value={cat} onChange={(e)=>{ setCat(e.target.value); setPage(1) }}>
              {['All', ...CATEGORIES].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={cond} onChange={(e)=>{ setCond(e.target.value); setPage(1) }}>
              {['All', ...CONDITIONS].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={city} onChange={(e)=>{ setCity(e.target.value); setPage(1) }}>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="muted">{filtered.length} results</div>
            <div>
              <select value={sort} onChange={(e)=> setSort(e.target.value)}>
                {['Newest','Oldest','Quantity'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
          {paged.map(item => (
            <DonationCard key={item.id} item={item} onClick={onCard} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          <button className="pill btn-outline" disabled={page===1} onClick={()=> setPage(p => Math.max(1, p-1))}>Prev</button>
          <span className="chip">Page {page} / {totalPages}</span>
          <button className="pill btn-outline" disabled={page===totalPages} onClick={()=> setPage(p => Math.min(totalPages, p+1))}>Next</button>
        </div>
      </div>

      <Drawer open={open} onClose={()=> setOpen(false)} item={current} />
    </main>
  )
}
