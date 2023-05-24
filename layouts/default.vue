<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouteLocationRaw } from 'vue-router';
import { showInfo } from '@/utilities/message';
import { useUserStore } from '@/store/user';
const router = useRouter();
const showUserList = ref(false);
const user = useUserStore();
const { isLogin, currentUser, isFetchProfileLoading } = storeToRefs(user);
const { logout } = user;
const loginOut = () => {
  logout();
  showUserList.value = false;
};
const userList = ref([
  {
    title: '關於我',
    icon: 'icon-person-circle',
    to: {
      name: 'user',
    },
  },
  {
    title: '我的薪水',
    icon: 'icon-edit',
    to: {
      name: 'user-my-salary',
    },
  },
  {
    title: '薪水訂閱',
    icon: 'icon-plus-circle',
    to: {
      name: 'user-subscribed-companies',
    },
  },
  {
    title: '請教紀錄',
    icon: 'icon-message',
    to: {
      name: 'user-consult',
    },
  },
  {
    title: '積分明細',
    icon: 'icon-star-circle',
    to: {
      name: 'user-credit-history',
    },
  },
  {
    title: '訂單總覽',
    icon: 'icon-file',
    to: {
      name: 'user-orders',
    },
  },
  {
    title: '登出',
    icon: 'icon-person-circle',
    click: loginOut,
  },
]);
const goToPage = (to: RouteLocationRaw) => {
  router.push(to);
  showUserList.value = false;
};

/**
 * 搜尋相關
 */
enum SearchType {
  COMPANY = 'company', // 公司
  JOB_TITLE = 'title', // 職位
  COMPANY_TYPE = 'type', // 產業
}
// 目前在哪個頁籤, 預設 "公司"
const curSearchType = ref();
curSearchType.value = SearchType.COMPANY;

function changeTab(tab: SearchType) {
  curSearchType.value = tab;
}
function isTab(tab: SearchType): boolean {
  return curSearchType.value === tab;
}
const tabClass = computed(() => (tab: SearchType) => {
  const className = isTab(tab) ? 'border-b-2 text-blue border-b-blue' : 'border-b-2 border-b-transparent';
  return className;
});
// 開啟搜尋視窗 (PC)
const showSearchModal = ref(false);
const searchModal = ref(null);
onClickOutside(searchModal, () => {
  showSearchModal.value = false;
});
// 開啟搜尋視窗 (Moblie)
const searchModalSm = ref(null);
const showSearchModalSm = ref(false);
onClickOutside(searchModalSm, () => {
  showSearchModalSm.value = false;
});
// 搜尋參數
const searchParam = ref({
  company: '', // 公司
  jobTitle: '', // 職位
  companyType: '', // 產業
});
// 點擊搜尋
async function search() {
  let paramObj;
  if (curSearchType.value === SearchType.COMPANY) {
    const company = searchParam.value.company.trim();
    paramObj = !company
      ? undefined
      : {
          searchType: 'companyName',
          param: company,
          page: 1, // 搜尋第一頁
        };
  } else if (curSearchType.value === SearchType.JOB_TITLE) {
    const jobTitle = searchParam.value.jobTitle.trim();
    paramObj = !jobTitle
      ? undefined
      : {
          searchType: 'title',
          param: jobTitle,
          page: 1, // 搜尋第一頁
        };
  } else if (curSearchType.value === SearchType.COMPANY_TYPE) {
    const type = searchParam.value.companyType.trim();
    paramObj = !type
      ? undefined
      : {
          searchType: 'type',
          param: type,
          page: 1, // 搜尋第一頁
        };
  }
  if (!paramObj) {
    showInfo('提示', '請輸入搜尋條件');
    return;
  }
  // 帶著參數導頁至搜尋頁面
  await navigateTo({
    path: '/search',
    query: paramObj,
  });
}
</script>

