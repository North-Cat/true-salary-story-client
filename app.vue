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
    <!-- 簽到提示 -->
    <RemindCheckIn></RemindCheckIn>
    <!-- 全畫面 loading -->
    <PageLoading></PageLoading>

    <!-- 套用共通 layout (nav 跟 footer)-->
    <NuxtLayout>
      <NuxtLoadingIndicator :throttle="0" color="repeating-linear-gradient(to right,#34cdfe 0%,#366BAB 100%)"/>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
