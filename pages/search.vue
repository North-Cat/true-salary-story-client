<script lang="ts" setup>
import { showInfo } from '~/utilities/message';
const { searchApi } = useApi();

useHead({
  title: '搜尋',
});

/**
 * 初始化
 */
enum SearchType {
  KEYWORD = 'keyword', // 關鍵字
  COMPANY = 'companyName', // 公司
  JOB_TITLE = 'title', // 職位
  COMPANY_TYPE = 'type', // 產業
}
const route = useRoute();
const { searchType, param, page } = route.query; // 取得 URL 的搜尋參數
const curSearchType = ref(); // 目前所在頁面
curSearchType.value = searchType; // 取得 URL 上的 searchType
onMounted(() => {
  // 第一次進頁面，要搜尋
  // 組合搜尋參數
  searchParam.value = param;

  // 搜尋
  setTimeout(() => {
    clickSearch(Number(page));
  }, 1);
});

/**
 * 參數宣告
 */
// 每頁顯示幾筆
const limit = ref(2);
// 搜尋參數
const searchParam = ref();

// 搜尋結果 (公司)
interface ICompany {
  taxId: string;
  companyName: string;
  latestPostTitle: string[];
}
const companies = ref<ICompany[]>([]);
const companiesCount = ref();
const companyLatestPostTitle = computed(() => (titles?: string[]) => {
  const titleText = titles ? titles.join('、') : undefined;
  return titleText;
});
const companyCurPage = ref(1); // 目前頁數
const companyTotalPages = ref(); // 總頁數

// 搜尋結果 (產業)
interface IType {
  taxId: string;
  companyName: string;
  postCount: number;
  address: string;
  phone: string;
  type: string;
}
const types = ref<IType[]>([]);
const typesCount = ref();
const typeCurPage = ref(1); // 目前頁數
const typeTotalPages = ref(); // 總頁數

// 搜尋結果 (職位)
interface ITitle {
  taxId: string;
  companyName: string;
  postId: number;
  title: string;
  phone: string;
  jobDescription: string;
  suggestion: string;
}
const titles = ref<ITitle[]>([]);
const titlesCount = ref();
const titleCurPage = ref(1); // 目前頁數
const titleTotalPages = ref(); // 總頁數
const textWithDot = computed(() => (text?: string) => {
  // 將文字最後一次刪除，並加上 ... ，避免最後一個字是標點符號顯示會很奇怪
  const result = text?.slice(0, text.length - 1);
  return result + '...';
});

// 搜尋結果 (關鍵字)
const keywordCurPage = ref(1); // 目前頁數
const keywordTotalPages = ref(); // 總頁數

// 排序
// const sortOptions = [
//   { text: '最相關', value: 1 },
//   { text: '時間 近→遠', value: 2 },
// ];
// const keywordSort = ref(1);
// const companySort = ref(1);
// const titleSort = ref(1);
// const typeSort = ref(1);
// watch(keywordSort, () => {
//   clickSearch(1);
// });
// watch(companySort, () => {
//   clickSearch(1);
// });
// watch(titleSort, () => {
//   clickSearch(1);
// });
// watch(typeSort, () => {
//   clickSearch(1);
// });

/**
 * UI function
 */
// 點擊搜尋
function clickSearch(page?: number) {
  if (!searchParam.value) {
    showInfo('提示', '請輸入搜尋條件');
    return;
  }

  // 換頁
  changePageByTab(page);

  // 更新 URL 參數，這樣重新整理就會是正確的參數
  const paramObj = {
    searchType: curSearchType.value,
    param: searchParam.value,
    page,
  };
  const router = useRouter();
  router.replace({
    query: paramObj,
  });

  // 搜尋
  search();
}
// 換頁搜尋
function changePage(page: number) {
  clickSearch(page);
}
// input enter 搜尋
function enterSearch() {
  clickSearch(1);
}
// 點擊清除
const showResult = ref(true);
function clickClear() {
  showResult.value = false;
  searchParam.value = undefined;
  companies.value = [];
  types.value = [];
  titles.value = [];
}

/**
 * call api
 */
