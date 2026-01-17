import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import ca from './locales/ca.json'
import fr from './locales/fr.json'
import en from './locales/en.json'
import ro from './locales/ro.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      ca: { translation: ca },
      fr: { translation: fr },
      en: { translation: en },
      ro: { translation: ro }
    },
    lng: localStorage.getItem('language') || 'es', // Idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
