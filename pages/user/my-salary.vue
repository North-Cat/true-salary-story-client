<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSalaryStore } from '@/store/salary';
useHead({
  title: '我的薪水',
});
definePageMeta({
  middleware: 'auth',
});
const salaryStore = useSalaryStore();
const { post } = storeToRefs(salaryStore);
const paginationButton = ref();
const limit = ref(5);
const searchParam = reactive({
  company: '',
  page: 1,
});
const data = {
  results: [
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
    {
      postId: '6468c348abb6863c8509cfee',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '兼職',
      seen: 100,
    },
    {
      postId: '646b85b5ea03930f66cd6a5a',
      companyName: '卯咪股份有限公司',
      city: '台北',
      title: '工程師',
      monthlySalary: '40000',
      yearlySalary: '480000',
      createDate: '2023/4/12',
      employmentType: '全職',
      seen: 0,
    },
  ],
  totalCount: 17,
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
          placeholder="搜尋公司"
          @keyup.enter="search"
        />
      </div>
      <span>第{{ searchParam.page }}頁,共{{ data.totalCount || data.results.length }}筆</span>
    </div>
    <div class="divide-y divide-black-3 min-h-[255px]">
      <div v-for="(item, $index) in currentResultsList" :key="$index" class="py-5">
        <nuxt-link :to="`/salary/${item.postId}`">
          <div class="flex justify-between mb-4 items-center">
            <h4 class="text-lg text-blue">{{ item.title }}</h4>
            <span>{{ item.seen > 0 ? `${item.seen}人已看過` : '尚未被人發掘' }}</span>
          </div>
          <div class="flex justify-between">
            <div>
              <div class="mb-3">{{ item.companyName }}</div>
              <div class="mb-2">
                <span class="mr-5">{{ item.city }}</span>
                <span>{{ item.employmentType }}</span>
              </div>
              <div>
                <span class="mr-5">月薪:{{ item.monthlySalary }}</span>
                <span>年薪{{ item.yearlySalary }}</span>
              </div>
            </div>
            <div class="self-end">{{ item.createDate }} 分享</div>
          </div>
        </nuxt-link>
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
