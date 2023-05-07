<script lang="ts" setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - 真薪話` : '真薪話';
    },
  });
  import { useUserStore } from '@/store/user';
  const user = useUserStore();
  const { tryToFetchProfile } = user;
  // const checkLoginStatus = () => {
  //   const jwtToken = localStorage.getItem('token');
  //   // const jwtToken = useCookie('token').value
  // if (user.token) {
  //     // user.isLogin = true;
  //     user.token = jwtToken as string;
  // tryToFetchProfile(true);
  // }
  // };
  // onMounted(() => {
  // checkLoginStatus();
  // });
</script>
<template>
  <div>
    <!-- 套用共通 layout (nav 跟 footer)-->
    <NuxtLayout>
      <!-- <NuxtPage /> 用於路由設定，會根據 pages/ 資料夾底下的檔案名稱作為路由，例如 "/about" 會載入 "pages/about.vue"，而 "/" 預設載入 "pages/index.vue" -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
