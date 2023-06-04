<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const { userApi } = useApi();

useHead({
  title: '關於我',
});
definePageMeta({
  middleware: 'auth',
});

const user = useUserStore();
const { tryToFetchProfile } = user;
const { currentUser, checkTodayCheckedIn } = storeToRefs(user);

const checkIn = async () => {
  // false 代表尚未簽到
  if (checkTodayCheckedIn.value) {
    return;
  }
  await userApi.postDailyCheckIn();
  nextTick(() => {
    tryToFetchProfile();
  });
};

const checkInText = computed(() => {
  if (checkTodayCheckedIn.value) {
    return '已簽到';
  }
  return '每日簽到';
});
</script>

<template>
  <userLayouts>
    <div class="w-full flex flex-col">
      <div class="w-full">
        <div class="mb-5 flex items-center">
          <h5 class="mr-4">基本資料</h5>
          <BaseButton :cate="checkTodayCheckedIn ? 'gray' : 'primary'" @click="checkIn">
            {{ checkInText }}
          </BaseButton>
        </div>
        <ul class="list-none">
          <li class="mb-2 flex">
            <span class="w-[130px]">姓名:</span>
            <span>{{ currentUser.displayName }}</span>
          </li>
          <li class="mb-2 flex">
            <span class="w-[130px]">註冊信箱:</span>
            <span>{{ currentUser.email }}</span>
          </li>
          <li class="flex">
            <span class="w-[130px]">註冊方式:</span>
            <span>{{ 'Google' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </userLayouts>
</template>
