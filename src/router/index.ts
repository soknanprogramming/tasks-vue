import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ViewTasks from '@/views/ViewTasks.vue'
import AboutView from '@/views/AboutView.vue'
import PlayWithImage from '@/views/PlayWithImage.vue'
import DragAndDropImage from '@/views/DragAndDropImage.vue'
import TaskDetail from '@/views/TaskDetail.vue'

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
      component: AboutView,
    },
    {
      path: '/view-tasks',
      name: 'view-tasks',
      component: ViewTasks,
    },
    {
      path: '/play-with-image',
      name: 'play-with-image',
      component: PlayWithImage,
    },
    {
      path: '/drag-and-drop-image',
      name: 'drag-and-drop-image',
      component: DragAndDropImage,
    },
    {
      path: '/view-tasks/:id',
      name: 'task-detail',
      component: TaskDetail,
    },
  ],
})

export default router
