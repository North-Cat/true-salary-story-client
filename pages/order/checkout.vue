<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';
import {
  offerPointOption, // 積分選單
} from '@/utilities/options';
import { showError } from '@/utilities/message';
import { useUserStore } from '@/store/user';
import { useOrderStore } from '@/store/order';

definePageMeta({
  middleware: 'auth',
});

/**
 * 我的計畫
 */
enum offerType {
  SINGLE = 'single',
  SUBSCRIPTION = 'subscription',
}
// 取得 url 參數
const route = useRoute();
const { type, point } = route.query; // 取得 URL 的搜尋參數

// 單買方案 (預設帶入 url 上的參數)
const selectedSingleOfferPrice = ref();
const selectedSingleOfferPoint = ref();
selectedSingleOfferPoint.value = point ? Number(point) : offerPointOption[0].value;
// 依 url 積分取得價格
mappingSingleOfferPrice();
watch(selectedSingleOfferPoint, () => {
  mappingSingleOfferPrice();
});
// mapping 價格跟積分
function mappingSingleOfferPrice() {
  let hasOffer = false;
  for (const item of offerPointOption) {
    if (selectedSingleOfferPoint.value === item.value) {
      selectedSingleOfferPrice.value = item.price;
      hasOffer = true;
      break;
    }
  }
  if (!hasOffer) {
    selectedSingleOfferPoint.value = offerPointOption[0].value;
    selectedSingleOfferPrice.value = offerPointOption[0].price;
    setTimeout(() => {
      showError('提示', '無此方案，請重新選擇。');
    }, 1);
  }
}

// 訂閱方案
const subscriptionPrice = 699;
const subscriptionPoint = 2000;

/**
 * 訂單資訊
 */
const user = useUserStore();
const { currentUser, currentPoint } = storeToRefs(user);
const userPoint = ref();
userPoint.value = currentPoint.value;
const selectedPoint = computed(() => {
  return getSelectedPoint();
});
const expectedPoint = computed(() => {
  return getSelectedPoint() + userPoint.value;
});
const expectedPrice = computed(() => {
  return getExpectedPrice();
});
function getExpectedPrice() {
  let price = 0;
  if (type === offerType.SINGLE) {
    price = selectedSingleOfferPrice.value;
  } else if (type === offerType.SUBSCRIPTION) {
    price = subscriptionPrice;
  }
  return price;
}
function getSelectedPoint() {
  let point = 0;
  if (type === offerType.SINGLE) {
    point = selectedSingleOfferPoint.value;
  } else if (type === offerType.SUBSCRIPTION) {
    point = subscriptionPoint;
  }
  return point;
}

// 點擊開始付款
const order = useOrderStore();
async function clickPay() {
  const param = {
    purchaseType: type as string,
    amount: getExpectedPrice(),
  };

  // call api 800 取得 line pay transactionId
  const transactionId = await order.fetchLinePayOrder(param);

  // 接著 call api 801 送出 transactionId
  if (transactionId) {
    const paymentUrl = await order.fetchLinePayTransaction(transactionId);
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      showError('提示', '付款失敗，請重新操作。');
    }
  }
}
</script>

