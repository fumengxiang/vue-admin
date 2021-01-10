import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login') // 路由的懒加载
  }
]

const router = new VueRouter({
  routes
})

export default router
