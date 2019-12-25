import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'

Vue.use(KboneUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
