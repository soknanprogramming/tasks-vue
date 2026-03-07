<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const goBack = () => {
  router.back();
}

const image = ref<string | null>(null);

onMounted(() => {
  document.title = 'Play With Image';
})

onMounted(() => {
  const storedImage = localStorage.getItem('image_upload');
  if (storedImage) {
    image.value = storedImage;
    console.log(image.value);
  }
})

const handleImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image only.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result as string;
    localStorage.setItem('image_upload', image.value)
  }

  reader.readAsDataURL(file);

}

const removeImage = () => {
  image.value = null;
  localStorage.removeItem('image_upload');
}

</script>

<template>
  <div>
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2 border-2 border-transparent transition hover:border-blue-600">
      <button @click="goBack"
        class="border p-1.5 rounded-lg hover:text-blue-500 hover:cursor-pointer hover:bg-gray-200">Go
        Back</button>
    </div>
    <div class="bg-yellow-500 w-80 p-2 rounded-lg my-2 border-2 border-transparent transition hover:border-blue-600">
      <h1 class="text-lg font-bold mb-2">Upload Image</h1>
      <input
        class="border border-gray-400 bg-gray-300 hover:border-gray-500 hover:bg-gray-200 my-1 p-1 rounded-lg hover:cursor-pointer w-fit"
        type="file" @change="handleImage">
      <button
        class="border border-gray-400 bg-gray-300 hover:border-gray-500 hover:bg-gray-200 my-1 p-1 rounded-lg hover:cursor-pointer"
        @click="removeImage">Remove Image</button>
    </div>

    <div>
      <img v-if="image" :src="image" alt="">
    </div>
  </div>
</template>
