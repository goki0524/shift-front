export default async function ({ store, redirect, $axios }) {
  console.log('notAuthenticated.js >>>>>')
  // If the user is authenticated redirect to home page
  // アクセストークンがあり、無効な時ログインページに飛ぶ。
  const accessToken = store.getters['auth/accessToken'] 
  if (accessToken && Object.keys(accessToken).length) {  
    const token = accessToken.token
    const API_URL = 'http://127.0.0.1:3333/api/v1/auth/check_token'
    const response = await $axios
    .$get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(error => {
      store.commit('auth/setAccessToken', null)   
      redirect('/login') 
      return false
    })
    // アクセストークンがあり、有効な時ホームページに飛ぶ。
    if (response) {
      redirect('/') 
    } 
  }
  console.log('<<<<< notAuthenticated.js')
}
