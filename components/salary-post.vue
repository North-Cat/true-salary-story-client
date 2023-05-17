<script setup lang="ts">
import { ref, computed } from 'vue';
import { IShareSalaryFormData } from '@/interface/salaryData';
useHead({
  title: '薪水分享',
});

defineProps<{
  post: IShareSalaryFormData;
}>();

const emit = defineEmits(['click']);

// 審核內容
// const feelingClass = computed(() => (id: string) => {
//   let className = '';
//   switch (id) {
//     case '1':
//       className = 'icon-face-good text-green';
//       break;
//     case '2':
//       className = 'icon-face-good text-green';
//       break;
//     case '3':
//       className = 'icon-face-normal text-yellow';
//       break;
//     case '4':
//       className = 'icon-face-bad text-red';
//       break;
//     case '5':
//       className = 'icon-face-bad text-red';
//       break;
//   }
//   return className;
// });
// const overtimeClass = computed(() => (id: string) => {
//   let className = '';
//   switch (id) {
//     case '1':
//       className = 'icon-time-good text-green';
//       break;
//     case '2':
//       className = 'icon-time-good text-green';
//       break;
//     case '3':
//       className = 'icon-time-normal text-yellow';
//       break;
//     case '4':
//       className = 'icon-time-bad text-red';
//       break;
//     case '5':
//       className = 'icon-time-bad text-red';
//       break;
//   }
//   return className;
// });
</script>

<template>
  <section
    class="lg:w-4/6 border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white sm:mb-8 lg:mb-0"
  >
    <div class="w-full flex flex-col p-6">
      <div class="flex flex-col">
        <div class="p-6 flex flex-col">
          <div class="flex mb-5">
            <div class="w-[48px] h-[48px] flex justify-center items-center rounded bg-blue-light mr-[18px]">
              <span class="icon-sparkle-checked text-3xl text-blue-dark"></span>
            </div>
            <div class="flex flex-col justify-between">
              <h5>{{ post.companyName }} | {{ post.title }}</h5>
              <div class="flex">
                <div class="caption text-black-6">{{ post.type }}</div>
                <span class="caption text-black-6 px-3">|</span>
                <div class="caption text-black-6">{{ post.city }}</div>
                <span class="caption text-black-6 px-3">|</span>
                <div class="caption text-black-6">{{ post.createDate + ' 分享' }}</div>
              </div>
            </div>
          </div>
          <div class="flex flex-col pb-5 border-b border-b-black-1 mb-5">
            <div class="w-full flex flex-col lg:flex-row justify-between mb-5 gap-y-4">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">月薪</div>
                    <h6>70-71k</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年薪</div>
                    <h6>980-990k</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年終</div>
                    <h6>-</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">三節</div>
                    <h6>-</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">分紅</div>
                    <h6>-</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">其他</div>
                    <h6>-</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row justify-between gap-y-4">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="text-2xl"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h6>{{ post.feeling }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="text-2xl"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">加班頻率</div>
                    <h6>{{ post.overtime }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">在職年資</div>
                    <h6>{{ post.workYears + ' 年' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">個人總年資</div>
                    <h6>{{ post.totalWorkYears + ' 年' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">日均工時</div>
                    <h6>{{ post.avgHoursPerDay + ' 小時' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">在職狀況</div>
                    <h6>{{ post.inService ? '仍在職' : '已離職' }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">工作內容</div>
            <p class="body-sm">{{ post.jobDescription }}</p>
          </div>
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">其他建議</div>
            <p class="body-sm">{{ post.suggestion }}</p>
          </div>
          <div class="flex flex-wrap mb-5">
            <span v-for="tag in post.tags" :key="tag" class="body-sm text-black-5 me-5"> #{{ tag }} </span>
          </div>
          <div class="flex justify-between p-4 bg-blue-light">
            <div class="text-blue">
              <p>有更多問題想要深入了解？</p>
              <p>兌換後馬上就能向前輩發問！</p>
            </div>
            <div>
              <button
                class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded mr-5"
                @click="emit('click')"
              >
                向前輩請教
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
