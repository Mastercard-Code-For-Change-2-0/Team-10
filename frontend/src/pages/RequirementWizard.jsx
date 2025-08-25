import { useMemo, useState } from 'react'
import { CATEGORIES } from '../utils/mockDonations.js'
import Stepper from '../components/Stepper.jsx'
import { createRequest } from '../api/client.js'

const STEPS = ['Details','Organization','Review']

export default function RequirementWizard() {
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    title: '', category: CATEGORIES[0], quantity: 1, urgency: 'Normal', description: '',
    orgName: '', regNo: '', contact: '', city: '', docs: [],
  })

  const valid = useMemo(() => {
    if (step===0) return form.title && form.category && form.quantity>0 && form.description
    if (step===1) return form.orgName && form.regNo && form.contact && form.city
    return true
  }, [step, form])

  const onNext = () => setStep(s => Math.min(s+1, STEPS.length-1))
  const onBack = () => setStep(s => Math.max(s-1, 0))

  const onFiles = (files) => {
    const arr = Array.from(files)
    const readers = arr.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res({ name: f.name, data: r.result }); r.readAsDataURL(f) }))
    Promise.all(readers).then(list => setForm(f => ({ ...f, docs: [...f.docs, ...list] })))
  }

  const submit = async () => {
    setSaving(true)
    try {
      await createRequest({
        title: form.title,
        category: form.category,
        quantity: form.quantity,
        urgency: form.urgency,
        description: form.description,
        orgName: form.orgName,
        regNo: form.regNo,
        contact: form.contact,
        city: form.city,
        docs: form.docs.map(d => ({ name: d.name, data: d.data }))
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
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Request submitted</h1>
        <p className="muted">Your requirement is pending review. You’ll be notified upon approval.</p>
        <div style={{ marginTop: 12 }}>
          <a href="/browse" className="pill btn-outline">Browse donations</a>
          <a href="/request" className="pill" style={{ marginLeft: 8, background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Add another</a>
        </div>
      </div>
    </div></main>
  )

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>Post a requirement</h1>
        <div className="card" style={{ padding: 16 }}>
          <Stepper steps={STEPS} step={step} />
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
                <label>Quantity</label>
                <input type="number" min={1} value={form.quantity} onChange={(e)=> setForm({ ...form, quantity: Number(e.target.value) })} />
              </div>
              <div>
                <label>Urgency</label>
                <select value={form.urgency} onChange={(e)=> setForm({ ...form, urgency: e.target.value })}>
                  {['High','Normal','Low'].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea rows={4} value={form.description} onChange={(e)=> setForm({ ...form, description: e.target.value })} placeholder="Describe the need clearly and respectfully." />
              </div>
              <div className="card" style={{ gridColumn: '1 / -1', padding: 12, background: '#fffdf2' }}>
                <strong>Content check</strong>
                <p className="muted" style={{ marginTop: 6 }}>Abusive language or graphic requests will be flagged during review.</p>
              </div>
            </div>
          )}

          {step===1 && (
            <div className="grid grid-2">
              <div>
                <label>Organization</label>
                <input value={form.orgName} onChange={(e)=> setForm({ ...form, orgName: e.target.value })} placeholder="Seva Trust, Pune" />
              </div>
              <div>
                <label>Registration number</label>
                <input value={form.regNo} onChange={(e)=> setForm({ ...form, regNo: e.target.value })} placeholder="e.g., 80G/CSR/Reg no" />
              </div>
              <div>
                <label>Contact</label>
                <input value={form.contact} onChange={(e)=> setForm({ ...form, contact: e.target.value })} placeholder="email or phone" />
              </div>
              <div>
                <label>City</label>
                <input value={form.city} onChange={(e)=> setForm({ ...form, city: e.target.value })} placeholder="Pune" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Verification documents</label>
                <input type="file" accept="image/*,application/pdf" multiple onChange={(e)=> onFiles(e.target.files)} />
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginTop: 12 }}>
                  {form.docs.map((p, idx) => (
                    <div key={idx} className="card" style={{ padding: 6 }}>
                      {p.data.startsWith('data:image') ? (
                        <img src={p.data} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                      ) : (
                        <div className="muted" style={{ height: 140, display: 'grid', placeItems: 'center' }}>PDF: {p.name}</div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                        <span className="muted" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                        <button className="pill btn-outline" onClick={()=> setForm(f => ({ ...f, docs: f.docs.filter((_,i) => i!==idx) }))}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="grid grid-2">
              <div className="card" style={{ padding: 12 }}>
                <strong>Overview</strong>
                <ul>
                  <li>{form.title}</li>
                  <li>{form.category} • Qty {form.quantity} • {form.urgency}</li>
                </ul>
                <p className="muted">{form.description}</p>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <strong>Organization</strong>
                <ul>
                  <li>{form.orgName} ({form.regNo})</li>
                  <li>{form.contact}</li>
                  <li>{form.city}</li>
                </ul>
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
