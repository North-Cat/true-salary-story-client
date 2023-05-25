<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { showInfo } from '@/utilities/message';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useSalaryStore } from '@/store/salary';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
// TODO 取得 store 的公司資訊
//   const { companies, companiesCount, titles, titlesCount, types,
// typesCount } = storeToRefs(searchStore);

useHead({
  title: '單一公司全部薪水分享',
});

// 解鎖薪水
const { searchApi } = useApi();
const salaryStore = useSalaryStore();
const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);
const isShowModal = ref(false);
const redirect = () => {
  // if (!isLogin.value) {
  //   router.push('/login')
  //   return;
  // };
  isShowModal.value = true;
};
// 對照該薪水是否解鎖
// TODO: 在 api 取得所有 post 的時候 gen
// key : salaryId, value :isLocked
const salaryLockMap = ref<{postId:string, isLocked:boolean}[]>([
  {
  postId: '6468c348abb6863c8509cfee',
  isLocked: false
  },
  {
  postId: 'xxxx2',
  isLocked: false
  },
  {
  postId: 'xxxx3',
  isLocked: false
  },
  {
  postId: 'xxxx4',
  isLocked: false
  },
]);
const unlockPost = async () => {
  let salaryId = '6468c348abb6863c8509cfee';
  // 需要有個地方放 salaryId ， 考慮修改 ISalaryDisplayInfo 加個 salaryId
  const isLocked = await salaryStore.fetchPermission(salaryId);
  if (typeof isLocked === 'boolean'){
    salaryLockMap.value = salaryLockMap.value.map(item => item.postId == salaryId ? {postId:salaryId, isLocked:isLocked} : item );
  }
  isShowModal.value = false;
};

const checkIsLocked = computed(() => (postId:string) => {
  const salary = salaryLockMap.value.find(item => item.postId === postId);
  return salary?.isLocked;
});

// 假資料
const posts = [
  {
    // postId: '1234',
    taxId: 'xxxxxx',
    companyName: 'OOO 資訊科技有限公司1',
    title: '設計師',
    employmentType: '資訊工程',
    inService: true,
    city: '台北',
    workYears: 3,
    totalWorkYears: 3,
    yearlySalary: 700000,
    monthlySalary: 40000,
    dailySalary: 1000,
    avgWorkingDaysPerMonth: 20,
    hourlySalary: 100,
    avgHoursPerDay: 8,
    yearEndBonus: 40000,
    holidayBonus: 1000,
    profitSharingBonus: 1000,
    otherBonus: 1000,
    overtime: '準時上下班',
    feeling: '非常開心',
    jobDescription:
      '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
    suggestion:
      '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
    createDate: '2023-05-20',
    customTags: ['有提供零食', '升遷透明'],
  },
  {
    // postId: '1234',
    taxId: 'xxxxxx',
    companyName: 'OOO 資訊科技有限公司2',
    title: '設計師',
    employmentType: '資訊工程',
    inService: true,
    city: '台北',
    workYears: 3,
    totalWorkYears: 3,
    yearlySalary: 700000,
    monthlySalary: 40000,
    dailySalary: 1000,
    avgWorkingDaysPerMonth: 20,
    hourlySalary: 100,
    avgHoursPerDay: 8,
    yearEndBonus: 40000,
    holidayBonus: 1000,
    profitSharingBonus: 1000,
    otherBonus: 1000,
    overtime: '準時上下班',
    feeling: '非常開心',
    jobDescription:
      '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
    suggestion:
      '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
    createDate: '2023-05-20',
    customTags: ['有提供零食', '升遷透明'],
  },
  {
    // postId: '1234',
    taxId: 'xxxxxx',
    companyName: 'OOO 資訊科技有限公司3',
    title: '設計師',
    employmentType: '資訊工程',
    inService: true,
    city: '台北',
    workYears: 3,
    totalWorkYears: 3,
    yearlySalary: 700000,
    monthlySalary: 40000,
    dailySalary: 1000,
    avgWorkingDaysPerMonth: 20,
    hourlySalary: 100,
    avgHoursPerDay: 8,
    yearEndBonus: 40000,
    holidayBonus: 1000,
    profitSharingBonus: 1000,
    otherBonus: 1000,
    overtime: '準時上下班',
    feeling: '非常開心',
    jobDescription:
      '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
    suggestion:
      '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
    createDate: '2023-05-20',
    customTags: ['有提供零食', '升遷透明'],
  },
  {
    // postId: '1234',
    taxId: 'xxxxxx',
    companyName: 'OOO 資訊科技有限公司4',
    title: '設計師',
    employmentType: '資訊工程',
    inService: true,
    city: '台北',
    workYears: 3,
    totalWorkYears: 3,
    yearlySalary: 700000,
    monthlySalary: 40000,
    dailySalary: 1000,
    avgWorkingDaysPerMonth: 20,
    hourlySalary: 100,
    avgHoursPerDay: 8,
    yearEndBonus: 40000,
    holidayBonus: 1000,
    profitSharingBonus: 1000,
    otherBonus: 1000,
    overtime: '準時上下班',
    feeling: '非常開心',
    jobDescription:
      '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
    suggestion:
      '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
    createDate: '2023-05-20',
    customTags: ['有提供零食', '升遷透明'],
  },
];
// 過濾職位的薪水資料
const postsFilterWithTitle = [];

