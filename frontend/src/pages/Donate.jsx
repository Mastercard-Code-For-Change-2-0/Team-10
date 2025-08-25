import { useI18n } from '../contexts/I18nContext.jsx'

export default function Donate() {
  const { t } = useI18n()
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ color: 'var(--brand-primary)', marginTop: 0 }}>{t('donate')}</h1>
        <p className="muted">Coming soon: quick, guided donation flow with photo uploads and quality checks.</p>
      </div>
    </main>
  )
}
