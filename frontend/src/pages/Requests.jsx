import { useI18n } from '../contexts/I18nContext.jsx'

export default function Requests() {
  const { t } = useI18n()
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>{t('requests')}</h1>
        <p className="muted">Coming soon: receiver needs submission and searchable requests with filters.</p>
      </div>
    </main>
  )
}
