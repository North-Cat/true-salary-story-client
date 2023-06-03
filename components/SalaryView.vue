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
const postId = ref('');

salaryStore.fetchSalaryInfo(salaryId);

const redirect = (id) => {
  if (!isLogin.value) router.push('/login');
  isShowModal.value = true;
  postId.value = id;
};
const unlockPost = () => {
  salaryStore.fetchPermission(postId.value);
  isShowModal.value = false;
};
</script>
<template>
  <SalaryInfo :post="post" :is-locked="isLocked" @view="redirect" />
  <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
</template>
