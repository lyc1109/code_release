import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Element from 'element-ui'
// import axios from 'axios'
// Vue.prototype.$http = axios
import http from './utils/https'

Vue.prototype.$http = http
import api from './api'

Vue.prototype.$api = api
import VueBus from 'vue-bus';

Vue.use(VueBus);
Vue.config.productionTip = false
require('@/assets/css/common.scss')
require('@/../public/fonts/iconfont/iconfont.css')
import Vant, {Toast, Dialog} from 'vant'
import 'vant/lib/index.css'

import moment from 'moment'
Vue.use(require('vue-moment'), {
    moment
})
Vue.prototype.moment = moment
Vue.use(Vant)
let reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        const token = sessionStorage.getItem('user')
        if (!token || token == null || token == '') {
            if (reg.test(navigator.userAgent)) {
                Dialog.alert({message: '必须登录才可访问此页面', confirmButtonText: '去登录'})
                    .then(() => {
                        router.replace('/login')
                    })
            } else {
                Element.MessageBox.alert('必须登录才可访问此页面!', '', {
                    confirmButtonText: '去登录'
                })
                    .then(() => {
                        router.replace('/')
                    })
            }
        } else {
            next()
        }
    } else {
        next()
    }
})
router.afterEach((route) => {
    if (route.meta.title) {
        document.title = route.meta.title;
    }
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
