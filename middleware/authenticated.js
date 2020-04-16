export default async function ({ store, redirect, $axios }) {
  console.log('authenticated.js >>>>>')
  // If the user is not authenticated
  // アクセストークンがなかったらログインページへ
  const accessToken = store.getters['auth/accessToken']
  if (!accessToken || !Object.keys(accessToken).length) {
    redirect(301, '/login')
  } else {
    // アクセストークンがあり、無効なアクセストークンなら,ログインページへ
    const accessToken = store.getters['auth/accessToken']
    const API_URL = `${process.env.apiUrl}/api/v1/auth/check_token`
    const token = accessToken.token
    if (accessToken && Object.keys(accessToken).length) {
      const response = await $axios
      .$get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        store.commit('auth/setAccessToken', null)
        redirect(301, '/login')
        return false
      })
    }
  }
  console.log('<<<<< authenticated.js')
}
