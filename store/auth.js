export default {
  state: () => ({
    accessToken: null
  }),

  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = {...accessToken}
    }
  },

  getters: {
    accessToken (state) {
      return state.accessToken
    },
  },

}
