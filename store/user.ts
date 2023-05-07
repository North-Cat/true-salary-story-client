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
            vm.error();
          },
          onResponse({ request, response, options }) {
            if (response.status === 200) {
              vm.currentUser = response._data.data
                .user as unknown as LoginUserInfo;
              vm.isLogin = true;
            } else {
              vm.error();
            }
          },
          onResponseError({ request, response, options }) {
            vm.error();
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
        this.error();
      } else {
        this.error();
      }
    },
    error() {
      const tokenCookie = useCookie('token');
      tokenCookie.value = null;
      this.isLogin = false;
      navigateTo('/');
    },
  },
});
