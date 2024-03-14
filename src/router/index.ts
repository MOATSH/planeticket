import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView
    },
    {
      path: '/home',
      component: HomeView
    }
  ]
})

export default router
