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

// TODO
const isLocked = ref(false);

const feelingClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '非常開心':
      className = 'icon-face-good text-green';
      break;
    case '還算愉快':
      className = 'icon-face-good text-green';
      break;
    case '平常心':
      className = 'icon-face-normal text-yellow';
      break;
    case '有苦說不出':
      className = 'icon-face-bad text-red';
      break;
    case '想換工作了':
      className = 'icon-face-bad text-red';
      break;
  }
  return className;
});

const overtimeClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '準時上下班':
      className = 'icon-time-good text-green';
      break;
    case '很少加班':
      className = 'icon-time-good text-green';
      break;
    case '偶爾加班':
      className = 'icon-time-normal text-yellow';
      break;
    case '常常加班':
      className = 'icon-time-bad text-red';
      break;
    case '賣肝拼經濟':
      className = 'icon-time-bad text-red';
      break;
  }
  return className;
});

const numberRange = computed(() => (number: number) => {
  let text = '-';
  let range = 0;
  if (number >= 100000) {
    // 若為六位數，範圍間距為 10k
    range = 10000;
  } else if (number >= 1000 && number < 100000) {
    // 若為四、五位數，範圍間距為 1k
    range = 1000;
  }

  let max = Math.ceil(number / range); // ceil 回傳大於等於所給數字的最大整數
  const min = Math.floor(number / range); // floor 回傳小於等於所給數字的最大整數
  max = min === max ? (max += 1) : max; // 若為整數 (例 40000) 依上述寫法會變成 40-40k， 則將上限加 1k 變為 40-41k

  if (number >= 100000) {
    text = `${min * 10} - ${max * 10}k`;
  } else if (number >= 1000 && number < 100000) {
    text = `${min} - ${max}k`;
  } else if (number > 0 && number < 1000) {
    text = '低於 1k';
  }
  return text;
});

const truncateText = computed(() => (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
});
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
                    <h6>{{ numberRange(post.monthlySalary) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年薪</div>
                    <h6>{{ numberRange(post.yearlySalary) }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年終</div>
                    <h6>
                      <h6>{{ numberRange(post.yearEndBonus) }}</h6>
                    </h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">三節</div>
                    <h6>{{ numberRange(post.holidayBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">分紅</div>
                    <h6>{{ numberRange(post.profitSharingBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">其他</div>
                    <h6>{{ numberRange(post.otherBonus) }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row justify-between gap-y-4">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', feelingClass(post.feeling)]"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h6>{{ post.feeling }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', overtimeClass(post.overtime)]"></span>
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
            <p class="body-sm">{{ isLocked ? post.jobDescription : truncateText(post.jobDescription, 20) }}</p>
          </div>
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">其他建議</div>
            <p class="body-sm">{{ isLocked ? post.suggestion : truncateText(post.suggestion, 20) }}</p>
          </div>
          <div class="flex flex-wrap mb-5">
            <span v-for="tag in post.tags" :key="tag" class="body-sm text-black-5 me-5"> #{{ tag }} </span>
          </div>
          <div class="flex justify-between p-4 bg-blue-light">
            <div class="text-blue">
              <span>想了解只有員工才知道的職場心聲？</span>
              <br />
              <span>兌換後馬上就能向前輩發問！</span>
            </div>
            <btn content="查看完整內容及薪水" @click="emit('click')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