// 搜尋 api
async function search() {
  // console.log('目前頁數(關鍵字)', keywordCurPage.value);
  // console.log('目前頁數(公司)', companyCurPage.value);
  // console.log('目前頁數(產業)', typeCurPage.value);
  // console.log('目前頁數(職位)', titleCurPage.value);
  // console.log('搜尋類型', curSearchType.value);
  // console.log('搜尋參數', searchParam.value);

  // 組合參數
  let companyNameReq = '';
  let titleReq = '';
  let typeReq = '';
  let pageReq = 1;
  const limitReq: number = limit.value;
  // let sortReq = '';
  if (curSearchType.value === SearchType.KEYWORD) {
    companyNameReq = searchParam.value;
    titleReq = searchParam.value;
    typeReq = searchParam.value;
    pageReq = keywordCurPage.value;
    sortReq = keywordSort.value.toString();
  } else if (curSearchType.value === SearchType.COMPANY) {
    companyNameReq = searchParam.value;
    pageReq = companyCurPage.value;
    sortReq = companySort.value.toString();
  } else if (curSearchType.value === SearchType.JOB_TITLE) {
    titleReq = searchParam.value;
    pageReq = titleCurPage.value;
    sortReq = titleSort.value.toString();
  } else if (curSearchType.value === SearchType.COMPANY_TYPE) {
    typeReq = searchParam.value;
    pageReq = typeCurPage.value;
    sortReq = typeSort.value.toString();
  }

  // call search api
  await searchApi
    .getPostResultsByParam(companyNameReq, typeReq, titleReq, pageReq, limitReq)
    .then(({ companyResults, companyResultsCount, titleResults, titleResultsCount, typeResults, typeResultsCount }) => {
      // console.log("companyResults", companyResults);
      // console.log("titleResults", titleResults);
      // console.log("typeResults", typeResults);

      // 取得結果
      companies.value = companyResults;
      titles.value = titleResults;
      types.value = typeResults;

      // 計算頁數
      companiesCount.value = companyResultsCount;
      companyTotalPages.value = Math.ceil(companiesCount.value / limit.value);

      titlesCount.value = titleResultsCount;
      titleTotalPages.value = Math.ceil(titlesCount.value / limit.value);

      typesCount.value = typeResultsCount;
      typeTotalPages.value = Math.ceil(typesCount.value / limit.value);

      keywordTotalPages.value = Math.ceil((companiesCount.value + typesCount.value + titlesCount.value) / limit.value);

      // 顯示搜尋結果
      showResult.value = true;

      // 移到頁面頂端
      scrollToTop();
    });
}

/**
 * 切換頁籤相關
 */

function changeTab(tab: SearchType) {
  curSearchType.value = tab;
  clickSearch(1); // 換頁時搜尋
}
function isTab(tab: SearchType): boolean {
  return curSearchType.value === tab;
}
const tabClass = computed(() => (tab: SearchType) => {
  const className = isTab(tab) ? 'border-b-2 text-blue border-b-blue' : 'border-b-2 border-b-transparent';
  return className;
});
// 換頁時，判斷是哪一個頁籤要換頁
function changePageByTab(page?: number) {
  switch (curSearchType.value) {
    case SearchType.KEYWORD:
      keywordCurPage.value = page || 1;
      break;
    case SearchType.COMPANY:
      companyCurPage.value = page || 1;
      break;
    case SearchType.JOB_TITLE:
      titleCurPage.value = page || 1;
      break;
    case SearchType.COMPANY_TYPE:
      typeCurPage.value = page || 1;
      break;
  }

  // 重新渲染頁數 component
  forceRender();
}
// 重新渲染頁數
const componentKey = ref(0);
const forceRender = () => {
  componentKey.value += 1;
};

function isEmpty(obj: any): boolean {
  if (typeof obj === 'string') {
    if (obj && obj.trim()) {
      return false;
    }
  } else if (typeof obj === 'object') {
    if (obj && obj.length !== 0) {
      return false;
    }
  }
  return true;
}

function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>

