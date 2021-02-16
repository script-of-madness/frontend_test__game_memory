import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game,
  },
  {
    path: '/result',
    name: 'result',
    component: () =>
      import(/* webpackChunkName: "result" */ '../views/Result.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
