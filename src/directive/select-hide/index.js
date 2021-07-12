import selectHide from './selectHide'

const install = function(Vue) {
  Vue.directive('select-hide-scroll', selectHide)
}

if (window.Vue) {
  window['select-hide-scroll'] = selectHide
  Vue.use(install); // eslint-disable-line
}

selectHide.install = install
export default selectHide
