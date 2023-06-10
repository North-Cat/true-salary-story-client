import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
  const isShowLoading = ref(false);
  const loadingCount = ref(0);

  function setLoadingCount(number: number) {
    loadingCount.value = number;
  }
  function showLoading() {
    isShowLoading.value = true;
  }
  function hideLoading() {
    isShowLoading.value = false;
  }

  return {
    isShowLoading,
    loadingCount,
    setLoadingCount,
    showLoading,
    hideLoading,
  };
});
