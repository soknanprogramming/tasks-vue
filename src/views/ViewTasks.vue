<script setup lang="ts">
import { ref } from 'vue';
import TaskCard from '@/components/TaskCard.vue';
import WindowFloat from '@/components/WindowFloat.vue';
import { useTasksStore } from '@/stores/tasks';
const tasksStore = useTasksStore();

const show_addTask = ref<boolean>(false);

const handle_show_addTask = () => {
  show_addTask.value = !show_addTask.value;
};

const handle_addTask_submit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!title || !description) return;
  tasksStore.addTask({ name: title, description });
  handle_show_addTask();
}


</script>

<template>
  <div>
    <WindowFloat @close="show_addTask = false" v-if="show_addTask">
      <form @submit="handle_addTask_submit">
        <div>
          <label for="">Title</label>
          <input class="border" type="text" id="title" name="title">
        </div>
        <div>
          <label for="">Description</label>
          <input class="border" type="text" id="description" name="description">
        </div>
        <button class="bg-amber-300">Add Task</button>
      </form>
    </WindowFloat>
    <div>
      <button @click="handle_show_addTask">Add Task</button>
    </div>
    <TaskCard v-for="(task, index) in tasksStore.tasks" :key="index" :index="index" :task="task" />
  </div>
</template>
