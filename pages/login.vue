<script setup lang="ts">
import { useUserStore } from '@/store/user';

const user = useUserStore();
const route = useRoute();
const router = useRouter();
const { tryToFetchProfile } = user;
definePageMeta({
  layout: false,
});
useHead({
  title: '登入',
});

const loginHandler = (params: string) => {
  if (params === 'google') {
    user.loginWithGoogle();
  }
};

const checkLoginStatus = () => {
  const jwtToken = route.query.token;
  if (jwtToken) {
    // user.isLogin = true;
    const tokenCookie = useCookie('token', { maxAge: 60 * 60 });
    tokenCookie.value = jwtToken as string;
    // localStorage.setItem('token', jwtToken as string);
    user.token = jwtToken as string;
    // 回到登入前的頁面 (因為 google 登入的關係登入佔兩頁，所以回到兩頁前)
    router.go(-2);
    nextTick(() => {
      tryToFetchProfile();
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
