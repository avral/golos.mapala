export default function ({ app: { $axios }, store, route, params, error, redirect, hotReload }) {
  console.log(params, route);
}
