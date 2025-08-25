import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function DonorDashboard() {
  const { user } = useAuth()
  
  // Placeholder data for donor dashboard
  const donationStats = {
    totalDonations: 12,
    approvedDonations: 8,
    pendingDonations: 3,
    matchedDonations: 5
  }
  
  const recentDonations = [
    {
      id: 1,
      title: "Laptop Computers (3 units)",
      category: "Electronics",
      status: "approved",
      dateSubmitted: "2025-08-20",
      estimatedValue: "₹45,000",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "School Books & Stationery",
      category: "Education",
      status: "matched",
      dateSubmitted: "2025-08-18",
      estimatedValue: "₹8,500",
      matchedWith: "Vidya Niketan School",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Office Furniture Set",
      category: "Furniture",
      status: "pending",
      dateSubmitted: "2025-08-22",
      estimatedValue: "₹25,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Medical Equipment",
      category: "Healthcare",
      status: "matched",
      dateSubmitted: "2025-08-15",
      estimatedValue: "₹35,000",
      matchedWith: "City Health Clinic",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=300&auto=format&fit=crop"
    }
  ]
  
  const getStatusChip = (status) => {
    const styles = {
      approved: { background: '#dcfce7', color: '#166534' },
      matched: { background: '#dbeafe', color: '#1d4ed8' },
      pending: { background: '#fef3c7', color: '#92400e' },
      rejected: { background: '#fee2e2', color: '#dc2626' }
    }
    
    const labels = {
      approved: '✅ Approved',
      matched: '🤝 Matched',
      pending: '⏳ Pending Review',
      rejected: '❌ Rejected'
    }
    
    return (
      <span className="chip" style={styles[status]}>
        {labels[status]}
      </span>
    )
  }

  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: 24 }}>
        {/* Header */}
        <div>
          <h1 style={{ color: 'var(--brand-primary)', marginTop: 0, marginBottom: 8 }}>
            Welcome back, {user.name}! 💝
          </h1>
          <p className="muted">Manage your donations and track their impact in the community.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
              {donationStats.totalDonations}
            </div>
            <div className="muted">Total Donations</div>
          </div>
          <div className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>
              {donationStats.approvedDonations}
            </div>
            <div className="muted">Approved</div>
          </div>
          <div className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>
              {donationStats.pendingDonations}
            </div>
            <div className="muted">Pending Review</div>
          </div>
          <div className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>
              {donationStats.matchedDonations}
            </div>
            <div className="muted">Successfully Matched</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>Quick Actions</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <Link to="/donate" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #FDCA00, #ffd84a)',
              color: '#111'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>📦</div>
                <div style={{ fontWeight: 800 }}>Donate New Item</div>
              </div>
              <div style={{ opacity: 0.8 }}>Quick, guided process with quality checks</div>
            </Link>
            
            <Link to="/me/donations" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none',
              border: '2px solid var(--brand-primary)',
              background: 'rgba(25,72,106,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>📋</div>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>View All Donations</div>
              </div>
              <div className="muted">Track status and view matches</div>
            </Link>
            
            <Link to="/browse" className="card" style={{ 
              padding: 24, 
              textDecoration: 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: '1.5rem' }}>🔍</div>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>Browse Requests</div>
              </div>
              <div className="muted">See what organizations need</div>
            </Link>
          </div>
        </div>

        {/* Recent Donations */}
        <div>
          <h2 style={{ color: 'var(--brand-primary)', marginBottom: 16 }}>Recent Donations</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 16 }}>
            {recentDonations.map((donation) => (
              <div key={donation.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <img 
                    src={donation.image} 
                    alt={donation.title}
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
                      {donation.title}
                    </div>
                    <div className="muted" style={{ fontSize: '0.9rem', marginBottom: 8 }}>
                      {donation.category} • {donation.estimatedValue}
                    </div>
                    {getStatusChip(donation.status)}
                    {donation.matchedWith && (
                      <div style={{ 
                        marginTop: 8, 
                        padding: 8, 
                        background: '#f0f9ff', 
                        borderRadius: 8,
                        fontSize: '0.9rem'
                      }}>
                        🎯 <strong>Matched with:</strong> {donation.matchedWith}
                      </div>
                    )}
                    <div className="muted" style={{ fontSize: '0.8rem', marginTop: 8 }}>
                      Submitted: {new Date(donation.dateSubmitted).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="card" style={{ 
          padding: 32, 
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          border: '2px solid var(--brand-accent)'
        }}>
          <h3 style={{ color: 'var(--brand-primary)', marginTop: 0, marginBottom: 16 }}>
            🌟 Your Impact This Month
          </h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                ₹1,23,500
              </div>
              <div className="muted">Total Value Donated</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e' }}>
                8
              </div>
              <div className="muted">Organizations Helped</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>
                150+
              </div>
              <div className="muted">People Benefited</div>
            </div>
          </div>
          <div style={{ 
            marginTop: 16, 
            padding: 12, 
            background: 'white', 
            borderRadius: 8,
            fontSize: '0.9rem'
          }}>
            💡 <strong>Tip:</strong> Adding detailed descriptions and photos helps admin approval and matching process!
          </div>
        </div>
      </div>
    </main>
  )
}
