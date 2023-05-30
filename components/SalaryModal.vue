<script setup lang="ts">
withDefaults(
  defineProps<{
    isVisible: boolean;
  }>(),
  {
    isVisible: false,
  },
);
// TODO
const point = ref(250);
const emit = defineEmits(['close', 'redeem']);
</script>

<template>
  <teleport to="body">
    <div v-if="isVisible" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
      <div class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h4>{{ point }} 積分</h4>
          <button class="px-2 py-1 text-sm tracking-widest" @click="emit('close')">
            <i class="icon-cross text-lg"></i>
          </button>
        </div>
        <div class="mt-4">
          <div class="mb-4 body">
            <template v-if="point === 0">
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
                  <BaseButton cate="secondary" content="詳細資訊" />
                  <BaseButton content="NT$699" />
                </div>
              </div>
              <div class="flex pb-5 border-b border-black-1 mb-5 justify-between">
                <div class="flex items-center">
                  <div class="icon-sparkle-checked text-blue text-md mr-3"></div>
                  <span class="caption mb-1">每 100 積分可觀看 1 筆薪水情報</span>
                </div>
                <BaseButton content="馬上訂閱" />
              </div>
              <div class="flex pb-5 border-b border-black-1 mb-5 justify-between">
                <div class="flex items-center">
                  <div class="icon-sparkle-checked text-blue text-md mr-3"></div>
                  <span class="caption">分享薪水情報可獲得較多積分</span>
                </div>
                <BaseButton content="開始分享" />
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
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
