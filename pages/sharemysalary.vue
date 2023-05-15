<script lang="ts" setup>
import { storeToRefs } from 'pinia';
<<<<<<< HEAD
import { useUserStore } from '@/store/user';
const { shareSalaryApi } = useApi()
=======
// 測試驗證區
import { object, string } from 'yup';
import { useForm, useField, configure, defineRule } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
>>>>>>> develop
import {
  cityOptions,
  yearsOfServiceOptions,
  workingHoursOptions,
  isServerOptions,
  employmentTypesOptions,
  salaryTypesOpions,
  monthOptions,
  overtimeOptions,
  feelingOptions,
  tagsOptions,
} from '~/utilities/options';
import { useUserStore } from '@/store/user';
import { IShareSalaryFormData, ISalary } from '~/interface/salaryData';
useHead({
  title: '匿名分享',
});
// definePageMeta({
//   middleware: 'auth',
// });
const submitData: IShareSalaryFormData = reactive({
  taxId: '',
  companyName: '',
  title: '',
  employmentType: '全職',
  inService: true,
  city: '',
  workYears: '',
  totalWorkYears: '',
  monthlySalary: '',
  dailySalary: '',
  avgWorkingDaysPerMonth: '',
  hourlySalary: '',
  dailyAverageWorkingHours: '',
  yearEndBonus: '',
  holidayBonus: '',
  profitSharingBonus: '',
  otherBonus: '',
  overtime: 3,
  feeling: 3,
  jobDescription: '',
  suggestion: '',
  tags: [],
<<<<<<< HEAD
  customTags: []
})
// 測試驗證區
import { useForm, useField, configure, defineRule } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
=======
  customTags: [],
});
>>>>>>> develop
const { errorMessage, handleBlur, setErrors, errors } = useField('taxId', 'required|numeric');
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  generateMessage: localize({ zh_TW: zhTW }),
});
setLocale('zh_TW');

defineRule('taxIdVee', async (taxId: string) => {
  const reg = /^\d{8}$/;
  const matchResult = taxId.match(reg);

  if (!matchResult) {
    return '統編為8碼';
  }

  const idArray = matchResult[0].split('').map(Number);
  const weight = [1, 2, 1, 2, 1, 2, 4, 1];
  let sum = 0;

  for (let i = 0; i < idArray.length; i++) {
    const p = idArray[i] * weight[i];
    const s = Math.floor(p / 10) + (p % 10);
    sum += s;
  }

  const checkNumber = 5;
  const isLegal = sum % checkNumber === 0 || ((sum + 1) % checkNumber === 0 && idArray[6] === 7);

  if (!isLegal) {
    return '統編驗證錯誤'
  }
  let isHasTaxId = true;
  await tryToGetUniformNumbers().then((res) => {
    if (!res.isExist) {
      submitData.companyName = ''
      isHasTaxId = false
    } else {
      submitData.companyName = res.companyName
    }
  })
  if (!isHasTaxId) {
    return '查無此統編'
  }
  return true;
});


const tryToGetUniformNumbers = async () => {
  const data = await shareSalaryApi.getUniformNumbers(submitData.taxId)
  const { isExist, companyName } = JSON.parse(JSON.stringify(data))._value
  return {
    isExist,
    companyName
  }
}
// 測試驗證區結束

const user = useUserStore();
const { currentUser } = storeToRefs(user);
const salaryTypes = ref('monthly');
const customTagsText = ref('');
const step = ref(1);
const form = ref(null);

const salaryTypesField: ISalary = reactive({
  monthly: {
    salary: '',
    total: '',
  },
  daily: {
    salary: '',
    avgWorkingDaysPerMonth: '',
    total: '',
  },
  hourly: {
    salary: '',
    dailyAverageWorkingHours: '',
    avgWorkingDaysPerMonth: '',
    total: '',
  },
});
watch(
  salaryTypesField,
  (newValue, oldValue) => {
    // 要監聽的值，參數 : 新值跟舊值
    chnagSalaryTotal();
  },
<<<<<<< HEAD
})
watch(salaryTypesField, (newValue, oldValue) => {
  chnagSalaryTotal()
}, { deep: true });
=======
  { deep: true },
);
>>>>>>> develop

