<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { Task } from '@/types/Task';
import TaskCard from '@/components/TaskCard.vue';
import WindowFloat from '@/components/WindowFloat.vue';
import { useTasksStore } from '@/stores/tasks';
const tasksStore = useTasksStore();

interface EditTask {
  isOpen: boolean;
  index: number | null;
  task?: Task;
}

const show_addTask = ref<boolean>(false);
const show_editTask = reactive<EditTask>({
  isOpen: false,
  index: null,
  task: undefined
})

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


</script>

<template>
  <div>
    <!-- add Task -->
    <WindowFloat @close="show_addTask = false" v-if="show_addTask">
      <form @submit="handle_addTask_submit">
        <div>
          <label for="">Title</label>
          <input class="border" type="text" id="title" name="title">
        </div>
        <div>
          <label for="">Description</label>
          <textarea class="border resize-y min-h-100" name="description" id="description"></textarea>
        </div>
        <button class="bg-amber-300">Add Task</button>
      </form>
    </WindowFloat>
    <!-- edit Task -->
    <WindowFloat @close="show_editTask.isOpen = false" v-if="show_editTask.isOpen">
      <form @submit="handle_editTask_submit">
        <div>
          <label for="">Title</label>
          <input class="border" :value="show_editTask.task!.name" type="text" id="title" name="title">
        </div>
        <div>
          <label for="">Description</label>
          <textarea class="border resize-y" :value="show_editTask.task!.description" name="description"
            id="description"></textarea>
        </div>
        <button class="bg-amber-300">Edit Task</button>
      </form>
    </WindowFloat>

    <div>
      <button @click="handle_show_addTask">Add Task</button>
    </div>
    <TaskCard v-for="(task, index) in tasksStore.tasks" :key="index" :index="index" :task="task"
      @complete="tasksStore.completeTask(index)" @show_edit_window="handle_show_editTask(index)"
      @delete="tasksStore.removeTask(index)" />
  </div>
</template>
