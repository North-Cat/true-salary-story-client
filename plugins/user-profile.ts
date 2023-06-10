import { useUserStore } from '@/store/user';
import { useWSStore } from '@/store/ws';

export default defineNuxtPlugin((nuxtApp) => {
  const user = useUserStore();
  const wsStore = useWSStore();

  const { tryToFetchProfile } = user;

  nuxtApp.hook('app:created', async () => {
    const jwtToken = useCookie('token');
    if (jwtToken.value) {
      user.isLogin = true;
      user.token = jwtToken.value as string;

      await tryToFetchProfile();

      if (!import.meta.env.SSR) {
        wsStore.init();
      }
    }
  });
});
