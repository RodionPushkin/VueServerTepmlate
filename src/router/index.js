import {createRouter, createWebHistory} from 'vue-router'

const title = 'hackers 54'
import apiModule from '../api'

const api = new apiModule('/api/')
const authGuard = async (to, from, next) => {
  let isAuthorized = false
  if (localStorage.token) {
    await api.get(`user`).then(r => r).then(res => {
      if (res.message) {
        console.log(res)
      } else {
        console.log(res)
        isAuthorized = true
      }
    }).catch(err => {
      console.log(err)
      if (err == "logout") {
        api.userLogout()
      }
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
    component: () => import('../views/home/index.vue')
  },
  {path: '/:pathMatch(.*)*', meta: {title: 'ошибка 404'}, component: () => import('../views/404/index.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeResolve((to, from, next) => {
  document.querySelector("title").textContent = `${title} - ${to.meta.title}`
  next()
})

export default router