/**
 * 篩選相關
 */
// 職位
const titleOptions = ['全部', '業務', '高級專員'];
const titleValue = ref<string[]>([]);
titleValue.value = ['全部']; // 預設全部
watch(titleValue, () => {
  showInfo('', titleValue.value.join('|'));
});
// 排序
const sortOptions = [
  { text: '分享時間 近→遠', value: 1 },
  { text: '分享年薪 高→低', value: 2 },
  { text: '在職年資 長→短', value: 3 },
  { text: '心情 好→壞', value: 4 },
];
const sortValue = ref();
sortValue.value = sortOptions[0].value; // 預設依時間排序
watch(sortValue, () => {
  showInfo('', sortValue.value);
});

/**
 * function
 */
async function getCompanySalary() {
  const { companiesId } = useRoute().params as { companiesId: string };
  // call search 單一公司全部薪水 api
  await searchStore.fetchSearchCompanySalary(companiesId);
  // 過濾所選職位
    // TODO
  
  // 排序
    // TODO
}


// 行動版篩選選單 modal
const showFilterModal = ref(false);
const filterModal = ref(null);
onClickOutside(filterModal, () => {
  showFilterModal.value = false;
});

/**
 * 初始化
 */
 getCompanySalary();

</script>
<template>
  <section class="companies">
    <div class="max-[1920px]:overflow-x-hidden bg-white mt-[38px] lg:mt-[108px]">
      <div
        class="mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center py-5 md:py-20 lg:pb-10 lg:pt-6"
      >
        <div class="hidden w-full lg:flex justify-start caption text-black-6 mb-15">
          <nuxt-link to="/">真薪話</nuxt-link>
          <div class="mx-3">|</div>
          <nuxt-link to="/search?searchType=type&param=資訊科技&page=1">資訊科技</nuxt-link>
          <div class="mx-3">></div>
          <nuxt-link to="/companies/98765432">OOO資訊科技有限公司</nuxt-link>
        </div>
        <div class="w-full flex flex-col lg:flex-row lg:justify-between">
          <div class="w-full lg:w-3/5 flex me-6 mb-5 lg:mb-0">
            <!-- sm -->
            <svg
              class="flex lg:hidden"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="4" fill="#5FA8FF" />
              <path
                d="M20.513 12.8007C23.5946 15.5556 24.6813 19.6111 18.6034 23.1953C19.4587 22.1002 19.9319 21.0189 20.0358 19.9356C20.2592 17.5987 18.7185 15.6973 17.02 13.9907C14.5302 11.4889 14.3451 9.07556 16.437 6.396C16.0058 9.92022 18.3607 10.8764 20.513 12.8007ZM13.823 25.7147C15.276 22.814 15.5326 21.2031 11.897 17.9504C10.9091 17.0667 10.1462 16.1662 9.61541 15.2647C8.93847 16.6947 8.40204 19.7271 10.3776 21.4724C11.7139 22.6529 13.5497 23.3611 13.823 25.7147ZM16.5065 14.4476C14.5032 12.4342 13.0502 9.61178 15.87 6C8.23286 8.82044 7.793 13.3611 12.381 17.466C16.2467 20.924 16.0462 22.8333 14.4602 26C21.9498 20.7778 19.3262 17.2809 16.5065 14.4476Z"
                fill="white"
              />
            </svg>
            <h4 class="flex lg:hidden ms-5">OOO 資訊科技有限公司</h4>
            <!-- lg -->
            <svg
              class="hidden lg:flex"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="4" fill="#5FA8FF" />
              <path
                d="M30.6248 19.5209C34.8069 23.3778 36.2818 29.0556 28.0332 34.0735C29.1939 32.5403 29.8362 31.0264 29.9771 29.5098C30.2804 26.2381 28.1894 23.5763 25.8842 21.1869C22.5053 17.6844 22.254 14.3058 25.0931 10.5544C24.5079 15.4883 27.7038 16.827 30.6248 19.5209ZM21.5455 37.6005C23.5175 33.5396 23.8657 31.2844 18.9316 26.7306C17.591 25.4933 16.5556 24.2327 15.8352 22.9705C14.9165 24.9725 14.1885 29.218 16.8697 31.6614C18.6832 33.314 21.1746 34.3056 21.5455 37.6005ZM25.1875 21.8266C22.4686 19.0079 20.4967 15.0565 24.3236 10C13.9589 13.9486 13.3619 20.3056 19.5885 26.0524C24.8348 30.8936 24.5628 33.5667 22.4103 38C32.5747 30.6889 29.0141 25.7932 25.1875 21.8266Z"
                fill="white"
              />
            </svg>
            <h2 class="hidden lg:flex ms-5 leading-[46px]">OOO 資訊科技有限公司</h2>
          </div>
          <div class="w-full lg:w-2/6 flex items-center">
            <div class="w-1/2 me-3 lg:me-5">
              <BaseButton content="請教所有前輩" class="w-full">
                <div class="icon-message me-2 -mb-1"></div>
              </BaseButton>
            </div>
            <div class="w-1/2">
              <BaseButton content="訂閱情報" cate="secondary" class="w-full">
                <div class="icon-plus-circle me-2 -mb-1"></div>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-[1920px]:overflow-x-hidden bg-gray">
      <div
        class="mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center sm:py-5 md:py-20"
      >
        <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between items-start sm:mb-6 lg:mb-20">
          <!-- lg 左半邊 -->
          <div class="w-full lg:w-4/6 flex flex-col justify-center items-start">
            <!-- 公司概況 -->
            <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
              <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                <h5>公司概況</h5>
              </div>
              <div
                class="w-full border-2 border-black-10 py-5 px-5 md:py-5 md:px-5 lg:py-5 lg:px-5 bg-white rounded-b rounded-tr"
              >
                <div class="flex flex-wrap justify-between items-center">
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h4 class="text-red">想換工作</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">加班頻率</div>
                    <h4 class="text-green">很少加班</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">平均月薪</div>
                    <h4>55K</h4>
                  </div>
                  <div class="hidden lg:block border-e h-[18px] text-black-3"></div>
                  <div class="flex flex-col items-center py-2 px-6 w-[150px]">
                    <div class="caption text-black-5 mb-1">薪水情報</div>
                    <h4>129</h4>
                  </div>
                </div>
              </div>
            </div>

            <!-- lg 薪水情報 -->
            <div class="hidden w-full lg:flex flex-col justify-center items-start sm:mb-8 lg:mb-8">
              <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                <h5>薪水情報</h5>
              </div>
              <div
                class="w-full border-2 border-black-10 sm:py-5 sm:px-10 md:py-5 md:px-5 lg:py-6 lg:px-6 bg-white rounded-b rounded-tr"
              >
                <div class="flex mb-6">
                  <div class="caption me-10">排序</div>
                  <label
                    v-for="item in sortOptions"
                    :key="item.value"
                    :for="`sort-${item.value}`"
                    class="flex-1 relative cursor-pointer items-center inline-flex justify-start caption me-5"
                  >
                    <input
                      :id="`sort-${item.value}`"
                      v-model="sortValue"
                      type="radio"
                      :value="item.value"
                      name="sort"
                      class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
                      :checked="item.value === sortValue"
                    />
                    <span :class="{ 'text-blue': item.value === sortValue }" class="ml-2">{{ item.text }}</span>
                  </label>
                </div>

                <div class="flex mb-5">
                  <div class="caption me-10">職位</div>
                  <label v-for="item in titleOptions" :key="item" :for="`title-sort-${item}`" class="me-5">
                    <input
                      :id="`title-sort-${item}`"
                      v-model="titleValue"
                      type="checkbox"
                      :value="item"
                      name="title-sort"
                      class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 accent-blue rounded-2xl translate-y-[3px]"
                    />
                    <span :class="{ 'text-blue': titleValue.includes(item) }" class="caption ml-2">{{ item }}</span>
                  </label>
                </div>
                <div class="w-full border-b border-black-1 mb-3"></div>
                <div class="flex justify-end">
                  <BaseButton cate="gray-text" content="全部重設" class="me-3"></BaseButton>
                  <BaseButton cate="white" content="套用">
                    <span class="icon-filter text-sm me-2"></span>
                  </BaseButton>
                </div>
              </div>
            </div>

            <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-0">
              <!-- sm 薪水情報篩選 -->
              <div class=" lg:hidden w-full flex justify-between">
                <div class="bg-black-10 text-white py-3 px-5 rounded-t">
                  <h5>薪水情報</h5>
                </div>
                <button
                  class="flex justify-center items-center rounded-t border-2 border-b-0 py-3 px-5 bg-white active:text-white active:bg-black-10"
                  @click="showFilterModal = !showFilterModal"
                >
                  <span class="icon-filter text-sm me-2"></span>
                  <h6>篩選</h6>
                </button>
              </div>
              <div v-for="(post,index) in posts"
              :key="index" class="sm:mb-0 lg:mb-6">
                <SalaryInfo :is-locked="checkIsLocked('6468c348abb6863c8509cfee')" :post="post" @view="redirect" />
              </div>
            </div>

          </div>

          <!-- lg 右半邊 -->
          <!-- 熱門關鍵字 -->
          <SalaryKeyword />
        </div>
      </div>
    </div>

    <!-- sm 篩選選單 -->
    <div
      v-if="showFilterModal"
      ref="filterModal"
      class="fixed shadow bg-white w-full p-5 left-0 right-0 bottom-0 z-10 bottom-modal"
    >
      <div class="flex flex-col mb-6">
        <div class="caption mb-5">排序</div>
        <div>
          <label
            v-for="item in sortOptions"
            :key="item.value"
            :for="`sort-${item.value}`"
            class="flex-1 relative cursor-pointer items-center inline-flex justify-start caption me-5 mb-5"
          >
            <input
              :id="`sort-${item.value}`"
              v-model="sortValue"
              type="radio"
              :value="item.value"
              name="sort"
              class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
              :checked="item.value === sortValue"
            />
            <span :class="{ 'text-blue': item.value === sortValue }" class="ml-2">{{ item.text }}</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col mb-10">
        <div class="caption me-10 mb-5">職位</div>
        <div>
          <label v-for="item in titleOptions" :key="item" :for="`title-sort-${item}`" class="me-5">
            <input
              :id="`title-sort-${item}`"
              v-model="titleValue"
              type="checkbox"
              :value="item"
              name="title-sort"
              class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 accent-blue rounded-2xl translate-y-[3px]"
            />
            <span :class="{ 'text-blue': titleValue.includes(item) }" class="caption ml-2">{{ item }}</span>
          </label>
        </div>
      </div>
      <div class="w-full border-b border-black-1 mb-3"></div>
      <div class="flex justify-between">
        <BaseButton class="" cate="gray-text" content="關閉" @click="showFilterModal = false"></BaseButton>
        <BaseButton class="" cate="gray-text" content="全部重設"></BaseButton>
        <BaseButton class="" cate="white" content="套用">
          <span class="icon-filter text-sm me-2"></span>
        </BaseButton>
      </div>
    </div>
    <teleport to="body">
      <SalaryModal :is-visible="isShowModal" @close="isShowModal = false" @redeem="unlockPost" />
    </teleport>
  </section>
</template>
