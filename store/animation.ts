import { defineStore } from 'pinia';

export const useAnimationStore = defineStore('animation', () => {
  // 用於判斷是否為第一次進入頁面，需要載入 loading 動畫
  const isInit = ref(true);

  return {
    isInit,
  };
});
