<template>
  <div v-if="isVisible" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
    <div class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h4>0積分</h4>
        <button class="px-2 py-1 text-sm tracking-widest" @click="emit('click')">
          <i class="icon-cross text-lg"></i>
        </button>
      </div>
      <div class="mt-4">
        <div class="mb-4 body">
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
              <span class="caption mb-1">分享薪水情報</span>
              <span class="caption">分享優質內容可獲得較多積分</span>
            </div>
            <BaseButton content="開始分享" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits(['click']);
</script>
