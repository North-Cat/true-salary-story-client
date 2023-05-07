import { useUserStore } from '@/store/user';
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  const tokenCookie = useCookie('token');
  if (!tokenCookie.value) {
    navigateTo('/login');
  }
});
