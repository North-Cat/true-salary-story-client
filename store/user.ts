import { defineStore } from 'pinia';
import { ILoginUserInfo } from '~/interface/user';
const { userApi } = useApi();
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
    loginWithGoogle() {
      const backendUrl = 'https://client-api-dev.up.railway.app/social/google';
      window.location.href = backendUrl;
    },
    async tryToFetchProfile(): Promise<void> {
      this.isFetchProfileLoading = true;

      await userApi
        .getUserProfile()
        .then(({ data: { user } }) => {
          this.currentUser = user as unknown as ILoginUserInfo;
          this.isLogin = true;
          this.isFetchProfileLoading = false;
        })
        .catch(() => {
          this.error();
        });
    },
    async logout(): Promise<void> {
      const { data } = await userApi.postLogout();
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
