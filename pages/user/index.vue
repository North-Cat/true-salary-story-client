<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
useHead({
  title: '關於我',
});
definePageMeta({
  middleware: 'auth',
});
const user = useUserStore();
const { currentUser } = storeToRefs(user);
</script>
<template>
  <userLayouts>
    <div class="w-full flex flex-col">
      <div class="w-full">
        <h5 class="mb-5">基本資料</h5>
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
