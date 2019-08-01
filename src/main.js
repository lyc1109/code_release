import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Element from 'element-ui'
// import axios from 'axios'
// Vue.prototype.$http = axios
import http from './utils/https'
import axios from 'axios'

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
    // const token = sessionStorage.getItem('user')
    axios({
        url: `${process.env.VUE_APP_BASE_API}/sys/userInfo`,
        method: 'get'
    }).then((res) => {
        // console.log(res)
        if (res) {
            sessionStorage.setItem('loginStatus', JSON.stringify(res))
            next()
        } else {
            sessionStorage.removeItem('loginStatus')
            if (to.matched.some(resp => resp.meta.requireAuth)) {
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
                const arr = ['home', 'list', 'group', 'article', 'search', 'login', 'register', 'forget']
                const obj = arr.filter((value) => {
                    return to.path.includes(value)
                })
                if (!obj.length)
                    Element.Message.error('未登录!')
                else
                    next()
            }
        }
    })
})
router.afterEach((route) => {
    if (route.meta.title) {
        document.title = route.meta.title + ' - 免费微信群二维码发布分享平台';
    }
})
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
