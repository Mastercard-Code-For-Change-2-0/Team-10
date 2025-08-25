export default function Stepper({ steps = [], step = 0 }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={s} className="chip" style={{ background: i<=step? 'rgba(25,72,106,0.08)':'var(--bg-muted)' }}>
          <span style={{ width: 22, height: 22, borderRadius: 999, display: 'inline-grid', placeItems: 'center', background: i<=step? '#19486A':'#e5e7eb', color: i<=step? '#fff':'#111', fontSize: 12, fontWeight: 700 }}>{i+1}</span>
          <span style={{ fontWeight: 600 }}>{s}</span>
        </div>
      ))}
    </div>
  )
}
