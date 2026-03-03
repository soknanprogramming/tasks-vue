<template>
  <div @click="$emit('close')" class="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
    <div @click.stop class="bg-amber-50 border border-gray-300 p-6 rounded w-100">
      <slot></slot>
    </div>
  </div>
</template>
