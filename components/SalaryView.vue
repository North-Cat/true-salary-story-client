<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { IShareSalaryFormData } from '@/interface/salaryData';

const user = useUserStore();
const { isLogin } = storeToRefs(user);
const router = useRouter();
const { salaryId } = useRoute().params;
const { shareSalaryApi } = useApi();
const post = ref<IShareSalaryFormData>({});
// TODO: 使用salaryId
const { result } = await shareSalaryApi.getSalaryInfo('6468c348abb6863c8509cfee');
post.value = result;
const isShowModal = ref(false);
// TODO
const isLocked = ref(false);
const redirect = () => {
  if (!isLogin.value) router.push('/login');
  isShowModal.value = true;
};
const unlockPost = async () => {
  // TODO: 使用salaryId
  const { message } = await shareSalaryApi.requestSalaryInfo('6468c348abb6863c8509cfee');
  if (message === '成功') {
    isLocked.value = true;
  }
  isShowModal.value = false;
};
</script>
<template>
  <SalaryInfo :is-locked="isLocked" :post="post" @view="redirect" />
  <teleport to="body">
    <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
  </teleport>
</template>
