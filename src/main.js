
// import accessMiddleware from './access-middleware'
// accessMiddleware.sniffMobileAccess()

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import md5 from 'js-md5'
import * as filters from './filters' // global filters
import FileUpload from './components/FileUpload/index.js'
Vue.use(FileUpload)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$md5 = md5

// 暂时阻止水印信息
if (window.console) {
  window.error = window.console.error
  window.console.error = function(...paramList) {
    if (Object.prototype.toString.call(paramList[0]) === '[object String]') {
      if (!/^\*.+?\*$/g.test(paramList[0])) {
        window.error.apply(window.console, paramList)
      }
    } else {
      window.error.apply(window.console, paramList)
    }
  }
}

window.eventBus = new Vue()

router.beforeEach(async(to, from, next) => {
  const pathToList = to.path.split('/')
  if (pathToList[pathToList.length - 1] === 'abnormal-accountable') {
    // 发货异常追责报表跳转到oms
    window.open(process.env.OMS_ABNORMAL_ACCOUNTABLE, '_blank')
    next({ path: '/' })
  } else if (pathToList[pathToList.length - 1] === 'rate-view') {
    window.open(process.env.OMS_RATE_VIEW, '_blank')
    next({ path: '/' })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
