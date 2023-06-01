<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { IPointsList } from '~/interface/order';
useHead({
  title: '積分明細',
});
definePageMeta({
  middleware: 'auth',
});
const useStore = useUserStore();
const limit = ref(10);
const page = ref(1);
const paginationButton = ref();
const loading = ref(false);
loading.value = true;
const { pointsList } = storeToRefs(useStore);
loading.value = false;
loading.value = true;
useStore.tryToFetchPointsList().finally(() => {
  loading.value = false;
});
/**
 * tab
 */
const curSearchType = ref('all');
enum SearchType {
  ALL = 'all', // 全部
  GET = 'get', // 取得
  USED = 'used', // 已使用
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
    case 'get':
      return pointsList.value.result.filter((item) => {
        return item.point >= 0;
      }).length;
    case 'used':
      return pointsList.value.result.filter((item) => {
        return item.point < 0;
      }).length;
    default:
      return pointsList.value.result.length;
  }
};
const currentResultsList = computed(() => {
  let currentTabList: IPointsList[] = [];
  switch (curSearchType.value) {
    case 'get':
      currentTabList = pointsList.value.result.filter((item) => {
        return item.point > 0;
      }) as IPointsList[];
      break;
    case 'used':
      currentTabList = pointsList.value.result.filter((item) => {
        return item.point < 0;
      }) as IPointsList[];
      break;
    default:
      currentTabList = pointsList.value.result as IPointsList[];
      break;
  }
  const startIndex = (page.value - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  return currentTabList.slice(startIndex, endIndex);
});

const totalPage = computed(() => {
  return Math.ceil(filterListCount(curSearchType.value) / limit.value);
});
watch(totalPage, (newTotalPage, oldTotalPage) => {
  if (newTotalPage !== oldTotalPage && paginationButton.value) {
    paginationButton.value.totalPagesComponent = newTotalPage || 1;
  }
});
const onChangePage = (val: number) => {
  page.value = val;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const formatData = (createdAt: Date) => {
  const date = new Date(createdAt);
  const localDate = date.toLocaleDateString('zh-TW');
  return localDate;
};
</script>
<template>
  <userLayouts>
    <template v-if="!loading">
      <template v-if="pointsList.result.length > 0">
        <!-- 切換 -->
        <div class="w-full flex mb-2">
          <div v-for="(item, $index) in SearchType" :key="$index" class="py-3 pe-6">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(item)"
              @click="changeTab(item)"
            >
              <h6>
                <template v-if="item === 'get'">取得</template>
                <template v-else-if="item === 'used'">已使用</template>
                <template v-else>全部</template>
                ({{ filterListCount(item) }})
              </h6>
            </button>
          </div>
        </div>
        <div v-if="currentResultsList.length > 0" class="w-full min-h-[330px]">
          <table class="table-auto w-full" aria-describedby="積分明細">
            <thead class="">
              <tr>
                <th align="left">項目</th>
                <th class="w-20">積分</th>
                <th align="left">時間</th>
                <!-- <th align="left">期限</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, $index) in currentResultsList" :key="$index">
                <td>{{ item.remark }}</td>
                <td>
                  <span :class="item.point > 0 ? 'text-green' : item.point < 0 ? 'text-red' : ''">{{
                    item.point
                  }}</span>
                </td>
                <td>{{ formatData(item.startDate) }}</td>
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
      <BaseNull v-else content="目前沒有使用/購買積分" />
    </template>
    <div v-else class="min-h-[330px] flex items-center justify-center">
      <BaseLoading />
    </div>
  </userLayouts>
</template>
