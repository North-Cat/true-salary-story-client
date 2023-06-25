<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useWSStore } from '@/store/ws';

const user = useUserStore();
const route = useRoute();
const wsStore = useWSStore();

const { tryToFetchProfile } = user;
definePageMeta({
  layout: false,
  middleware: 'logged-in-redirect',
});
useHead({
  title: '登入',
});

const loginHandler = (params: string) => {
  if (params === 'google') {
    user.loginWithGoogle();
  }
};

const biometricLoginHandler = () => {
  user.enableBiometricLogin();
};

const checkLoginStatus = () => {
  const jwtToken = route.query.token;
  if (jwtToken) {
    // user.isLogin = true;
    const tokenCookie = useCookie('token', { maxAge: 60 * 60 });
    tokenCookie.value = jwtToken as string;
    // localStorage.setItem('token', jwtToken as string);
    user.token = jwtToken as string;
    // 回到登入前的頁面
    const redirectToCookie = useCookie('redirectTo');
    let redirectUrl = '/';

    if (redirectToCookie.value) {
      let redirectToValue = redirectToCookie.value;
      const index = redirectToValue?.indexOf('&');
      redirectToValue =
        index > 1 ? redirectToValue?.slice(0, index) + '?' + redirectToValue?.slice(index + 1) : redirectToValue;
      redirectUrl = redirectToValue || redirectToCookie.value;
    }
    navigateTo(redirectUrl);
    nextTick(async () => {
      await tryToFetchProfile();

      if (!import.meta.env.SSR) {
        wsStore.init();
      }
    });
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <div class="login h-screen w-screen flex justify-center items-center">
    <div class="login-box bg-white border-2 p-10 w-10/12 md:w-[400px]">
      <nuxt-link to="/">
        <img src="~/assets/img/LOGO.png" alt="LOGO" class="w-[120px] md:w-[150px]" />
      </nuxt-link>
      <h2 class="text-blue mt-5 md:text-3xl text-2xl">有比較才有進步</h2>
      <div class="mt-10">
        <div
          class="bg-black-1 flex cursor-pointer justify-center items-center py-4 px-5 mt-3 w-full hover:text-black-6 rounded-lg"
          @click="loginHandler('google')"
        >
          <img src="~/assets/img/google.svg" alt="" width="20" class="mr-2" /><span>使用 Google 繼續</span>
        </div>
      </div>
      <div class="mt-5">
        <div
          class="bg-black-1 flex cursor-pointer justify-center items-center py-4 px-5 mt-3 w-full hover:text-black-6 rounded-lg"
          @click="biometricLoginHandler()"
        >
          <span>使用生物登入</span>
        </div>
      </div>
      <div class="mt-10 text-sm text-black-5">
        繼續代表你同意真薪話「服務條款」與「隱私權政策」。真薪話不會將您的個人資訊用於任何商業用途,或公開顯示在畫面中。
      </div>
    </div>
  </div>
</template>

<style>
.login {
  background: #f5f5f8;
}
</style>
