<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { IShareSalaryFormData } from '@/interface/salaryData';
import salaryPost from '@/components/salary-post.vue';
import keyword from '@/components/salary-keyword.vue';
useHead({
  title: '薪水分享',
});

const route = useRoute();
const { id } = route.params;
const post = ref<IShareSalaryFormData>({});
// const { data, pending, error, refresh } = await useFetch('https://random-data-api.com/api/v2/users?size=2&is_xml=true');
// console.log(data.value)
post.value = {
  postId: 'Post1234',
  title: '工程師',
  companyName: '卯咪股份有限公司',
  taxId: '87654321',
  type: '全職',
  inService: true,
  city: '台北',
  workYears: 1,
  totalWorkYears: 5,
  avgHoursPerDay: 8,
  monthlySalary: 40000,
  yearlySalary: 480000,
  yearEndBonus: 40000,
  holidayBonus: 2000,
  profitSharingBonus: 2000,
  otherBonus: 2000,
  overtime: '4',
  feeling: '3',
  jobDescription:
    '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。',
  suggestion:
    '印象最深的是老闆會親自舉辦很多工作坊，對於職場新鮮人或是職場老手都很有收穫，公司重視提升軟實力，很建議對自己有要求，想要自我提升的人來此公司。',
  tags: [
    '有升遷管道',
    '固定加薪',
    '免費零食/水果',
    '固定加薪',
    '免費零食/水果',
    '固定加薪',
    '免費零食/水果',
    '固定加薪',
    '免費零食/水果',
    '固定加薪',
    '免費零食/水果',
    '固定加薪',
    '免費零食/水果',
  ],
  status: '待審核',
  createDate: '2023.4.12',
};
</script>

<template>
  <div class="bg-gray pt-[130px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
    >
      <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20">
        <salary-post :post="post" />
        <keyword />
      </div>
    </div>
  </div>
</template>
