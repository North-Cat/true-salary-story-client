<script setup lang="ts">
import { ref } from 'vue';
import infoBlockChart from '@/assets/json/infoBlockChart.json';
import infoBlockTalk from '@/assets/json/infoBlockTalk.json';
import infoBlockData from '@/assets/json/infoBlockData.json';
import infoBlockCheers from '@/assets/json/infoBlockCheers.json';

// 第一區塊
const infoBlockChartOptions = ref({
  animationData: infoBlockChart,
  loop: true,
  autoplay: true, // 要手動撥放的話，autoplay 必須為 false
});
// 第二區塊
const infoBlockTalkOptions = ref({
  animationData: infoBlockTalk,
  loop: true,
  autoplay: true, // 要手動撥放的話，autoplay 必須為 false
});
// 第三區塊
const infoBlockDataOptions = ref({
  animationData: infoBlockData,
  loop: true,
  autoplay: true, // 要手動撥放的話，autoplay 必須為 false
});
// 第四區塊
const infoBlockCheersOptions = ref({
  animationData: infoBlockCheers,
  loop: true,
  autoplay: true, // 要手動撥放的話，autoplay 必須為 false
});
</script>
<template>
  <section class="bg-gray sm:py-10 md:py-10 lg:py-20 max-[1920px]:overflow-x-hidden">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center"
    >
      <!-- sm text-->
      <div class="flex flex-col mb-10 items-center">
        <h4 class="md:hidden lg:hidden mb-2">透過資訊交換</h4>
        <h4 class="md:hidden lg:hidden">找到更滿意的待遇</h4>
      </div>
      <!-- md lg text -->
      <h2 class="sm:hidden md:block lg:block mb-15">透過資訊交換 找到更滿意的待遇</h2>

      <div
        class="info-block max-w-[1076px] flex sm:flex-col lg:flex-row lg:flex-wrap border-2 border-black-10 bg-white sm:py-5 md:py-10 lg:py-10 sm:mb-5 md:mb-10 lg:mb-10 rounded"
      >
        <div
          class="sm:w-[220px] md:w-[520px] lg:w-2/5 w-full mx-auto flex justify-center items-start sm:mb-8 md:mb-8 lg:mb-0"
        >
          <LottieAnimation class="w-[280px]" :options="infoBlockChartOptions" />
        </div>
        <div class="w-full lg:w-3/5 flex flex-col justify-center items-start sm:px-6 lg:px-15">
          <h5 class="md:hidden lg:hidden mb-3">不接地氣的「平均薪資」</h5>
          <h4 class="sm:hidden md:block lg:block mb-5">不接地氣的「平均薪資」</h4>
          <p class="caption text-black-6">
            2021 台灣平均經常性薪資為 45,454 新台幣，然而全台灣約有 70%
            的受僱者未達到此標準。因此,若只觀察平均數，難以反應真實職場薪資分布。
          </p>
        </div>
      </div>

      <div
        class="info-block max-w-[1076px] flex sm:flex-col lg:flex-row lg:flex-wrap border-2 border-black-10 bg-white sm:py-5 md:py-10 lg:py-8 sm:mb-5 md:mb-10 lg:mb-10 rounded"
      >
        <div
          class="w-full lg:w-3/5 flex flex-col justify-center items-start sm:px-6 lg:px-15 sm:order-last lg:order-first"
        >
          <h5 class="md:hidden lg:hidden mb-3">不看官方數字，只看「真實經驗」</h5>
          <h4 class="sm:hidden md:block lg:block mb-5">不看官方數字，只看「真實經驗」</h4>
          <p class="caption text-black-6">
            在台灣，就業市場對於薪資資訊相對封閉，員工更習慣作為個人隱私，在資訊受限的狀況下，爭取個人薪酬福利有如夜路中摸索，難以掌握全局。在真薪話能找到真實經驗分享，除了薪資數字，更有個人工作情形、工作評價等第一手資訊。
          </p>
        </div>
        <div
          class="sm:w-[220px] md:w-[520px] lg:w-2/5 w-full mx-auto flex justify-center items-start sm:mb-8 md:mb-8 lg:mb-0"
        >
          <LottieAnimation class="w-[350px]" :options="infoBlockTalkOptions" />
        </div>
      </div>

      <div
        class="info-block max-w-[1076px] flex sm:flex-col lg:flex-row lg:flex-wrap border-2 border-black-10 bg-white sm:py-5 md:py-10 lg:py-7 sm:mb-5 md:mb-10 lg:mb-10 rounded"
      >
        <div
          class="sm:w-[220px] md:w-[520px] lg:w-2/5 w-full mx-auto flex justify-center items-start sm:mb-8 md:mb-8 lg:mb-0"
        >
          <LottieAnimation class="w-[280px]" :options="infoBlockDataOptions" />
        </div>
        <div class="w-full lg:w-3/5 flex flex-col justify-center items-start sm:px-6 lg:px-15">
          <h5 class="md:hidden lg:hidden mb-3">為什麼薪資透明會是一件好事？</h5>
          <h4 class="sm:hidden md:block lg:block mb-5">為什麼薪資透明會是一件好事？</h4>
          <p class="caption text-black-6">
            我們想創造公正透明的職場文化。實證指出：薪資策略公開環境下的員工，對工作滿意度、積極性及未來展望都明顯提升，更能明確定位生涯目標。從分享開始改變文化，你可以在真薪話安全暢談你的工作待遇。透過分享，與全台灣
            800 萬名工作者一同逐步翻轉現有職場生態。
          </p>
        </div>
      </div>

      <div
        class="info-block max-w-[1076px] flex sm:flex-col lg:flex-row lg:flex-wrap border-2 border-black-10 bg-white sm:py-5 md:py-10 lg:py-5 sm:mb-5 md:mb-10 lg:mb-10 rounded"
      >
        <div
          class="w-full lg:w-3/5 flex flex-col justify-center items-start sm:px-6 lg:px-15 sm:order-last lg:order-first"
        >
          <h5 class="md:hidden lg:hidden mb-3">結伴同行的力量</h5>
          <h4 class="sm:hidden md:block lg:block mb-5">結伴同行的力量</h4>
          <p class="caption text-black-6">
            眾志成城，最珍貴的是人與人之間的連結。在真薪話，可以直接和產業前輩進行對話，取得最有價值的建議。每個人都有機會成為那盞照亮別人的燈。
          </p>
        </div>
        <div
          class="sm:w-[220px] md:w-[520px] lg:w-2/5 w-full mx-auto flex justify-center items-start sm:mb-8 md:mb-8 lg:mb-0"
        >
          <LottieAnimation class="w-[370px]" :options="infoBlockCheersOptions" />
        </div>
      </div>
    </div>
  </section>
</template>
