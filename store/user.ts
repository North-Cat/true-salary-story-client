import { defineStore } from 'pinia';
import { LoginUserInfo } from '@/interface/user';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
    };
  },
  actions: {
    async loginWithGoogle(): Promise<void> {
      const backendUrl = 'https://client-api-dev.up.railway.app/social/google';
      window.location.href = backendUrl;
    },
  },
});
