<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted, watch } from 'vue';
import { showInfo } from '@/utilities/message';

useHead({
  title: '單一公司全部薪水分享',
});

// 職位
const titleOptions = ['全部', '業務', '高級專員'];
const titleValue = ref<string[]>([]);
watch(titleValue, async (newQuestion, oldQuestion) => {
  console.log(titleValue.value);
});
// 排序
const sortOptions = [
  { text: '分享時間 近→遠', value: 1 },
  { text: '分享年薪 高→低', value: 2 },
  { text: '在職年資 長→短', value: 3 },
  { text: '心情 好→壞', value: 4 },
];
const sortValue = ref();
watch(sortValue, async (newQuestion, oldQuestion) => {
  console.log(sortValue.value);
});
// 關鍵字
const keywords = ref<string[]>([]);
onMounted(() => {
  keywords.value = [
    '新代科技',
    '廣積科技',
    '達爾科技',
    '二億企業股份有限公司',
    '金屬中心',
    '聯府塑膠年終',
    '健鼎科技',
    '台灣神隆',
    '住華科技',
    '大力卜',
    '國泰人壽襄理薪水',
    '鎧暘科技',
    '奇鋐科技',
    '威芯科技有限公司',
    '南山人壽協理',
    '先進光電',
    '樹森開發股份有限公司',
    '米約科技',
    '中勤實業股份有限公司',
    '精英電腦薪水',
    '天陽航太',
    '研華',
    '神準科技',
    '台積電',
    '中強光電',
    '住華科技',
    '大力卜',
    '國泰人壽襄理薪水',
    '鎧暘科技',
    '奇鋐科技',
    '威芯科技有限公司',
    '南山人壽協理',
    '先進光電',
    '樹森開發股份有限公司',
    '米約科技',
    '中勤實業股份有限公司',
    '精英電腦薪水',
    '天陽航太',
    '研華',
    '神準科技',
    '台積電',
    '中強光電',
    '住華科技',
    '大力卜',
    '國泰人壽襄理薪水',
    '鎧暘科技',
    '奇鋐科技',
    '威芯科技有限公司',
    '南山人壽協理',
    '先進光電',
    '樹森開發股份有限公司',
    '米約科技',
    '中勤實業股份有限公司',
    '精英電腦薪水',
    '天陽航太',
    '研華',
    '神準科技',
    '台積電',
    '中強光電',
    '住華科技',
    '大力卜',
    '國泰人壽襄理薪水',
    '鎧暘科技',
    '奇鋐科技',
    '威芯科技有限公司',
    '南山人壽協理',
    '先進光電',
    '樹森開發股份有限公司',
    '米約科技',
    '中勤實業股份有限公司',
    '精英電腦薪水',
    '天陽航太',
    '研華',
    '神準科技',
    '台積電',
    '中強光電',
  ];
});

// 點擊關鍵字搜尋
function keywordSearch(keyword: string) {
  let paramObj;
  paramObj = !keyword.trim()
    ? undefined
    : {
        searchType: 'keyword',
        param: keyword.trim(),
        page: 1, // 搜尋第一頁
      };
  if (!paramObj) {
    showInfo('提示', '請輸入搜尋條件');
    return;
  }
  search(paramObj);
}
// 帶著參數導頁至搜尋頁面
async function search(paramObj: { searchType: string; param: string; page: number }) {
  await navigateTo({
    path: '/search',
    query: paramObj,
  });
}

