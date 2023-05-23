<template>
  <button
    class="text-black-10 px-2 py-2 rounded flex justify-between hover:bg-black-1 transition duration-150 ease-in-out truncate"
  >
    <div class="w-full flex justify-between">
      <!-- 大字 -->
      <h6 v-if="size == 'lg'" class="truncate">{{ content }}</h6>
      <h6 v-if="size == 'lg'" class="text-black-5">{{ endContent }}</h6>
      <!-- 小字 -->
      <div v-if="size == 'sm'" class="caption truncate">{{ content }}</div>
      <div v-if="size == 'sm'" class="caption text-black-5">
        {{ endContent }}
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  content: {
    // 文字內容
    type: String,
    default: 'text',
  },
  endContent: {
    // 句尾文字內容
    type: String,
    default: '',
  },
  size: {
    // 大小 (lg, sm)
    type: String,
    default: 'lg',
  },
});
</script>
