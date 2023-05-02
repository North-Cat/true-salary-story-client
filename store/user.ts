import { defineStore } from 'pinia';
import { LoginUserInfo } from '@/interface/user';
// import { useFetch } from '@vueuse/core';
interface RequestHeaders extends Headers {
  Authorization?: string;
}
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      currentUser: {} as LoginUserInfo,
      token: '',
    };
  },
  actions: {
    async loginWithGoogle(): Promise<void> {
      const backendUrl = 'https://client-api-dev.up.railway.app/social/google';
      window.location.href = backendUrl;
    },
    async tryToFetchProfile(): Promise<void> {
      const token = this.token;
      const vm = this;
      await useFetch('https://client-api-dev.up.railway.app/user/profile', {
        onRequest({ request, options }) {
          options.headers = {
            ...(options.headers as RequestHeaders),
            Authorization: `Bearer ${token}`,
          };
        },
        onRequestError({ request, options, error }) {
          // Handle the request errors
        },
        onResponse({ request, response, options }) {
          vm.currentUser = response._data.data.user;
        },
      });
    },
  },
});
