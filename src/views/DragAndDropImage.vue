<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

const image = ref<string | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  const storedImage = localStorage.getItem('image_upload_2')
  if (storedImage) image.value = storedImage;
})

const handleFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result as string;
    localStorage.setItem('image_upload_2', image.value);
  }
  reader.readAsDataURL(file);

}

const triggerFileInput = () => {
  fileInput.value?.click();
}

const handleChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  handleFile(file);
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  handleFile(file)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
}

const removeImage = () => {
  image.value = null;
  localStorage.removeItem('image_upload_2');
}


</script>

<template>
  <div>
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2 border-2 border-transparent transition hover:border-blue-600">
      <button @click="router.back"
        class="border p-1.5 rounded-lg hover:text-blue-500 hover:cursor-pointer hover:bg-gray-200">Go
        Back</button>
    </div>
    <div class="bg-yellow-500 w-80 rounded-lg my-2 border-2 border-transparent transition hover:border-blue-600">
      <div
        class="bg-yellow-500 w-80 h-40 rounded-lg border-2 border-dashed border-gray-400 flex flex-col justify-center items-center cursor-pointer hover:border-blue-600 transition text-center"
        @click="triggerFileInput" @drop="handleDrop" @dragover="handleDragOver">
        <p v-if="!image" class="text-gray-700">Click or drag & drop image here</p>
        <img v-else :src="image" class="w-full h-full object-cover rounded" alt="">
      </div>
    </div>
    <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleChange">
    <div v-if="image"
      class="bg-yellow-500 w-80 p-2 rounded-lg my-2 border-2 border-transparent transition hover:border-blue-600">
      <button class="px-3 py-1 bg-red-500 hover:bg-red-400 hover:cursor-pointer text-white rounded"
        @click="removeImage">
        Remove Image
      </button>
    </div>


  </div>
</template>
