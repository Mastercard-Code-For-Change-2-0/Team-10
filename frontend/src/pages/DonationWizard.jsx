import { useMemo, useState } from 'react'
import { CATEGORIES, CONDITIONS } from '../utils/mockDonations.js'
import { createDonation } from '../api/client.js'

const STEPS = ['Details','Photos','Location','Review']

function Stepper({ step }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {STEPS.map((s, i) => (
        <div key={s} className="chip" style={{ background: i<=step? 'rgba(25,72,106,0.08)':'var(--bg-muted)' }}>
          <span style={{ width: 22, height: 22, borderRadius: 999, display: 'inline-grid', placeItems: 'center', background: i<=step? '#19486A':'#e5e7eb', color: i<=step? '#fff':'#111', fontSize: 12, fontWeight: 700 }}>{i+1}</span>
          <span style={{ fontWeight: 600 }}>{s}</span>
        </div>
      ))}
    </div>
  )
}

export default function DonationWizard() {
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    title: '', category: CATEGORIES[0], condition: CONDITIONS[1], quantity: 1, description: '',
    photos: [],
    city: '', location: '', availability: '',
  })

  const valid = useMemo(() => {
    if (step===0) return form.title && form.category && form.condition && form.quantity>0 && form.description
    if (step===1) return form.photos.length>0
    if (step===2) return form.city && form.location && form.availability
    return true
  }, [step, form])

  const onNext = () => setStep(s => Math.min(s+1, STEPS.length-1))
  const onBack = () => setStep(s => Math.max(s-1, 0))

  const onFiles = (files) => {
    const arr = Array.from(files)
    const readers = arr.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res({ name: f.name, data: r.result }); r.readAsDataURL(f) }))
    Promise.all(readers).then(list => setForm(f => ({ ...f, photos: [...f.photos, ...list] })))
  }

  const submit = async () => {
    setSaving(true)
    try {
      await createDonation({
        title: form.title,
        category: form.category,
        condition: form.condition,
        quantity: form.quantity,
        description: form.description,
        city: form.city,
        location: form.location,
        availability: form.availability,
        photos: form.photos.map(p => ({ name: p.name, data: p.data }))
      })
      setDone(true)
    } catch (e) {
      alert(e.message || 'Submit failed')
    } finally {
      setSaving(false)
    }
  }

  if (done) return (
    <main className="section"><div className="container" style={{ maxWidth: 820 }}>
      <div className="card" style={{ padding: 22, textAlign: 'center' }}>
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Donation submitted</h1>
        <p className="muted">Your item is pending review. You’ll be notified upon approval.</p>
        <div style={{ marginTop: 12 }}>
          <a href="/browse" className="pill btn-outline">Browse donations</a>
          <a href="/donate" className="pill" style={{ marginLeft: 8, background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Add another</a>
        </div>
      </div>
    </div></main>
  )

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Donate an item</h1>

        <div className="card" style={{ padding: 16 }}>
          <Stepper step={step} />
          <div style={{ height: 12 }} />

          {step===0 && (
            <div className="grid grid-2">
              <div>
                <label>Title</label>
                <input value={form.title} onChange={(e)=> setForm({ ...form, title: e.target.value })} placeholder="Winter jackets for kids" />
              </div>
              <div>
                <label>Category</label>
                <select value={form.category} onChange={(e)=> setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Condition</label>
                <select value={form.condition} onChange={(e)=> setForm({ ...form, condition: e.target.value })}>
                  {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Quantity</label>
                <input type="number" min={1} value={form.quantity} onChange={(e)=> setForm({ ...form, quantity: Number(e.target.value) })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea rows={4} value={form.description} onChange={(e)=> setForm({ ...form, description: e.target.value })} placeholder="Add relevant details to help receivers understand the item." />
              </div>
              <div className="card" style={{ gridColumn: '1 / -1', padding: 12, background: '#fffdf2' }}>
                <strong>Content check</strong>
                <p className="muted" style={{ marginTop: 6 }}>Ensure the description is relevant and respectful. Our system will flag objectionable content.</p>
              </div>
            </div>
          )}

          {step===1 && (
            <div>
              <label>Photos</label>
              <input type="file" accept="image/*" multiple onChange={(e)=> onFiles(e.target.files)} />
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginTop: 12 }}>
                {form.photos.map((p, idx) => (
                  <div key={idx} className="card" style={{ padding: 6 }}>
                    <img src={p.data} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                      <span className="muted" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                      <button className="pill btn-outline" onClick={()=> setForm(f => ({ ...f, photos: f.photos.filter((_,i) => i!==idx) }))}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step===2 && (
            <div className="grid grid-2">
              <div>
                <label>City</label>
                <input value={form.city} onChange={(e)=> setForm({ ...form, city: e.target.value })} placeholder="Pune" />
              </div>
              <div>
                <label>Pickup location</label>
                <input value={form.location} onChange={(e)=> setForm({ ...form, location: e.target.value })} placeholder="Area / Address" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Availability window</label>
                <input value={form.availability} onChange={(e)=> setForm({ ...form, availability: e.target.value })} placeholder="e.g., Weekdays 3–6 PM" />
              </div>
            </div>
          )}

          {step===3 && (
            <div className="grid grid-2">
              <div className="card" style={{ padding: 12 }}>
                <strong>Overview</strong>
                <ul>
                  <li>{form.title}</li>
                  <li>{form.category} • {form.condition} • Qty {form.quantity}</li>
                  <li>{form.city} • {form.location}</li>
                  <li>{form.availability}</li>
                </ul>
                <p className="muted">{form.description}</p>
              </div>
              <div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                  {form.photos.map((p, idx) => (
                    <img key={idx} src={p.data} alt={p.name} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />
                  ))}
                </div>
                <div className="card" style={{ padding: 12, marginTop: 12, background: '#fffdf2' }}>
                  <strong>Quality & Safety</strong>
                  <p className="muted" style={{ marginTop: 6 }}>We’ll automatically check text and images for objectionable content before listing.</p>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <button className="pill btn-outline" disabled={step===0} onClick={onBack}>Back</button>
            {step < STEPS.length-1 ? (
              <button className="pill" onClick={onNext} disabled={!valid} style={{ background: 'linear-gradient(135deg, #19486A, #0e2c42)' }}>Next</button>
            ) : (
              <button className="pill" onClick={submit} disabled={saving} style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>{saving ? 'Submitting…' : 'Submit'}</button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
