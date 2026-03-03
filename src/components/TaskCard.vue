<script setup lang="ts">
import type { Task } from '@/types/Task';
defineProps<{
  task: Task;
  index: number;
}>()

defineEmits<{
  (e: 'complete', index: number): void;
  (e: 'delete', index: number): void;
  (e: 'show_edit_window', index: number): void;
}>()
</script>

<template>
  <div ref="container" class="border-green min-h-48 w-64 rounded bg-amber-400 m-4 p-2 relative">
    <strong>{{ task.name || 'No title' }}</strong>
    <p>{{ task.description || 'No description' }}</p>
    <div class="h-14"></div>
    <div class="absolute bottom-2 right-2 *:p-3">
      <button :class="{ 'bg-green-50': task.completed }" @click="$emit('complete', index)">{{ task.completed ? 'Undo' :
        'Complete' }}</button>
      <button @click="$emit('show_edit_window', index)">Edit</button>
      <button @click="$emit('delete', index)">Delete</button>
    </div>
  </div>
</template>
