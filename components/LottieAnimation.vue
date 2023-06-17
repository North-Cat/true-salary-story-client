<script setup lang="ts">
import lottie from 'lottie-web';

const props = defineProps({
  options: {
    type: Object,
    require: true,
    default: undefined,
  },
});

// 回傳給父元件建立好的動畫元件
const emit = defineEmits(['animCreated']);

const lavContainer = ref();

onMounted(() => {
  const anim = lottie.loadAnimation({
    container: lavContainer.value,
    renderer: 'svg',
    rendererSettings: {
      progressiveLoad: true,
    },
    loop: props.options?.loop !== false,
    autoplay: props.options?.autoplay !== false,
    path: props.options?.path,
  });
  emit('animCreated', anim);
});
</script>
<template>
  <div ref="lavContainer"></div>
</template>
