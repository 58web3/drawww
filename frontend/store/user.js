export const state = () => ({
  user: null,
  home: '',
  post: '',
  dao: '',
  imageUrl: '',
  tweetId: ''
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setIsHome(state, home) {
    state.home = home
  },
  setIsPost(state, post) {
    state.post = post
  },
  setIsDao(state, dao) {
    state.dao = dao
  },
  setIsImageUrl(state, imageUrl) {
    state.imageUrl = imageUrl
  },
  setIsTweetId(state, tweetId) {
    state.tweetId = tweetId
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setIsHome({ commit }, home) {
    commit('setIsHome', home)
  },
  setIsDao({ commit }, dao) {
    commit('setIsDao', dao)
  },
  setIsImageUrl({ commit }, imageUrl) {
    commit('setIsImageUrl', imageUrl)
  },
  setIsTweetId({ commit }, tweetId) {
    commit('setIsTweetId', tweetId)
  }
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getHome(state) {
    return state.home
  },
  getPost(state) {
    return state.post
  },
  getDao(state) {
    return state.dao
  },
  getImageUrl(state) {
    return state.imageUrl
  },
  getTweetId(state) {
    return state.tweetId
  }
}

