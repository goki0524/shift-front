export default function ({ store, redirect }) {
  // If the user is not authenticated
  const accessToken = store.state.accessToken
  if (!accessToken || !Object.keys(accessToken).length) {
    return redirect('/login')
  }
}