watch(
  () => [submitData.yearEndBonus, submitData.holidayBonus, submitData.profitSharingBonus, submitData.otherBonus],
  () => {
    chnagSalaryTotal();
  },
);

// 監聽 salaryTypesField 的變化
const chnagSalaryTotal = () => {
  const monthlySalary = Number(salaryTypesField.monthly.salary);
  const dailySalary = Number(salaryTypesField.daily.salary);
  const dailyAvgWorkingDays = Number(salaryTypesField.daily.avgWorkingDaysPerMonth);
  const hourlySalary = Number(salaryTypesField.hourly.salary);
  const hourlyAvgWorkingHours = Number(salaryTypesField.hourly.dailyAverageWorkingHours);
  const hourlyAvgWorkingDays = Number(salaryTypesField.hourly.avgWorkingDaysPerMonth);
  if (isNumber(monthlySalary)) {
    salaryTypesField.monthly.total = calculateTotal(monthlySalary, 12) + othersBouns();
  }
  if (isNumber(dailySalary) && isNumber(dailyAvgWorkingDays)) {
    salaryTypesField.daily.total = calculateTotal(dailySalary * dailyAvgWorkingDays, 12) + othersBouns();
  }
  if (isNumber(hourlySalary) && isNumber(hourlyAvgWorkingHours) && isNumber(hourlyAvgWorkingDays)) {
    salaryTypesField.hourly.total =
      calculateTotal(hourlySalary * hourlyAvgWorkingHours * hourlyAvgWorkingDays, 12) + othersBouns();
  }
};
const othersBouns = () => {
  const { yearEndBonus, holidayBonus, profitSharingBonus, otherBonus } = submitData;
  const resYearEndBonus = isNumber(Number(yearEndBonus)) ? yearEndBonus : '0';
  const resHolidayBonus = isNumber(Number(holidayBonus)) ? holidayBonus : '0';
  const resProfitSharingBonus = isNumber(Number(profitSharingBonus)) ? profitSharingBonus : '0';
  const resOtherBonus = isNumber(Number(otherBonus)) ? otherBonus : '0';
  return Number(resProfitSharingBonus) + Number(resOtherBonus) + Number(resYearEndBonus) + Number(resHolidayBonus);
};
const isNumber = (value: number) => {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
};
// 定義一個函數，用來計算 total 值
const calculateTotal = (salary: number, multiplier: number): number | string => {
  return salary ? Number(salary * multiplier) : 0;
};

