import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/area',
      name: 'area',
      component: () => import('./views/area'),
      meta: {
        title: '地区微信'
      }
    },
    {
      path: '/group/:id',
      name: 'groupDetail',
      component: () => import('./views/groupDetail'),
      meta: {
        title: '微信群详情'
      }
    }
  ]
})
