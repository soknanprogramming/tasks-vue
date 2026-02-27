<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
  <div>
    <header class="flex sticky top-5 bg-white gap-2">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />

      <div class="wrapper">
        <nav class="flex gap-2">
          <RouterLink :class="(route.path === '/' ? 'bg-amber-300' : '') + ' p-2 rounded-sm'" to="/">Home</RouterLink>
          <RouterLink :class="(route.path === '/about' ? 'bg-amber-300' : '') + ' p-2 rounded-sm'" to="/about">
            About
          </RouterLink>
          <RouterLink :class="(route.path === '/add-tasks' ? 'bg-amber-300' : '') + ' p-2 rounded-sm'" to="/add-tasks">
            Add Tasks
          </RouterLink>
          <RouterLink :class="(route.path === '/view-tasks' ? 'bg-amber-300' : '') + ' p-2 rounded-sm'"
            to="/view-tasks">
            View Tasks
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView class="mt-10" />
  </div>
</template>