// 行動版篩選選單 modal
const showFilterModal = ref(false);
const filterModal = ref(null);
onClickOutside(filterModal, () => {
  showFilterModal.value = false;
});
</script>
<template>
  <section class="companies">
    <div class="max-[1920px]:overflow-x-hidden bg-white mt-[38px] lg:mt-[108px]">
      <div
        class="mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center py-5 md:py-20 lg:pb-10 lg:pt-6"
      >
        <div class="hidden w-full lg:flex justify-start caption text-black-6 mb-15">
          <nuxt-link to="/">真薪話</nuxt-link>
          <div class="mx-3">|</div>
          <nuxt-link to="/search?searchType=type&param=資訊科技&page=1">資訊科技</nuxt-link>
          <div class="mx-3">></div>
          <nuxt-link to="/companies/98765432">OOO資訊科技有限公司</nuxt-link>
        </div>
        <div class="w-full flex flex-col lg:flex-row lg:justify-between">
          <div class="w-full lg:w-3/5 flex me-6 mb-5 lg:mb-0">
            <!-- sm -->
            <svg
              class="flex lg:hidden"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="4" fill="#5FA8FF" />
              <path
                d="M20.513 12.8007C23.5946 15.5556 24.6813 19.6111 18.6034 23.1953C19.4587 22.1002 19.9319 21.0189 20.0358 19.9356C20.2592 17.5987 18.7185 15.6973 17.02 13.9907C14.5302 11.4889 14.3451 9.07556 16.437 6.396C16.0058 9.92022 18.3607 10.8764 20.513 12.8007ZM13.823 25.7147C15.276 22.814 15.5326 21.2031 11.897 17.9504C10.9091 17.0667 10.1462 16.1662 9.61541 15.2647C8.93847 16.6947 8.40204 19.7271 10.3776 21.4724C11.7139 22.6529 13.5497 23.3611 13.823 25.7147ZM16.5065 14.4476C14.5032 12.4342 13.0502 9.61178 15.87 6C8.23286 8.82044 7.793 13.3611 12.381 17.466C16.2467 20.924 16.0462 22.8333 14.4602 26C21.9498 20.7778 19.3262 17.2809 16.5065 14.4476Z"
                fill="white"
              />
            </svg>
            <h4 class="flex lg:hidden ms-5">OOO 資訊科技有限公司</h4>
            <!-- lg -->
            <svg
              class="hidden lg:flex"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="4" fill="#5FA8FF" />
              <path
                d="M30.6248 19.5209C34.8069 23.3778 36.2818 29.0556 28.0332 34.0735C29.1939 32.5403 29.8362 31.0264 29.9771 29.5098C30.2804 26.2381 28.1894 23.5763 25.8842 21.1869C22.5053 17.6844 22.254 14.3058 25.0931 10.5544C24.5079 15.4883 27.7038 16.827 30.6248 19.5209ZM21.5455 37.6005C23.5175 33.5396 23.8657 31.2844 18.9316 26.7306C17.591 25.4933 16.5556 24.2327 15.8352 22.9705C14.9165 24.9725 14.1885 29.218 16.8697 31.6614C18.6832 33.314 21.1746 34.3056 21.5455 37.6005ZM25.1875 21.8266C22.4686 19.0079 20.4967 15.0565 24.3236 10C13.9589 13.9486 13.3619 20.3056 19.5885 26.0524C24.8348 30.8936 24.5628 33.5667 22.4103 38C32.5747 30.6889 29.0141 25.7932 25.1875 21.8266Z"
                fill="white"
              />
            </svg>
            <h2 class="hidden lg:flex ms-5 leading-[46px]">OOO 資訊科技有限公司</h2>
          </div>
          <div class="w-full lg:w-2/5 flex items-center">
            <div class="w-1/2 me-3 lg:me-5">
              <btn content="請教所有前輩" class="w-full">
                <div class="icon-message me-2 -mb-1"></div>
              </btn>
            </div>
            <div class="w-1/2">
              <btn content="訂閱情報" cate="secondary" class="w-full">
                <div class="icon-plus-circle me-2 -mb-1"></div>
              </btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-[1920px]:overflow-x-hidden bg-gray">
      <div
        class="mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center sm:py-5 md:py-20"
      >
        <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between items-start sm:mb-6 lg:mb-20">
          <!-- lg 左半邊 -->
          <div class="w-full lg:w-3/5 flex flex-col justify-center items-start me-6">
            <!-- 公司概況 -->
            <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
              <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                <h5>公司概況</h5>
              </div>
              <div
                class="w-full border-2 border-black-10 py-5 px-5 md:py-5 md:px-5 lg:py-5 lg:px-5 bg-white rounded-b rounded-tr"
              >
                <div class="flex flex-wrap justify-between items-center">
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h4 class="text-red">想換工作</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">加班頻率</div>
                    <h4 class="text-green">很少加班</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">平均月薪</div>
                    <h4>55K</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">薪水情報</div>
                    <h4>129</h4>
                  </div>
                </div>
              </div>
            </div>

            <!-- lg 薪水情報 -->
            <div class="hidden w-full lg:flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
              <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                <h5>薪水情報</h5>
              </div>
              <div
                class="w-full border-2 border-black-10 sm:py-5 sm:px-10 md:py-5 md:px-5 lg:py-6 lg:px-6 bg-white rounded-b rounded-tr"
              >
                <div class="flex mb-6">
                  <div class="caption me-10">排序</div>
                  <label
                    v-for="item in sortOptions"
                    :key="item.value"
                    :for="`sort-${item.value}`"
                    class="flex-1 relative cursor-pointer items-center inline-flex justify-start caption me-5"
                  >
                    <input
                      :id="`sort-${item.value}`"
                      v-model="sortValue"
                      type="radio"
                      :value="item.value"
                      name="sort"
                      class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                      :checked="item.value === sortValue"
                    />
                    <span :class="{ 'text-blue': item.value === sortValue }" class="ml-2">{{ item.text }}</span>
                  </label>
                </div>

                <div class="flex mb-5">
                  <div class="caption me-10">職位</div>
                  <label v-for="item in titleOptions" :key="item" :for="`title-sort-${item}`" class="me-5">
                    <input
                      :id="`title-sort-${item}`"
                      v-model="titleValue"
                      type="checkbox"
                      :value="item"
                      name="title-sort"
                      class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 accent-blue rounded-2xl translate-y-[3px]"
                    />
                    <span :class="{ 'text-blue': titleValue.includes(item) }" class="caption ml-2">{{ item }}</span>
                  </label>
                </div>
                <div class="w-full border-b border-black-1 mb-3"></div>
                <div class="flex justify-end">
                  <btn cate="gray-text" content="全部重設" class="me-3"></btn>
                  <btn cate="white" content="套用">
                    <span class="icon-filter text-sm me-2"></span>
                  </btn>
                </div>
              </div>
            </div>

            <!-- sm 薪水情報 -->
            <div class="lg:hidden w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
              <div class="w-full flex justify-between">
                <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                  <h5>薪水情報</h5>
                </div>
                <button
                  class="flex justify-center items-center rounded-t border-2 border-b-0 py-3 px-5 bg-white active:text-white active:bg-black-10"
                  @click="showFilterModal = !showFilterModal"
                >
                  <span class="icon-filter text-sm me-2"></span>
                  <h6>篩選</h6>
                </button>
              </div>
              <div
                class="w-full border-2 border-black-10 sm:py-5 sm:px-10 md:py-5 md:px-5 lg:py-6 lg:px-6 bg-white rounded-b"
              >
                這裡要替換成薪資資訊
              </div>
            </div>

            <!-- 薪資資訊 -->
            <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
              <div
                class="w-full border-2 border-black-10 sm:py-5 sm:px-10 md:py-5 md:px-5 lg:py-6 lg:px-6 bg-white rounded"
              >
                <div class="flex mb-6">
                  <div class="caption me-10">這裡要替換</div>
                  <label
                    v-for="item in sortOptions"
                    :key="item.value"
                    :for="`sort-${item.value}`"
                    class="flex-1 relative cursor-pointer items-center inline-flex justify-start caption me-5"
                  >
                    <input
                      :id="`sort-${item.value}`"
                      v-model="sortValue"
                      type="radio"
                      :value="item.value"
                      name="sort"
                      class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                      :checked="item.value === sortValue"
                    />
                    <span :class="{ 'text-blue': item.value === sortValue }" class="ml-2">{{ item.text }}</span>
                  </label>
                </div>

                <div class="flex mb-5">
                  <div class="caption me-10">職位</div>
                  <label v-for="item in titleOptions" :key="item" :for="`title-sort-${item}`" class="me-5">
                    <input
                      :id="`title-sort-${item}`"
                      v-model="titleValue"
                      type="checkbox"
                      :value="item"
                      name="title-sort"
                      class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 accent-blue rounded-2xl translate-y-[3px]"
                    />
                    <span :class="{ 'text-blue': titleValue.includes(item) }" class="caption ml-2">{{ item }}</span>
                  </label>
                </div>
                <div class="w-full border-b border-black-1 mb-3"></div>
                <div class="flex justify-end">
                  <btn cate="gray-text" content="全部重設" class="me-3"></btn>
                  <btn cate="white" content="套用">
                    <span class="icon-filter text-sm me-2"></span>
                  </btn>
                </div>
              </div>
            </div>
          </div>

          <!-- lg 右半邊 -->
          <!-- 熱門關鍵字 -->
          <div class="w-full lg:w-2/5 flex flex-col justify-center items-start">
            <div class="bg-black-10 text-white py-3 px-5 rounded-t">
              <h5>#熱門關鍵字</h5>
            </div>
            <!-- TODO: 關鍵字動態資訊 -->
            <div class="border-2 border-black-10 sm:py-5 sm:px-7 lg:py-6 lg:px-6 bg-white rounded-b rounded-tr">
              <div class="flex flex-col">
                <div class="flex flex-wrap justify-between items-center">
                  <text-link
                    v-for="keyword in keywords"
                    :key="keyword"
                    :content="keyword"
                    size="sm"
                    @click="keywordSearch(keyword)"
                  >
                  </text-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sm 篩選選單 -->
    <div
      v-if="showFilterModal"
      ref="filterModal"
      class="fixed shadow bg-white w-full p-5 left-0 right-0 bottom-0 z-10 bottom-modal"
    >
      <div class="flex flex-col mb-6">
        <div class="caption mb-5">排序</div>
        <div>
          <label
            v-for="item in sortOptions"
            :key="item.value"
            :for="`sort-${item.value}`"
            class="flex-1 relative cursor-pointer items-center inline-flex justify-start caption me-5 mb-5"
          >
            <input :id="`sort-${item.value}`" v-model="sortValue" type="radio" :value="item.value" name="sort"
            class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2
            after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6
            after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue
            :checked="item.value === sortValue" />
            <span :class="{ 'text-blue': item.value === sortValue }" class="ml-2">{{ item.text }}</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col mb-10">
        <div class="caption me-10 mb-5">職位</div>
        <div>
          <label v-for="item in titleOptions" :key="item" :for="`title-sort-${item}`" class="me-5">
            <input
              :id="`title-sort-${item}`"
              v-model="titleValue"
              type="checkbox"
              :value="item"
              name="title-sort"
              class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 accent-blue rounded-2xl translate-y-[3px]"
            />
            <span :class="{ 'text-blue': titleValue.includes(item) }" class="caption ml-2">{{ item }}</span>
          </label>
        </div>
      </div>
      <div class="w-full border-b border-black-1 mb-3"></div>
      <div class="flex justify-between">
        <btn class="" cate="gray-text" content="關閉" @click="showFilterModal = false"></btn>
        <btn class="" cate="gray-text" content="全部重設"></btn>
        <btn class="" cate="white" content="套用">
          <span class="icon-filter text-sm me-2"></span>
        </btn>
      </div>
    </div>
  </section>
</template>

function useHead(arg0: { title: string; }) { throw new Error("Function not implemented."); }
