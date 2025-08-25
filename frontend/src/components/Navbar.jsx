import { Link, NavLink } from 'react-router-dom'

const navLinkStyle = ({ isActive }) => ({
  padding: '10px 14px',
  borderRadius: 999,
  color: isActive ? '#19486A' : '#111',
  background: isActive ? 'rgba(25,72,106,0.08)' : 'transparent',
  fontWeight: 600,
})

export default function Navbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'saturate(1.2) blur(6px)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #19486A, #0e2c42)', display: 'grid', placeItems: 'center', color: '#FDCA00', fontWeight: 800 }}>S</div>
          <div style={{ fontWeight: 800, letterSpacing: -0.4, color: '#19486A' }}>Seva Sahayog</div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/donate" style={navLinkStyle}>Donate</NavLink>
          <NavLink to="/requests" style={navLinkStyle}>Requests</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>Log in</Link>
          <Link to="/signup" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Sign up</Link>
        </div>
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(25,72,106,.2), rgba(253,202,0,.2))' }} />
    </header>
  )
}
