import { defineStore } from 'pinia';
import { ILoginUserInfo, IRequestHeaders } from '~/interface/user';
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
    async loginWithGoogle(): Promise<void> {
      const backendUrl = 'https://client-api-dev.up.railway.app/social/google';
      window.location.href = backendUrl;
    },
    async tryToFetchProfile(isRfresh = false): Promise<void> {
      const token = this.token;
      const vm = this;
      this.isFetchProfileLoading = true;

      await userApi
        .getUserProfile()
        .then(({ data: { user } }) => {
          vm.currentUser = user as unknown as ILoginUserInfo;
          vm.isLogin = true;
          vm.isFetchProfileLoading = false;
        })
        .catch((error) => {
          console.log('error');
          vm.error();
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
