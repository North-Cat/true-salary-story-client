<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 真薪話` : '真薪話';
  },
});

const pwaEnv = ref('');

const runtimeConfig = useRuntimeConfig();
pwaEnv.value = runtimeConfig.public.pwaEnv;

onMounted(() => {});
</script>
<template>
  <div>
    <VitePwaManifest v-if="pwaEnv !== 'local'" />
    <!-- modal -->
    <default-modal></default-modal>
    <!-- message -->
    <client-only>
      <notifications position="top right" class="my-notification" :duration="3000" :max="5" />
    </client-only>

    <!-- 套用共通 layout (nav 跟 footer)-->
    <NuxtLayout>
      <!-- <NuxtPage /> 用於路由設定，會根據 pages/ 資料夾底下的檔案名稱作為路由，例如 "/about" 會載入 "pages/about.vue"，而 "/" 預設載入 "pages/index.vue" -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
