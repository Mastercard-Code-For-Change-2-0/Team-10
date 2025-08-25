import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const I18nContext = createContext()

const messages = {
  en: {
    home: 'Home', donate: 'Donate', requests: 'Requests', about: 'About',
    login: 'Log in', signup: 'Sign up',
  },
  hi: {
    home: 'होम', donate: 'दान करें', requests: 'अनुरोध', about: 'हमारे बारे में',
    login: 'लॉग इन', signup: 'साइन अप',
  },
  mr: {
    home: 'मुख्यपृष्ठ', donate: 'दान करा', requests: 'विनंत्या', about: 'आमच्याबद्दल',
    login: 'लॉग इन', signup: 'साइन अप',
  },
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])

  const t = (key) => (messages[lang] && messages[lang][key]) || messages.en[key] || key

  const value = useMemo(() => ({ lang, setLang, t }), [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() { return useContext(I18nContext) }
