const palette = {
  draft: '#9CA3AF', pending: '#F59E0B', approved: '#10B981', matched: '#6366F1', completed: '#0EA5E9', fulfilled: '#0EA5E9', rejected: '#EF4444'
}

export default function StatusChip({ status }) {
  const color = palette[status?.toLowerCase?.()] || '#9CA3AF'
  return <span className="chip" style={{ border: `1px solid ${color}`, color }}>{status}</span>
}
