<script setup lang="ts">
import type { Task } from '@/types/Task';
defineProps<{
  task: Task;
  index: number;
}>()

defineEmits<{
  (e: 'complete', index: number): void;
  (e: 'delete', index: number): void;
}>()
</script>

<template>
  <div ref="container" class="border-green h-48 w-64 rounded bg-amber-400 m-4 p-2">
    <strong>{{ task.name || 'No title' }}</strong>
    <p>{{ task.description || 'No description' }}</p>
  </div>
</template>
