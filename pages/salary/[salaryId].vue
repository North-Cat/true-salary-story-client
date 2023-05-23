<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { IShareSalaryFormData } from '@/interface/salaryData';
import { useUserStore } from '@/store/user';
useHead({
  title: '薪水分享',
});
const user = useUserStore();
const { isLogin } = storeToRefs(user);
const router = useRouter();
const { shareSalaryApi } = useApi();
const { salaryId } = useRoute().params;
const post = ref<IShareSalaryFormData>({});
const { result } = await shareSalaryApi.getSalaryInfo('6468c348abb6863c8509cfee');
post.value = result;
const isShowModal = ref(false);
// TODO
const point = ref(250);
const isLocked = ref(false);
const redirect = () => {
  if (!isLogin.value) router.push('/login');
  isShowModal.value = true;
};
const unlockPost = async () => {
  const { message } = await shareSalaryApi.requestSalaryInfo('6468c348abb6863c8509cfee');
  if (message === '成功') {
    isLocked.value = true;
  }
  isShowModal.value = false;
};
</script>

<template>
  <div>
    <div class="bg-gray pt-[130px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen">
      <div
        class="md-container mx-auto sm:max-w-[500px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
      >
        <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between">
          <SalaryPost :post="post" @view="redirect" :is-locked="isLocked" />
          <SalaryKeyword />
        </div>
      </div>
    </div>
    <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" :point="point" />
  </div>
</template>
