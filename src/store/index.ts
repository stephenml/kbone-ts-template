import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdmin: false
  },
  mutations: {
    setIsAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
    }
  },
  actions: {
  },
  modules: {
  }
})
