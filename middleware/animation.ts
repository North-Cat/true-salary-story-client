import { storeToRefs } from 'pinia';
import { useAnimationStore } from '@/store/animation';

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path) {
    const animation = useAnimationStore();
    const { isInit } = storeToRefs(animation);
    isInit.value = false;
  }
});
