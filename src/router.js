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
    path: '/area',
    name: 'area',
    component: () => import('./views/pc/area'),
    meta: {
      title: '地区微信'
    }
  },
  {
    path: '/group/:id',
    name: 'groupDetail',
    component: () => import('./views/pc/groupDetail'),
    meta: {
      title: '微信群详情'
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
    component: () => import('./views/mobile/home'),
    meta: {
      title: '首页'
    }
  }
]
let routes
let reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i
if (reg.test(navigator.userAgent)) {
  routes = [...mobileRouter]
} else {
  routes = [...pcRouter]
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
