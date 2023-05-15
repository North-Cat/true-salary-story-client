<template>
  <div v-if="dialogStore.isOpen" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
    <div ref="defaultModal" class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h4>{{ dialogStore.dialogInfo.title }}</h4>
        <button class="px-2 py-1 text-sm tracking-widest" @click="dialogStore.close()">
          <i class="icon-cross text-lg"></i>
        </button>
      </div>
      <div class="mt-4">
        <p class="mb-4 body">
          {{ dialogStore.dialogInfo.message }}
        </p>
        <div class="flex justify-end">
          <button
            class="flex py-3 px-5 justify-center items-center rounded transition duration-300 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10"
            @click="
              dialogStore.dialogInfo.confirmFunc ? dialogStore.dialogInfo.confirmFunc() : undefined, dialogStore.close()
            "
          >
            {{ dialogStore.dialogInfo.confirmText }}
          </button>
          <button
            v-if="dialogStore.dialogInfo.showCancel"
            class="flex py-3 px-5 justify-center items-center rounded transition duration-300 ease-in-out flex-row text-blue fill-blue bg-white border border-blue hover:bg-blue-light ms-5"
            @click="
              dialogStore.dialogInfo.cancelFunc ? dialogStore.dialogInfo.cancelFunc() : undefined, dialogStore.close()
            "
          >
            {{ dialogStore.dialogInfo.cancelText }}
          </button>
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
</script>
