<script setup lang="ts">
import { onMounted } from 'vue';
import { useShowBackgroundImageStore } from '@/stores/show_background_image';
import { useCounterStore } from '@/stores/counter';

const showBackgroundImageStore = useShowBackgroundImageStore();
const counterStore = useCounterStore();

onMounted(() => {
  document.title = 'Home Page';
})

function handle_color_change(e: Event) {
  showBackgroundImageStore.setBackgroundColor((e.target as HTMLInputElement).value);
}

</script>

<template>
  <main class="text-amber-50">
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2">
      This is Home Page</div>
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2">
      <div class="flex items-center gap-2">
        <input type="checkbox" :checked="showBackgroundImageStore.show" @change="showBackgroundImageStore.toggle"
          name="" id="show_background_image">
        <label for="show_background_image">Show Background Image</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="color" @change="handle_color_change" :value="showBackgroundImageStore.background_color" name=""
          id="">
        <label for="">Background Color</label>
      </div>
    </div>
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2">
      <h1>Counter Example</h1>
      <p>Number is: {{ counterStore.count }}</p>
      <p>Double Number is: {{ counterStore.doubleCount }}</p>
      <div class="flex gap-2 my-2">
        <button class="border p-2 rounded-sm hover:cursor-pointer hover:bg-yellow-300 hover:text-blue-500"
          @click="counterStore.increment">Increment</button>
        <button class="border p-2 rounded-sm hover:cursor-pointer hover:bg-yellow-300 hover:text-blue-500"
          @click="counterStore.decrement">Decrement</button>
        <button class="border p-2 rounded-sm hover:cursor-pointer hover:bg-yellow-300 hover:text-blue-500"
          @click="counterStore.reset">Reset</button>
      </div>
    </div>
  </main>
</template>
