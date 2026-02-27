<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue';
import { useTasksStore } from '@/stores/tasks';
const tasksStore = useTasksStore();


</script>

<template>
  <div>
    <TaskCard v-for="(task, index) in tasksStore.tasks" :key="index" :index="index" :task="task" />
  </div>
</template>
