<script setup lang="ts">
import type { Task } from '@/types/Task';
import { cutText } from '@/utility/cutText';
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps<{
  task: Task;
  index: number;
}>()

defineEmits<{
  (e: 'complete', index: number): void;
  (e: 'delete', index: number): void;
  (e: 'show_edit_window', index: number): void;
}>()

const testClick = () => router.push(`/view-tasks/${props.index}`)

</script>

<template>
  <div ref="container" @click="testClick"
    class="break-all border-green min-h-48 w-64 rounded bg-amber-50 border border-gray-300 m-4 p-2 relative hover:shadow-2xl hover:shadow-gray-400">
    <strong class="text-xl text-red-700">{{ cutText(task.name, 16) || 'No title' }}</strong>
    <p class="">{{ cutText(task.description) || 'No description' }}</p>
    <div class="h-14"></div>
    <div @click.stop class="absolute bottom-2 right-2 *:p-3">
      <button :class="[
        task.completed ? 'text-blue-500' : 'text-red-500',
        'hover:cursor-pointer'
      ]" @click="$emit('complete', index)">{{ task.completed ?
        'Completed'
        :
        'To-do' }}</button>
      <input class="hover:cursor-pointer" type="checkbox" :checked="task.completed" @click="$emit('complete', index)"
        name="" id="">
      <button class="hover:text-blue-500 hover:cursor-pointer" @click="$emit('show_edit_window', index)">Edit</button>
      <button class="hover:text-blue-500 hover:cursor-pointer" @click="$emit('delete', index)">Delete</button>
    </div>
  </div>
</template>
