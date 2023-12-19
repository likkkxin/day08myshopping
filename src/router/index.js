import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutPage from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import LoginPage from '@/views/login'
import PayPage from '@/views/pay'
import MyOrder from '@/views/myorder'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layoutPage,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  {
    path: '/login',
    component: LoginPage
  },

  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: PayPage
  },
  {
    path: '/myorder',
    component: MyOrder
  }
]

const router = new VueRouter({
  routes
})
// 前置拦截器
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  console.log(token)
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
}
)

export default router
