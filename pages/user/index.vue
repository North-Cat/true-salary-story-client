<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { showSuccess } from '~/utilities/message';
import Lottie from "@/components/Lottie.vue";
import checkInAnimationData from "@/assets/json/checkIn.json";
import { AnimationItem } from 'lottie-web';
const { userApi } = useApi();

useHead({
  title: '關於我',
});
definePageMeta({
  middleware: 'auth',
});

const user = useUserStore();
const { tryToFetchProfile, tryToFetchPostDailyCheckIn } = user;
const { currentUser, checkTodayCheckedIn, checkInStreak } = storeToRefs(user);
const checkInFirstRewardCount = ref(7); 
const checkInLastlyRewardCount = ref(14);
const currentCheckInStreak = ref(0); // 打卡連續天數
currentCheckInStreak.value = currentUser.value?.points?.checkInStreak; // 初始化時，從 currentUser 取得未打卡前的連續天數
// currentCheckInStreak.value = 14;
watch(currentCheckInStreak, () => {
  // 簽到動畫
  console.log('isPaused',instance.value?.isPaused);
  instance.value?.play();
  // if (instance.value?.isPaused){
  //   instance.value?.play();
  // }else {
  //   instance.value?.pause();
  // }
})
function test(){
  currentCheckInStreak.value ++;
}
const isShow = ref(false);
function testShow(){
  isShow.value = true;
  // instance.value?.play();
}

const checkIn = async () => {
  // false 代表尚未簽到
  if (checkTodayCheckedIn.value) {
    return;
  }
  await tryToFetchPostDailyCheckIn();
  showSuccess("成功","每日簽到成功！");
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

const isCheckInClass = computed(() => (count:number, isSpecial:boolean) => {
  let className = '';
  if (currentCheckInStreak.value >= count && !isSpecial){
    // className = 'bg-blue';
  }else if (currentCheckInStreak.value >= count && isSpecial){
    className = 'bg-yellow';
  }else {
    className = 'bg-gray-light';
  }
  return className;
});

const defaultOptions = ref({
  animationData: checkInAnimationData,
  loop: false,
  autoplay: true,
});
const instance = ref<AnimationItem>();
function animCreated(e: AnimationItem) {
  instance.value = e;
  // instance.value?.pause();
}
</script>

<template>
  <userLayouts>
    <div class="w-full flex flex-col">
      <div class="w-full">
        <!-- 基本資料 -->
        <div class="mb-5 flex items-center">
          <h5 class="mr-4">基本資料</h5>
          <!-- <BaseButton :cate="checkTodayCheckedIn ? 'gray' : 'primary'" @click="checkIn">
            {{ checkInText }}
          </BaseButton> -->
          <BaseButton @click="test">test</BaseButton>
          <BaseButton @click="testShow">testShow</BaseButton>
          <Lottie v-if="isShow" :options="defaultOptions" @animCreated="animCreated" width="48px" height="48px"/>
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
            <h5 class="me-3">每日簽到：已連續打卡<span class="text-blue px-1">{{ currentCheckInStreak }}</span>天</h5>
            <nuxt-link
                to="/user/credit-history"
                class="bg-black-1 px-2 py-1 mr-2 text-sm"
              >
                積分明細
            </nuxt-link>
          </div>
          <div class="flex flex-col w-full">
            <div class="flex flex-col border border-black-1 rounded px-5 pt-5 pb-1 mb-6">
              <div class="flex justify-between items-center">
                <div class="flex">
                  <div class="icon-info text-blue text-lg mt-[2px] mr-3"></div>
                  <div>
                    <div class="caption mb-1">每日打卡可獲得 10 點積分</div>
                    <div class="caption mb-1">連續打卡第 7 天可獲得 50 點積分</div>
                    <div class="caption">連續打卡第 12 天可獲得 100 點積分</div>
                  </div>
                </div>
                <div class="h-full py-6 border-r border-black-1"></div>
                <BaseButton 
                class="w-1/2 h-[48px]" 
                :class="{'pointer-events-none':checkTodayCheckedIn}"
                :content="checkInText" 
                :cate="checkTodayCheckedIn ? 'gray' : 'primary'" 
                @click="checkIn">
                  <div class="icon-checked text-lg me-1"></div>
                </BaseButton>              
              </div>
              <div class="border-b border-black-1 py-2 mb-6"></div>
              <div class="flex flex-wrap">
                <div v-for="count in checkInLastlyRewardCount" :key="count" class="">
                  <!-- 一般天數 -->
                  <div v-if="count != checkInFirstRewardCount && count != checkInLastlyRewardCount" 
                  class="flex flex-col items-center justify-center me-4 mb-5">
                    <div class="caption text-sm mb-1 text-black-6"><span class="pe-[2px]">{{ count }}</span>天</div>
                    <Lottie v-if="count <= currentCheckInStreak" :options="defaultOptions" @animCreated="animCreated" class="absolute top-2 w-20 h-20"/>
                    <div 
                    class="flex items-center justify-center text-black-5 rounded-full w-12 h-12 cursor-default"
                    :class="isCheckInClass(count, false)">
                    <!-- <div v-if="count <= currentCheckInStreak" class="icon-checked text-xl font-bold text-white"></div> -->
                      <div v-if="count > currentCheckInStreak" class="caption text-md font-medium">+10</div>
                    </div>
                  </div>
                  <!-- 特別天數 -->
                  <div v-if="count == checkInFirstRewardCount || count == checkInLastlyRewardCount" class="flex flex-col items-center justify-center me-4 mb-5">
                    <div class="caption text-sm mb-1 text-black-6"><span class="pe-[2px]">{{ count }}</span>天</div>
                    <div 
                    class="flex items-center justify-center bg-gray-light text-black-5 rounded-full w-12 h-12 cursor-default"
                    :class="isCheckInClass(count, true)">
                      <div v-if="count <= currentCheckInStreak" class="icon-checked text-xl font-bold text-white"></div>
                      <div v-if="count == checkInFirstRewardCount && count > currentCheckInStreak" class="caption text-md font-medium text-blue">+50</div>
                      <div v-if="count == checkInLastlyRewardCount && count > currentCheckInStreak" class="caption text-md font-medium text-blue">+100</div>
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
