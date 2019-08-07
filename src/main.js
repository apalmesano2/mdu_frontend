// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import VueSession from 'vue-session'
import VueYouTubeEmbed from 'vue-youtube-embed'
import { youtube } from 'vue-youtube-embed'

// Color theme from: https://lobotuerto.com/thingies/vuetify-color-theme-builder/ //

Vue.use(VueSession, VueYouTubeEmbed, {
  theme: {
    "primary": "#1976D2",
    "secondary": "#424242",
    "accent": "#82B1FF",
    "error": "#FF5252",
    "info": "#2196f3",
    "success": "#7cb342",
    "warning": "#FB8C00"
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    'App': App
   },
  template: '<App/>',
  vuetify,
})
