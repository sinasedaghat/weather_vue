import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";

const app = createApp(App)

import i18n from './plugins/i18n'
// import { useI18n } from 'vue-i18n'
// const { t } = i18n.useI18n()
// app.use(t)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
