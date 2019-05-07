import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import axios from 'axios'
// Vue.prototype.$http = axios
import http from './utils/https'
Vue.prototype.$http = http

import VueBus from 'vue-bus';
Vue.use(VueBus);
Vue.config.productionTip = false
require('@/assets/css/common.scss')
require('@/../public/font/iconfont/iconfont.css')

// router.beforeEach((to, from, next) => {
//   // 默认所有路由都需要授权
//   // 例外请在路由中配置： { meta: { requireAuth: true } }
//   let requireAuth = to.meta.requireAuth
//   if (typeof (requireAuth) === "undefined") {
//     requireAuth = true
//   }
//
//   if (requireAuth === true) {
//     // 通过vuex state获取当前的token是否存在
//     // const token = store.getters[MutationTypes.oauth.getAuthToken];
//     const token = sessionStorage.getItem('token')
//     if (token !== null && token !== "") {
//       next()
//     } else {
//       // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       // router.replace({
//       //   path: '/',
//       //   query: {redirect: to.fullPath}
//       // })
//     }
//   } else {
//     next()
//   }
// })

router.afterEach((route) => {
  if(route.meta.title) {
    document.title = route.meta.title;
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
