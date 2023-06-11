<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouteLocationRaw, useRoute } from 'vue-router';
import { showInfo } from '@/utilities/message';
import { useUserStore } from '@/store/user';
import { useWSStore } from '@/store/ws';
import { useAnimationStore } from '@/store/animation';

const animation = useAnimationStore();
const { isInit } = storeToRefs(animation);
const route = useRoute();
const router = useRouter();
// 帳號視窗
const showUserList = ref(false);
const userListModal = ref(null);
onClickOutside(userListModal, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'account-button')) {
    closeUserModal();
  }
});
const showUserListSm = ref(false);
const userListModalSm = ref(null);
onClickOutside(userListModalSm, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'account-button')) {
    closeUserModal();
  }
});
const user = useUserStore();
const wsStore = useWSStore();
const { isLogin, currentUser, isFetchProfileLoading, currentPoint } = storeToRefs(user);
const { logout } = user;
const loginOut = () => {
  wsStore.ws.close();

  logout();
  closeUserModal();
};
onUnmounted(() => {
  wsStore.ws.close();
});

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
    title: '已解鎖薪水',
    icon: 'icon-sparkle-checked',
    type: 'link',
    id: 'user-opened-salary',
    to: {
      name: 'user-opened-salary',
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
  closeUserModal();
};
function closeUserModal() {
  showUserListSm.value = false;
  showUserList.value = false;
}

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
// 開啟搜尋視窗
const showSearchModal = ref(false);
const searchModal = ref(null);
onClickOutside(searchModal, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'search-button')) {
    closeSearchModal();
  }
});
const showSearchModalSm = ref(false);
const searchModalSm = ref(null);
onClickOutside(searchModalSm, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'search-button')) {
    closeSearchModal();
  }
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

  // 若已經在搜尋頁面，則重新整理
  if (route.path === '/search') {
    await router.replace({
      query: paramObj,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1);
  } else {
    // 帶著參數導頁至搜尋頁面
    await router.push({
      path: '/search',
      query: paramObj,
    });
  }

  // 關閉視窗
  closeSearchModal();
}
function closeSearchModal() {
  showSearchModalSm.value = false;
  showSearchModal.value = false;
}

/**
 * 積分相關
 */
// 開啟積分視窗
const showPointModal = ref(false);
const pointModal = ref(null);
onClickOutside(pointModal, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'point-button')) {
    closePointModal();
  }
});
const showPointModalSm = ref(false);
const pointModalSm = ref(null);
onClickOutside(pointModalSm, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'point-button')) {
    closePointModal();
  }
});
async function goToCheckout(isSingle: boolean) {
  // 跳轉至積分頁面
  if (isSingle) {
    await navigateTo('/order/checkout?type=single&point=100');
  } else {
    await navigateTo('/order/checkout?type=subscription');
  }
  // 若已經在積分頁面，則重新整理
  if (route.path === '/order/checkout') {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
  // 關閉視窗
  closePointModal();
}
function closePointModal() {
  showPointModalSm.value = false;
  showPointModal.value = false;
}

/**
 * 訊息相關
 */
// 開啟訊息視窗
const showMessageModal = ref(false);
const messageModal = ref(null);
onClickOutside(messageModal, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'message-button')) {
    closeMessageModal();
  }
});
const showMessageModalSm = ref(false);
const messageModalSm = ref(null);
onClickOutside(messageModalSm, (e) => {
  // 點到按鈕以外才觸發
  if (isClickOutsideArea(e, 'message-button')) {
    closeMessageModal();
  }
});
function closeMessageModal() {
  showMessageModalSm.value = false;
  showMessageModal.value = false;
}

function isClickOutsideArea(e: PointerEvent, ignoreClass: string): boolean {
  return (
    e?.target?.nodeName === 'svg' ||
    e?.target?.parentNode?.nodeName === 'svg' ||
    e?.target?.className.indexOf(ignoreClass) === -1
  );
}
</script>

