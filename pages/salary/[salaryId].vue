<script lang="ts" setup>
useHead({
  title: '薪水分享',
});
</script>
<template>
  <div class="bg-gray pt-[130px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen">
    <div
      class="md-container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
    >
      <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between">
        <SalaryView />
        <SalaryKeyword />
      </div>
    </div>
  </div>
</template>
