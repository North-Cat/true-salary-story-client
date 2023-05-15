<script lang="ts" setup>
  useHead({
    title: '我的薪水',
  });
  // definePageMeta({
  //   middleware: 'auth',
  // });
</script>
<template>
  <userLayouts>
    <input
      type="text"
      class="w-full border border-black-1 rounded py-3 px-4 mb-5"
      placeholder="開始日期"
    />
  </userLayouts>
</template>
