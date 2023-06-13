<template>
  <div ref="home">
    <div v-if="isInit" class="loading fixed top-0 left-0 w-screen h-screen bg-white z-[999]">
      <div class="w-full h-full flex justify-center items-center flex-col">
        <!-- <BaseLoading></BaseLoading> -->
        <img class="hidden lg:block -mb-12" src="@/assets/img/logoLoading.gif" alt="logo"/>
        
        <!-- <div class="sm-loading block lg:hidden h-10 w-10 rounded-full bg-blue"></div> -->
        
        <div class="sm-loading block lg:hidden w-[100px]">
          <div></div>
          <svg class="w-full" width="192" height="161" viewBox="0 0 192 161" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.3684 126.91C69.7303 196.606 220.616 125.857 183.323 54.1697C146.03 -17.5179 5.2891 53.3975 38.3684 126.91Z" fill="#8CB4E4"/>
            <path d="M10.4951 19.3772C13.7893 18.164 17.4432 19.8509 18.6564 23.1451C20.1889 27.306 24.5725 33.4604 31.0135 38.9295C37.3948 44.3479 45.0212 48.4302 52.5065 49.388C55.9886 49.8336 58.4502 53.0175 58.0046 56.4996C57.5591 59.9817 54.3751 62.4433 50.893 61.9977C40.1987 60.6293 30.3491 55.0424 22.7853 48.6199C15.2812 42.2482 9.25064 34.3902 6.72723 27.5386C5.51401 24.2444 7.20093 20.5904 10.4951 19.3772Z" fill="#2B2B31"/>
            <path d="M111.934 13.7064C132.424 15.0206 151.634 24.5088 162.338 46.9023C176.982 77.5363 159.637 107.73 134.672 126.806C109.668 145.912 73.9805 156.494 46.1 146.648C23.8895 138.805 2.18796 112.02 12.6033 72.2817C13.4933 68.8859 16.9676 66.8546 20.3634 67.7446C23.7591 68.6346 25.7905 72.1089 24.9004 75.5047C16.2294 108.588 34.101 128.929 50.3331 134.661C72.7734 142.586 103.99 134.252 126.954 116.705C149.958 99.1268 161.646 74.9296 150.869 52.385C142.508 34.8938 127.909 27.4697 111.12 26.3929C94.0032 25.295 74.8357 30.8975 59.112 39.5833C56.0392 41.2808 52.1721 40.1658 50.4747 37.093C48.7773 34.0202 49.8922 30.1532 52.965 28.4557C70.1893 18.941 91.7713 12.4132 111.934 13.7064Z" fill="#2B2B31"/>
            <path d="M104.767 61.6723C106.923 58.9017 110.917 58.4032 113.687 60.5589L121.489 66.6291C124.259 68.7848 124.758 72.7784 122.602 75.549C120.446 78.3196 116.453 78.818 113.682 76.6623L105.881 70.5922C103.11 68.4364 102.612 64.4429 104.767 61.6723Z" fill="#2B2B31"/>
            <path d="M77.8896 76.071C80.0453 73.3004 84.0389 72.8019 86.8095 74.9576L94.6111 81.0278C97.3817 83.1835 97.8801 87.1771 95.7244 89.9477C93.5687 92.7183 89.5751 93.2168 86.8045 91.061L79.0029 84.9909C76.2323 82.8352 75.7339 78.8416 77.8896 76.071Z" fill="#2B2B31"/>
            <path d="M51.0118 86.4697C53.1675 83.6991 57.1611 83.2006 59.9317 85.3563L67.7333 91.4265C70.5039 93.5822 71.0023 97.5758 68.8466 100.346C66.6909 103.117 62.6973 103.615 59.9267 101.46L52.1251 95.3896C49.3545 93.2339 48.8561 89.2403 51.0118 86.4697Z" fill="#2B2B31"/>
          </svg>
        </div>


        <!-- <div class="w-[150px] h-auto">
          <div class="animation-logo">
            <div class="face absolute top-[33px] left-[38px] -rotate-[7deg]">
              <div class="eyes flex">
                <div class="w-[5px] h-3 bg-black-10 rounded me-[5px]"></div>
                <div class="w-[5px] h-3 bg-black-10 rounded"></div>
              </div>
              <div class="mouth flex -rotate-[46deg]">
                <div class="w-[5px] h-2 bg-black-10 rounded top-[1px] left-[2px]"></div>
              </div>
            </div>
          </div>
          <svg class="loading-logo w-full h-full" width="420" height="300" viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M232.368 244.91C263.73 314.606 414.616 243.857 377.323 172.17C340.03 100.482 199.289 171.397 232.368 244.91Z" fill="#8CB4E4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.6842 159.857C43.107 159.078 46.5136 161.221 47.2928 164.644C48.321 169.161 49.5485 173.483 50.9545 177.617C52.0849 180.94 50.307 184.551 46.9835 185.681C43.6599 186.812 40.0494 185.034 38.919 181.71C37.3693 177.154 36.0222 172.407 34.8974 167.466C34.1182 164.043 36.2613 160.637 39.6842 159.857ZM50.6804 194.127C53.7563 192.435 57.6213 193.557 59.3132 196.633C82.2905 238.406 126.236 256.339 159.245 257.693C162.752 257.836 165.479 260.796 165.336 264.304C165.192 267.811 162.232 270.538 158.724 270.394C122.34 268.903 73.7668 249.287 48.1745 202.759C46.4826 199.684 47.6045 195.819 50.6804 194.127Z" fill="#8CB4E4"/>
            <path d="M204.495 137.378C207.789 136.164 211.443 137.851 212.656 141.146C214.189 145.306 218.572 151.461 225.013 156.93C231.395 162.348 239.021 166.431 246.507 167.388C249.989 167.834 252.45 171.018 252.005 174.5C251.559 177.982 248.375 180.444 244.893 179.998C234.199 178.63 224.349 173.043 216.785 166.62C209.281 160.249 203.251 152.391 200.727 145.539C199.514 142.245 201.201 138.591 204.495 137.378Z" fill="#2B2B31"/>
            <path d="M305.934 131.707C326.424 133.021 345.634 142.509 356.338 164.903C370.982 195.537 353.637 225.73 328.672 244.806C303.668 263.912 267.98 274.495 240.1 264.649C217.889 256.805 196.188 230.02 206.603 190.282C207.493 186.886 210.968 184.855 214.363 185.745C217.759 186.635 219.79 190.109 218.9 193.505C210.229 226.589 228.101 246.929 244.333 252.662C266.773 260.586 297.99 252.252 320.954 234.705C343.958 217.127 355.646 192.93 344.869 170.386C336.508 152.894 321.909 145.47 305.12 144.393C288.003 143.296 268.836 148.898 253.112 157.584C250.039 159.281 246.172 158.166 244.475 155.093C242.777 152.021 243.892 148.154 246.965 146.456C264.189 136.941 285.771 130.414 305.934 131.707Z" fill="#2B2B31"/>
            <path d="M298.767 179.673C300.923 176.902 304.917 176.404 307.687 178.559L315.489 184.63C318.259 186.785 318.758 190.779 316.602 193.549C314.446 196.32 310.453 196.819 307.682 194.663L299.881 188.593C297.11 186.437 296.612 182.443 298.767 179.673Z" fill="#2B2B31"/>
            <path d="M271.89 194.071C274.045 191.301 278.039 190.802 280.809 192.958L288.611 199.028C291.382 201.184 291.88 205.178 289.724 207.948C287.569 210.719 283.575 211.217 280.805 209.062L273.003 202.991C270.232 200.836 269.734 196.842 271.89 194.071Z" fill="#2B2B31"/>
            <path d="M245.012 204.47C247.168 201.7 251.161 201.201 253.932 203.357L261.733 209.427C264.504 211.583 265.002 215.576 262.847 218.347C260.691 221.118 256.697 221.616 253.927 219.46L246.125 213.39C243.355 211.234 242.856 207.241 245.012 204.47Z" fill="#2B2B31"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M110.018 57.7677C86.915 70.1946 70.5033 98.049 71.7299 134.636C73.4758 186.713 123.594 234.203 190.912 232.553C194.422 232.467 197.422 238.752 197.422 238.752C197.422 238.752 194.733 245.176 191.224 245.262C118.093 247.054 61.0413 195.218 59.0245 135.062C57.6642 94.4889 75.942 61.662 103.995 46.5721C131.046 32.0215 165.737 34.7232 197.829 60.5117C215.523 45.6331 242.578 39.8709 266.107 45.7036C279.041 48.9101 291.196 55.6817 300.233 66.6706C309.297 77.6922 314.892 92.5517 315.353 111.329C315.439 114.839 312.663 117.753 309.154 117.839C305.645 117.925 302.73 115.15 302.644 111.641C302.244 95.3061 297.44 83.2877 290.415 74.7455C283.363 66.1706 273.737 60.6925 263.048 58.0427C241.353 52.6645 216.441 59.1858 202.59 73.4174L198.381 77.7419L193.844 73.7628C163.857 47.4634 132.882 45.4687 110.018 57.7677Z" fill="#2B2B31"/>
            <g class="face">
              <path d="M117.579 137.892C119.735 135.121 123.728 134.623 126.499 136.778L134.3 142.848C137.071 145.004 137.569 148.998 135.414 151.768C133.258 154.539 129.264 155.037 126.494 152.882L118.692 146.812C115.922 144.656 115.423 140.662 117.579 137.892Z" fill="#2B2B31"/>
              <g class="eyes">
                <path d="M109.678 94.7381C113.162 94.3033 116.338 96.7748 116.773 100.258L119.37 121.066C119.805 124.549 117.334 127.726 113.85 128.16C110.367 128.595 107.19 126.124 106.755 122.64L104.158 101.833C103.724 98.3493 106.195 95.1729 109.678 94.7381Z" fill="#2B2B31"/>
                <path d="M137.422 91.2752C140.905 90.8405 144.081 93.3119 144.516 96.7953L147.113 117.603C147.548 121.086 145.077 124.263 141.593 124.698C138.11 125.132 134.933 122.661 134.499 119.177L131.902 98.3698C131.467 94.8864 133.938 91.71 137.422 91.2752Z" fill="#2B2B31"/>
              </g>
            </g>
          </svg>
        </div> -->

      </div>
    </div>
    <div class="homePage" :class="{'invisible':isAnimaActive, }">
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
import { useWindowSize } from '@vueuse/core';

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
  if (curScreen.value !== Screen.LG){
    isAnimaActive = false;
  }
  
  if (isAnimaActive) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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
    transform: translate(0, 0)
  }

  15%,
  70% {
    transform: translate(20px, -20px)
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
.animation-logo .mouth div{
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
