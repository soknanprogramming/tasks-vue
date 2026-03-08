<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { EditTask } from '@/types/Task';
import TaskCard from '@/components/TaskCard.vue';
import WindowFloat from '@/components/WindowFloat.vue';
import { useTasksStore } from '@/stores/tasks';
import { useShowAddTaskBarStore } from '@/stores/show_add_task_bar';

const tasksStore = useTasksStore();
const showAddTaskBarStore = useShowAddTaskBarStore();

onMounted(() => {
  document.title = 'View Tasks';
})


const show_editTask = reactive<EditTask>({
  isOpen: false,
  index: null,
  task: undefined
})

const handle_addTask_submit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!title || !description) return;
  tasksStore.addTask({ name: title, description });
  showAddTaskBarStore.toggle();
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

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const autoResize = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = 'auto'; // reset
  el.style.height = el.scrollHeight + 'px'; // set new height
};

</script>

<template>
  <div>
    <!-- add Task -->
    <WindowFloat @close="showAddTaskBarStore.toggle" v-if="showAddTaskBarStore.show">
      <form class="flex flex-col" @submit="handle_addTask_submit">
        <div class="flex flex-col">
          <label for="">Title</label>
          <input class="border-gray-300 hover:border-gray-400 font-bold text-lg p-2 rounded-lg border w-full"
            type="text" id="title" name="title">
        </div>
        <div class="flex flex-col">
          <label for="">Description</label>
          <textarea ref="textareaRef" @input="autoResize"
            class="border no-scroll border-gray-300 text-sm focus:bg-amber-100 hover:border-gray-400 p-2 rounded-lg resize-none overflow-y-auto max-h-60"
            name="description" id="description"></textarea>
        </div>
        <button class="bg-amber-400 hover:bg-amber-500 hover:cursor-pointer my-2 py-2 rounded-sm">Add Task</button>
        <button class="hover:bg-blue-500 text-black py-2 rounded hover:cursor-pointer hover:text-white"
          @click="showAddTaskBarStore.toggle">Cancel</button>
      </form>
    </WindowFloat>
    <!-- edit Task -->
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <TaskCard v-for="(task, index) in tasksStore.tasks" :key="index" :index="index" :task="task"
        @complete="tasksStore.completeTask(index)" @show_edit_window="handle_show_editTask(index)"
        @delete="tasksStore.removeTask(index)" />
    </div>
  </div>
</template>


<style>
.no-scroll::-webkit-scrollbar {
  display: none;
}
</style>
