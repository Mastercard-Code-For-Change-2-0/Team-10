import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function AdminDashboard() {
  const { user } = useAuth()
  
  // Placeholder data for admin dashboard
  const systemStats = {
    totalDonations: 124,
    totalRequests: 96,
    activeMatches: 44,
    pendingVerifications: 12,
    pendingModerations: 8,
    totalUsers: 256
  }
  
  const recentActivity = [
    { id: 1, type: 'donation', message: 'New donation "Laptops (5)" submitted by TechCorp', time: '5 min ago', status: 'pending' },
    { id: 2, type: 'match', message: 'Match suggested: "Medical Supplies" → City Health Clinic', time: '15 min ago', status: 'suggested' },
    { id: 3, type: 'verification', message: 'New organization "Rural Education Trust" needs verification', time: '1 hour ago', status: 'pending' },
    { id: 4, type: 'moderation', message: 'Content flagged in donation "Electronics Bundle"', time: '2 hours ago', status: 'flagged' }
  ]
  
  const pendingApprovals = [
    {
      id: 1,
      type: 'donation',
      title: 'Office Furniture Set (10 pieces)',
      submitter: 'Corporate Solutions Ltd.',
      date: '2025-08-25',
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 2,
      type: 'request',
      title: 'Educational Books for Library',
      submitter: 'Sunrise School',
      date: '2025-08-24',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300&auto=format&fit=crop'
    }
  ]

  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: 24 }}>
        {/* Header */}
        <div>
          <h1 style={{ color: 'var(--brand-primary)', marginTop: 0, marginBottom: 8 }}>
            Admin Console 👑
          </h1>
          <p className="muted">Welcome back, {user.name}! Monitor and manage the entire Seva Sahayog platform.</p>
        </div>

        {/* System Overview Stats */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>System Overview</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                {systemStats.totalDonations}
              </div>
              <div className="muted">Total Donations</div>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>
                {systemStats.totalRequests}
              </div>
              <div className="muted">Total Requests</div>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>
                {systemStats.activeMatches}
              </div>
              <div className="muted">Active Matches</div>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>
                {systemStats.pendingVerifications}
              </div>
              <div className="muted">Pending Verifications</div>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>
                {systemStats.pendingModerations}
              </div>
              <div className="muted">Content Moderation</div>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>
                {systemStats.totalUsers}
              </div>
              <div className="muted">Total Users</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>Admin Actions</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <Link to="/admin/moderation" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              border: '2px solid #ef4444'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>🚨</div>
                <div style={{ fontWeight: 800, color: '#dc2626' }}>Content Moderation</div>
              </div>
              <div style={{ color: '#7f1d1d' }}>Review flagged content and inappropriate submissions</div>
              <div className="chip" style={{ background: '#dc2626', color: 'white', marginTop: 8 }}>
                {systemStats.pendingModerations} items pending
              </div>
            </Link>
            
            <Link to="/admin/matching" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
              border: '2px solid #3b82f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>🤝</div>
                <div style={{ fontWeight: 800, color: '#1d4ed8' }}>Smart Matching</div>
              </div>
              <div style={{ color: '#1e3a8a' }}>Review and approve suggested donation-request matches</div>
              <div className="chip" style={{ background: '#3b82f6', color: 'white', marginTop: 8 }}>
                15 matches suggested
              </div>
            </Link>
            
            <Link to="/admin/verification" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              border: '2px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>✅</div>
                <div style={{ fontWeight: 800, color: '#92400e' }}>Organization Verification</div>
              </div>
              <div style={{ color: '#78350f' }}>Verify new receiver organizations</div>
              <div className="chip" style={{ background: '#f59e0b', color: 'white', marginTop: 8 }}>
                {systemStats.pendingVerifications} pending
              </div>
            </Link>
            
            <Link to="/admin/reports" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
              border: '2px solid #22c55e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>📊</div>
                <div style={{ fontWeight: 800, color: '#166534' }}>Reports & Analytics</div>
              </div>
              <div style={{ color: '#14532d' }}>Export data, generate reports, send email summaries</div>
              <div className="chip" style={{ background: '#22c55e', color: 'white', marginTop: 8 }}>
                Generate Reports
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>Recent System Activity</h2>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {recentActivity.map((activity) => (
                <div key={activity.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12, 
                  padding: 12,
                  background: 'var(--bg-muted)',
                  borderRadius: 8
                }}>
                  <div style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%',
                    background: activity.status === 'pending' ? '#f59e0b' : 
                               activity.status === 'flagged' ? '#ef4444' :
                               activity.status === 'suggested' ? '#3b82f6' : '#22c55e'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                      {activity.message}
                    </div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>
                      {activity.time}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.2rem'
                  }}>
                    {activity.type === 'donation' ? '📦' :
                     activity.type === 'match' ? '🤝' :
                     activity.type === 'verification' ? '✅' : '🚨'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>Pending Approvals</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 16 }}>
            {pendingApprovals.map((item) => (
              <div key={item.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: 12, 
                      objectFit: 'cover' 
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 700, 
                      marginBottom: 4,
                      color: 'var(--brand-primary)'
                    }}>
                      {item.title}
                    </div>
                    <div className="muted" style={{ fontSize: '0.9rem', marginBottom: 8 }}>
                      by {item.submitter} • {item.category}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button className="pill" style={{ 
                        background: '#22c55e', 
                        color: 'white',
                        fontSize: '0.8rem',
                        padding: '6px 12px'
                      }}>
                        ✅ Approve
                      </button>
                      <button className="pill btn-outline" style={{ 
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        borderColor: '#ef4444',
                        color: '#ef4444'
                      }}>
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="card" style={{ 
          padding: 32, 
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          border: '2px solid var(--brand-primary)'
        }}>
          <h3 style={{ color: 'var(--brand-primary)', marginTop: 0, marginBottom: 16 }}>
            System Health & Performance
          </h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e' }}>
                99.8%
              </div>
              <div className="muted">System Uptime</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>
                2.3s
              </div>
              <div className="muted">Avg Response Time</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                156
              </div>
              <div className="muted">Active Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
