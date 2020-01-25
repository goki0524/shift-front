export default function ({ store, redirect }) {
  // If the user is not authenticated
  const accessToken = store.state.auth.accessToken
  if (!accessToken || !Object.keys(accessToken).length) {
    return redirect('/login')
  }
}
