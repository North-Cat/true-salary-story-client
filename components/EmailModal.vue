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
          <h4>變更通知信箱</h4>
          <button class="px-2 py-1 text-sm tracking-widest" @click="emit('close')">
            <i class="icon-cross text-lg"></i>
          </button>
        </div>
        <div class="mt-4">
          <div class="mb-4 body">
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
