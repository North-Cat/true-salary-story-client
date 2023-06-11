<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
useHead({
  title: '我的薪水',
});
definePageMeta({
  middleware: 'auth',
});
const useStore = useUserStore();
const { mySalary } = storeToRefs(useStore);
const paginationButton = ref();
const limit = ref(5);
const loading = ref(false);
const isSearch = ref(false);
loading.value = true;
const searchParam = reactive({
  limit: limit.value,
  keyword: '',
  page: 1,
});
useStore.tryToFetchMySalary(searchParam).finally(() => {
  loading.value = false;
});
const search = () => {
  loading.value = true;
  useStore.tryToFetchMySalary(searchParam).finally(() => {
    loading.value = false;
  });
  if (searchParam.keyword) {
    isSearch.value = true;
  } else {
    isSearch.value = false;
  }
  searchParam.page = 1;
  paginationButton.value.currentPageComponent = 1;
};
const onChangePage = (val: number) => {
  searchParam.page = val;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  loading.value = true;
  useStore.tryToFetchMySalary(searchParam).finally(() => {
    loading.value = false;
  });
};
const totalPage = computed(() => {
  return Math.ceil(mySalary.value.totalCount / limit.value);
});
</script>
<template>
  <userLayouts>
    <template v-if="!loading">
      <div class="md:flex justify-between items-center md:mb-4 mb-0">
        <div class="flex items-center border border-black-1 rounded md:mb-0 mb-1">
          <div
            class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-[1]"
          ></div>
          <input
            v-model="searchParam.keyword"
            type="text"
            class="w-full ps-10 py-3 pe-5"
            placeholder="搜尋公司"
            @keyup.enter="search"
          />
        </div>
        <span v-if="mySalary.totalCount" class="text-black-5 text-sm"
          >第{{ searchParam.page }}頁,共{{ mySalary.totalCount }}筆</span
        >
      </div>
      <template v-if="mySalary.result.length > 0 || isSearch">
        <BaseNull v-if="mySalary.result.length === 0 && isSearch" content="查無資料" />
        <template v-else>
          <div class="divide-y divide-black-3 min-h-[255px]">
            <div v-for="(item, $index) in mySalary.result" :key="$index" class="py-5">
              <nuxt-link :to="`/salary/${item.postId}`">
                <div class="flex justify-between mb-4 items-center">
                  <h4 class="text-lg text-blue">{{ item.title }}</h4>
                  <span class="text-black-5">{{ item.seen > 0 ? `${item.seen}人已看過` : '尚未被人發掘' }}</span>
                </div>
                <div class="md:flex justify-between">
                  <div>
                    <div class="mb-3">{{ item.companyName }}</div>
                    <div class="mb-2">
                      <span class="mr-5">{{ item.city }}</span>
                      <span>{{ item.employmentType }}</span>
                    </div>
                    <div>
                      <span class="mr-5">
                        <template v-if="!!item.monthlySalary"> 月薪: {{ item.monthlySalary }} </template>
                        <template v-else-if="!!item.hourlySalary"> 時薪: {{ item.hourlySalary }} </template>
                        <template v-else> 日薪: {{ item.dailySalary }} </template>
                      </span>
                      <span>年薪: {{ item.yearlySalary }}</span>
                    </div>
                  </div>
                  <div class="self-end md:mt-0 mt-3">{{ item.createDate }} 分享</div>
                </div>
              </nuxt-link>
            </div>
          </div>
          <PaginationButton
            v-show="totalPage > 0"
            ref="paginationButton"
            class="flex justify-center mt-6"
            :init-page="searchParam.page"
            :total-pages="totalPage"
            @change-page-event="onChangePage"
          >
          </PaginationButton>
        </template>
      </template>
      <BaseNull v-else content="沒有資料" />
    </template>
  </userLayouts>
</template>