const addCustomTags = (tag: string) => {
  submitData.customTags?.push(tag);
  customTagsText.value = '';
};
const removeCustomTag = (tag: string) => {
  if (!submitData.customTags) return;
  const index = submitData.customTags.indexOf(tag);
  if (index === -1) return;
  submitData.customTags.splice(index, 1);
};
const onSubmit = () => {
  console.log('value', form.value);
  // form.value.resetForm();
};
const debug = ref(false);
// 右側邊欄
const rightSideList = reactive([
  {
    title: '關於薪水情報',
    description: '',
    list: [
      {
        icon: 'icon-hide',
        title: '全站匿名',
        description: '安心分享自己的真實經驗',
      },
      {
        icon: 'icon-person-checked',
        title: '真人審核',
        description: '每筆心得經過審核，杜絕無用內容',
      },
      {
        icon: 'icon-message',
        title: '向前輩發問',
        description: '直接私訊前輩，開啟更多機會',
      },
      {
        icon: 'icon-shield-checked',
        title: '言論自由',
        description: '法律團隊確保你在這裡的言論自由',
      },
    ],
  },
  {
    title: '精選心得：樂於分享總是有所回報',
    description: '如果你填寫了優質內容，並由真薪話小幫手選為「編輯精選」後，你可以享有以下福利。',
    list: [
      {
        icon: 'icon-sparkle-checked',
        title: '精選標章',
        description: '幫助下一個人辨認優質內容',
      },
      {
        icon: 'icon-list',
        title: '優先曝光',
        description: '讓薪水情報可以讓更多人看見',
      },
      {
        icon: 'icon-star-circle',
        title: '額外積分獎勵',
        description: '額外獲得 200 積分',
      },
    ],
  },
]);
</script>
<template>
  <section class="bg-gray sm:py-10 md:py-10 lg:py-20 max-[1920px]:overflow-x-hidden">
    <div class="sharemysalary container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl lg:mt-10">
      <h2 class="text-3xl mb-5">匿名分享</h2>
      <div class="flex">
        <div class="lg:w-4/6 border-2 border-black-10 mt-20 md:mt-10 lg:mt-0 rounded-bl rounded-br">
          <div class="w-100 p-6 bg-black-10 text-white">
            <h4>{{ currentUser.displayName || 'Hi' }}，讓我們開始這趟奇妙旅程吧！</h4>
            <p class="opacity-70 mt-2">在真薪話站上提供的資訊完全不會揭露你的任何個資，請安心分享。</p>
          </div>
          <VForm v-slot="{ errors, meta }" ref="form" class="p-6" @submit="onSubmit">
            <div v-show="step === 1">
              <!-- 公司統編 -->
              <div class="mb-10">
                <label for="taxId" label="" class="text-black-10">公司統一編號</label>
                <VField v-model.number="submitData.taxId" name="taxId" label="統一編號" type="number"
                  :class="{ 'border-red': errors.taxId }" rules="required|numeric|taxIdVee"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" placeholder="請輸入公司統一編號" />
                <VErrorMessage name="taxId" as="div" class="help is-danger text-red" />
              </div>
              <!-- 公司名稱 -->
              <div class="mb-10">
                <<<<<<< HEAD <label for="companyName" label="" class="text-black-10 ">公司名稱</label>
                  <input id="companyName" type="text" name="companyName" v-model="submitData.companyName"
                    class="w-full border border-black-1 rounded py-2 px-4 mt-2" disabled placeholder="請輸入公司名稱" />
                  =======
                  <label for="companyName" label="" class="text-black-10">公司名稱</label>
                  <input id="companyName" type="text" name="companyName"
                    class="w-full border border-black-1 rounded py-2 px-4 mt-2" disabled placeholder="請輸入公司名稱" />
                  >>>>>>> develop
              </div>
              <!-- 應徵職務 -->
              <div class="">
                <label for="taxId" label="" class="text-black-10">應徵職務</label>
                <VField v-model.trim="submitData.title" name="title" label="應徵職務" type="text"
                  :class="{ 'border-red': errors.title }" rules="required"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" placeholder="請輸入應徵職務" />
                <VErrorMessage name="title" as="div" class="help is-danger text-red" />
              </div>
              <div class="flex items-center mt-1 mb-10">
                <input id="inService" type="checkbox" name="inService"
                  class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 rounded accent-blue rounded-2xl" />
                <label for="inService" class="text-gray-700 ml-2 hover:text-blue">不提供職務名稱（將不會獲得精選）</label>
              </div>

              <!-- 職務類別 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.employmentType" :options="employmentTypesOptions" label="職務類別"
                  name="employmentType" is-button-style required="required" />
              </div>

              <!-- 在職狀況 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.inService" :options="isServerOptions" label="在職狀況" name="isService"
                  is-button-style />
              </div>

              <!-- 工作城市 -->
              <div class="mb-10">
                <BaseFormSelect v-model="submitData.city" :options="cityOptions" label="工作城市" name="city"
                  required="required" />
              </div>

              <!-- 年資 -->
              <div class="flex mb-10">
                <BaseFormSelect v-model="submitData.workYears" :options="yearsOfServiceOptions" label="在職年資" class="mr-3"
                  name="workYears" required="required" />
                <BaseFormSelect v-model="submitData.totalWorkYears" :options="yearsOfServiceOptions" label="總年資"
                  class="ml-3" name="totalWorkYears" required="required" />
              </div>

              <!-- 薪資情況 -->
              <div class="mb-10">
                <BaseFormRadio v-model="salaryTypes" :options="salaryTypesOpions" label="薪資情況（新台幣）" name="salaryTypes"
                  description="輸入薪資資料，真薪話將為你自動計算年薪。" is-button-style />
                <div class="mt-4">
                  <div class="pl-12">
                    <keep-alive>
                      <template v-if="salaryTypes === 'monthly'">
                        <div class="relativ">
                          <VField v-model.number="salaryTypesField[salaryTypes].salary" name="monthlySalary" label="月薪"
                            type="number" :class="{ 'border-red': errors.monthlySalary }"
                            :rules="salaryTypes === 'monthly' ? 'required|numeric' : 'numeric'"
                            class="w-full border border-black-1 rounded py-2 pl-4 pr-9 mt-2" placeholder="月薪" />
                          <span class="absolute inset-y-0 right-4 flex items-center pt-2 text-black-6 text-sm">
                            x12月
                          </span>
                          <VErrorMessage name="monthlySalary" as="div" class="help is-danger text-red" />
                        </div>
                      </template>
                    </keep-alive>
                    <keep-alive>
                      <template v-if="salaryTypes === 'daily'">
                        <div class="flex">
                          <div class="shrink w-full">
                            <!-- <input v-model="salaryTypesField[salaryTypes].salary" type="text" name="salary"
                              placeholder="日薪" class="w-full border border-black-1 rounded py-2 pl-4 pr-9"> -->

                            <VField v-model.number="salaryTypesField[salaryTypes].salary" name="dailySalary" label="日薪"
                              type="number" :class="{ 'border-red': errors.dailySalary }"
                              :rules="salaryTypes === 'daily' ? 'required|numeric' : 'numeric'"
                              class="w-full border border-black-1 rounded py-2 pl-4 pr-9 mt-2" placeholder="日薪" />
                            <VErrorMessage name="dailySalary" as="div" class="help is-danger text-red" />
                          </div>
                          <div class="w-[48px] h-[48px] flex items-center justify-center px-5 mt-1">
                            <i class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].avgWorkingDaysPerMonth"
                              :options="monthOptions" name="avgWorkingDaysPerMonth" placeholder="月均工作天數"
                              :required="salaryTypes === 'daily' ? 'required' : ''" label="月均工作天數" hidden-label>
                              <span class="absolute inset-y-0 right-4 flex items-center text-black-6 text-sm top-2">
                                x12月
                              </span>
                            </BaseFormSelect>
                          </div>
                        </div>
                      </template>
                    </keep-alive>
                    <keep-alive>
                      <template v-if="salaryTypes === 'hourly'">
                        <div class="flex">
                          <div class="shrink w-full">
                            <!-- <input v-model="salaryTypesField[salaryTypes].salary" type="text" name="salary"
                              placeholder="時薪" class="w-full border border-black-1 rounded py-2 pl-4 pr-9"> -->
                            <VField v-model.number="salaryTypesField[salaryTypes].salary" name="hourlySalary" label="時薪"
                              type="number" :class="{ 'border-red': errors.hourlySalary }"
                              :rules="salaryTypes === 'hourly' ? 'required|numeric' : 'numeric'"
                              class="w-full border border-black-1 rounded py-2 pl-4 pr-9 mt-2" placeholder="時薪" />
                            <VErrorMessage name="hourlySalary" as="div" class="help is-danger text-red" />
                          </div>
                          <div class="w-[48px] h-[48px] flex items-center justify-center px-5 mt-1">
                            <i class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].dailyAverageWorkingHours"
                              :options="workingHoursOptions" name="dailyAverageWorkingHours" placeholder="日均工時"
                              :required="salaryTypes === 'hourly' ? 'required' : ''" label="日均工時" hidden-label>
                            </BaseFormSelect>
                          </div>
                          <div class="w-[48px] h-[48px] flex items-center justify-center px-5 mt-1">
                            <i class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].avgWorkingDaysPerMonth"
                              :required="salaryTypes === 'hourly' ? 'required' : ''" :options="monthOptions"
                              name="avgWorkingDaysPerMonth" placeholder="月均工作天數" label="月均工作天數" hidden-label>
                              <span class="absolute inset-y-0 right-4 flex items-center text-black-6 text-sm top-2">
                                x12月
                              </span>
                            </BaseFormSelect>
                          </div>
                        </div>
                      </template>
                    </keep-alive>
                  </div>
                  <!-- 年終 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model.number="submitData.yearEndBonus" type="number" name="yearEndBonus" placeholder="年終"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                    </div>
                  </div>
                  <!-- 三節 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model.number="submitData.holidayBonus" type="number" name="holidayBonus" placeholder="三節"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                    </div>
                  </div>
                  <!-- 獎金 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model.number="submitData.profitSharingBonus" type="number" name="profitSharingBonus"
                        placeholder="獎金" class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                    </div>
                  </div>
                  <!-- 其他 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model.number="submitData.otherBonus" type="number" name="otherBonus" placeholder="其他"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                    </div>
                  </div>
                  <!-- 總獎金 -->
                  <div class="mt-3">
                    <div class="shrink w-full">
                      <input v-model="salaryTypesField[salaryTypes].total" type="text" name="total" placeholder="系統自動加總年薪"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                    </div>
                    <span class="text-sm text-black-6"><i
                        class="icomoon icon-info text-sm mr-1"></i>若結果數字跟實際有落差，可以點擊數字編輯，但不能低於前項的總和。</span>
                  </div>
                </div>
              </div>

              <!-- 上班頻率 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.overtime" :options="overtimeOptions" label="上班頻率" name="overtime" />
              </div>

              <!-- 上班心情 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.feeling" :options="feelingOptions" label="上班心情" name="feeling" />
              </div>
              <hr class="my-10" />
              <div class="flex justify-between">
                <p class="text-blue">
                  接著分享你的職場經歷
                  <br />
                  成為他人的職場貴人！
                </p>
                <btn cate="primary" @click="step = 2">下一步</btn>
              </div>
            </div>
            <div v-show="step === 2">
              <!-- 工作內容分享 -->
              <div class="mb-10">
                <label for="jobDescription" class="text-black-10">
                  工作內容分享・100 積分
                  <br />
                  <span class="text-sm text-black-6">還記得工作時的情形嗎?不論是工作項目、工作環境、福利條件、花費時間等,都可以在這裡盡情分享。</span>
                </label>
                <!-- <VField name="taxId" label="統一編號" type="area" v-model.number="submitData.taxId"
                  :class="{ 'border-red': errors.taxId }" rules="required|numeric|taxIdVee"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" placeholder="輸入工作內容...." rows="10"/>
                <VErrorMessage name="taxId" as="div" class="help is-danger text-red" /> -->

                <VField v-slot="{ field, errors }" v-model="submitData.jobDescription" name="jobDescription" label="工作內容"
                  rules="required|min:60">
                  <textarea id="jobDescription" v-bind="field" name="jobDescription" placeholder="輸入工作內容...." rows="10"
                    class="w-full border border-black-1 rounded py-2 px-4 mt-2" />
                  <span class="text-sm text-black-6"><i class="icomoon icon-info text-sm mr-1"></i>內容需填寫60字以上</span>
                  <div v-if="errors[0]" class="text-red">{{ errors[0] }}</div>
                </VField>
              </div>

              <!-- 建議與資訊 -->
              <div class="mb-10">
                <label for="suggestion" class="text-black-10">
                  建議與資訊・100 積分
                  <br />
                  <span class="text-sm text-black-6">還有什麼想跟職場後輩說的嗎?給予建議或資訊來幫助後輩們更了解這間公司。</span>
                </label>

                <VField v-slot="{ field, errors }" v-model="submitData.suggestion" name="suggestion" label="建議與資訊"
                  rules="required|min:30">
                  <textarea id="suggestion" v-bind="field" name="suggestion" placeholder="輸入建議與資訊...." rows="10"
                    class="w-full border border-black-1 rounded py-2 px-4 mt-2" />
                  <span class="text-sm text-black-6"><i class="icomoon icon-info text-sm mr-1"></i>內容需填寫30字以上</span>
                  <div v-if="errors[0]" class="text-red">{{ errors[0] }}</div>
                </VField>
              </div>
              <!-- 評價標籤 -->
              <div class="mb-10">
                <div class="mb-2">評價標籤</div>
                <ul class="flex flex-wrap list-none mb-3">
                  <li v-for="(tagsItem, $index) in tagsOptions">
                    <input :id="`tagsItemGood-${$index}`" v-model="submitData.tags" type="checkbox"
                      class="peer appearance-none hidden w-0 shrink-0 mt-0.5 border-gray-200 rounded"
                      :value="tagsItem.value" />
                    <label v-if="tagsItem.status === 'good'" :key="`tagsItemGood-${$index}`"
                      :for="`tagsItemGood-${$index}`"
                      class="cursor-pointer flex p-2 block text-blue bg-white border border-blue rounded text-sm mr-3 mb-3 peer-checked:text-white peer-checked:bg-blue">
                      <span class="text-sm">{{ tagsItem.text }}</span>
                    </label>
                  </li>
                </ul>
                <ul class="flex flex-wrap list-none mb-3">
                  <li v-for="(tagsItem, $index) in tagsOptions">
                    <input :id="`tagsItemBad-${$index}`" v-model="submitData.tags" type="checkbox"
                      class="peer appearance-none hidden w-0 shrink-0 mt-0.5 border-gray-200 rounded"
                      :value="tagsItem.value" />
                    <label v-if="tagsItem.status === 'bad'" :key="`tagsItemBad-${$index}`" :for="`tagsItemBad-${$index}`"
                      class="cursor-pointer flex p-2 block text-red bg-white border border-red rounded text-sm mr-3 mb-3 peer-checked:text-white peer-checked:bg-red">
                      <span class="text-sm">{{ tagsItem.text }}</span>
                    </label>
                  </li>
                </ul>
                <ul v-if="submitData.customTags && submitData.customTags[0]" class="flex flex-wrap list-none">
                  <li v-for="customTagsItem in submitData.customTags">
                    <button
                      class="cursor-pointer flex p-2 block text-black-10 bg-white border border-black-6 rounded text-sm mr-3 mb-3 peer-checked:text-white hover:bg-black-1"
                      @click.stop.prevent="removeCustomTag(customTagsItem)">
                      <span class="text-sm"><i class="icomoon icon-cross text-xs mr-2"></i>{{ customTagsItem }}</span>
                    </button>
                  </li>
                </ul>
                <div class="relative">
                  <input id="customTagsText" v-model="customTagsText" type="text" name="customTagsText"
                    placeholder="自訂評價(每個最多10字)" class="w-full border border-black-1 rounded py-2 pl-4 pr-9" />
                  <btn :disabled="!customTagsText" cate="gray-text" class="absolute inset-y-0 right-0 flex items-center"
                    @click="addCustomTags(customTagsText)">
                    <i class="icomoon icon-plus"></i>
                  </btn>
                </div>
              </div>
              <hr class="my-10" />
              <div class="flex justify-between">
                <btn cate="white" @click="step = 1">上一步</btn>
                <button
                  class="flex py-3 px-5 justify-center items-center rounded transition duration-300 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 disabled:bg-black-3 disabled:text-black-6"
                  type="submit" :disabled="!meta.valid">
                  送出
                </button>
              </div>
            </div>
          </VForm>
        </div>
        <div class="lg:w-2/6 ml-[30px] lg:mt-0 md:mt-15">
          <div v-for="rightSideBlock in rightSideList" class="mb-4 bg-white rounded p-6">
            <h4 class="text-blue text-2xl" :class="{ 'mb-5': !rightSideBlock.description }">
              {{ rightSideBlock.title }}
            </h4>
            <p class="text-sm text-black-6 mt-3">
              {{ rightSideBlock.description }}
            </p>
            <ul class="list-none">
              <li v-for="blockItem in rightSideBlock.list" class="flex mt-5">
                <span class="w-[48px] h-[48px] flex items-center justify-center bg-blue-light rounded mr-4"><i
                    :class="`icomoon ${blockItem.icon} text-blue-dark text-2xl`"></i></span>
                <div>
                  <h5 class="text-base font-medium">{{ blockItem.title }}</h5>
                  <p class="text-sm text-black-6">
                    {{ blockItem.description }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
