<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { showSuccess } from '~/utilities/message';
import LottieAnimation from '@/components/LottieAnimation.vue';
import checkInAnimationData from '@/assets/json/checkIn.json';
import checkInSpAnimationData from '@/assets/json/checkInSpecial.json';

useHead({
  title: '關於我',
});
definePageMeta({
  middleware: 'auth',
});

const user = useUserStore();
const { tryToFetchProfile, tryToFetchPostDailyCheckIn } = user;
const { currentUser, checkTodayCheckedIn, checkInStreak, isCheckInLoading } = storeToRefs(user);
const checkInFirstRewardCount = ref(7);
const checkInLastlyRewardCount = ref(14);
const currentCheckInStreak = ref(0); // 簽到連續天數
// 初始化時，從 currentUser 取得未簽到前的連續天數
currentCheckInStreak.value = currentUser.value?.points?.checkInStreak;

const checkIn = async () => {
  // false 代表尚未簽到
  if (checkTodayCheckedIn.value) {
    return;
  }
  await tryToFetchPostDailyCheckIn();
  currentCheckInStreak.value = checkInStreak.value;
  if (currentCheckInStreak.value === 1) {
    forceRender(); // 若是第一天重新渲染，為了要觸發從 14 天到 1 天的動畫，
  }
  showSuccess('成功', '每日簽到成功！');

  nextTick(() => {
    tryToFetchProfile();
  });
};

const checkInText = computed(() => {
  if (checkTodayCheckedIn.value) {
    return '已簽到';
  }
  return '每日簽到';
});

const checkInOptions = ref({
  animationData: checkInAnimationData,
  loop: false,
  autoplay: true,
});
const checkInSpOptions = ref({
  animationData: checkInSpAnimationData,
  loop: false,
  autoplay: true,
});

// 重新渲染套件
const componentKey = ref(0);
const forceRender = () => {
  componentKey.value += 1;
};
</script>

<template>
  <userLayouts>
    <div class="w-full flex flex-col">
      <div class="w-full">
        <!-- 基本資料 -->
        <div class="mb-5 flex items-center">
          <h5 class="mr-4">基本資料</h5>
        </div>
        <ul class="list-none">
          <li class="mb-2 flex">
            <span class="w-[130px]">姓名:</span>
            <span>{{ currentUser.displayName }}</span>
          </li>
          <li class="mb-2 flex">
            <span class="w-[130px]">註冊信箱:</span>
            <span>{{ currentUser.email }}</span>
          </li>
          <li class="flex">
            <span class="w-[130px]">註冊方式:</span>
            <span>{{ 'Google' }}</span>
          </li>
        </ul>
        <div class="border-b border-black-1 py-4 mb-6"></div>
        <!-- 每日簽到 -->
        <div class="mb-5 flex flex-col">
          <div class="flex mb-5">
            <h5 class="me-3">
              每日簽到：已連續簽到<span class="text-blue px-1">{{ currentCheckInStreak }}</span
              >天
            </h5>
          </div>
          <div class="flex flex-col w-full">
            <div class="w-full flex flex-col lg:flex-row border border-black-1 rounded px-0 py-5">
              <div class="w-full lg:w-1/2 flex justify-center p-5 ">
                <div class="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-5 gap-x-4 gap-y-5 lg:gap-y-0">
                  <div v-for="count in checkInLastlyRewardCount" :key="count" class="">
                    <!-- 一般天數 -->
                    <div
                      v-if="count != checkInFirstRewardCount && count != checkInLastlyRewardCount"
                      class="flex flex-col items-center justify-center"
                    >
                      <div class="caption text-sm text-black-6 mb-2">
                        <span class="pe-[2px]">{{ count }}</span
                        >天
                      </div>
                      <!-- 已簽到樣式 -->
                      <div
                        v-if="count <= currentCheckInStreak"
                        :key="componentKey"
                        class="flex justify-center items-center w-12 h-12"
                      >
                        <LottieAnimation :options="checkInOptions" class="absolute -top-[23px] w-[96px] h-[96px]" />
                      </div>
                      <!-- 未簽到樣式 -->
                      <div
                        v-if="count > currentCheckInStreak"
                        class="flex justify-center items-center rounded-full w-12 h-12 bg-gray border border-black-1"
                      >
                        <div class="caption text-md font-medium">+10</div>
                      </div>
                    </div>

                    <!-- 特別天數 -->
                    <div
                      v-if="count == checkInFirstRewardCount || count == checkInLastlyRewardCount"
                      class="flex flex-col items-center justify-center"
                    >
                      <div class="caption text-sm text-black-6 mb-2">
                        <span class="pe-[2px]">{{ count }}</span
                        >天
                      </div>
                      <!-- 已簽到樣式 -->
                      <div
                        v-if="count <= currentCheckInStreak"
                        :key="componentKey"
                        class="flex justify-center items-center w-12 h-12"
                      >
                        <LottieAnimation :options="checkInSpOptions" class="absolute -top-[23px] w-[96px] h-[96px]" />
                      </div>
                      <!-- 未簽到樣式 -->
                      <div
                        v-if="count == checkInFirstRewardCount && count > currentCheckInStreak"
                        class="flex justify-center items-center rounded-full w-12 h-12 bg-gray border border-yellow"
                      >
                        <div class="caption text-md font-medium text-yellow">+50</div>
                      </div>
                      <div
                        v-if="count == checkInLastlyRewardCount && count > currentCheckInStreak"
                        class="flex justify-center items-center rounded-full w-12 h-12 bg-gray border border-yellow"
                      >
                        <div class="caption text-md font-medium text-yellow">+100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hidden lg:flex :w-[1px] h-full py-48 border-r border-black-1"></div>

              <div class="w-full lg:w-1/2 flex flex-col p-5">
                <div class="pb-5 mb-5 border-b border-black-1">            
                  <BaseButton
                    class="w-full h-[48px]"
                    :class="{ 'pointer-events-none': checkTodayCheckedIn || isCheckInLoading, 'opacity-80': isCheckInLoading }"
                    :content="checkInText"
                    :cate="checkTodayCheckedIn ? 'gray' : 'primary'"
                    @click="checkIn"
                  >
                    <div v-if="isCheckInLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div v-else class="icon-checked text-lg me-1"></div>
                  </BaseButton>
                </div>
                <div class="flex flex-col">
                  <div class="flex pb-5 mb-5 border-b border-black-1">
                    <div class="icon-info text-blue text-lg mt-[2px] mr-3"></div>
                    <div>
                      <div class="caption mb-1">每日早上 8:00 可以開始簽到</div>
                    </div>
                  </div>
                  <div class="flex pb-5 mb-5 border-b border-black-1">
                    <div class="icon-info text-blue text-lg mt-[2px] mr-3"></div>
                    <div>
                      <div class="caption mb-1">每日簽到可獲得 10 點積分</div>
                      <div class="caption mb-1">連續簽到第 7 天可獲得 50 點積分</div>
                      <div class="caption">連續簽到第 14 天可獲得 100 點積分</div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="icon-info text-blue text-lg mt-[2px] mr-3"></div>
                    <div>
                      <div class="caption mb-1">若未連續簽到，則重新計算簽到天數</div>
                      <div class="caption">若連續超過 14 天簽到，則重新計算簽到天數</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </userLayouts>
</template>
