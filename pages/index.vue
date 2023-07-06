<template>
  <div ref="home">
    <div v-if="isInit" class="loading fixed top-0 left-0 w-screen h-screen bg-white z-[999]">
      <div class="w-full h-full flex justify-center items-center flex-col">
        <!-- 大螢幕 loading -->
        <img class="hidden lg:block -mb-12" src="@/assets/img/logoLoading.gif" alt="logo" />
        <!-- 小螢幕 loading -->
        <img class="sm-loading block lg:hidden w-[100px]" src="@/assets/img/smLogoLoading.svg" alt="logo" />
      </div>
    </div>
    <div class="homePage">
      <!-- banner -->
      <BannerBlock></BannerBlock>

      <!-- 資訊介紹區塊 -->
      <InfoBlock></InfoBlock>

      <!-- 熱門薪資區塊 -->
      <PopularPostBlock></PopularPostBlock>

      <!-- 熱門公司、產業、關鍵字區塊 -->
      <PopularSearchBlock></PopularSearchBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useWindowSize } from '@vueuse/core';
import { useAnimationStore } from '@/store/animation';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
const { userCount, postCount } = storeToRefs(searchStore);

// 取得螢幕寬度
const { width } = useWindowSize();
const mdScreen = 768;
const lgScreen = 1024;
enum Screen {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}
watch(width, (newWidth) => {
  checkCurScreen(newWidth);
});

const curScreen = ref();
function checkCurScreen(widthInput?: number) {
  const curWidth = widthInput || width.value;
  if (curWidth < mdScreen) {
    curScreen.value = Screen.SM;
  } else if (curWidth >= mdScreen && curWidth < lgScreen) {
    curScreen.value = Screen.MD;
  } else if (curWidth >= lgScreen) {
    curScreen.value = Screen.LG;
  }
}

/**
 * 動畫
 */
let isAnimaActive = true;
const animation = useAnimationStore();
const { isInit } = storeToRefs(animation);

const home = ref();
let ctx: gsap.Context;

