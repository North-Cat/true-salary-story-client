<script lang="ts" setup>
  useHead({
    title: '我的薪水',
  });
  definePageMeta({
    middleware: 'auth',
  });
</script>
<template>
  <userLayouts> 我的薪水 </userLayouts>
</template>
