import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default function createApp () {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
