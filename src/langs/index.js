
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from './dateTimeFormats'
import numberFormats, { numberFormatsLocal } from './numberFormats'
import { storage } from '@/utils/oldVersionFunc.js'
// const storage = {
//   get: function (key) {
//     return localStorage.getItem(key)
//   },
//   set: function (key, value) {
//     return localStorage.setItem(key, value)
//   }
// }
Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  zh: require('./modules/zh.json'),
  en: require('./modules/en.json'),
  kr: require('./modules/kr.json'),
  jp: require('./modules/jp.json')
}

const i18n = new VueI18n({
  locale: storage.get(LOCALE_KEY) || DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: locales,
  numberFormats,
  dateTimeFormats
})
Vue.prototype.$n = numberFormatsLocal

export const setup = lang => {
  if (lang === undefined) {
    lang = storage.get(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  storage.set(LOCALE_KEY, lang)

  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
  i18n.fallbackLocale = lang
}

setup()
export default i18n