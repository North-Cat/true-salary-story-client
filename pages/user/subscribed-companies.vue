<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSalaryStore } from '@/store/salary';
useHead({
  title: '薪水訂閱',
});
definePageMeta({
  middleware: 'auth',
});
const salaryStore = useSalaryStore();
const { post } = storeToRefs(salaryStore);
const paginationButton = ref();
const limit = ref(10);
const searchParam = reactive({
  company: '',
  page: 1,
});
const data = {
  results: [
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
    {
      taxId: '22555003',
      companyName: '臺灣塑膠工業股份有限公司',
      shared: 67,
      address: '台北市中山',
    },
    {
      taxId: '75708007',
      companyName: '統一超商股份有限公司',
      shared: 1200,
      address: '新竹市力行六路8號',
    },
  ],
  totalCount: 16,
};
const search = () => {
  console.log('search');
  searchParam.page = 1;
  paginationButton.value.currentPageComponent = 1;
};
const onChangePage = (val: number) => {
  searchParam.page = val;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const totalPage = computed(() => {
  return Math.ceil(data.totalCount / limit.value);
});
const currentResultsList = computed(() => {
  const startIndex = (searchParam.page - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  return data.results.slice(startIndex, endIndex);
});
const umSubscribe = (id: string) => {
  console.log(id, '取消訂閱');
};
</script>
<template>
  <userLayouts>
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center border border-black-1 rounded">
        <div
          class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10"
        ></div>
        <input
          v-model="searchParam.company"
          type="text"
          class="w-full ps-10 py-3 pe-5"
          placeholder="搜尋公司名稱"
          @keyup.enter="search"
        />
      </div>
      <span>第{{ searchParam.page }}頁,共{{ data.totalCount || data.results.length }}筆</span>
    </div>
    <div class="divide-y divide-black-3 min-h-[255px]">
      <div v-for="(item, $index) in currentResultsList" :key="$index" class="py-5 flex">
        <nuxt-link :to="`/companies/${item.taxId}`" class="flex">
          <div class="mr-3">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="4" fill="#5FA8FF" />
              <path
                d="M30.6248 19.5209C34.8069 23.3778 36.2818 29.0556 28.0332 34.0735C29.1939 32.5403 29.8362 31.0264 29.9771 29.5098C30.2804 26.2381 28.1894 23.5763 25.8842 21.1869C22.5053 17.6844 22.254 14.3058 25.0931 10.5544C24.5079 15.4883 27.7038 16.827 30.6248 19.5209ZM21.5455 37.6005C23.5175 33.5396 23.8657 31.2844 18.9316 26.7306C17.591 25.4933 16.5556 24.2327 15.8352 22.9705C14.9165 24.9725 14.1885 29.218 16.8697 31.6614C18.6832 33.314 21.1746 34.3056 21.5455 37.6005ZM25.1875 21.8266C22.4686 19.0079 20.4967 15.0565 24.3236 10C13.9589 13.9486 13.3619 20.3056 19.5885 26.0524C24.8348 30.8936 24.5628 33.5667 22.4103 38C32.5747 30.6889 29.0141 25.7932 25.1875 21.8266Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h4 class="text-base mb-1">{{ item.companyName }}</h4>
            <div class="text-sm text-black-6">
              <span>{{ item.address }}</span> <span class="text-[0.2rem] relative bottom-[2px] px-1">|</span> 共
              {{ item.shared }} 則
            </div>
          </div>
        </nuxt-link>
        <div class="ml-auto">
          <BaseButton cate="gray" @click="umSubscribe(item.taxId)">已訂閱</BaseButton>
        </div>
      </div>
    </div>
    <PaginationButton
      ref="paginationButton"
      class="flex justify-center mt-6"
      :init-page="searchParam.page"
      :total-pages="totalPage"
      @change-page-event="onChangePage"
    >
    </PaginationButton>
  </userLayouts>
</template>
