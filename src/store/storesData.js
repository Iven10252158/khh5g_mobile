import axios from 'axios'

const state = {
  merchantValue: '',
  page: 1,
  categories: [], // sideMenu分類
  allTypes: [],
  types: [],
  typeBtn: '',
  stores: [],
  pagination: []
}

const mutations = {
  getValue (state, payload) {
    state.merchantValue = payload
    // console.log('getValue', state.merchantValue)
  },
  // 依照 sideMenu 區分的types
  districtType (state, payload) {
    // console.log('districtType', payload)
    const Types = new Set()
    state.stores.forEach(store => {
      if (store.region === payload) {
        Types.add(store.type)
      }
      state.types = [...Types]
    })
  },
  filterType (state, type) {
    state.typeBtn = type
    console.log('filterType', state.typeBtn)
  },
  getAllShops (state, payload) {
    state.pagination = payload.slice(0, 1)
    state.stores = payload.slice(1)
  },
  getAllTypes (state, payload) {
    state.stores = payload.slice(1)
    state.pagination = payload.slice(0, 1)
    state.page = state.pagination[0].page
    console.log('state.page', state.page)
  },
  getCategories (state, payload) {
    // console.log('getCategories', payload)
    state.categories = payload.region
    state.allTypes = payload.type
  }
}

const actions = {
  getValue ({ commit }, payload) {
    commit('getValue', payload)
  },
  districtType ({ commit }, district) {
    commit('districtType', district)
  },
  filterType ({ commit }, type) {
    commit('filterType', type)
  },
  async getAllTypes ({ commit }, data) {
    // console.log('data', data)
    try {
      if (data.type && data.region) {
        const res = await axios.get(`${process.env.VUE_APP_URL}/shop/?type=${data.type}&region=${data.region}&offset=10&page=${data.page}`)
        // console.log('try1', res)
        commit('getAllTypes', res.data)
        // return res.data
      } else if (data.type) {
        const res = await axios.get(`${process.env.VUE_APP_URL}/shop/?type=${data.type}&offset=10&page=${data.page}`)
        // console.log('try2', data, res)
        commit('getAllTypes', res.data)
        // return res.data
      } else if (data.region) {
        const res = await axios.get(`${process.env.VUE_APP_URL}/shop/?region=${data.region}&offset=10&page=${data.page}`)
        // console.log('try3', res)
        commit('getAllTypes', res.data)
        // return res.data
      } else {
        const res = await axios.get(`${process.env.VUE_APP_URL}/shop/?offset=10&page=${data.page}`)
        // console.log('try4', res)
        commit('getAllTypes', res.data)
        // return res.data
      }
    } catch (error) {
      console.log('catch', error)
    }
  },

  getCategories ({ commit }) {
    return axios.get(`${process.env.VUE_APP_URL}/shop/items`)
      .then(res => {
        commit('getCategories', res.data)
        return res.data
      })
  }
}

const getters = {
  storesData (state) {
    return state.stores
  },
  pagination (state) {
    return state.pagination
  },
  page (state) {
    return state.page
  },
  categories (state) {
    return state.categories
  },
  merchantValue (state) {
    return state.merchantValue
  },
  allTypes (state) {
    return state.allTypes
  },
  types (state) {
    return state.types
  },
  TypeBtn (state) {
    return state.typeBtn
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
