export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  const accessToken = store.state.accessToken
  if (accessToken && Object.keys(accessToken).length) {
    return redirect('/')
  }
}
