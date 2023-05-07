import { defineStore } from 'pinia';
import { LoginUserInfo, RequestHeaders } from '@/interface/user';
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
    async tryToFetchProfile(isRfresh = false): Promise<void> {
      const token = this.token;
      const vm = this;
      const { data, error, refresh } = await useFetch(
        'https://client-api-dev.up.railway.app/user/profile',
        {
          onRequest({ request, options }) {
            options.headers = {
              ...(options.headers as RequestHeaders),
              Authorization: `Bearer ${token}`,
            };
          },
          onRequestError({ request, options, error }) {
            vm.logout();
          },
          onResponse({ request, response, options }) {
            if (response.status === 401) {
              vm.logout();
              return;
            }
            vm.currentUser = response._data.data
              .user as unknown as LoginUserInfo;
            vm.isLogin = true;
          },
          onResponseError({ request, response, options }) {
            vm.logout();
          },
        },
      );
      if (isRfresh) {
        refresh();
      }
    },
    async logout(): Promise<void> {
      const token = this.token;
      const { data, error } = await useFetch(
        'https://client-api-dev.up.railway.app/auth/logout',
        {
          method: 'POST',
          onRequest({ request, options }) {
            options.headers = {
              ...(options.headers as RequestHeaders),
              Authorization: `Bearer ${token}`,
            };
          },
        },
      );
      if (data) {
        // localStorage.removeItem('token');
        const tokenCookie = useCookie('token');
        tokenCookie.value = null;
        this.isLogin = false;
      } else {
        // localStorage.removeItem('token');
        const tokenCookie = useCookie('token');
        tokenCookie.value = null;
        this.isLogin = false;
      }
    },
  },
});
