<script setup lang="ts">
import type { Task } from '@/types/Task'
import { ref, watch } from 'vue'

const props = defineProps<{
  task: Task
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', updatedTask: Task): void
  (e: 'close'): void
}>()

const titleRef = ref('')
const descriptionRef = ref('')

// Populate inputs when task changes
watch(
  () => props.task,
  (newTask) => {
    titleRef.value = newTask?.name || ''
    descriptionRef.value = newTask?.description || ''
  },
  { immediate: true }
)

// Auto-resize textarea
const autoResize = (el: HTMLTextAreaElement) => {
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!titleRef.value || !descriptionRef.value) {
    window.alert('Title and description are required')
    return
  }
  emit('submit', { name: titleRef.value, description: descriptionRef.value })
}
</script>

<template>
  <WindowFloat v-if="isOpen" @close="emit('close')">
    <form class="flex flex-col" @submit="handleSubmit">
      <div class="flex flex-col">
        <label>Title</label>
        <input v-model="titleRef"
          class="border-gray-300 hover:border-gray-400 font-bold text-lg p-2 rounded-lg border w-full" type="text" />
      </div>
      <div class="flex flex-col my-2">
        <label>Description</label>
        <textarea v-model="descriptionRef" @input="autoResize($event.target as HTMLTextAreaElement)"
          class="border no-scroll border-gray-300 text-sm focus:bg-amber-100 hover:border-gray-400 p-2 rounded-lg resize-none overflow-y-auto max-h-60">
        </textarea>
      </div>
      <div class="flex mt-4 justify-end">
        <button type="submit" class="bg-amber-400 hover:bg-amber-300 hover:cursor-pointer mx-1 p-1 rounded-md">
          Edit Task
        </button>
        <button type="button" @click="emit('close')"
          class="p-1 mx-1 rounded-md hover:bg-red-400 hover:text-white hover:cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  </WindowFloat>
</template>
