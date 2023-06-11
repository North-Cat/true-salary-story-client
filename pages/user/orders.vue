<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { IMyOrdersList } from '~/interface/order';
useHead({
  title: '訂單總覽',
});
definePageMeta({
  middleware: 'auth',
});
const useStore = useUserStore();
const { myOrdersList } = storeToRefs(useStore);
const limit = ref(5);
const paginationButton = ref();
const page = ref(1);
const loading = ref(false);
loading.value = true;
useStore.tryToFetchMyOrdersList().finally(() => {
  loading.value = false;
});
/**
 * tab
 */
const curSearchType = ref('all');
enum SearchType {
  ALL = 'all', // 全部
  EXPIRED = 'expired', // 過期
  SUCCESS = 'success', // 成功
  PENDING = 'pending', // 正在結帳
}
const changeTab = (tab: SearchType) => {
  curSearchType.value = tab;
  page.value = 1;
  paginationButton.value.currentPageComponent = 1;
};
const isTab = (tab: SearchType): boolean => {
  return curSearchType.value === tab;
};
const tabClass = computed(() => (tab: SearchType) => {
  const className = isTab(tab) ? 'border-b-2 text-blue border-b-blue' : 'border-b-2 border-b-transparent';
  return className;
});
const filterListCount = (tab: string): number => {
  switch (tab) {
    case 'expired':
      return myOrdersList.value.result.filter((item) => {
        return item.status === 'expired';
      }).length;
    case 'success':
      return myOrdersList.value.result.filter((item) => {
        return item.status === 'success';
      }).length;
    case 'pending':
      return myOrdersList.value.result.filter((item) => {
        return item.status === 'pending';
      }).length;
    default:
      return myOrdersList.value.result.length;
  }
};

const onChangePage = (val: number) => {
  page.value = val;
  // useStore.tryToFetchMyOrdersList(searchParam);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const currentResultsList = computed(() => {
  let currentTabList: IMyOrdersList[] = [];
  switch (curSearchType.value) {
    case 'expired':
      currentTabList = myOrdersList.value.result.filter((item) => {
        return item.status === 'expired';
      }) as IMyOrdersList[];
      break;
    case 'success':
      currentTabList = myOrdersList.value.result.filter((item) => {
        return item.status === 'success';
      }) as IMyOrdersList[];
      break;
    case 'pending':
      currentTabList = myOrdersList.value.result.filter((item) => {
        return item.status === 'pending';
      }) as IMyOrdersList[];
      break;
    default:
      currentTabList = myOrdersList.value.result as IMyOrdersList[];
      break;
  }
  const startIndex = (page.value - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  return currentTabList.slice(startIndex, endIndex);
});
const totalPage = computed(() => {
  return Math.ceil((filterListCount(curSearchType.value) || 0) / limit.value);
});
watch(totalPage, (newTotalPage, oldTotalPage) => {
  nextTick(() => {
    if (newTotalPage !== oldTotalPage && paginationButton.value) {
      paginationButton.value.totalPagesComponent = newTotalPage || 1;
    }
  });
});
const formatData = (createdAt: Date) => {
  const date = new Date(createdAt);
  const localDate = date.toLocaleDateString('zh-TW');
  return localDate;
};
</script>
<template>
  <userLayouts>
    <template v-if="!loading">
      <template v-if="myOrdersList.result.length > 0">
        <div class="md:flex">
          <div class="w-full flex mb-2">
            <div v-for="(item, $index) in SearchType" :key="$index" class="py-3 md:pe-6">
              <button
                class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                :class="tabClass(item)"
                @click="changeTab(item)"
              >
                <h6>
                  <template v-if="item === 'expired'">已過期</template>
                  <template v-else-if="item === 'success'">已完成</template>
                  <template v-else-if="item === 'pending'">尚未結帳</template>
                  <template v-else>全部</template>
                  ({{ filterListCount(item) }})
                </h6>
              </button>
            </div>
          </div>
          <div
            v-if="currentResultsList.length > 0"
            class="ml-auto md:pl-3 shrink-0 md:py-3 py-1 text-black-5 md:block hidden"
          >
            <span>第{{ page }}頁,共{{ filterListCount(curSearchType) }}筆</span>
          </div>
        </div>
        <div v-if="currentResultsList.length > 0" class="w-full min-h-[330px]">
          <table class="table-auto w-full" aria-describedby="訂單總覽">
            <thead>
              <tr class="md:table-row hidden">
                <th>訂單編號</th>
                <th>訂單項目</th>
                <th>購買方式</th>
                <th>訂單日期</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody class="md:border-0 divide-y divide-slate-200">
              <tr v-for="(item, $index) in currentResultsList" :key="$index">
                <td
                  class="md:before:hidden before:content-['訂單編號:'] before:mr-2 md:w-auto w-full md:table-cell block border-0 md:py-5 p-0 md:first:pt-5 first:pt-3 md:last:pb-5 last:pb-5"
                >
                  {{ item._id }}
                </td>
                <td
                  class="md:before:hidden before:content-['訂單項目:'] before:mr-2 md:w-auto w-full md:table-cell block border-0 md:py-5 p-0 md:first:pt-5 first:pt-3 md:last:pb-5 last:pb-5"
                >
                  {{ item.orderDetails.packages[0].products[0].name }}
                </td>
                <td
                  class="md:before:hidden before:content-['購買方式:'] before:mr-2 md:w-auto w-full md:table-cell block border-0 md:py-5 p-0 md:first:pt-5 first:pt-3 md:last:pb-5 last:pb-5"
                >
                  {{ 'LinePay' }}
                </td>
                <td
                  class="md:before:hidden before:content-['訂單日期:'] before:mr-2 md:w-auto w-full md:table-cell block border-0 md:py-5 p-0 md:first:pt-5 first:pt-3 md:last:pb-5 last:pb-5"
                >
                  {{ formatData(item.createdAt) }}
                </td>
                <td
                  class="md:before:hidden before:content-['小計:'] before:mr-2 md:w-auto w-full md:table-cell block border-0 md:py-5 p-0 md:first:pt-5 first:pt-3 md:last:pb-5 last:pb-5"
                >
                  NT${{ item.orderDetails.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <BaseNull v-else content="此頁沒有資料" />
        <PaginationButton
          v-show="totalPage > 0"
          ref="paginationButton"
          class="flex justify-center mt-6"
          :init-page="page"
          :total-pages="totalPage"
          @change-page-event="onChangePage"
        >
        </PaginationButton>
      </template>
      <BaseNull v-else content="目前沒有訂單" />
    </template>
    <div v-else class="min-h-[330px] flex items-center justify-center">
      <BaseLoading />
    </div>
  </userLayouts>
</template>
