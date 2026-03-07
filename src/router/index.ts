import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ViewTasks from '@/views/ViewTasks.vue'

const router = createRouter({
  history: createWebHistory('/tasks-vue/'),
  routes: [
    {
      path: `/`,
      name: 'home',
      component: HomeView,
    },
    {
      path: `/about`,
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/view-tasks',
      name: 'view-tasks',
      component: ViewTasks,
    },
  ],
})

export default router
