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
      currentPoint: 0,
    };
  },
  actions: {
    loginWithGoogle() {
      const {
        public: { apiBase },
      } = useRuntimeConfig();
      const backendUrl = `${apiBase}/social/google`;
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
          this.currentPoint = user && user.points ? user.points.point : 0;
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
      const redirectToCookie = useCookie('redirectTo');
      redirectToCookie.value = null;
      const tokenCookie = useCookie('token');
      tokenCookie.value = null;
      this.isLogin = false;
      this.isFetchProfileLoading = false;
      navigateTo('/');
    },
  },
});
