import { defineStore } from 'pinia';
import { ILoginUserInfo, IRequestHeaders } from '~/interface/user';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      currentUser: {} as ILoginUserInfo,
      token: '',
      isFetchProfileLoading: false,
    };
  },
  actions: {
    async loginWithGoogle(): Promise<void> {
      const backendUrl = '/api/social/google';
      window.location.href = backendUrl;
    },
    async tryToFetchProfile(isRfresh = false): Promise<void> {
      const token = this.token;
      const vm = this;
      this.isFetchProfileLoading = true;
      const { data, error, refresh } = await useFetch('/api/user/profile', {
        onRequest({ request, options }) {
          options.headers = {
            ...(options.headers as IRequestHeaders),
            Authorization: `Bearer ${token}`,
          };
        },
        onRequestError({ request, options, error }) {
          vm.error();
        },
        onResponse({ request, response, options }) {
          if (response.status === 200) {
            vm.currentUser = response._data.data
              .user as unknown as ILoginUserInfo;
            vm.isLogin = true;
            vm.isFetchProfileLoading = false;
          } else {
            vm.error();
          }
        },
        onResponseError({ request, response, options }) {
          vm.error();
        },
      });
      if (isRfresh) {
        refresh();
      }
    },
    async logout(): Promise<void> {
      const token = this.token;
      const { data, error } = await useFetch('/api/auth/logout', {
        method: 'POST',
        onRequest({ request, options }) {
          options.headers = {
            ...(options.headers as IRequestHeaders),
            Authorization: `Bearer ${token}`,
          };
        },
      });
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
      this.isFetchProfileLoading = false;
      navigateTo('/');
    },
  },
});
