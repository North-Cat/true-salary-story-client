import { useUserStore } from '@/store/user';
export default defineNuxtPlugin((nuxtApp) => {
  const user = useUserStore();
  const { tryToFetchProfile } = user;
  nuxtApp.hook('app:created', () => {
    const jwtToken = useCookie('token');
    if (jwtToken.value) {
      user.isLogin = true;
      user.token = jwtToken.value as string;
      tryToFetchProfile();
    }
  });
});
