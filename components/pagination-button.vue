<script setup lang="ts">
import { ref } from 'vue';
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
const showLimitPage = 6; // 全顯示上限頁數 (大於此頁數則 "..." 隱藏)
const hiddenLimitPage = {
  // 隱藏頁數狀態下，顯示頁數調整
  min: 1,
  middle: 3,
  max: 5,
};
/**
 * 例如:
 * min: 1, middle: 3, max: 5
 * 總共 12 頁會這樣顯示
 *
 * < 1 2 3 4 5 . 12 > 靠近第一頁: 前五個，最後一個
 * < 1 . 5 6 7 . 12 > 靠進中間頁: 前一個，中間三個，最後一個
 * < 1 . 8 9 10 11 12 > 靠近最後頁: 前一個，最後五個
 */
</script>
<template>
  <div class="pagination flex">
    <button
      :class="{ 'pointer-events-none opacity-60': currentPageComponent == 1 }"
      class="border border-blue rounded text-blue py-3 px-5 me-1.5 hover:bg-blue-light active:bg-blue active:text-white"
      @click="changePage('prev')"
    >
      <h6>上一頁</h6>
    </button>

    <!-- 總頁數 <= 上限，顯示所有頁數 -->
    <div v-if="totalPagesComponent <= showLimitPage">
      <button
        v-for="page in totalPagesComponent"
        :key="page"
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
    <!-- 總頁數 > 上限，隱藏部分頁數避免過長 -->
    <div v-if="totalPagesComponent > showLimitPage" class="flex flex-col">
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
      class="border border-blue rounded text-blue py-3 px-5 ms-1.5 hover:bg-blue-light active:bg-blue active:text-white"
      @click="changePage('next')"
    >
      <h6>下一頁</h6>
    </button>
  </div>
</template>
