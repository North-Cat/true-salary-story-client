<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useSalaryStore } from '@/store/salary';

const userStore = useUserStore();
const salaryStore = useSalaryStore();
const { isLogin } = storeToRefs(userStore);
const { post } = storeToRefs(salaryStore);
const router = useRouter();
const { salaryId } = useRoute().params as { salaryId: string };
const isShowModal = ref(false);
const postId = ref('');
const initLoading = ref(true);
salaryStore.fetchSalaryInfo(salaryId).finally(() => {
  if (post.value.postId) {
    initLoading.value = false;
    console.log(initLoading.value);
  } else {
    router.push('/404');
  }
});

const redirect = (id: string) => {
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
  <SalaryInfo :init-loading="initLoading" :post="post" @view="redirect" />
  <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
</template>
