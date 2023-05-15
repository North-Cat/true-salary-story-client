<script lang="ts" setup>
useHead({
  title: '訂單明細',
});
definePageMeta({
  middleware: 'auth',
});
</script>
<template>
  <div class="orderDetail pt-[130px]">
    <section>訂單明細</section>
  </div>
</template>