<template>
  <div class="default-layout max-[1920px]:overflow-x-hidden" :class="{ 'h-screen overflow-hidden': isInit }">
    <!-- sm md nav -->
    <nav
      class="z-10 fixed lg:hidden bg-white/80 w-full h-[85px] bottom-0 left-0 px-4 md:px-24 shadow-nav backdrop-blur-sm"
      aria-label="行動版選單"
    >
      <div class="flex justify-between">
        <!-- 匿名分享 sm md -->
        <BaseButton cate="text-sm" content="分享" to="/share-my-salary">
          <span class="icon-edit text-2xl mb-1"></span>
        </BaseButton>
        <!-- 搜尋 sm md -->
        <BaseButton cate="text-sm" content="搜尋" class="search-button" @click="showSearchModalSm = !showSearchModalSm">
          <span class="icon-search text-2xl mb-1 search-button"></span>
        </BaseButton>
        <!-- 訊息 sm md -->
        <BaseButton
          v-if="isLogin"
          cate="text-sm"
          class="message-button"
          @click="showMessageModalSm = !showMessageModalSm"
        >
          <div class="-mb-1">
            <!-- 訊息紅點 -->
            <span
              class="z-10 absolute -right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2 message-button"
            ></span>
            <span class="icon-mail text-3xl message-button"></span>
          </div>
          <div class="caption message-button">訊息</div>
        </BaseButton>
        <!-- 積分 sm md -->
        <BaseButton v-if="isLogin" cate="text-sm" class="point-button" @click="showPointModalSm = !showPointModalSm">
          <span class="icon-star-circle text-2xl mb-1 point-button"></span>
          <div class="caption point-button">{{ currentPoint }}</div>
        </BaseButton>
        <!-- 帳號 sm md -->
        <BaseButton v-if="isLogin" cate="text-sm" class="account-button" @click="showUserListSm = !showUserListSm">
          <div v-if="isFetchProfileLoading">
            <div class="animate-pulse flex space-x-4">
              <div class="bg-slate-200 w-[25px] h-[25px] rounded-full mb-1"></div>
            </div>
          </div>
          <img
            v-else
            class="account-button w-[25px] h-[25px] rounded-full mb-1"
            :src="currentUser.profilePicture"
            alt="圖片"
          />
          <div class="caption account-button">帳號</div>
          <!-- <span class="icon-person-circle text-2xl mb-1"></span> -->
        </BaseButton>
        <!-- 登入 sm md -->
        <BaseButton v-if="!isLogin" to="/login" cate="text-sm" content="登入">
          <span class="icon-person text-2xl mb-1"></span>
        </BaseButton>
        <!-- 加薪計畫 sm md -->
        <BaseButton v-if="!isLogin" to="/order/offer" cate="text-sm" content="加薪計畫">
          <span class="icon-star text-3xl"></span>
        </BaseButton>
      </div>
      <!-- 帳號 Modal sm md -->
      <div
        v-if="showUserListSm"
        ref="userListModalSm"
        class="fixed drop-shadow-modal bg-white w-full p-5 rounded left-0 right-0 bottom-[84px]"
        style=""
      >
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">
            {{ currentUser.displayName }}
          </div>
          <div>
            <!-- FIX: 複製UID -->
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest">複製UID</button>
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeUserModal">
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
      <!-- 搜尋 Modal sm md -->
      <div
        v-if="showSearchModalSm"
        ref="searchModalSm"
        class="fixed drop-shadow-modal bg-white w-full p-5 rounded left-0 right-0 bottom-[84px]"
        style=""
      >
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">搜尋</div>
          <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeSearchModal">
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
      <!-- 訊息 Modal sm md -->
      <div
        v-if="showMessageModalSm"
        ref="messageModalSm"
        class="fixed drop-shadow-modal bg-white w-full p-5 rounded left-0 right-0 bottom-[84px]"
      >
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">訊息</div>
          <div class="flex">
            <nuxt-link
              to="/user/consult"
              class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest"
              @click="closeMessageModal"
            >
              總覽
            </nuxt-link>
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeMessageModal">
              <i class="icomoon icon-cross"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-col pt-5 pb-2">
          <!-- 訊息內容 -->
          <div class="flex justify-between items-center border border-black-1 rounded mb-3 px-3 py-4">
            <div class="flex flex-col">
              <div class="flex">
                <div class="caption">職務 | 公司名稱</div>
              </div>
              <p class="caption text-black-6">訊息訊息訊息訊息訊息...</p>
            </div>
            <span class="caption text-black-6">2023/04/12</span>
          </div>
          <div class="flex justify-between items-center border border-black-1 rounded mb-3 px-3 py-4">
            <div class="flex flex-col">
              <div class="flex">
                <div class="caption">職務 | 公司名稱</div>
              </div>
              <p class="caption text-black-6">訊息訊息訊息...</p>
            </div>
            <span class="caption text-black-6">2023/04/12</span>
          </div>
        </div>
      </div>
      <!-- 積分 Modal sm md -->
      <div
        v-if="showPointModalSm"
        ref="pointModalSm"
        class="fixed drop-shadow-modal bg-white w-full p-5 rounded left-0 right-0 bottom-[84px]"
      >
        <div class="flex justify-between pb-3 border-b border-b-black-5">
          <div class="text-xl">{{ currentPoint }} 積分</div>
          <div class="flex">
            <nuxt-link
              to="/user/credit-history"
              class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest"
              @click="closePointModal"
            >
              積分明細
            </nuxt-link>
            <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closePointModal">
              <i class="icomoon icon-cross"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-col pt-5 pb-2">
          <div class="flex justify-between border border-black-1 rounded mb-3 px-3 py-4">
            <div class="flex flex-col">
              <h5 class="mb-3 text-blue">加薪計畫</h5>
              <p class="caption">
                6+6 個月薪水任你看、<br />贈送 2000 積分、無廣告體驗，<br />以及 10% 比薪水積分回饋！
              </p>
            </div>
            <div class="flex flex-col justify-center items-end">
              <BaseButton content="NT $ 699" @click="goToCheckout(false)"></BaseButton>
              <nuxt-link
                to="/order/offer"
                class="bg-black-1 px-2 py-1 text-sm tracking-widest w-fit mt-3"
                @click="closePointModal"
              >
                詳細資訊
              </nuxt-link>
            </div>
          </div>
          <div class="flex justify-between border border-black-1 rounded mb-3 px-3 py-4">
            <div class="flex flex-col">
              <h5 class="mb-3">100 積分</h5>
              <p class="caption">可兌換 1 則薪水情報</p>
            </div>
            <div class="flex flex-col justify-center items-end">
              <BaseButton content="NT $ 150" cate="secondary" @click="goToCheckout(true)"></BaseButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- lg nav -->
    <nav
      class="z-10 fixed top-0 left-0 bg-white/80 w-full sm:py-3 sm:px-3 md:py-6 md:px-10 lg:py-6 lg:px-10 shadow-nav backdrop-blur-sm"
      aria-label="平板電腦版選單"
    >
      <div class="container mx-auto max-w-[1800px] flex justify-between items-center">
        <nuxt-link to="/" class="sm:w-[80px] md:w-[150px] lg:w-[150px]">
          <img src="../assets/img/LOGO.png" alt="LOGO" />
        </nuxt-link>
        <div class="hidden lg:flex flex-row justify-center items-center">
          <!-- 匿名分享 lg -->
          <BaseButton cate="blue-text" content="匿名分享" class="me-0" to="/share-my-salary">
            <span class="icon-edit text-lg me-2"></span>
          </BaseButton>
          <!-- 搜尋 lg -->
          <div class="relative">
            <BaseButton
              cate="gray-text"
              :class="{ 'me-5': !isLogin }"
              class="search-button"
              @click="showSearchModal = !showSearchModal"
            >
              <span class="icon-search text-lg me-2 search-button"></span>
              <h6 class="search-button">搜尋</h6>
            </BaseButton>
            <!-- 搜尋 Modal lg -->
            <div
              v-if="showSearchModal"
              ref="searchModal"
              class="absolute shadow-xl bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">搜尋</div>
                <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeSearchModal">
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
          <!-- 訊息 lg -->
          <div class="relative">
            <BaseButton
              v-if="isLogin"
              cate="gray-text"
              class="message-button"
              @click="showMessageModal = !showMessageModal"
            >
              <div>
                <!-- 訊息紅點 -->
                <span
                  class="z-10 absolute right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2 message-button"
                ></span>
                <span class="icon-mail text-2xl me-2 message-button"></span>
              </div>
              <h6 class="message-button">訊息</h6>
            </BaseButton>
            <!-- 訊息 Modal lg -->
            <div
              v-if="showMessageModal"
              ref="messageModal"
              class="absolute shadow-xl bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">訊息</div>
                <div class="flex">
                  <nuxt-link
                    to="/user/consult"
                    class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest"
                    @click="closeMessageModal"
                  >
                    總覽
                  </nuxt-link>
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeMessageModal">
                    <i class="icomoon icon-cross"></i>
                  </button>
                </div>
              </div>
              <div class="flex flex-col pt-5 pb-2">
                <!-- 訊息內容 -->
                <div class="flex justify-between items-center border border-black-1 rounded mb-3 px-3 py-4">
                  <div class="flex flex-col">
                    <div class="flex">
                      <div class="caption">職務 | 公司名稱</div>
                    </div>
                    <p class="caption text-black-6">訊息訊息訊息訊息訊息...</p>
                  </div>
                  <span class="caption text-black-6">2023/04/12</span>
                </div>
                <div class="flex justify-between items-center border border-black-1 rounded mb-3 px-3 py-4">
                  <div class="flex flex-col">
                    <div class="flex">
                      <div class="caption">職務 | 公司名稱</div>
                    </div>
                    <p class="caption text-black-6">訊息訊息訊息訊息訊息...</p>
                  </div>
                  <span class="caption text-black-6">2023/04/12</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 積分 lg -->
          <div class="relative">
            <BaseButton
              v-if="isLogin"
              cate="yellow-text"
              class="me-5 point-button"
              @click="showPointModal = !showPointModal"
            >
              <span class="icon-star-circle text-xl me-2 point-button"></span>
              <h6 class="point-button">{{ currentPoint }} 積分</h6>
            </BaseButton>
            <!-- 積分 Modal lg -->
            <div
              v-if="showPointModal"
              ref="pointModal"
              class="absolute shadow-xl bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">{{ currentPoint }} 積分</div>
                <div class="flex">
                  <nuxt-link
                    to="/user/credit-history"
                    class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest"
                    @click="closePointModal"
                  >
                    積分明細
                  </nuxt-link>
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showPointModal = false">
                    <i class="icomoon icon-cross"></i>
                  </button>
                </div>
              </div>
              <div class="flex flex-col pt-5 pb-2">
                <div class="flex justify-between border border-black-1 rounded mb-3 px-4 py-4">
                  <div class="flex flex-col">
                    <h5 class="mb-3 text-blue">加薪計畫</h5>
                    <p class="caption">
                      6+6 個月薪水任你看、<br />贈送 2000 積分、無廣告體驗，<br />以及 10% 比薪水積分回饋！
                    </p>
                  </div>
                  <div class="flex flex-col justify-center items-end">
                    <BaseButton content="NT $ 699" @click="goToCheckout(false)"></BaseButton>
                    <nuxt-link
                      to="/order/offer"
                      class="bg-black-1 px-2 py-1 text-sm tracking-widest w-fit mt-3"
                      @click="closePointModal"
                    >
                      詳細資訊
                    </nuxt-link>
                  </div>
                </div>
                <div class="flex justify-between border border-black-1 rounded mb-3 px-4 py-4">
                  <div class="flex flex-col">
                    <h5 class="mb-3">100 積分</h5>
                    <p class="caption">可兌換 1 則薪水情報</p>
                  </div>
                  <div class="flex flex-col justify-center items-end">
                    <BaseButton content="NT $ 150" cate="secondary" @click="goToCheckout(true)"></BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 帳號 lg -->
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
              <img v-else class="account-button w-12 h-12 rounded-full" :src="currentUser.profilePicture" alt="圖片" />
            </BaseButton>
            <!-- 帳號 Modal lg -->
            <div
              v-if="showUserList"
              ref="userListModal"
              class="absolute shadow-xl bg-white top-[90px] w-[400px] p-5 rounded"
              style="right: -100%"
            >
              <div class="flex justify-between pb-3 border-b border-b-black-5">
                <div class="text-xl">
                  {{ currentUser.displayName }}
                </div>
                <div>
                  <!-- FIX: 複製UID -->
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest">複製UID</button>
                  <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="closeUserModal">
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
          <!-- 登入 lg -->
          <BaseButton v-if="!isLogin" to="/login" cate="secondary" content="登入" class="me-5">
            <span class="icon-person text-xl me-2 mt-1"></span>
          </BaseButton>
          <!-- 加薪計畫 -->
          <BaseButton cate="primary" content="加薪計畫" to="/order/offer">
            <span class="icon-star text-2xl me-2"></span>
          </BaseButton>
        </div>
      </div>
    </nav>

    <!-- 各頁面內容 -->
    <slot></slot>

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