<template>
  <section
    ref="searchSection"
    class="search bg-gray py-10 md:py-10 lg:py-20 max-[1920px]:overflow-x-hidden pt-16 lg:pt-40"
  >
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-4xl flex flex-col justify-center items-center"
    >
      <div class="w-full max-w-[1076px] flex flex-col border-2 border-black-10 bg-white py-5 lg:py-10 px-5 mb-10">
        <div class="w-full flex flex-col lg:flex-row mb-5">
          <div class="w-full lg:w-10/12 flex items-center border border-black-1 rounded me-2 mb-3 lg:mb-0">
            <div
              class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 z-10"
            ></div>
            <input v-model="searchParam" type="text" class="w-full ps-10 py-3 pe-10" @keyup.enter="enterSearch" />
            <button
              class="icon-cross text-black-5 absolute inset-y-0 right-0 flex items-center pe-3 z-10"
              @click="clickClear"
            ></button>
          </div>
          <base-button class="w-full lg:w-2/12 h-[48px]" content="搜尋" @click="clickSearch(1)"></base-button>
        </div>
        <!-- 搜尋頁籤 -->
        <div
          v-if="showResult"
          class="w-full flex justify-center lg:justify-start flex-wrap pb-3 mb-10 border-b border-black-1"
        >
          <div class="py-3 px-3">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(SearchType.KEYWORD)"
              @click="changeTab(SearchType.KEYWORD)"
            >
              <h6 class="hidden lg:block">所有結果</h6>
              <h6 class="block lg:hidden">全部</h6>
            </button>
          </div>
          <div class="py-3 px-3">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(SearchType.COMPANY)"
              @click="changeTab(SearchType.COMPANY)"
            >
              <h6 class="hidden lg:block">找公司</h6>
              <h6 class="block lg:hidden">公司</h6>
            </button>
          </div>
          <div class="py-3 px-3">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(SearchType.JOB_TITLE)"
              @click="changeTab(SearchType.JOB_TITLE)"
            >
              <h6 class="hidden lg:block">找職位</h6>
              <h6 class="block lg:hidden">職位</h6>
            </button>
          </div>
          <div class="py-3 px-3">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out"
              :class="tabClass(SearchType.COMPANY_TYPE)"
              @click="changeTab(SearchType.COMPANY_TYPE)"
            >
              <h6 class="hidden lg:block">找產業</h6>
              <h6 class="block lg:hidden">產業</h6>
            </button>
          </div>
        </div>
        <!-- 搜尋結果 -->
        <div v-if="showResult" class="flex flex-col">
          <!-- 所有結果 -->
          <div v-if="isTab(SearchType.KEYWORD) && (!isEmpty(companies) || !isEmpty(titles) || !isEmpty(types))">
            <!-- 總頁數 & 排序 -->
            <div class="flex justify-between items-center text-black-5 mb-10">
              <div class="caption">
                第 {{ keywordCurPage }} 頁，共 {{ companiesCount + typesCount + titlesCount }} 筆
              </div>
              <!-- <div class="flex justify-center items-center">
                <div class="caption me-5">排序</div>
                <label v-for="item in sortOptions" :key="item.value" :for="`keywordSort-${item.value}`"
                  class="flex justify-center cursor-pointer items-center caption me-5">
                  <input :id="`keywordSort-${item.value}`" v-model="keywordSort" type="radio" :value="item.value"
                    name="sort"
                    class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                    :checked="item.value === keywordSort" />
                  <span :class="{ 'text-blue': item.value === keywordSort }" class="ml-2">{{ item.text }}</span>
                </label>
              </div> -->
            </div>

            <!-- 關鍵字內容是 "找公司" + "找職位" + "找產業" 組合起來的 -->
          </div>

          <!-- 找公司 -->
          <div v-if="(isTab(SearchType.KEYWORD) || isTab(SearchType.COMPANY)) && !isEmpty(companies)">
            <!-- 總頁數 & 排序 -->
            <div class="flex justify-between items-center text-black-5 mb-10">
              <div class="caption">第 {{ companyCurPage }} 頁，共 {{ companiesCount }} 筆</div>
              <!-- <div class="flex justify-center items-center">
                <div class="caption me-5">排序</div>
                <label v-for="item in sortOptions" :key="item.value" :for="`companySort-${item.value}`"
                  class="flex justify-center cursor-pointer items-center caption me-5">
                  <input :id="`companySort-${item.value}`" v-model="companySort" type="radio" :value="item.value"
                    name="sort"
                    class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                    :checked="item.value === companySort" />
                  <span :class="{ 'text-blue': item.value === companySort }" class="ml-2">{{ item.text }}</span>
                </label>
              </div> -->
            </div>

            <div v-for="company in companies" :key="company.taxId" class="mb-10">
              <nuxt-link :to="'companies/' + company.taxId">
                <h5 class="text-blue mb-2">{{ company.companyName }} | 真薪話</h5>
              </nuxt-link>
              <p class="caption mb-2">
                {{ company.companyName }}薪水、年終獎金、公司福利等精彩內容都在真薪話。最新薪水：
                <span>
                  {{ companyLatestPostTitle(company.latestPostTitle) }}
                </span>
              </p>
              <div class="caption text-black-6"># 找公司</div>
            </div>
          </div>

          <!-- 找職位 -->
          <div v-if="(isTab(SearchType.KEYWORD) || isTab(SearchType.JOB_TITLE)) && !isEmpty(titles)">
            <!-- 總頁數 & 排序 -->
            <div class="flex justify-between items-center text-black-5 mb-10">
              <div class="caption">第 {{ titleCurPage }} 頁，共 {{ titlesCount }} 筆</div>
              <!-- <div class="flex justify-center items-center">
                <div class="caption me-5">排序</div>
                <label v-for="item in sortOptions" :key="item.value" :for="`titleSort-${item.value}`"
                  class="flex justify-center cursor-pointer items-center caption me-5">
                  <input :id="`titleSort-${item.value}`" v-model="titleSort" type="radio" :value="item.value" name="sort"
                    class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                    :checked="item.value === titleSort" />
                  <span :class="{ 'text-blue': item.value === titleSort }" class="ml-2">{{ item.text }}</span>
                </label>
              </div> -->
            </div>
            <div v-for="title in titles" :key="title.taxId" class="mb-10">
              <nuxt-link :to="'salary/' + title.postId">
                <h5 class="text-blue mb-2">{{ title.companyName }} | {{ title.title }} | 真薪話</h5>
              </nuxt-link>
              <p class="caption mb-2">
                {{ title.companyName }}_{{ title.title }} 的薪水、年終獎金、底薪、公司福利，工作內容是<span>{{
                  textWithDot(title.jobDescription)
                }}</span>
                ，工作建議是<span>{{ textWithDot(title.suggestion) }}</span>
              </p>
              <div class="caption text-black-6"># 找職位</div>
            </div>
          </div>

          <!-- 找產業 -->
          <div v-if="(isTab(SearchType.KEYWORD) || isTab(SearchType.COMPANY_TYPE)) && !isEmpty(types)">
            <!-- 總頁數 & 排序 -->
            <div class="flex justify-between items-center text-black-5 mb-10">
              <div class="caption">第 {{ typeCurPage }} 頁，共 {{ typesCount }} 筆</div>
              <!-- <div class="flex justify-center items-center">
                <div class="caption me-5">排序</div>
                <label v-for="item in sortOptions" :key="item.value" :for="`typeSort-${item.value}`"
                  class="flex justify-center cursor-pointer items-center caption me-5">
                  <input :id="`typeSort-${item.value}`" v-model="typeSort" type="radio" :value="item.value" name="sort"
                    class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                    :checked="item.value === typeSort" />
                  <span :class="{ 'text-blue': item.value === typeSort }" class="ml-2">{{ item.text }}</span>
                </label>
              </div> -->
            </div>
            <div v-for="comType in types" :key="comType.taxId" class="mb-10">
              <nuxt-link :to="'companies/' + comType.taxId">
                <h5 class="text-blue mb-2">{{ comType.type }} | {{ comType.companyName }} | 真薪話</h5>
              </nuxt-link>
              <p class="text-yellow mb-2">{{ comType.postCount }} 則薪水情報</p>
              <div class="flex flex-col lg:flex-row mb-2">
                <div class="caption me-20">地址 | {{ comType.address }}</div>
                <div class="caption me-20">電話 | {{ comType.phone }}</div>
                <div class="caption me-20">統編 | {{ comType.taxId }}</div>
              </div>
              <div class="caption text-black-6"># 找產業</div>
            </div>
          </div>

          <!-- 所有結果頁數 -->
          <pagination-button
            v-if="isTab(SearchType.KEYWORD) && (!isEmpty(companies) || !isEmpty(titles) || !isEmpty(types))"
            :key="componentKey"
            class="flex justify-center"
            :init-page="keywordCurPage"
            :total-pages="keywordTotalPages"
            @change-page-event="changePage"
          >
          </pagination-button>
          <!-- 找公司頁數 -->
          <pagination-button
            v-if="isTab(SearchType.COMPANY) && !isEmpty(companies)"
            :key="componentKey"
            class="flex justify-center"
            :init-page="companyCurPage"
            :total-pages="companyTotalPages"
            @change-page-event="changePage"
          >
          </pagination-button>
          <!-- 找職位頁數 -->
          <pagination-button
            v-if="isTab(SearchType.JOB_TITLE) && !isEmpty(titles)"
            :key="componentKey"
            class="flex justify-center"
            :init-page="titleCurPage"
            :total-pages="titleTotalPages"
            @change-page-event="changePage"
          >
          </pagination-button>
          <!-- 找產業頁數 -->
          <pagination-button
            v-if="isTab(SearchType.COMPANY_TYPE) && !isEmpty(types)"
            :key="componentKey"
            class="flex justify-center"
            :init-page="typeCurPage"
            :total-pages="typeTotalPages"
            @change-page-event="changePage"
          >
          </pagination-button>

          <!-- 查無資料 -->
          <div
            v-if="
              (isTab(SearchType.COMPANY) && isEmpty(companies)) ||
              (isTab(SearchType.JOB_TITLE) && isEmpty(titles)) ||
              (isTab(SearchType.COMPANY_TYPE) && isEmpty(types)) ||
              (isTab(SearchType.KEYWORD) && isEmpty(companies) && isEmpty(titles) && isEmpty(types))
            "
          >
            <h6>查無相關結果，請重新搜尋。</h6>
          </div>
        </div>
      </div>
    </div>
    {{ y }}
  </section>
</template>
