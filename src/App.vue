<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useShowAddTaskBarStore } from '@/stores/show_add_task_bar';
import bg from '@/assets/wp5234116.jpg'


const route = useRoute()
const showAddTaskBarStore = useShowAddTaskBarStore();

</script>

<template>
  <div>
    <div class="fixed inset-0 -z-10 bg-cover bg-center" :style="{ backgroundImage: `url(${bg})` }"></div>
    <div class="p-2">
      <header class="z-40 p-2 shadow-2xl border border-gray-200 flex sticky top-5 bg-white gap-2">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />

        <div class="wrapper">
          <nav class="flex gap-2">
            <RouterLink :class="(route.path === '/' ? 'bg-amber-300' : 'hover:bg-blue-200') + ' p-2 rounded-sm'" to="/">
              Home</RouterLink>
            <RouterLink :class="(route.path === '/about' ? 'bg-amber-300' : 'hover:bg-blue-200') + ' p-2 rounded-sm'"
              to="/about">
              About
            </RouterLink>
            <RouterLink
              :class="(route.path === '/view-tasks' ? 'bg-amber-300' : 'hover:bg-blue-200') + ' p-2 rounded-sm'"
              to="/view-tasks">
              View Tasks
            </RouterLink>
          </nav>
        </div>
        <button v-if="route.path === '/view-tasks'" @click="showAddTaskBarStore.toggle"
          class="bg-amber-200 p-2 rounded-sm hover:cursor-pointer">
          Add Tasks
        </button>
      </header>

      <RouterView class="mt-10" />
    </div>
  </div>
</template>
