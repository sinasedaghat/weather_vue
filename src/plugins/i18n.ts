import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import fa from '@/locales/fa'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'fa': fa
  },
  rtl: {
    fa: true
  },
})