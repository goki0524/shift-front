const cookieparser = process.server ? require('cookieparser') : undefined

// nuxtServerInitは store/index.js に書くこと
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    console.log("nuxtServerInit >>>>>")
    let accessToken = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      console.log(parsed)
      try {
        accessToken = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
        console.log(`ERR: ${err}`)
        commit('auth/setAccessToken', null)
      }
    }
    commit('auth/setAccessToken', accessToken)
    console.log("<<<<< nuxtServerInit")
  }
}