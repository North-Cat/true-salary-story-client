import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref(false);
  const dialogInfo = ref({
    showCancel: false,
    title: '提示',
    message: '',
    cancelText: '取消',
    confirmText: '確認',
    cancelFunc: undefined,
    confirmFunc: undefined,
  });

  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }

  return {
    isOpen,
    dialogInfo,
    open,
    close,
  };
});
