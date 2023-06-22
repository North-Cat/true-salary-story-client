<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { IShareSalary } from '@/interface/salaryData';
import { useNumberRange, useOvertimeClass, useFeelingClass } from '@/composables/post';
import { useConsultStore } from '@/store/consult';
import { useWSStore } from '@/store/ws';
import { useUserStore } from '@/store/user';

const props = withDefaults(
  defineProps<{
    post: IShareSalary;
    initLoading: boolean;
  }>(),
  {
    initLoading: false,
  },
);
const emit = defineEmits(['view']);

const consultStore = useConsultStore();
const route = useRoute();
const router = useRouter();
const wsStore = useWSStore();
const user = useUserStore();
const { currentUser } = storeToRefs(user);

const loading = ref(false);

const resultSalaryTitle = computed(() => {
  if (props.post.type === 'monthly') return '月薪';
  if (props.post.type === 'daily') return '日薪';
  return '時薪';
});
const resultSalary = computed(() => {
  if (props.post.type === 'monthly') return props.post.monthlySalary;
  if (props.post.type === 'daily') return props.post.dailySalary;
  return props.post.hourlySalary;
});
const isMySalary = computed(() => {
  return props.post.createUser === currentUser.value._id;
});

const handleCreateConsult = async () => {
  try {
    loading.value = true;

    const payload = {
      receiverId: props.post.createUser,
      postId: props.post.postId as string,
    };

    await consultStore.createConsult(payload);

    const wsPayload = {
      type: 'create',
      receiverId: props.post.createUser,
    };
    if (wsStore.ws) {
      wsStore.ws.send(JSON.stringify(wsPayload));
    }

    await router.push({
      path: '/user/consult',
      query: {
        post: props.post.postId,
      },
    });
  } catch (error) {
    console.error('create consult error: ', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section
    v-if="!initLoading"
    class="lg:w-4/6 border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white sm:mb-8 lg:mb-0"
  >
    <div class="w-full flex flex-col sm:p-3 md:p-6">
      <div class="flex flex-col">
        <div class="sm:p-3 md:p-6 flex flex-col">
          <div class="flex mb-5">
            <div class="w-[48px] h-[48px] flex justify-center items-center rounded bg-blue-light mr-[18px]">
              <span class="icon-sparkle-checked text-3xl text-blue-dark"></span>
            </div>
            <div class="flex flex-col justify-between">
              <h5>{{ post.companyName }} | {{ post.title }}</h5>
              <div class="flex">
                <div class="caption text-black-6">{{ post.employmentType }}</div>
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
                    <div class="caption text-black-5 mb-1">{{ resultSalaryTitle }}</div>
                    <h6>{{ post.isLocked ? '兌換後顯示' : useNumberRange(resultSalary) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年薪</div>
                    <h6>{{ post.isLocked ? '兌換後顯示' : useNumberRange(post.yearlySalary) }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年終</div>
                    <h6>{{ post.isLocked ? '??' : useNumberRange(post.yearEndBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">三節</div>
                    <h6>{{ post.isLocked ? '??' : useNumberRange(post.holidayBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">分紅</div>
                    <h6>{{ post.isLocked ? '??' : useNumberRange(post.profitSharingBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">其他</div>
                    <h6>{{ post.isLocked ? '??' : useNumberRange(post.otherBonus) }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row justify-between gap-y-4">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', useFeelingClass(post.feeling, true)]"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h6>{{ post.feeling }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="['text-2xl', useOvertimeClass(post.overtime, true)]"></span>
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
                    <h6>{{ post.workYears > 0 ? `${post.workYears}年` : '未滿1年' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">個人總年資</div>
                    <h6>{{ post.totalWorkYears > 0 ? `${post.totalWorkYears}年` : '未滿1年' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">日均工時</div>
                    <h6>{{ post.avgHoursPerDay + '小時' }}</h6>
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
              {{ post.jobDescription }}
            </p>
          </div>
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">其他建議</div>
            <p v-show="post.suggestion" class="body-sm">
              {{ post.suggestion }}
            </p>
          </div>
          <div v-if="post.tags.length" class="flex flex-wrap mb-5">
            <span v-for="tag in post.tags" :key="tag" class="body-sm text-black-5 me-5"> #{{ tag }} </span>
          </div>
          <div v-if="post.customTags.length" class="flex flex-wrap mb-5">
            <span v-for="customTag in post.customTags" :key="customTag" class="body-sm text-black-5 me-5">
              #{{ customTag }}
            </span>
          </div>
          <div class="flex sm:flex-col sm:justify-center md:flex-row md:justify-between p-4 bg-blue-light">
            <div class="text-blue sm:pb-3">
              <span>想了解只有員工才知道的職場心聲？</span>
              <br />
              <span>兌換後馬上就能向前輩發問！</span>
            </div>
            <BaseButton v-if="post.isLocked" content="查看完整內容及薪水" @click="emit('view', post.postId)" />
            <BaseButton v-if="!post.isLocked && !isMySalary" content="我要請教" @click="handleCreateConsult">
              <span v-show="loading">...</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="lg:w-4/6"></section>
</template>
