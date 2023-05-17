<template>
  <div v-if="isVisible" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
    <div ref="defaultModal" class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h4>0積分</h4>
        <button class="px-2 py-1 text-sm tracking-widest" @click="dialogStore.close()">
          <i class="icon-cross text-lg"></i>
        </button>
      </div>
      <div class="mt-4">
        <div class="mb-4 body">
          <h4>加薪計畫</h4>
          <p>6+6個月薪水任你看、贈送2000積分、無廣告體驗，以及10%積分回饋</p>
          <div>
            <button>詳細資訊</button>
            <button>NT$699</button>
          </div>
          <div>
            <div>
              <div>100積分 可兌換1則薪水情報</div>
              <button>NT$150</button>
            </div>
            <div>
              <div>分享薪水情報 分享優質內容可獲得較多積分</div>
            </div>
            <button>開始分享</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useDialogStore } from '@/store/dialog';
const dialogStore = useDialogStore();

const defaultModal = ref(null);
onClickOutside(defaultModal, () => {
  dialogStore.close();
});
defineProps<{
  isVisible: boolean;
}>();
</script>
