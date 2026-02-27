import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddTasks from '@/views/AddTasks.vue'
import ViewTasks from '@/views/ViewTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/add-tasks',
      name: 'add-tasks',
      component: () => AddTasks,
    },
    {
      path: '/view-tasks',
      name: 'view-tasks',
      component: ViewTasks,
    },
  ],
})

export default router
