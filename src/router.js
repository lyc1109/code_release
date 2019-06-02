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
        component: () => import('./views/pc/Home'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./views/pc/list'),
        meta: {
            title: '二维码列表'
        }
    },
    {
        path: '/group/:id',
        name: 'groupDetail',
        component: () => import('./views/pc/groupDetail'),
        meta: {
            title: '二维码详情'
        }
    },
    {
        path: '/article/:id',
        name: 'articleDetail',
        component: () => import('./views/pc/articleDetail'),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/person',
        name: 'person',
        component: () => import('./views/pc/person/index'),
        meta: {
            title: '个人中心',
            requireAuth: true
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./views/pc/search'),
        meta: {
            title: '搜索结果'
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: () => import('./views/pc/person/recharge'),
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
        component: () => import('./views/mobile/home'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./views/mobile/list'),
        meta: {
            title: '列表页'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./views/mobile/search'),
        meta: {
            title: '搜索页'
        }
    },
    {
        path: '/group/:id',
        name: 'groupDetail',
        component: () => import('./views/mobile/groupDetail'),
        meta: {
            title: '二维码详情'
        }
    },
    {
        path: '/article/:id',
        name: 'articleDetail',
        component: () => import('./views/mobile/articleDetail'),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/mobile/login/index'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./views/mobile/login/register'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('./views/mobile/login/forget'),
        meta: {
            title: '忘记密码'
        }
    },
    {
        path: '/person',
        name: 'person',
        component: () => import('./views/mobile/person/index'),
        meta: {
            title: '个人中心',
            requireAuth: true
        }
    },
    {
        path: '/publish',
        name: 'publish',
        component: () => import('./views/mobile/person/publish'),
        meta: {
            title: '发布',
            requireAuth: true
        }
    },
    {
        path: '/publish_article',
        name: 'publish_article',
        component: () => import('./views/mobile/person/publish_article'),
        meta: {
            title: '发布文章',
            requireAuth: true
        }
    },
    {
        path: '/my_publish',
        name: 'my_publish',
        component: () => import('./views/mobile/person/my_publish'),
        meta: {
            title: '我的发布',
            requireAuth: true
        }
    },
    {
        path: '/my_spread',
        name: 'my_spread',
        component: () => import('./views/mobile/person/my_spread'),
        meta: {
            title: '我的推广',
            requireAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./views/mobile/person/profile'),
        meta: {
            title: '个人资料',
            requireAuth: true
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: () => import('./views/mobile/person/recharge'),
        meta: {
            title: '我要充值',
            requireAuth: true
        }
    },
    {
        path: '/record',
        name: 'record',
        component: () => import('./views/mobile/person/record'),
        meta: {
            title: '明细记录',
            requireAuth: true
        }
    },
    {
        path: '/invite/:id',
        name: 'invite',
        component: () => import('./views/mobile/person/invite'),
        meta: {
            title: '邀请推广',
            requireAuth: true
        }
    },
    {
        path: '/getGold',
        name: 'getGold',
        component: () => import('./views/mobile/person/getGold'),
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
        component: () => import('./views/logout'),
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
    mode: 'history',
    // base: '/code',
    base: process.env.BASE_URL,
    routes: routes
})
