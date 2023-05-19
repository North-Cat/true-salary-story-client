<template>
  <!-- 主要按鈕 -->
  <nuxt-link v-if="to" :to="to" :type="type" :class="btnClasses" v-bind="$attrs">
    <slot></slot>
    <div v-if="cate == 'text-sm'" class="caption">{{ content }}</div>
    <h6 v-else>{{ content }}</h6>
  </nuxt-link>
  <button v-else :type="type" :class="btnClasses" v-bind="$attrs">
    <slot></slot>
    <div v-if="cate == 'text-sm'" class="caption">{{ content }}</div>
    <h6 v-else>{{ content }}</h6>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  /**
   * 'primary': 主要按鈕,
   * 'secondary': 次要按鈕,
   * 'gray': 灰色按鈕,
   * 'white': 白色按鈕,
   * 'gray-text':灰色無邊框,
   * 'blue-text':藍色無邊框,
   * 'yellow-text':黃色無邊框,
   * 'text-sm':小型無邊框
   */
  cate: {
    type: String,
    default: 'primary',
  },
  content: {
    // 按鈕文字
    type: String,
    default: 'Button',
  },
  to: {
    type: [String, Object],
    default: '/',
  },
});

const btnClasses = computed(() => {
  let className = '';
  switch (props.cate) {
    case 'primary':
      className = 'flex-row text-white fill-white bg-blue hover:bg-black-10';
      break;
    case 'secondary':
      className = 'flex-row text-white fill-white bg-black-10 hover:bg-blue';
      break;
    case 'white':
      className = 'flex-row text-blue fill-blue bg-white border border-blue hover:bg-blue-light';
      break;
    case 'gray':
      className = 'flex-row text-black-6 fill-black-6 bg-dark hover:bg-gray-light';
      break;
    case 'gray-text':
      className = 'flex-row text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10';
      break;
    case 'blue-text':
      className = 'flex-row text-blue fill-blue hover:text-black-10 hover:fill-black-10';
      break;
    case 'yellow-text':
      className = 'flex-row text-yellow fill-yellow hover:text-blue hover:fill-blue';
      break;
    case 'text-sm':
      className = 'flex-col text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10';
      break;
    default:
      className = 'flex-row text-white fill-white bg-blue hover:bg-black-10';
  }
  return `flex py-3 px-5 justify-center items-center rounded transition duration-300 ease-in-out ${className}`;
});
</script>
