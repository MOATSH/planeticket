import ApplicatinView from '@/views/ApplicatinView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import StatisticView from '@/views/StatisticView.vue'
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
    },
    {
      path: '/home/statistic',
      component: StatisticView
    },
    {
      path: '/home/application',
      component: ApplicatinView
    }
  ]
})

export default router
