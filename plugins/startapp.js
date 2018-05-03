import Vue from 'vue'


// TODO Сделать глобальную обработку для отображения
//Vue.config.errorHandler = function (err, vm, info) {
//
//}

export default ({app: { store }}) => {
  window.onNuxtReady(() => {
    store.dispatch('account/init')
    store.dispatch('golos/init')
  })
}
