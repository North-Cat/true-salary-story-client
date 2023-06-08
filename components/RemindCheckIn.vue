<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const user = useUserStore();
const { currentUser, checkTodayCheckedIn } = storeToRefs(user);
const showModal = ref(false);
// 已登入且未簽到，就顯示
watch(currentUser, () => {
  checkIsShow();
});
watch(checkTodayCheckedIn, () => {
  checkIsShow();
});
// checkIsShow()
function checkIsShow() {
  if (currentUser && currentUser.value._id && !checkTodayCheckedIn.value) {
    showModal.value = true;
  } else {
    showModal.value = false;
  }
}
</script>

<template>
  <div v-if="showModal" class="relative">
    <div class="absolute w-screen h-screen">
      <!-- md lg -->
      <div class="sm:hidden lg:block fixed top-[120px] right-[50px] w-70 shadow-lg bg-white rounded py-5 px-5 z-10">
        <div class="flex justify-between items-center mb-3">
          <h6>每日簽到，取得積分！</h6>
          <button class="text-black-6 text-sm pt-[3px] pl-3" @click="showModal = false">
            <i class="icomoon icon-cross"></i>
          </button>
        </div>
        <div class="flex flex-col">
          <BaseButton cate="secondary" content="前往簽到" to="/user" @click="showModal = false"></BaseButton>
        </div>
      </div>
      <!-- sm -->
      <div class="fixed lg:hidden w-full bottom-[84px] shadow-lg bg-white rounded py-5 px-5 z-10">
        <div class="flex justify-between items-center mb-3">
          <h6>每日簽到，取得積分！</h6>
          <button class="text-black-6 text-sm pt-[3px] pl-3" @click="showModal = false">
            <i class="icomoon icon-cross"></i>
          </button>
        </div>
        <div class="flex flex-col">
          <BaseButton cate="secondary" content="前往簽到" to="/user" @click="showModal = false"></BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
