import Vue from 'vue'
import VueRouter from 'vue-router'
// 优化同一路由跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Lithology',
    component: () => import('../views/Lithology.vue')
  },
  {
    path: '/Grain',
    name: 'Grain',
    component: () => import('../views/Grain.vue')
  },
  {
    path: '/Result',
    name: 'Result',
    component: () => import('../views/Result.vue')
  },
  {
    path: '*',
    redirect: '/Lithology'
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})
export default router
