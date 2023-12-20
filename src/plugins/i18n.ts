// import VueI18n from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import fa from '@/locales/fa'

// const i18n = VueI18n.createI18n({
// const i18n = createI18n({
export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    // 'en': {
    //   "HI": "Hello"
    // },
    'fa': fa
    // 'fa': {
    //   "HI": "سلام"
    // }
  }
})
// export default i18n