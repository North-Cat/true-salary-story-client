<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const user = useUserStore();
const { isLogin } = storeToRefs(user);
const router = useRouter();
const { shareSalaryApi } = useApi();
const isShowModal = ref(false);
// TODO
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
  <SalaryInfo :is-locked="isLocked" @view="redirect" />
  <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
</template>