<template>
  <section class="bg-gray sm:py-10 md:py-10 lg:pt-20 lg:pb-1 max-[1920px]:overflow-x-hidden">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center mt-8 lg:mt-15"
    >
      <div class="w-full flex flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20">
        <div class="w-full lg:w-1/3 lg:me-3">
          <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
            <div class="bg-black-10 text-white py-3 px-5 rounded-t">
              <h5>我的計畫</h5>
            </div>
            <div
              class="w-full border-2 border-black-10 py-6 px-6 md:py-5 md:px-5 lg:py-6 lg:px-8 bg-white rounded-b rounded-tr"
            >
              <!-- (單買) 加薪計畫 -->
              <div v-if="type === offerType.SINGLE" class="w-full flex flex-col rounded me-3">
                <div class="flex justify-between items-center mb-5">
                  <div class="flex flex-col">
                    <h4 class="text-black-6 mb-3">{{ selectedSingleOfferPoint }} 積分</h4>
                    <h6 class="text-black-10">$ {{ selectedSingleOfferPrice }} 元</h6>
                  </div>
                  <div class="icon-star-circle text-5xl"></div>
                </div>
                <div class="flex justify-between items-center pb-5 border-b border-black-1 mb-5">
                  <div class="w-full">
                    <BaseFormSelect
                      v-model="selectedSingleOfferPoint"
                      class="h-[48px]"
                      :options="offerPointOption"
                      name="offer"
                    />
                  </div>
                </div>
                <div class="h-full flex flex-col justify-between">
                  <div class="flex pb-5 border-b border-black-1 mb-5">
                    <div class="icon-sparkle-checked text-blue text-md pt-1 mr-3"></div>
                    <div>
                      <div class="caption mb-1">每 100 積分可觀看 1 筆薪水情報</div>
                      <div class="caption">每 300 積分可解鎖 1 個聊天室</div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="icon-info text-blue text-lg mr-3"></div>
                    <div class="caption text-black-5">贈送積分使用期限為購買日期後 6 個月</div>
                  </div>
                </div>
              </div>

              <!-- (訂閱) 加薪計畫 -->
              <div v-if="type === offerType.SUBSCRIPTION" class="w-full flex flex-col rounded me-3">
                <div class="flex justify-between items-center mb-5">
                  <div class="flex flex-col">
                    <h4 class="text-blue mb-3">加薪計畫</h4>
                    <h6 class="text-black-10">$ 699 元/每次</h6>
                  </div>
                  <div class="icon-fire text-6xl text-blue"></div>
                </div>
                <div class="flex flex-col justify-between">
                  <div class="flex pb-5 border-b border-black-1 mb-5">
                    <div class="icon-sparkle-checked text-blue text-md pt-1 mr-3"></div>
                    <div>
                      <div class="caption mb-1">每 100 積分可觀看 1 筆薪水情報</div>
                      <div class="caption">每 300 積分可解鎖 1 個聊天室</div>
                    </div>
                  </div>
                  <div class="flex pb-5 border-b border-black-1 mb-5">
                    <div class="icon-sparkle-checked text-blue text-md pt-1 mr-3"></div>
                    <div>
                      <div class="caption mb-1">贈送 2000 積分</div>
                      <div class="caption">市價 NT$3000 元</div>
                    </div>
                  </div>
                  <div class="flex pb-5 border-b border-black-1 mb-5">
                    <div class="icon-sparkle-checked text-blue text-md pt-1 mr-3"></div>
                    <div>
                      <div class="caption mb-1">10% 比薪水積分回饋</div>
                      <div class="caption">訂閱期間使用積分兌換、解鎖內容可獲得 10% 積分回饋</div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="icon-info text-blue text-lg mr-3"></div>
                    <div class="caption text-black-5">贈送積分使用期限為購買日期後 6 個月</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-2/3 lg:ms-3">
          <div class="w-full flex flex-col justify-center items-start sm:mb-6 lg:mb-6">
            <div class="bg-black-10 text-white py-3 px-5 rounded-t">
              <h5>訂單資訊</h5>
            </div>
            <div
              class="w-full border-2 border-black-10 py-6 px-6 md:py-5 md:px-5 lg:py-6 lg:px-8 bg-white rounded-b rounded-tr"
            >
              <div class="w-full flex flex-col rounded me-3">
                <div class="flex-col pb-10 border-b border-black-1 mb-10">
                  <div class="w-full flex-col mb-10">
                    <h6 class="mb-2">常用 E-mail 信箱</h6>
                    <!-- <input v-model="currentUser.email" type="text" 
                      class="w-full border border-black-1 rounded py-3 px-4 mb-1" /> -->
                    <div class="w-full flex border border-black-1 rounded py-4 px-4 mb-1">
                      {{ currentUser.email }}
                    </div>
                    <p class="caption flex items-center text-black-6">
                      <span class="icon-info text-lg me-1"></span>此 E-mail 信箱用於寄送發票中獎通知
                    </p>
                  </div>
                  <div class="w-full flex-col">
                    <h6 class="mb-2">付款方式</h6>
                    <div class="w-full flex border border-black-1 rounded py-4 px-4 mb-1">
                      <img src="@/assets/img/line-pay.svg" alt="LINE Pay" class="me-2" />
                      <span class="caption flex items-center text-black-6">＊可使用 LINE Points 折抵消費</span>
                    </div>
                  </div>
                </div>
                <div class="w-full flex-col border-black-1 my-1.5">
                  <div class="w-full flex flex-col lg:flex-row">
                    <div class="w-full flex-col lg:pe-10 lg:border-r lg:border-black-1">
                      <div class="flex-col pb-5 border-b border-black-1 mb-5">
                        <div class="flex justify-between mb-2">
                          <h6 class="text-black-6">現有積分</h6>
                          <h6 class="text-black-6">{{ userPoint }} 積分</h6>
                        </div>
                        <div class="flex justify-between mb-2">
                          <h6 class="text-black-6">本次購買積分</h6>
                          <h6 class="text-black-6">+ {{ selectedPoint }} 積分</h6>
                        </div>
                        <div class="flex justify-between mb-2">
                          <h5 class="">購買後總積分</h5>
                          <h5 class="text-black-10">{{ expectedPoint }} 積分</h5>
                        </div>
                      </div>
                      <div class="flex justify-between">
                        <h5 class="">小計</h5>
                        <h5 class="">$ {{ expectedPrice }} 元</h5>
                      </div>
                    </div>
                    <div class="w-full lg:w-2/5 flex justify-center items-center">
                      <BaseButton class="w-full mt-5 lg:ms-10" @click="clickPay">
                        <h6>開始付款</h6>
                        <div class="icon-right-arrow ms-3"></div>
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
