<template>
  <div ref="home">
    <div v-if="isInit" class="loading fixed top-0 left-0 w-screen h-screen bg-white z-[999]">
      <div class="w-full h-full flex justify-center items-center">
        <img src="@/assets/img/logoLoading.gif" alt="logo" />
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
import { useSearchStore } from '@/store/search';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useAnimationStore } from '@/store/animation';

const searchStore = useSearchStore();
const { userCount, postCount } = storeToRefs(searchStore);

/**
 * 動畫
 */
let isAnimaActive = true;
const animation = useAnimationStore();
const { isInit } = storeToRefs(animation);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const home = ref();
let ctx: gsap.Context;

onMounted(() => {
  if (isAnimaActive) {
    ctx = gsap.context((self: gsap.Context) => {
      if (self && self.selector) {
        // 解決開頭閃現問題 (FOUC)
        const homePage = self.selector('.homePage');
        gsap.to(homePage, { visibility: 'visible', opacity: 1 });
        const loading = self.selector('.loading');
        if (loading && loading.length != 0) {
          gsap.to(loading, { display: 'none', opacity: 0, duration: 1 });
        }
        setTimeout(() => {
          isInit.value = false;
        }, 500);

        // 標題動畫
        const titles = self.selector('.title');
        titles.forEach((item: gsap.DOMTarget) => {
          gsap.from(item, {
            y: -100,
            ease: 'expo',
            duration: 1,
            opacity: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'top 20%',
              // scrub: true,
              // markers: true,
            },
          });
        });

        // 輸入框動畫
        const input = self.selector('.search-input');
        gsap.from(input, {
          y: -100,
          // ease: "expo",
          duration: 1,
          // opacity: 0,
          scrollTrigger: {
            trigger: input,
            start: 'top bottom',
            end: 'top 20%',
            // scrub: true,
            // markers: true,
          },
        });

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

        // 顯示前輩/薪水數量動畫
        const countNumber = self.selector('.count-number');
        gsap.from(countNumber, {
          y: -100,
          // ease: "expo",
          duration: 1,
          // opacity: 0,
          scrollTrigger: {
            trigger: countNumber,
            start: 'top bottom',
            end: 'top 20%',
            // scrub: true,
            // markers: true,
          },
        });

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
              start: 'top 80%',
              end: 'top 20%',
              // scrub: true,
              // markers: true,
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
              start: 'top 80%',
              end: 'top 20%',
              // scrub: true,
              // markers: true,
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
              start: 'top 70%',
              end: 'top 20%',
              // scrub: true,
              // markers: true,
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
            start: 'top 80%',
            end: 'top 20%',
            // scrub: true,
            // markers: true,
          },
        });

        // banner圖片動畫
        const bannerBlock = self.selector('.banner');
        gsap.from(bannerBlock, {
          y: -100,
          ease: 'expo',
          duration: 1,
          opacity: 0,
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
.homePage {
  visibility: hidden;
}
</style>
