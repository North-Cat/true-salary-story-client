<script lang="ts" setup>
import { IShareSalaryFormData, ISalary } from '~/interface/salaryData';
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
  tagsOptions
}
  from '~/utilities/options';
useHead({
  title: '匿名分享',
});
// definePageMeta({
//   middleware: 'auth',
// });
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const user = useUserStore();
const { currentUser } = storeToRefs(user);
const salaryTypes = ref('monthly')
const customTagsText = ref('')
const step = ref(2)
const form = ref(null)
const submitData: IShareSalaryFormData = reactive({
  taxId: '',
  companyName: '',
  title: '',
  employmentType: '',
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
  customTags: []
})
const salaryTypesField: ISalary = reactive({
  monthly: {
    salary: '',
    total: ''
  },
  daily: {
    salary: '',
    avgWorkingDaysPerMonth: '',
    total: ''
  },
  hourly: {
    salary: '',
    dailyAverageWorkingHours: '',
    avgWorkingDaysPerMonth: '',
    total: ''
  },
})
const addCustomTags = (tag: string) => {
  submitData.customTags?.push(tag)
  customTagsText.value = ''
}
const removeCustomTag = (tag: string) => {
  if (!submitData.customTags) return
  const index = submitData.customTags.indexOf(tag);
  if (index === -1) return;
  submitData.customTags.splice(index, 1);
}
const onSubmit = () => {
  console.log(form)
}

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
      }
    ]
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
    ]
  }
])
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
          <form class="min-h-full md:min-h-[300px] p-6 bg-white" ref="form">
            <div v-show="step === 1">
              <!-- 公司統編 -->
              <div class="mb-10">
                <label for="taxId" label="" class="text-black-10 ">公司統一編號</label>
                <input id="taxId" type="text" name="taxId" class="w-full border border-black-1 rounded py-2 px-4 mt-2"
                  placeholder="請輸入公司統一編號" />
              </div>
              <!-- 公司名稱 -->
              <div class="mb-10">
                <label for="companyName" label="" class="text-black-10 ">公司名稱</label>
                <input id="companyName" type="text" name="companyName"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" disabled placeholder="請輸入公司名稱" />
              </div>
              <!-- 應徵職務 -->
              <div class="">
                <label for="title" label="" class="text-black-10 ">應徵職務</label>
                <input id="title" type="text" name="title" class="w-full border border-black-1 rounded py-2 px-4 mt-2"
                  placeholder="請輸入應徵職務" />

              </div>
              <div class="flex items-center mt-1 mb-10">
                <input type="checkbox" name="inService" id="inService"
                  class="bg-gray-50 border-black-10 focus:ring-blue h-4 w-4 rounded accent-blue rounded-2xl">
                <label for="inService" class="text-gray-700 ml-2 hover:text-blue">不提供職務名稱（將不會獲得精選）</label>
              </div>

              <!-- 職務類別 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.employmentType" :options="employmentTypesOptions" label="職務類別"
                  input-name="employmentType" isButtonStyle />

              </div>

              <!-- 在職狀況 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.inService" :options="isServerOptions" label="在職狀況"
                  input-name="isService" isButtonStyle />
              </div>

              <!-- 工作城市 -->
              <div class="mb-10">
                <BaseFormSelect v-model="submitData.city" :options="cityOptions" label="工作城市" inputName="city" />
              </div>

              <!-- 年資 -->
              <div class="flex mb-10">
                <BaseFormSelect v-model="submitData.workYears" :options="yearsOfServiceOptions" label="在職年資" class="mr-3"
                  inputName="workYears" />
                <BaseFormSelect v-model="submitData.totalWorkYears" :options="yearsOfServiceOptions" label="總年資"
                  class="ml-3" inputName="totalWorkYears" />
              </div>

              <!-- 薪資情況 -->
              <div class="mb-10">
                <BaseFormRadio v-model="salaryTypes" :options="salaryTypesOpions" label="薪資情況（新台幣）"
                  input-name="salaryTypes" description="輸入薪資資料，真薪話將為你自動計算年薪。" isButtonStyle />
                <div class="mt-4">
                  <div class="pl-12">
                    <keep-alive>
                      <template v-if="salaryTypes === 'monthly'">
                        <div class="relativ">
                          <input v-model="salaryTypesField[salaryTypes].salary" type="text" name="salary" placeholder="月薪"
                            class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                          <span class="absolute inset-y-0 right-4 flex items-center pt-2 text-black-6 text-sm">
                            x12月
                          </span>
                        </div>
                      </template>
                    </keep-alive>
                    <keep-alive>
                      <template v-if="salaryTypes === 'daily'">
                        <div class="flex">
                          <div class="shrink w-full">
                            <input v-model="salaryTypesField[salaryTypes].salary" type="text" name="salary"
                              placeholder="日薪" class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                          </div>
                          <div class="w-[48px] flex items-center justify-center px-5"><i
                              class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].avgWorkingDaysPerMonth"
                              :options="monthOptions" inputName="workingDay" placeholder="月均工作天數">
                              <span class="absolute inset-y-0 right-4 flex items-center text-black-6 text-sm">
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
                            <input v-model="salaryTypesField[salaryTypes].salary" type="text" name="salary"
                              placeholder="時薪" class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                          </div>
                          <div class="w-[48px] flex items-center justify-center px-5"><i
                              class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].dailyAverageWorkingHours"
                              :options="workingHoursOptions" inputName="workingDay" placeholder="日均工時">
                            </BaseFormSelect>
                          </div>
                          <div class="w-[48px] flex items-center justify-center px-5"><i
                              class="icomoon icon-cross text-black-6"></i>
                          </div>
                          <div class="shrink w-full">
                            <BaseFormSelect v-model="salaryTypesField[salaryTypes].avgWorkingDaysPerMonth"
                              :options="monthOptions" inputName="workingDay" placeholder="月均工作天數">
                              <span class="absolute inset-y-0 right-4 flex items-center text-black-6 text-sm">
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
                      <input v-model="submitData.yearEndBonus" type="text" name="yearEndBonus" placeholder="年終"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                    </div>
                  </div>
                  <!-- 三節 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model="submitData.holidayBonus" type="text" name="holidayBonus" placeholder="三節"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                    </div>
                  </div>
                  <!-- 獎金 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model="submitData.profitSharingBonus" type="text" name="profitSharingBonus"
                        placeholder="獎金" class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                    </div>
                  </div>
                  <!-- 其他 -->
                  <div class="flex mt-3">
                    <span class="w-[48px] flex items-center justify-center px-5">
                      <i class="icomoon icon-plus text-black-6 text-lg"></i>
                    </span>
                    <div class="shrink w-full">
                      <input v-model="submitData.otherBonus" type="text" name="search" placeholder="其他"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                    </div>
                  </div>
                  <!-- 總獎金 -->
                  <div class="mt-3">
                    <div class="shrink w-full">
                      <input v-model="salaryTypesField[salaryTypes].total" type="text" name="total" placeholder="系統自動加總年薪"
                        class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                    </div>
                    <span class="text-sm text-black-6"><i
                        class="icomoon icon-info text-sm mr-1"></i>若結果數字跟實際有落差，可以點擊數字編輯，但不能低於前項的總和。</span>
                  </div>
                </div>
              </div>

              <!-- 上班頻率 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.overtime" :options="overtimeOptions" label="上班頻率"
                  input-name="overtime" />
              </div>

              <!-- 上班心情 -->
              <div class="mb-10">
                <BaseFormRadio v-model="submitData.feeling" :options="feelingOptions" label="上班心情" input-name="feeling" />
              </div>
              <hr class="my-10">
              <div class="flex justify-between">
                <p class="text-blue">
                  接著分享你的職場經歷
                  <br>
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
                  <br>
                  <span class="text-sm text-black-6">還記得工作時的情形嗎?不論是工作項目、工作環境、福利條件、花費時間等,都可以在這裡盡情分享。</span>
                </label>
                <textarea id="jobDescription" type="text" name="jobDescription" v-model="submitData.jobDescription"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" placeholder="輸入工作內容...." rows="10" />
                <span class="text-sm text-black-6"><i class="icomoon icon-info text-sm mr-1"></i>內容需填寫60字以上</span>
              </div>

              <!-- 建議與資訊 -->
              <div class="mb-10">
                <label for="suggestion" class="text-black-10">
                  建議與資訊・100 積分
                  <br>
                  <span class="text-sm text-black-6">還有什麼想跟職場後輩說的嗎?給予建議或資訊來幫助後輩們更了解這間公司。</span>
                </label>
                <textarea id="suggestion" type="text" name="suggestion" v-model="submitData.suggestion"
                  class="w-full border border-black-1 rounded py-2 px-4 mt-2" placeholder="輸入建議與資訊...." rows="10" />
                <span class="text-sm text-black-6"><i class="icomoon icon-info text-sm mr-1"></i>內容需填寫30字以上</span>
              </div>
              <!-- 評價標籤 -->
              <div class="mb-10">
                <div class="mb-2">評價標籤</div>
                <ul class="flex flex-wrap list-none mb-3">
                  <li v-for="(tagsItem, $index) in tagsOptions">
                    <input type="checkbox" class="peer appearance-none hidden w-0 shrink-0 mt-0.5 border-gray-200 rounded"
                      :id="`tagsItemGood-${$index}`" :value="tagsItem.value" v-model="submitData.tags">
                    <label v-if="tagsItem.status === 'good'" :for="`tagsItemGood-${$index}`"
                      :key="`tagsItemGood-${$index}`"
                      class="cursor-pointer flex p-2 block text-blue bg-white border border-blue rounded text-sm mr-3 mb-3 peer-checked:text-white peer-checked:bg-blue">
                      <span class="text-sm">{{ tagsItem.text }}</span>
                    </label>
                  </li>
                </ul>
                <ul class="flex flex-wrap list-none mb-3">
                  <li v-for="(tagsItem, $index) in tagsOptions">
                    <input type="checkbox" class="peer appearance-none hidden w-0 shrink-0 mt-0.5 border-gray-200 rounded"
                      :id="`tagsItemBad-${$index}`" :value="tagsItem.value" v-model="submitData.tags">
                    <label v-if="tagsItem.status === 'bad'" :for="`tagsItemBad-${$index}`" :key="`tagsItemBad-${$index}`"
                      class="cursor-pointer flex p-2 block text-red bg-white border border-red rounded text-sm mr-3 mb-3 peer-checked:text-white peer-checked:bg-red">
                      <span class="text-sm">{{ tagsItem.text }}</span>
                    </label>
                  </li>
                </ul>
                <ul v-if="submitData.customTags && submitData.customTags[0]" class="flex flex-wrap list-none">
                  <li v-for="(customTagsItem) in  submitData.customTags">
                    <button
                      class="cursor-pointer flex p-2 block text-black-10 bg-white border border-black-6 rounded text-sm mr-3 mb-3 peer-checked:text-white hover:bg-black-1"
                      @click.stop.prevent="removeCustomTag(customTagsItem)">
                      <span class="text-sm"><i class="icomoon icon-cross text-xs mr-2"></i>{{ customTagsItem }}</span>
                    </button>
                  </li>
                </ul>
                <div class="relative">
                  <input id="customTagsText" v-model="customTagsText" type="text" name="customTagsText"
                    placeholder="自訂評價(每個最多10字)" class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
                  <btn :disabled="!customTagsText" cate="gray-text" class="absolute inset-y-0 right-0 flex items-center"
                    @click="addCustomTags(customTagsText)">
                    <i class="icomoon icon-plus"></i>
                  </btn>
                </div>
              </div>
              <hr class="my-10">
              <div class="flex justify-between">
                <btn cate="white" @click="step = 1">上一步</btn>
                <button
                  class="flex py-3 px-5 justify-center items-center rounded transition duration-300 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10"
                  type="submit" @click.prevent.stop="onSubmit">送出</button>
              </div>


            </div>
          </form>
        </div>
        <div class="lg:w-2/6 ml-[30px] lg:mt-0 md:mt-15">
          <div v-for="rightSideBlock in rightSideList" class="mb-4 bg-white rounded p-6">
            <h4 class="text-blue text-2xl" :class="{ 'mb-5': !rightSideBlock.description }">{{ rightSideBlock.title }}
            </h4>
            <p class="text-sm text-black-6 mt-3">{{ rightSideBlock.description }}</p>
            <ul class="list-none">
              <li v-for="blockItem in rightSideBlock.list" class="flex mt-5">
                <span class="w-[48px] h-[48px] flex items-center justify-center bg-blue-light rounded mr-4"><i
                    :class="`icomoon ${blockItem.icon} text-blue-dark text-2xl`"></i></span>
                <div>
                  <h5 class="text-base font-medium">{{ blockItem.title }}</h5>
                  <p class="text-sm text-black-6">{{ blockItem.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
