<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasks';
import WindowFloat from '@/components/WindowFloat.vue';

import type { EditTask } from '@/types/Task';

const route = useRoute()
const router = useRouter()
const tasksStore = useTasksStore();

const show_editTask = reactive<EditTask>({
  isOpen: false,
  index: null,
  task: undefined
})

const rawId = route.params.id;
const textareaRef = ref<HTMLTextAreaElement | null>(null);


let id: number | null = null;

if (typeof rawId === "string") {
  const n = Number(rawId);
  id = isNaN(n) ? null : n;
}

const task = computed(() => {
  if (id === null) return undefined
  return tasksStore.tasks[id]
})

const autoResize = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = 'auto'; // reset
  el.style.height = el.scrollHeight + 'px'; // set new height
};

const handle_show_editTask = (index: number) => {
  show_editTask.isOpen = !show_editTask.isOpen;
  show_editTask.index = index;
  show_editTask.task = tasksStore.tasks[index];
};

const handle_editTask_submit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!title || !description) {
    window.alert("You must enter a title and description");
    return;
  }
  tasksStore.updateTask(show_editTask.index!, { name: title, description });
  show_editTask.isOpen = false;
}

const handle_deleteTask = (id: number) => {
  tasksStore.removeTask(id);
  router.back();
}

</script>

<template>
  <WindowFloat @close="show_editTask.isOpen = false" v-if="show_editTask.isOpen">
    <form class="flex flex-col" @submit="handle_editTask_submit">
      <div>
        <label class="flex flex-col" for="">Title</label>
        <input class="border-gray-300 hover:border-gray-400 font-bold text-lg p-2 rounded-lg border w-full"
          :value="show_editTask.task!.name" type="text" id="title" name="title">
      </div>
      <div class="flex flex-col my-2">
        <label for="">Description</label>
        <textarea ref="textareaRef" @input="autoResize"
          class="border no-scroll border-gray-300 text-sm focus:bg-amber-100 hover:border-gray-400 p-2 rounded-lg resize-none overflow-y-auto max-h-60"
          :value="show_editTask.task!.description" name="description" id="description"></textarea>
      </div>
      <div class="flex mt-4 justify-end *:w-20">
        <button class="bg-amber-400 hover:bg-amber-300 hover:cursor-pointer mx-1 p-1 rounded-md">Edit Task</button>
        <button class="p-1 mx-1 rounded-md hover:bg-red-400 hover:text-white hover:cursor-pointer"
          @click="show_editTask.isOpen = false">Cancel</button>
      </div>
    </form>
  </WindowFloat>
  <div>
    <div class="pt-10">
      <button @click="router.back" class="bg-amber-400 px-3 py-1 rounded-sm hover:cursor-pointer">Back</button>
    </div>
    <div v-if="id !== null">
      <div v-if="task">
        <div class="*:px-2 pt-2">
          <button :class="[
            task.completed ? 'text-blue-500' : 'text-red-500',
            'hover:cursor-pointer'
          ]" @click="tasksStore.completeTask(id)">{{ task.completed ?
            'Completed'
            :
            'To-do' }}</button>
          <input class="hover:cursor-pointer" type="checkbox" :checked="task.completed"
            @click="tasksStore.completeTask(id)" name="" id="">
          <button class="hover:text-blue-500 hover:cursor-pointer" @click="handle_show_editTask(id)">Edit</button>
          <button class="hover:text-blue-500 hover:cursor-pointer" @click="handle_deleteTask(id)">Delete</button>
        </div>
        <div class="pt-3">
          <p class="text-3xl font-bold text-red-700">
            <span v-if="task.name">{{ task.name }}</span>
            <span v-else class="text-red-500">No title</span>
          </p>
          <p>
            <span v-if="task.description">{{ task.description }}</span>
            <span v-else class="text-red-500">No description</span>
          </p>
        </div>
      </div>
      <div v-else class="text-red-500">
        No task found with id {{ id }}
      </div>
    </div>
    <div v-else class="text-red-500">
      Invalid ID
    </div>
  </div>
</template>
