import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'

export default function createApp () {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.use(KboneUI)

  Vue.config.productionTip = false

  wx.cloud.init({
    // env 参数说明：
    //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //   如不填则使用默认环境（第一个创建的环境）
    // env: 'my-env-id',
    traceUser: true
  })

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
