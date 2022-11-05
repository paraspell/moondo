import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/sovereign',
    name: 'generatesov',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GenerateSovereign.vue')
  },
  {
    path: '/gmp',
    name: 'axelargmp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AxelarGMP.vue')
  },
  {
    path: '/transactor',
    name: 'transactor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TransactorXCM.vue')
  },
  {
    path: '/paratopara',
    name: 'ParaToPara',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ParaToPara.vue')
  },
  {
    path: '/relaytopara',
    name: 'RelayToPara',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RelayToPara.vue')
  },
  {
    path: '/paratorelay',
    name: 'ParaToRelay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ParaToRelay.vue')
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
