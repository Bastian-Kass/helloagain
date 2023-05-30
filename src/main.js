import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import style
import './styles/main.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#08a5e0', // Hello Again Blue
              secondary: '#94c342', // Hello Again Green
            }
          },
        },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })

// Vue3 Toastify
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Pinia for state management
const pinia = createPinia()

createApp(App)
    .use(vuetify)
    .use(Vue3Toasity, { autoClose: 3000, position: 'bottom-right'})
    .use(pinia)
    .mount('#app')