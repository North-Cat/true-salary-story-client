import { useUserStore } from '@/store/user';
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  if (!user.isLogin) {
    return navigateTo('/login');
  }
});
