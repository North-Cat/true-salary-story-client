<template>
  <button
    :type="type"
    class="flex justify-center items-center hover:bg-blue transition duration-150 ease-in-out"
    :class="{
      'rounded-full text-white bg-black-10 py-4 px-5': isCircle,
      'border-black-10 text-black-10  bg-white py-2 hover:text-white': !isCircle,
      'rounded-tr border-r-2 border-t-2 border-l ps-4 pe-3.5': !isCircle && !isLeft,
      'rounded-tl border-l-2 border-t-2 border-r ps-3.5 pe-4': !isCircle && isLeft,
    }"
  >
    <!-- 向左 -->
    <span v-if="isLeft" class="icon-left-arrow text-lg md:text-2xl"></span>
    <!-- 向右 -->
    <span v-else-if="!isLeft" class="icon-right-arrow text-lg md:text-2xl"></span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  isCircle: {
    // true:圓形 ; false:方形
    type: Boolean,
    required: true,
  },
  isLeft: {
    // true:向左 ; false:向右
    type: Boolean,
    required: true,
  },
});
</script>
