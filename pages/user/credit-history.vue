<script lang="ts" setup>
useHead({
  title: '積分明細',
});
definePageMeta({
  middleware: 'auth',
});
interface IPointDetails {
  userId: string;
  updatePoint: number;
  remark: string;
  startDate: string;
  endDate: string;
}
const limit = ref(10);
const page = ref(1);
const paginationButton = ref();
const data = {
  results: [
    {
      userId: 'User1234',
      updatePoint: 699,
      remark: '購買加薪計畫699',
      startDate: '2023/5/27',
      endDate: '2024/5/27',
    },
    {
      userId: 'User1234',
      updatePoint: -100,
      remark: '兌換薪水情報：版塊創意有限公司 工程師',
      startDate: '2023/4/12',
      endDate: null,
    },
    {
      userId: 'User1234',
      updatePoint: 200,
      remark: '分享薪水情報：統一超商股份有限公司 PT',
      startDate: '2022/04/10',
      endDate: '2023/04/10',
    },
    {
      userId: 'User1234',
      updatePoint: 150,
      remark: '購買加薪計畫150',
      startDate: '2023/04/05',
      endDate: '2024/04/05',
    },
    {
      userId: 'User1234',
      updatePoint: 10,
      remark: '完成每日任務',
      startDate: '2024/04/03',
    },
    {
      userId: 'User1234',
      updatePoint: 200,
      remark: '分享薪水情報：統一超商股份有限公司 PT',
      startDate: '2022/04/10',
      endDate: '2023/4/10',
    },
    {
      userId: 'User1234',
      updatePoint: 699,
      remark: '購買加薪計畫699',
      startDate: '2023/5/27',
      endDate: '2024/5/27',
    },
    {
      userId: 'User1234',
      updatePoint: -100,
      remark: '兌換薪水情報：版塊創意有限公司 工程師',
      startDate: '2023/4/12',
    },
    {
      userId: 'User1234',
      updatePoint: 200,
      remark: '分享薪水情報：統一超商股份有限公司 PT',
      startDate: '2022/04/10',
      endDate: '2023/4/10',
    },
    {
      userId: 'User1234',
      updatePoint: 699,
      remark: '購買加薪計畫699',
      startDate: '2023/5/27',
      endDate: '2024/5/27',
    },
    {
      userId: 'User1234',
      updatePoint: -100,
      remark: '兌換薪水情報：版塊創意有限公司 工程師',
      startDate: '2023/4/12',
    },
    {
      userId: 'User1234',
      updatePoint: 200,
      remark: '分享薪水情報：統一超商股份有限公司 PT',
      startDate: '2022/04/10',
      endDate: '2023/4/10',
    },
  ],
  totalCount: 12,
};
/**
 * 搜尋相關
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
      return data.results.filter((item) => {
        return item.updatePoint >= 0;
      }).length;
    case 'used':
      return data.results.filter((item) => {
        return item.updatePoint < 0;
      }).length;
    default:
      return data.results.length;
  }
};
const currentResultsList = computed(() => {
  let currentTabList: IPointDetails[] = [];
  switch (curSearchType.value) {
    case 'get':
      currentTabList = data.results.filter((item) => {
        return item.updatePoint > 0;
      }) as IPointDetails[];
      break;
    case 'used':
      currentTabList = data.results.filter((item) => {
        return item.updatePoint < 0;
      }) as IPointDetails[];
      break;
    default:
      currentTabList = data.results as IPointDetails[];
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
  if (newTotalPage !== oldTotalPage) {
    paginationButton.value.totalPagesComponent = newTotalPage;
  }
});
const onChangePage = (val: number) => {
  page.value = val;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
<template>
  <userLayouts>
    <!-- 切換 -->
    <div class="w-full flex mb-2">
      <div v-for="(item, $index) in SearchType" :key="$index" class="py-3 pe-6">
        <button
          class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
          :class="tabClass(item)"
          @click="changeTab(item)"
        >
          <h6>
            <template v-if="item === 'get'">全部</template>
            <template v-else-if="item === 'used'">已使用</template>
            <template v-else>全部</template>
            ({{ filterListCount(item) }})
          </h6>
        </button>
      </div>
    </div>
    <div class="w-full min-h-[240px]">
      <table class="table-auto w-full" aria-describedby="積分明細">
        <thead class="">
          <tr>
            <th align="left">項目</th>
            <th>積分</th>
            <th align="left">時間</th>
            <th align="left">期限</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, $index) in currentResultsList" :key="$index">
            <td>{{ item.remark }}</td>
            <td>
              <span :class="item.updatePoint > 0 ? 'text-green' : item.updatePoint < 0 ? 'text-red' : ''">{{
                item.updatePoint
              }}</span>
            </td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.endDate || '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationButton
      ref="paginationButton"
      class="flex justify-center mt-6"
      :init-page="page"
      :total-pages="totalPage"
      @change-page-event="onChangePage"
    >
    </PaginationButton>
  </userLayouts>
</template>
