<script setup lang="ts">
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import { storeToRefs } from 'pinia';
import 'vue3-carousel/dist/carousel.css';
import { showInfo } from '@/utilities/message';
import { useSearchStore } from '@/store/search';
import { useSalaryStore } from '@/store/salary';

const salaryStore = useSalaryStore();
const { keywords } = storeToRefs(salaryStore);
const searchStore = useSearchStore();
const { popularCompanies, popularCompanyType } = storeToRefs(searchStore);

// 取得熱門公司
searchStore.fetchTopCompany();
// 取得產業
searchStore.fetchTopCompanyType();
// 取得關鍵字
salaryStore.fetchKeywords();

// 熱門公司
const comCarousel = ref(); // 輪播元件
function comNext() {
  // 下一頁
  comCarousel.value.next();
}
function comPrev() {
  // 上一頁
  comCarousel.value.prev();
}

// 點擊關鍵字搜尋
function searchKeyword(keyword: string) {
  const paramObj = !keyword.trim()
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
// 點擊產業搜尋
function searchCompanytype(type: string) {
  const paramObj = {
    searchType: 'type',
    param: type,
    page: 1, // 搜尋第一頁
  };
  search(paramObj);
}
// 點擊搜尋
function searchCompany(taxId: string) {
  navigateTo('companies/' + taxId);
}
// 帶著參數導頁至搜尋頁面
async function search(paramObj: { searchType: string; param: string; page: number }) {
  await navigateTo({
    path: '/search',
    query: paramObj,
  });
}
</script>

<template>
  <section class="bg-gray sm:py-10 md:py-20 max-[1920px]:overflow-x-hidden">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center"
    >
      <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20">
        <!-- 找產業 -->
        <div class="link-block flex flex-col justify-center items-start sm:mb-10 lg:mb-0">
          <div class="bg-black-10 text-white py-3 px-5 rounded-t">
            <h5>找產業</h5>
          </div>
          <div
            class="w-full border-2 border-black-10 sm:py-5 sm:px-10 md:py-5 md:px-5 lg:py-[46px] lg:px-10 bg-white rounded-b rounded-tr"
          >
            <div class="flex flex-wrap justify-center items-center">
              <div class="w-1/2 md:w-1/4 flex flex-col sm:pe-8 sm:pb-3 md:pb-0 md:pe-6 lg:pe-10 border-r">
                <div v-for="(comType, index) in popularCompanyType" :key="comType + index">
                  <TextLink
                    v-if="index >= 0 && index <= 4"
                    class="sm:max-w-[100px] md:max-w-[100px] lg:max-w-[120px]"
                    :class="{ 'mb-3': index % 5 != 4 }"
                    :content="comType"
                    @click="searchCompanytype(comType)"
                  >
                  </TextLink>
                </div>
              </div>
              <div class="w-1/2 md:w-1/4 flex flex-col sm:ps-8 sm:pb-3 md:pb-0 md:px-6 lg:px-10 md:border-r">
                <div v-for="(comType, index) in popularCompanyType" :key="comType + index">
                  <TextLink
                    v-if="index >= 5 && index <= 9"
                    class="sm:max-w-[100px] md:max-w-[100px] lg:max-w-[120px]"
                    :class="{ 'mb-3': index % 5 != 4 }"
                    :content="comType"
                    @click="searchCompanytype(comType)"
                  >
                  </TextLink>
                </div>
              </div>
              <div class="w-1/2 md:w-1/4 flex flex-col sm:pe-8 md:pb-0 md:px-6 lg:px-10 border-r">
                <div v-for="(comType, index) in popularCompanyType" :key="comType + index">
                  <TextLink
                    v-if="index >= 10 && index <= 14"
                    class="sm:max-w-[100px] md:max-w-[100px] lg:max-w-[120px]"
                    :class="{ 'mb-3': index % 5 != 4 }"
                    :content="comType"
                    @click="searchCompanytype(comType)"
                  >
                  </TextLink>
                </div>
              </div>
              <div class="w-1/2 md:w-1/4 flex flex-col sm:ps-8 md:pb-0 md:ps-6 lg:ps-10">
                <div v-for="(comType, index) in popularCompanyType" :key="comType + index">
                  <TextLink
                    v-if="index >= 15 && index <= 19"
                    class="sm:max-w-[100px] md:max-w-[100px] lg:max-w-[120px]"
                    :class="{ 'mb-3': index % 5 != 4 }"
                    :content="comType"
                    @click="searchCompanytype(comType)"
                  >
                  </TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 熱門公司 -->
        <div class="link-block flex flex-col justify-center items-start w-full lg:max-w-[416px]">
          <div class="w-full flex justify-between">
            <div class="bg-black-10 text-white py-3 px-5 h-[48px] rounded-t">
              <h5>熱門公司</h5>
            </div>
            <div class="flex">
              <NavButton class="max-h-fit" :is-circle="false" :is-left="true" @click="comPrev"></NavButton>
              <NavButton :is-circle="false" :is-left="false" @click="comNext"></NavButton>
            </div>
          </div>
          <div
            v-if="popularCompanies && popularCompanies.length != 0"
            class="w-full border-2 border-black-10 sm:py-5 sm:px-5 lg:py-10 lg:px-8 bg-white rounded-b"
          >
            <div class="w-full">
              <carousel ref="comCarousel" class="w-full" :items-to-show="1" wrap-around>
                <slide v-for="slide in Math.ceil(popularCompanies.length / 5)" :key="slide">
                  <div class="w-full flex flex-col">
                    <div v-for="(com, index) in popularCompanies" :key="com.taxId + index">
                      <TextLink
                        v-if="index >= (slide - 1) * 5 && index <= (slide - 1) * 5 + 4"
                        :content="com.companyName"
                        :end-content="com.postCount + ' 筆'"
                        class="w-full mb-3"
                        :class="{ 'mb-0': index == (slide - 1) * 5 + 4 }"
                        @click="searchCompany(com.taxId)"
                      ></TextLink>
                    </div>
                  </div>
                </slide>
              </carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <!-- 熱門關鍵字 -->
        <div class="keyword-block w-full flex flex-col justify-center items-start">
          <div class="bg-black-10 text-white py-3 px-5 rounded-t">
            <h5>#熱門關鍵字</h5>
          </div>
          <div class="w-full border-2 border-black-10 sm:py-5 sm:px-7 lg:py-10 lg:px-16 bg-white rounded-b rounded-tr">
            <div class="flex flex-col">
              <!-- 重點關鍵字 (顯示六個) -->
              <div class="flex flex-wrap justify-start items-center sm:mb-2 lg:mb-7">
                <TagLink
                  v-for="keyword in keywords.slice(0, 6)"
                  :key="keyword"
                  :content="keyword"
                  class="sm:me-2 sm:mb-3 lg:mb-0 lg:me-5"
                  @click="searchKeyword(keyword)"
                >
                </TagLink>
              </div>
              <!-- 其他關鍵字 -->
              <div v-if="keywords && keywords.length != 0" class="flex flex-wrap justify-start items-center">
                <TextLink
                  v-for="keyword in keywords.slice(5, keywords.length)"
                  :key="keyword"
                  :content="keyword"
                  size="sm"
                  @click="searchKeyword(keyword)"
                >
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
