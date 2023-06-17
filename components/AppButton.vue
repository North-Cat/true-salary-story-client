<script lang="ts" setup>
import { Ref } from 'vue';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const isInstallable: Ref<boolean> = ref(false);
const deferredPrompt: Ref<BeforeInstallPromptEvent | null> = ref(null);

const installPWA = () => {
  if (!deferredPrompt.value) return;
  isInstallable.value = false;

  deferredPrompt.value.prompt();
  deferredPrompt.value.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt.value = null;
  });
};

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent;
    setTimeout(() => {
      isInstallable.value = true;
    }, 500);
  });
});
</script>

<template>
  <div class="relative">
    <div class="absolute w-screen h-screen">
      <button
        v-if="isInstallable"
        class="fixed bottom-[220px] right-5 lg:bottom-[50px] lg:right-[80px] w-70 shadow-lg border border-gray box-border bg-blue-light hover:-translate-y-2 rounded-full py-5 px-5 z-10 transition duration-300 ease-in-out"
        @click="installPWA"
      >
        <div class="w-10 h-10 md:w-16 md:h-16">
          <img src="@/assets/img/appDownload.png" alt="appDownload" />
        </div>
      </button>
    </div>
  </div>
</template>
