<script lang="ts" setup>
  useHead({
    title: '匿名分享',
  });
  definePageMeta({
    middleware: 'auth',
  });
</script>
<template>
  <div class="sharemysalary pt-[130px]">
    <section>匿名分享</section>
  </div>
</template>
