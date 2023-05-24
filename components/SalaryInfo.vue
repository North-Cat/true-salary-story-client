<script setup lang="ts">
import { IShareSalaryFormData } from '@/interface/salaryData';
import { useNumberRange, useTruncateText, useOvertimeClass, useFeelingClass } from '@/composables/post';

withDefaults(
  defineProps<{
    post: IShareSalaryFormData;
    isLocked: boolean;
  }>(),
  {
    isLocked: false,
  },
);
const emit = defineEmits(['view']);
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
                    <h6>{{ isLocked ? useNumberRange(post.monthlySalary) : '兌換後顯示' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年薪</div>
                    <h6>{{ isLocked ? useNumberRange(post.yearlySalary) : '兌換後顯示' }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年終</div>
                    <h6>{{ isLocked ? useNumberRange(post.yearEndBonus) : '??' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">三節</div>
                    <h6>{{ isLocked ? useNumberRange(post.holidayBonus) : '??' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">分紅</div>
                    <h6>{{ isLocked ? useNumberRange(post.profitSharingBonus) : '??' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">其他</div>
                    <h6>{{ isLocked ? useNumberRange(post.otherBonus) : '??' }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row justify-between gap-y-4">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', useFeelingClass(post.feeling)]"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h6>{{ post.feeling }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', useOvertimeClass(post.overtime)]"></span>
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
            <p class="body-sm">
              {{ isLocked ? post.jobDescription : post.jobDescription && useTruncateText(post.jobDescription, 20) }}
            </p>
          </div>
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">其他建議</div>
            <p v-show="post.suggestion" class="body-sm">
              {{ isLocked ? post.suggestion : post.suggestion && useTruncateText(post.suggestion, 20) }}
            </p>
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
            <BaseButton v-if="!isLocked" content="查看完整內容及薪水" @click="emit('view')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>