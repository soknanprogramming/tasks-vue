<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(() => {
  document.title = 'About Page';
})
</script>
<template>
  <div
    class="bg-yellow-500 hover:bg-yellow-400 border-2 border-transparent transition hover:border-blue-600 w-80 p-2 rounded-lg mt-10 mb-2">
    <div class="text-white text-center text-lg">
      <h1>This is an about page</h1>
    </div>
  </div>
  <div
    class="bg-red-500 border-2 border-transparent transition hover:border-blue-600 hover:bg-red-400 w-80 p-2 rounded-lg my-2 flex flex-col gap-2 *:hover:text-blue-600">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/view-tasks">View Tasks</RouterLink>
    <RouterLink to="/play-with-image">Play With Image</RouterLink>
    <RouterLink to="/drag-and-drop-image">Drag And Drop Image</RouterLink>
  </div>

</template>

<style></style>
