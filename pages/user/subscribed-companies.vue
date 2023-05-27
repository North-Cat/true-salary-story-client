<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { openConfirmModal } from '@/utilities/dialog';
useHead({
  title: '薪水訂閱',
});
definePageMeta({
  middleware: 'auth',
});
const useStore = useUserStore();
const { subscribeCompaniesList } = storeToRefs(useStore);
const paginationButton = ref();
const limit = ref(10);
const searchParam = reactive({
  keyword: '',
  page: 1,
  limit: limit.value,
});
useStore.tryToFetchSubscribeCompanies(searchParam);
const search = async () => {
  await useStore.tryToFetchSubscribeCompanies(searchParam);
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
  return Math.ceil(subscribeCompaniesList.value.totalCount / limit.value);
});
const currentResultsList = computed(() => {
  const startIndex = (searchParam.page - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  return subscribeCompaniesList?.value?.result ? subscribeCompaniesList?.value?.result.slice(startIndex, endIndex) : [];
});
const onCheckUnSubscribe = (id: string) => {
  const unSubscribe = async () => {
    await useStore.deleteSubscribeCompany(id);
    await useStore.tryToFetchSubscribeCompanies(searchParam);
  };
  const title = '取消訂閱';
  const message = `確定是否要取消訂閱?`;
  openConfirmModal(title, message, unSubscribe);
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
          v-model="searchParam.keyword"
          type="text"
          class="w-full ps-10 py-3 pe-5"
          placeholder="搜尋公司名稱"
          @keyup.enter="search"
        />
      </div>
      <span
        >第{{ searchParam.page }}頁,共{{
          subscribeCompaniesList.totalCount || subscribeCompaniesList.result.length
        }}筆</span
      >
    </div>
    <div v-if="currentResultsList.length > 0" class="divide-y divide-black-3 min-h-[255px]">
      <div v-for="(item, $index) in currentResultsList" :key="$index" class="py-5 flex">
        <nuxt-link :to="`/companies/${item.company.companyId}`" class="flex">
          <div class="mr-3">
            <!-- <img v-if="item.company.photo" :src="item.company.photo" alt="" /> -->
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="4" fill="#5FA8FF" />
              <path
                d="M30.6248 19.5209C34.8069 23.3778 36.2818 29.0556 28.0332 34.0735C29.1939 32.5403 29.8362 31.0264 29.9771 29.5098C30.2804 26.2381 28.1894 23.5763 25.8842 21.1869C22.5053 17.6844 22.254 14.3058 25.0931 10.5544C24.5079 15.4883 27.7038 16.827 30.6248 19.5209ZM21.5455 37.6005C23.5175 33.5396 23.8657 31.2844 18.9316 26.7306C17.591 25.4933 16.5556 24.2327 15.8352 22.9705C14.9165 24.9725 14.1885 29.218 16.8697 31.6614C18.6832 33.314 21.1746 34.3056 21.5455 37.6005ZM25.1875 21.8266C22.4686 19.0079 20.4967 15.0565 24.3236 10C13.9589 13.9486 13.3619 20.3056 19.5885 26.0524C24.8348 30.8936 24.5628 33.5667 22.4103 38C32.5747 30.6889 29.0141 25.7932 25.1875 21.8266Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h4 class="text-base mb-1">{{ item.company.companyName }}</h4>
            <div class="text-sm text-black-6">
              <span>{{ item.company.address }}</span> <span class="text-[0.2rem] relative bottom-[2px] px-1">|</span> 共
              {{ item.company.shared }} 則
            </div>
          </div>
        </nuxt-link>
        <div class="ml-auto">
          <BaseButton cate="gray" @click="onCheckUnSubscribe(item.company.companyId)">已訂閱</BaseButton>
        </div>
      </div>
    </div>
    <PaginationButton
      v-if="totalPage > 0"
      ref="paginationButton"
      class="flex justify-center mt-6"
      :init-page="searchParam.page"
      :total-pages="totalPage"
      @change-page-event="onChangePage"
    >
    </PaginationButton>
  </userLayouts>
</template>
