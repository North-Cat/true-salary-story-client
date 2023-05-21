<script setup lang="ts">
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits(['changePageEvent']); // 換頁要呼叫的方法 (會回傳給父元件目前頁數)
const props = defineProps({
  initPage: {
    // 初始選擇頁數
    type: Number,
    default: 1,
  },
  totalPages: {
    // 總頁數
    type: Number,
    required: true,
  },
});
const currentPageComponent = ref(props.initPage);
const totalPagesComponent = ref(props.totalPages);
function changePage(page: string | number) {
  if (page === 'prev') {
    // 上一頁
    currentPageComponent.value--;
    emit('changePageEvent', currentPageComponent.value); // 告訴父元件目前頁數
  } else if (page === 'next') {
    // 下一頁
    currentPageComponent.value++;
    emit('changePageEvent', currentPageComponent.value); // 告訴父元件目前頁數
  } else if (typeof page === 'number') {
    // 點選頁數
    currentPageComponent.value = page;
    emit('changePageEvent', currentPageComponent.value); // 告訴父元件目前頁數
  }
}

/**
 * 顯示用相關
 */

/**
 * 例如:
 * min: 1, middle: 3, max: 5
 * 總共 12 頁會這樣顯示
 *
 * < 1 2 3 4 5 . 12 > 靠近第一頁: 前五個，最後一個
 * < 1 . 5 6 7 . 12 > 靠進中間頁: 前一個，中間三個，最後一個
 * < 1 . 8 9 10 11 12 > 靠近最後頁: 前一個，最後五個
 */
const showLimitPage = ref(6); // 全顯示上限頁數 (大於此頁數則 "..." 隱藏)
const hiddenLimitPage = ref({
  // 隱藏頁數狀態下，顯示頁數調整
  min: 1,
  middle: 2,
  max: 5,
});

/**
 * 偵測瀏覽器寬度
 */
const mdScreen = 768;
const lgScreen = 1024;
enum Screen {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}
// 取得螢幕寬度
const { width } = useWindowSize();
onMounted(() => {
  checkCurScreen(width.value);
});
watch(width, (newWidth) => {
  checkCurScreen(newWidth);
});

const curScreen = ref();
function checkCurScreen(widthInput?: number) {
  const curWidth = widthInput || width.value;
  if (curWidth < mdScreen) {
    curScreen.value = Screen.SM;
    showLimitPage.value = 3;
    hiddenLimitPage.value = {
      min: 1,
      middle: 1,
      max: 2,
    };
  } else if (curWidth >= mdScreen && curWidth < lgScreen) {
    curScreen.value = Screen.MD;
  } else if (curWidth >= lgScreen) {
    curScreen.value = Screen.LG;
  }
}
</script>
<template>
  <div class="pagination flex">
    <button
      :class="{ 'pointer-events-none opacity-60': currentPageComponent == 1 }"
      class="w-full lg:w-auto border border-blue rounded text-blue py-3 px-5 me-1.5 hover:bg-blue-light active:bg-blue active:text-white"
      @click="changePage('prev')"
    >
      <h6>上一頁</h6>
    </button>

    <!-- (Mobile) 下拉選單 -->
    <div v-if="curScreen == Screen.SM">
      <select
        id="pageOption"
        v-model="currentPageComponent"
        name="pageOption"
        class="border border-blue rounded text-blue py-3 px-5"
        @change="changePage(currentPageComponent)"
      >
        <option v-for="page in totalPagesComponent" :key="page" :value="page">{{ page }}</option>
      </select>
    </div>

    <!-- (PC) 總頁數 <= 上限，顯示所有頁數 -->
    <div v-if="totalPagesComponent <= showLimitPage && curScreen == Screen.LG">
      <button
        v-for="page in totalPagesComponent"
        :key="page"
        :class="{
          'bg-blue text-white': currentPageComponent == page,
          'hover:bg-blue-light': currentPageComponent != page,
        }"
        class="border border-blue rounded text-blue py-1 px-3 lg:py-3 lg:px-5 mx-1.5 active:bg-blue active:text-white"
        @click="changePage(page)"
      >
        <h6>{{ page }}</h6>
      </button>
    </div>
    <!-- (PC) 總頁數 > 上限，隱藏部分頁數避免過長 -->
    <div v-if="totalPagesComponent > showLimitPage && curScreen == Screen.LG" class="flex flex-col">
      <!-- 樣式一 : 靠近第一頁 -->
      <div v-if="currentPageComponent <= hiddenLimitPage.middle" class="flex">
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page <= hiddenLimitPage.max"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
        <button class="border border-transparent rounded text-blue py-3 px-[17px] mx-1.5 pointer-events-none">
          <h6>...</h6>
        </button>
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page > totalPagesComponent - hiddenLimitPage.min"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
      </div>

      <!-- 樣式二 : 靠近中間頁 -->
      <div
        v-if="
          currentPageComponent > hiddenLimitPage.middle &&
          currentPageComponent <= totalPagesComponent - hiddenLimitPage.middle
        "
        class="flex"
      >
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page <= hiddenLimitPage.min"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
        <button class="border border-transparent rounded text-blue py-3 px-[17px] mx-1.5 pointer-events-none">
          <h6>...</h6>
        </button>
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="
              page <= currentPageComponent + Math.floor(hiddenLimitPage.middle / 2) &&
              page >= currentPageComponent - Math.floor(hiddenLimitPage.middle / 2)
            "
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
        <button class="border border-transparent rounded text-blue py-3 px-[17px] mx-1.5 pointer-events-none">
          <h6>...</h6>
        </button>
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page > totalPagesComponent - hiddenLimitPage.min"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
      </div>

      <!-- 樣式三 : 靠近最後頁 -->
      <div v-if="currentPageComponent > totalPagesComponent - hiddenLimitPage.middle" class="flex">
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page <= hiddenLimitPage.min"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
        <button class="border border-transparent rounded text-blue py-3 px-[17px] mx-1.5 pointer-events-none">
          <h6>...</h6>
        </button>
        <div v-for="page in totalPagesComponent" :key="page">
          <button
            v-if="page > totalPagesComponent - hiddenLimitPage.max"
            :class="{
              'bg-blue text-white': currentPageComponent == page,
              'hover:bg-blue-light': currentPageComponent != page,
            }"
            class="border border-blue rounded text-blue py-3 px-5 mx-1.5 active:bg-blue active:text-white"
            @click="changePage(page)"
          >
            <h6>{{ page }}</h6>
          </button>
        </div>
      </div>
    </div>

    <button
      :class="{ 'pointer-events-none opacity-60': currentPageComponent == totalPagesComponent }"
      class="w-full lg:w-auto border border-blue rounded text-blue py-3 px-5 ms-1.5 hover:bg-blue-light active:bg-blue active:text-white"
      @click="changePage('next')"
    >
      <h6>下一頁</h6>
    </button>
  </div>
</template>