onMounted(() => {
  checkCurScreen(width.value);
  if (curScreen.value !== Screen.LG) {
    isAnimaActive = false;
  }

  if (isAnimaActive) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ctx = gsap.context((self: gsap.Context) => {
      if (self?.selector) {
        // 隱藏 loading
        const loading = self.selector('.loading');
        if (loading && loading.length !== 0) {
          gsap.to(loading, { display: 'none', opacity: 0, duration: 1 });
        }
        setTimeout(() => {
          isInit.value = false;
        }, 500);

        // banner 資訊出現的動畫
        const bannerInfosTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.banner-info',
            start: 'top bottom',
            end: 'top 20%',
          },
        });
        bannerInfosTl.from('.title', { y: -100, duration: 1 });
        bannerInfosTl.from('.search-input', { y: -100, duration: 1 }, '<');
        bannerInfosTl.from('.count-number', { y: -100, duration: 1 }, '<');

        // 數字動畫
        gsap.fromTo(
          postCount,
          {
            value: 0,
          },
          {
            duration: 1,
            value: postCount.value,
            onUpdate() {
              postCount.value = postCount.value | 0;
            },
          },
        );
        gsap.fromTo(
          userCount,
          {
            value: 0,
          },
          {
            duration: 1,
            value: userCount.value,
            onUpdate() {
              userCount.value = userCount.value | 0;
            },
          },
        );

        // 資訊區動畫
        const infoBlocks: gsap.DOMTarget[] = self.selector('.info-block');
        infoBlocks.forEach((item: gsap.DOMTarget) => {
          gsap.from(item, {
            y: -50,
            ease: 'expo',
            duration: 1,
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 50%',
              end: 'top 20%',
            },
          });
        });

        // 薪水檔案櫃動畫
        const postBlocks = self.selector('.post-block');
        postBlocks.forEach((item: gsap.DOMTarget) => {
          gsap.from(item, {
            y: -50,
            ease: 'expo',
            duration: 1,
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 35%',
              end: 'top 20%',
            },
          });
        });

        // 熱門產業/熱門公司動畫
        const linkBlocks = self.selector('.link-block');
        linkBlocks.forEach((item: gsap.DOMTarget) => {
          gsap.from(item, {
            y: -50,
            ease: 'expo',
            duration: 1,
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 35%',
              end: 'top 20%',
            },
          });
        });

        // 熱門關鍵字動畫
        const keywordBlock = self.selector('.keyword-block');
        gsap.from(keywordBlock, {
          y: -50,
          ease: 'expo',
          duration: 1,
          opacity: 0,
          scrollTrigger: {
            trigger: keywordBlock,
            start: 'top 35%',
            end: 'top 20%',
          },
        });

        // banner圖片動畫
        const bannerBlock = self.selector('.banner');
        gsap.from(bannerBlock, {
          y: -100,
          duration: 1,
          scrollTrigger: {
            trigger: bannerBlock,
            start: 'top 80%',
            end: 'top 20%',
            // scrub: true,
            // markers: true,
          },
        });
        // banner圖片滾動動畫
        const bannerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.banner',
            start: '30% 30%',
            end: '+=1000',
            scrub: 1,
            // markers: true
          },
        });
        // 人物浮動
        bannerTl.to('#banner-person', { yPercent: -30, duration: 10 });
        // 第一組物件浮動，幅度比較大
        bannerTl.to('#banner-paper', { yPercent: -45, duration: 2 }, '<');
        bannerTl.to('#banner-gear', { yPercent: -45, duration: 2 }, '<');
        bannerTl.to('#banner-message', { yPercent: -45, duration: 2 }, '<');
        // 第一組物件浮動，幅度比較小
        bannerTl.to('#banner-pie', { yPercent: -45, duration: 2 }, '<');
        bannerTl.to('#banner-chart', { yPercent: -45, duration: 2 }, '<');
        bannerTl.to('#banner-target', { yPercent: -45, duration: 2 }, '<');
      }
    }, home.value);
  } else {
    isInit.value = false;
  }
});

onUnmounted(() => {
  if (isAnimaActive) {
    ctx.revert();
  }
});

definePageMeta({
  middleware: 'animation',
});
</script>

<style>
.loading-logo .face {
  /* transform: translate(20px, -20px); */
  animation: faceMove 2.5s linear infinite;
}
.loading-logo .eyes {
  /* transform: translate(20px, -20px);  */
  transform-origin: center;
  /* transform: scaleY(0.5); */
  animation: eyesBlink 2.5s linear infinite;
}
@keyframes faceMove {
  0%,
  85%,
  100% {
    transform: translate(0, 0);
  }

  15%,
  70% {
    transform: translate(20px, -20px);
  }
}
@keyframes eyesBlink {
  0%,
  18%,
  40%,
  58%,
  100% {
    transform: scaleY(1);
  }

  9%,
  49% {
    transform: translate(0, -20px) scaleY(0.05);
    /* border-radius: 100%; */
  }
}
@keyframes mouthOpen {
  0%,
  85%,
  100% {
    transform: scaleY(1);
  }

  15%,
  70% {
    transform: scaleY(0.8);
    border-radius: 50%;
  }
}

.sm-loading {
  animation: animaMove 2s linear infinite;
}
@keyframes animaMove {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }
}

.animation-logo .face {
  /* top: 30px;
  left: 46px; */
  animation: faceMove 2.5s linear infinite;
}
.animation-logo .mouth div {
  transform-origin: bottom;
  /* border-radius: 100%; */
  animation: mouthOpen 2.5s linear infinite;
}
.animation-logo .eyes {
  transform-origin: bottom;
  /* transform: scaleY(1); */
  /* transform: scaleY(0.5) rotate(-1deg); */
  animation: eyesBlink 2.5s linear infinite;
}
</style>
