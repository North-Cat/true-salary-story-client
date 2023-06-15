<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { currentPoint } = storeToRefs(userStore);
const router = useRouter();
withDefaults(
  defineProps<{
    isVisible: boolean;
  }>(),
  {
    isVisible: false,
  },
);
const emit = defineEmits(['close', 'redeem']);
</script>

<template>
  <BaseModal :is-visible="isVisible" @close="emit('close')">
    <template #title>
      <h4>{{ currentPoint }} 積分</h4>
    </template>
    <template #body>
      <template v-if="currentPoint === 0">
        <div class="p-4 bg-blue-light mb-5">
          <div class="flex justify-between items-center">
            <h4 class="text-blue mb-3">加薪計畫</h4>
            <div class="icon-fire text-6xl text-blue"></div>
          </div>
          <div class="mb-4">
            <span class="caption mb-1">6+6 個月薪水任你看、</span>
            <span class="caption">贈送 2000 積分、無廣告體驗，以及 10% 積分回饋！</span>
          </div>
          <div class="flex justify-between pb-5 px-16">
            <BaseButton cate="secondary" content="詳細資訊" @click="router.push('/order/offer')" />
            <BaseButton content="NT$699" @click="router.push('/order/checkout?type=subscription')" />
          </div>
        </div>
        <div class="flex pb-5 border-b border-black-1 mb-5 justify-between">
          <div class="flex items-center">
            <div class="icon-sparkle-checked text-blue text-md mr-3"></div>
            <span class="caption mb-1">每 100 積分可觀看 1 筆薪水情報</span>
          </div>
          <BaseButton content="馬上訂閱" @click="router.push('/order/checkout?type=single&point=100')" />
        </div>
        <div class="flex pb-5 border-b border-black-1 mb-5 justify-between">
          <div class="flex items-center">
            <div class="icon-sparkle-checked text-blue text-md mr-3"></div>
            <span class="caption">分享薪水情報可獲得較多積分</span>
          </div>
          <BaseButton content="開始分享" @click="router.push('/share-my-salary')" />
        </div>
      </template>
      <template v-else>
        <div class="p-4 bg-blue-light mb-5">
          <h4 class="text-blue mb-3">閱讀薪水情報</h4>
          <span class="caption">兌換時，優先使用即將到期的積分</span>
          <div class="flex justify-center py-5 px-16">
            <BaseButton content="使用100積分兌換" @click="emit('redeem')" />
          </div>
        </div>
      </template>
    </template>
  </BaseModal>
</template>
