import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

let pcRouter = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['./views/pc/Home.vue'], resolve),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: resolve => require(['./views/pc/list.vue'], resolve),
        meta: {
            title: '二维码列表'
        }
    },
    {
        path: '/group/:id',
        name: 'groupDetail',
        component: resolve => require(['./views/pc/groupDetail.vue'], resolve),
        meta: {
            title: '二维码详情'
        }
    },
    {
        path: '/article/:id',
        name: 'articleDetail',
        component: resolve => require(['./views/pc/articleDetail.vue'], resolve),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/person',
        name: 'person',
        component: resolve => require(['./views/pc/person/index.vue'], resolve),
        meta: {
            title: '个人中心',
            requireAuth: true
        }
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => require(['./views/pc/search.vue'], resolve),
        meta: {
            title: '搜索结果'
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: resolve => require(['./views/pc/person/recharge.vue'], resolve),
        meta: {
            title: '我要充值',
            requireAuth: true
        }
    }
]

let mobileRouter = [
    {
        path: '/',
        name: 'home',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['./views/mobile/home.vue'], resolve),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: resolve => require(['./views/mobile/list.vue'], resolve),
        meta: {
            title: '列表页'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => require(['./views/mobile/search.vue'], resolve),
        meta: {
            title: '搜索页'
        }
    },
    {
        path: '/group/:id',
        name: 'groupDetail',
        component: resolve => require(['./views/mobile/groupDetail.vue'], resolve),
        meta: {
            title: '二维码详情'
        }
    },
    {
        path: '/article/:id',
        name: 'articleDetail',
        component: resolve => require(['./views/mobile/articleDetail.vue'], resolve),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['./views/mobile/login/index.vue'], resolve),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: resolve => require(['./views/mobile/login/register.vue'], resolve),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/forget',
        name: 'forget',
        component: resolve => require(['./views/mobile/login/forget.vue'], resolve),
        meta: {
            title: '忘记密码'
        }
    },
    {
        path: '/person',
        name: 'person',
        component: resolve => require(['./views/mobile/person/index.vue'], resolve),
        meta: {
            title: '个人中心',
            requireAuth: true
        }
    },
    {
        path: '/publish',
        name: 'publish',
        component: resolve => require(['./views/mobile/person/publish.vue'], resolve),
        meta: {
            title: '发布',
            requireAuth: true
        }
    },
    {
        path: '/publish_article',
        name: 'publish_article',
        component: resolve => require(['./views/mobile/person/publish_article.vue'], resolve),
        meta: {
            title: '发布文章',
            requireAuth: true
        }
    },
    {
        path: '/my_publish',
        name: 'my_publish',
        component: resolve => require(['./views/mobile/person/my_publish.vue'], resolve),
        meta: {
            title: '我的发布',
            requireAuth: true
        }
    },
    {
        path: '/my_spread',
        name: 'my_spread',
        component: resolve => require(['./views/mobile/person/my_spread.vue'], resolve),
        meta: {
            title: '我的推广',
            requireAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: resolve => require(['./views/mobile/person/profile.vue'], resolve),
        meta: {
            title: '个人资料',
            requireAuth: true
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: resolve => require(['./views/mobile/person/recharge.vue'], resolve),
        meta: {
            title: '我要充值',
            requireAuth: true
        }
    },
    {
        path: '/record',
        name: 'record',
        component: resolve => require(['./views/mobile/person/record.vue'], resolve),
        meta: {
            title: '明细记录',
            requireAuth: true
        }
    },
    {
        path: '/invite/:id',
        name: 'invite',
        component: resolve => require(['./views/mobile/person/invite.vue'], resolve),
        meta: {
            title: '邀请推广',
            requireAuth: true
        }
    },
    {
        path: '/getGold',
        name: 'getGold',
        component: resolve => require(['./views/mobile/person/getGold.vue'], resolve),
        meta: {
            title: '赚金币',
            requireAuth: true
        }
    }
]
const logout = [
    {
        path: '/logout',
        name: 'logout',
        component: resolve => require(['./views/logout.vue'], resolve),
        meta: {
            title: '退出登录'
        }
    }
]
let routes
let reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i
if (reg.test(navigator.userAgent)) {
    routes = [...mobileRouter, ...logout]
} else {
    routes = [...pcRouter, ...logout]
}
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
