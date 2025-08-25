export default function DonationCard({ item, onClick }) {
  return (
    <button onClick={() => onClick?.(item)} className="card" style={{ padding: 0, textAlign: 'left' }}>
      <img src={item.image} alt={item.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <strong style={{ color: 'var(--brand-primary)' }}>{item.title}</strong>
          <span className="chip" style={{ fontSize: 12 }}>{item.condition}</span>
        </div>
        <div className="muted" style={{ marginTop: 6, fontSize: 14 }}>{item.city}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <span className="chip" style={{ fontSize: 12 }}>{item.category}</span>
          <span className="chip" style={{ fontSize: 12 }}>Qty: {item.quantity}</span>
        </div>
      </div>
    </button>
  )
}
