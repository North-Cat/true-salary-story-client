<script lang="ts" setup>
import { ref } from 'vue';
import { IShareSalaryFormData } from '@/interface/salaryData';
useHead({
  title: '薪水分享',
});
const { shareSalaryApi } = useApi();
const { salaryId } = useRoute().params;
const post = ref<IShareSalaryFormData>({});
const { result } = await shareSalaryApi.getSalaryInfo('6460b8ddce505393374dc329');
post.value = result;
const isShowModal = ref(false);
const redirect = () => {
  // 判斷導登入頁 or 顯示modal or 解鎖
  isShowModal.value = true;
};
</script>

<template>
  <div>
    <div class="bg-gray pt-[130px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen">
      <div
        class="md-container mx-auto sm:max-w-[500px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
      >
        <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between">
          <SalaryPost :post="post" @click="redirect" />
          <SalaryKeyword />
        </div>
      </div>
    </div>
    <SalaryModal :is-visible="isShowModal" @click="isShowModal = false" />
  </div>
</template>
