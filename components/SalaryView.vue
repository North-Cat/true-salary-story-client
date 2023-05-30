<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useSalaryStore } from '@/store/salary';

const userStore = useUserStore();
const salaryStore = useSalaryStore();
const { isLogin } = storeToRefs(userStore);
const { post, isLocked } = storeToRefs(salaryStore);
const router = useRouter();
const { salaryId } = useRoute().params as { salaryId: string };
const isShowModal = ref(false);

salaryStore.fetchSalaryInfo(salaryId);

const redirect = () => {
  if (!isLogin.value) router.push('/login');
  isShowModal.value = true;
};
const unlockPost = () => {
  salaryStore.fetchPermission(salaryId);
  isShowModal.value = false;
};
</script>
<template>
  <SalaryInfo :post="post" :is-locked="isLocked" @view="redirect" />
  <teleport to="body">
    <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
  </teleport>
</template>
