import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: false
  },
  mutations: {
    SetLoading(state, value) {
      state.showLoading = value
    }
  },
  getters: {
    GetLoading(state) {
      return state.showLoading
    }
  },
  actions: {},
  modules: {}
})