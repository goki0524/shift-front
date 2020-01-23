const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    accessToken: {
      type: null,
      token: null,
      refreshToken: null
    }
  }
}
export const mutations = {
  setAccessToken (state, accessToken) {
    state.accessToken = {...accessToken}
  }

}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let accessToken = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        accessToken = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
        console.log(`ERR: ${err}`)
        commit('setAccessToken', null)
      }
    }
    commit('setAccessToken', accessToken)
  }
}
