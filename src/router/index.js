import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import apiModule from '../api'

const api = new apiModule('/api/')
const authGuard = async (to, from, next) => {
  let isAuthorized = false
  if (localStorage.token) {
    await api.get(`user`).then(r => r).then(res => {
      if(res.message){
        console.log(res)
      }else{
        console.log(res)
        isAuthorized = true
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem('token')
    })
  }
  if (isAuthorized) {
    if (to.path == "/auth" || to.path == "/registration") {
      next(false)
    } else {
      next()
    }
  } else {
    if (to.path == "/auth" || to.path == "/registration") {
      next()
    } else {
      next('/auth')
    }
  }
};
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {title: 'главная'},
    beforeEnter: authGuard,
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {title: 'авторизация'},
    beforeEnter: authGuard,
    component: () => import('../views/auth/index.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {title: 'регистрация'},
    beforeEnter: authGuard,
    component: () => import('../views/registration/index.vue')
  },
  {path: '/:pathMatch(.*)*', meta: {title: 'ошибка 404'}, component: () => import('../views/404/index.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeResolve((to, from, next) => {
  document.querySelector("title").textContent = to.meta.title
  next()
})

export default router
