export default function ({ store, redirect }) {
  if (!store.state.account.wif) {
    return redirect({name: 'login'})
  }
}
