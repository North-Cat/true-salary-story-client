import { storeToRefs } from 'pinia';
import { useAnimationStore } from '@/store/animation';

export default defineNuxtRouteMiddleware((to, from) => {
  const animation = useAnimationStore();
  const { isInit } = storeToRefs(animation);

  if (to.path !== from.path) {
    isInit.value = false;
  } else {
    isInit.value = true;
  }
});
