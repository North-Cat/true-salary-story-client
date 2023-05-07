<script lang="ts" setup>
  useHead({
    title: '關於我',
  });
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/user';
  const user = useUserStore();
  const { currentUser } = storeToRefs(user);
</script>
<template>
  <userLayouts>
    <div class="w-full flex flex-col p-6">
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
        <!-- <div class="mr-3">
          <input
            type="text"
            class="w-full border border-black-1 rounded py-3 px-4 mb-5"
            placeholder="開始日期"
          />
        </div>
        <div class="mr-3">
          <input
            type="text"
            class="w-full border border-black-1 rounded py-3 px-4 mb-5"
            placeholder="開始日期"
          />
        </div> -->
      </div>
    </div>
  </userLayouts>
</template>
