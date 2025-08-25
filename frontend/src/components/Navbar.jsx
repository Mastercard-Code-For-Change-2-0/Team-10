import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../contexts/I18nContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

function TranslateGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3" width="10" height="10" rx="2" fill="#19486A" />
      <rect x="12" y="11" width="10" height="10" rx="2" fill="#FDCA00" />
      <path d="M6 11l2-6h2l2 6h-1.8l-.4-1.4H8.2L7.8 11H6zm2.6-2.8h1.3L9.2 6.4 8.6 8.2z" fill="#ffffff" />
      <path d="M16 19c1.5 0 2.8-1.1 3-2.6h-2.1c-.1.4-.5.6-.9.6-.6 0-1-.5-1-1 0-.5.3-.8.7-1 .3-.1.8-.2 1.3-.2V13h-1v-.8h1.9V11h1v1.2h1v.8h-1v.8c-.8 0-1.4 0-1.8.2-.5.2-.8.6-.8 1.2 0 1.1.9 1.8 1.9 1.8z" fill="#111111" />
    </svg>
  )
}

const navLinkStyle = ({ isActive }) => ({
  padding: '10px 14px',
  borderRadius: 999,
  color: isActive ? '#19486A' : '#111',
  background: isActive ? 'rgba(25,72,106,0.08)' : 'transparent',
  fontWeight: 600,
})

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const { user, logout } = useAuth()
  const cycleLang = () => {
    const order = ['en', 'hi', 'mr']
    const i = order.indexOf(lang)
    setLang(order[(i + 1) % order.length])
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'saturate(1.2) blur(6px)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #19486A, #0e2c42)', display: 'grid', placeItems: 'center', color: '#FDCA00', fontWeight: 800 }}>S</div>
          <div style={{ fontWeight: 800, letterSpacing: -0.4, color: '#19486A' }}>Seva Sahayog</div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <NavLink to="/" style={navLinkStyle}>{t('home')}</NavLink>
          {user.role === 'donor' && <NavLink to="/donate" style={navLinkStyle}>{t('donate')}</NavLink>}
          {user.role === 'receiver' && <NavLink to="/request" style={navLinkStyle}>Request</NavLink>}
          <NavLink to="/browse" style={navLinkStyle}>Browse</NavLink>
          <NavLink to="/about" style={navLinkStyle}>{t('about')}</NavLink>
          {user.role === 'admin' && <NavLink to="/admin" style={navLinkStyle}>Admin Dashboard</NavLink>}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          {user.role !== 'guest' && (
            <Link to="/notifications" className="pill btn-outline" title="Notifications" aria-label="Notifications">
              🔔
            </Link>
          )}
          <button
            type="button"
            onClick={cycleLang}
            className="pill btn-outline"
            aria-label={`Change language. Current ${lang.toUpperCase()}`}
            title={`Language: ${lang.toUpperCase()} (click to change)`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <TranslateGlyph />
            <span style={{ fontWeight: 800, color: '#19486A' }}>{lang.toUpperCase()}</span>
          </button>
          
          {user.role === 'guest' ? (
            <>
              <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>{t('login')}</Link>
              <Link to="/signup" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>{t('signup')}</Link>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="chip" style={{ background: 'var(--brand-primary)', color: 'white', fontWeight: 700 }}>
                {user.role === 'admin' ? '👑 Admin' : user.role === 'donor' ? '💝 Donor' : '🤝 Receiver'}: {user.name}
              </span>
              <button className="pill btn-outline" onClick={logout} style={{ fontWeight: 700 }}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(25,72,106,.2), rgba(253,202,0,.2))' }} />
    </header>
  )
}
