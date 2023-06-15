<script setup lang="ts">
withDefaults(
  defineProps<{
    isVisible: boolean;
  }>(),
  {
    isVisible: false,
  },
);
const emit = defineEmits(['close']);
</script>

<template>
  <teleport to="body">
    <div v-if="isVisible" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
      <div class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <slot name="title" />
          <button class="px-2 py-1 text-sm tracking-widest" @click="emit('close')">
            <i class="icon-cross text-lg"></i>
          </button>
        </div>
        <div class="my-4 body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </teleport>
</template>