<template>
  <div class="default-layout">
    <!-- sm nav -->
    <nav
      class="z-10 fixed md:hidden bg-white/80 w-full h-[77px] bottom-0 left-0 pb-2 px-4 shadow-nav backdrop-blur-sm"
      aria-label="行動版選單"
    >
      <div class="flex justify-between">
        <BaseButton cate="text-sm" content="分享">
          <span class="icon-edit text-2xl mb-1"></span>
        </BaseButton>
        <BaseButton cate="text-sm" content="搜尋" @click="showSearchModalSm = !showSearchModalSm">
          <span class="icon-search text-2xl mb-1"></span>
        </BaseButton>
        <!-- TODO: 取得是否登入 -->
        <BaseButton v-if="isLogin" cate="text-sm" content="訊息">
          <div class="-mb-1">
            <!-- 訊息紅點 -->
            <span class="z-10 absolute -right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2"></span>
            <span class="icon-mail text-3xl"></span>
          </div>
        </BaseButton>
        <BaseButton v-if="isLogin" cate="text-sm" content="150">
          <span class="icon-star-circle text-2xl mb-1"></span>
        </BaseButton>
        <BaseButton v-if="isLogin" cate="text-sm" content="帳號" @click="showUserList = !showUserList">
          <span class="icon-person-circle text-2xl mb-1"></span>
        </BaseButton>
        <BaseButton v-if="!isLogin" to="/login" cate="text-sm" content="登入" class="me-5">
          <span class="icon-person text-2xl mb-1"></span>
        </BaseButton>
        <BaseButton v-if="!isLogin" to="/order/offer" cate="text-sm" content="加薪計畫">
          <span class="icon-star text-3xl"></span>
        </BaseButton>
      </div>
      <div v-if="showUserList" class="fixed shadow bg-white w-full p-5 rounded left-0 right-0 top-[-544px]" style="">
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">
            {{ currentUser.displayName }}
          </div>
          <div>
            <!-- FIX: 複製UID -->
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest">複製UID</button>
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showUserList = false">
              <i class="icomoon icon-cross"></i>
            </button>
          </div>
        </div>
        <ul class="list-none pt-2 pb-2">
          <li v-for="userItem in userList" :key="userItem.title">
            <BaseButton
              v-if="userItem.to"
              cate="text-sm"
              class="rounded py-5 px-3 text-left w-full group hover:bg-blue-light hover:text-blue showUserList-item-btn"
              @click="goToPage(userItem.to)"
            >
              <div class="text-black-10 group-hover:text-blue">
                <span class="w-[48px] inline-block text-center mr-3">
                  <i :class="`icomoon ${userItem.icon} text-black-5 text-2xl align-text-top group-hover:text-blue`"></i>
                </span>
                {{ userItem.title }}
              </div>
            </BaseButton>
            <BaseButton
              v-if="userItem.click"
              class="rounded py-5 px-3 bg-transparent group hover:bg-blue-light hover:text-blue w-full"
              @click="userItem.click"
            >
              <span class="text-black-10 group-hover:text-blue">
                {{ userItem.title }}
              </span>
            </BaseButton>
          </li>
        </ul>
      </div>
      <div
        v-if="showSearchModalSm"
        ref="searchModalSm"
        class="fixed shadow bg-white w-full p-5 rounded left-0 right-0 bottom-[77px]"
        style=""
      >
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">搜尋</div>
          <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showSearchModalSm = false">
            <i class="icomoon icon-cross"></i>
          </button>
        </div>
        <div class="flex flex-col pt-2 pb-2">
          <!-- 搜尋頁籤 -->
          <div class="w-full flex mb-2">
            <div class="py-3 pe-6">
              <button
                class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                :class="tabClass(SearchType.COMPANY)"
                @click="changeTab(SearchType.COMPANY)"
              >
                <h6>公司</h6>
              </button>
            </div>
            <div class="py-3 pe-6">
              <button
                class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                :class="tabClass(SearchType.JOB_TITLE)"
                @click="changeTab(SearchType.JOB_TITLE)"
              >
                <h6>職位</h6>
              </button>
            </div>
            <div class="py-3 pe-6">
              <button
                class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                :class="tabClass(SearchType.COMPANY_TYPE)"
                @click="changeTab(SearchType.COMPANY_TYPE)"
              >
                <h6>產業</h6>
              </button>
            </div>
          </div>
          <!-- 搜尋欄位 -->
          <div class="w-full mb-2">
            <div v-if="isTab(SearchType.COMPANY)" class="flex items-center w-full border border-black-1 rounded mb-2">
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
            <div v-if="isTab(SearchType.JOB_TITLE)" class="flex items-center w-full border border-black-1 rounded mb-2">
              <div
                class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10"
              ></div>
              <input
                v-model="searchParam.jobTitle"
                type="text"
                class="w-full ps-10 py-3 pe-5"
                placeholder="搜尋職位"
                @keyup.enter="search"
              />
            </div>
            <div
              v-if="isTab(SearchType.COMPANY_TYPE)"
              class="flex items-center w-full border border-black-1 rounded mb-2"
            >
              <div
                class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10"
              ></div>
              <input
                v-model="searchParam.companyType"
                type="text"
                class="w-full ps-10 py-3 pe-5"
                placeholder="搜尋產業"
                @keyup.enter="search"
              />
            </div>
          </div>
          <BaseButton cate="secondary" class="w-full" @click="search"> 搜尋 </BaseButton>
        </div>
      </div>
    </nav>
    <!-- md lg nav -->
    <nav
      class="z-10 fixed top-0 left-0 bg-white/80 w-full sm:py-3 sm:px-3 md:py-6 md:px-10 lg:py-6 lg:px-10 shadow-nav backdrop-blur-sm"
      aria-label="平板電腦版選單"
    >
      <div class="container mx-auto max-w-[1800px] flex justify-between items-center">
        <nuxt-link to="/" class="sm:w-[80px] md:w-[150px] lg:w-[150px]">
          <img src="../assets/img/LOGO.png" alt="LOGO" />
        </nuxt-link>
        <div class="sm:hidden md:flex flex-row justify-center items-center">
          <BaseButton cate="blue-text" content="匿名分享" class="me-0" to="/sharemysalary">
            <span class="icon-edit text-lg me-2"></span>
          </BaseButton>
          <div class="relative">
            <BaseButton
              cate="gray-text"
              content="搜尋"
              :class="{ 'me-8': !isLogin }"
              @click="showSearchModal = !showSearchModal"
            >
              <span class="icon-search text-lg me-2"></span>
            </BaseButton>
            <div
              v-if="showSearchModal"
              ref="searchModal"
              class="absolute shadow bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">搜尋</div>
                <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showSearchModal = false">
                  <i class="icomoon icon-cross"></i>
                </button>
              </div>
              <div class="flex flex-col pt-2 pb-2">
                <!-- 搜尋頁籤 -->
                <div class="w-full flex mb-2">
                  <div class="py-3 pe-6">
                    <button
                      class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                      :class="tabClass(SearchType.COMPANY)"
                      @click="changeTab(SearchType.COMPANY)"
                    >
                      <h6>公司</h6>
                    </button>
                  </div>
                  <div class="py-3 pe-6">
                    <button
                      class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                      :class="tabClass(SearchType.JOB_TITLE)"
                      @click="changeTab(SearchType.JOB_TITLE)"
                    >
                      <h6>職位</h6>
                    </button>
                  </div>
                  <div class="py-3 pe-6">
                    <button
                      class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                      :class="tabClass(SearchType.COMPANY_TYPE)"
                      @click="changeTab(SearchType.COMPANY_TYPE)"
                    >
                      <h6>產業</h6>
                    </button>
                  </div>
                </div>
                <!-- 搜尋欄位 -->
                <div class="w-full mb-2">
                  <div
                    v-if="isTab(SearchType.COMPANY)"
                    class="flex items-center w-full border border-black-1 rounded mb-2"
                  >
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
                  <div
                    v-if="isTab(SearchType.JOB_TITLE)"
                    class="flex items-center w-full border border-black-1 rounded mb-2"
                  >
                    <div
                      class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10"
                    ></div>
                    <input
                      v-model="searchParam.jobTitle"
                      type="text"
                      class="w-full ps-10 py-3 pe-5"
                      placeholder="搜尋職位"
                      @keyup.enter="search"
                    />
                  </div>
                  <div
                    v-if="isTab(SearchType.COMPANY_TYPE)"
                    class="flex items-center w-full border border-black-1 rounded mb-2"
                  >
                    <div
                      class="icon-search text-black-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10"
                    ></div>
                    <input
                      v-model="searchParam.companyType"
                      type="text"
                      class="w-full ps-10 py-3 pe-5"
                      placeholder="搜尋產業"
                      @keyup.enter="search"
                    />
                  </div>
                </div>
                <BaseButton cate="secondary" class="w-full" @click="search"> 搜尋 </BaseButton>
              </div>
            </div>
          </div>
          <BaseButton v-if="isLogin" cate="gray-text" content="訊息">
            <div>
              <!-- 訊息紅點 -->
              <span class="z-10 absolute right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2"></span>
              <span class="icon-mail text-2xl me-2"></span>
            </div>
          </BaseButton>
          <BaseButton v-if="isLogin" cate="yellow-text" content="240 積分" class="me-8">
            <span class="icon-star-circle text-xl me-2"></span>
          </BaseButton>
          <div class="relative">
            <BaseButton
              v-if="isLogin"
              class="rounded-full overflow-hidden me-8 bg-transparent hover:bg-transparent"
              type="button"
              style="padding: 0"
              @click="showUserList = !showUserList"
            >
              <div v-if="isFetchProfileLoading">
                <div class="animate-pulse flex space-x-4">
                  <div class="bg-slate-200 w-12 h-12 rounded-full"></div>
                </div>
              </div>
              <img v-else class="w-12 h-12 rounded-full" :src="currentUser.profilePicture" alt="圖片" />
            </BaseButton>
            <div
              v-if="showUserList"
              class="absolute shadow bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">
                  {{ currentUser.displayName }}
                </div>
                <div>
                  <!-- FIX: 複製UID -->
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest">複製UID</button>
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showUserList = false">
                    <i class="icomoon icon-cross"></i>
                  </button>
                </div>
              </div>
              <ul class="list-none pt-2 pb-2">
                <li v-for="userItem in userList" :key="userItem.title">
                  <BaseButton
                    v-if="userItem.to"
                    cate="text-sm"
                    class="rounded py-5 px-3 text-left w-full group hover:bg-blue-light hover:text-blue showUserList-item-btn"
                    @click="goToPage(userItem.to)"
                  >
                    <div class="text-black-10 group-hover:text-blue">
                      <span class="w-[48px] inline-block text-center mr-3">
                        <i
                          :class="`icomoon ${userItem.icon} text-black-5 text-2xl align-text-top group-hover:text-blue`"
                        ></i>
                      </span>
                      {{ userItem.title }}
                    </div>
                  </BaseButton>
                  <BaseButton
                    v-if="userItem.click"
                    class="rounded py-5 px-3 bg-transparent group hover:bg-blue-light hover:text-blue w-full"
                    @click="userItem.click"
                  >
                    <span class="text-black-10 group-hover:text-blue">
                      {{ userItem.title }}
                    </span>
                  </BaseButton>
                </li>
              </ul>
            </div>
          </div>
          <BaseButton v-if="!isLogin" to="/login" cate="secondary" content="登入" class="me-5">
            <span class="icon-person text-xl me-2 mt-1"></span>
          </BaseButton>
          <BaseButton cate="primary" content="加薪計畫" to="/order/offer">
            <span class="icon-star text-2xl me-2"></span>
          </BaseButton>
        </div>
      </div>
    </nav>

    <!-- 各頁面內容 -->
    <slot />

    <footer class="bg-white sm:py-10 sm:px-3 sm:mb-20 md:mb-0 lg:py-20 max-[1920px]:overflow-x-hidden">
      <div
        class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center"
      >
        <div class="w-full flex flex-wrap">
          <div class="w-full md:w-4/12 mb-10">
            <div class="w-[150px] lg:w-full">
              <img src="../assets/img/LOGO-lg.png" alt="LOGO" />
            </div>
          </div>
          <div class="w-1/2 md:w-2/12 mb-10">
            <div class="flex flex-col">
              <div class="caption mb-3">服務</div>
              <nuxt-link
                to="/order/offer"
                class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
              >
                加薪計畫
              </nuxt-link>
            </div>
          </div>
          <div class="w-1/2 md:w-2/12 mb-10">
            <div class="flex flex-col">
              <div class="caption mb-3">支援</div>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                服務條款
              </a>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                隱私權政策
              </a>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                幫助中心
              </a>
            </div>
          </div>
          <div class="w-1/2 md:w-2/12">
            <div class="flex flex-col">
              <div class="caption mb-3">友站連結</div>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                面試趣
              </a>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                小任務
              </a>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                ibook 知識健身房
              </a>
            </div>
          </div>
          <div class="w-1/2 md:w-2/12">
            <div class="flex flex-col">
              <div class="caption mb-3">社群媒體</div>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                Facebook
              </a>
              <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3">
                Medium
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<style scoped>
.showUserList-item-btn {
  @apply items-start;
}
</style>
