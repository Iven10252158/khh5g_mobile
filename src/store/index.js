import { createStore } from 'vuex'
import ws from './ws'
import storesData from './storesData'

export default createStore({
  state: {
    isStretch: false,
    headerH: '',
    storeData: ''
  },
  mutations: {
    isStretch (state) {
      state.isStretch = !state.isStretch
      console.log(state.isStretch)
    },
    headerH (state, headerH) {
      state.headerH = headerH
      // console.log(state.headerH)
    },
    storeInformation (state, store) {
      state.storeData = store
      // console.log(store)
    }
  },
  actions: {
  },
  getters: {
    store (state) {
      return state.storeData
    }
  },
  modules: {
    ws,
    storesData
  }
})
