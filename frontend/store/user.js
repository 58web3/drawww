export const state = () => ({
  user: null,
  home: '',
  post: '',
  dao: '',
  image: null,
  tweetId: '',
  file: null
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
  setIsImage(state, image) {
    state.image = image
  },
  setIsTweetId(state, tweetId) {
    state.tweetId = tweetId
  },
  setIsFile(state, file) {
    state.file = file
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
  setIsImage({ commit }, image) {
    commit('setIsImage', image)
  },
  setIsTweetId({ commit }, tweetId) {
    commit('setIsTweetId', tweetId)
  },
  setIsFile({ commit }, file) {
    commit('setIsFile', file)
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
  getImage(state) {
    return state.image
  },
  getTweetId(state) {
    return state.tweetId
  },
  getFile(state) {
    return state.file
  }
}

