const state = {
  mediaPicture: '',
  initData: [],
  newSticker: '',
  video: {
    src: ''
  },
  image: '',
  isLoading: false
}

const mutations = {
  open (state) {
    console.log('open mutations')
  },
  setWsRes (state, payload) {
    if (payload.id) {
      payload.content.forEach(item => {
        switch (item.type) {
          case 'newsticker' :
            state.newSticker = item.content
            break
          case 'image' :
            state.image = item.content
            console.log('if image', state.image)
            break
          case 'video':
            item.content.replace('\n', '')
            state.video.src = item.content.replace('\n', '')
            break
          case 'stream':
            state.video.src = item.content.replace('\n', '')
            break
        }
      })
    } else {
      switch (payload.type) {
        case 'newsticker' :
          state.newSticker = payload.content
          break
        case 'image' :
          state.image = payload.content
          state.video.src = ''
          break
        case 'video':
          state.video.src = payload.content.replace('\n', '')
          state.image = ''
          break
        case 'stream':
          state.video.src = payload.content.replace('\n', '')
          state.image = ''
          break
      }
    }
  },
  loadingState (state) {
    state.isLoading = true
  }
}

const actions = {
  onOpen ({ commit }) {
    commit('open')
  },
  handWsRes ({ commit }, message) {
    commit('setWsRes', message)
  },
  loading ({ commit }) {
    commit('loadingState')
  }
}

const getters = {
  newSticker (state) {
    return state.newSticker
  },
  video (state) {
    return state.video.src
  },
  image (state) {
    return state.image
  },
  loading (state) {
    return state.isLoading
  },
  initID (state) {
    return state.initID
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
