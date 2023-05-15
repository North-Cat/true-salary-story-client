<template>
  <section class="bg-gray sm:py-10 md:py-10 lg:pt-20 lg:pb-1 max-[1920px]:overflow-x-hidden">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-10"
    >
      <div class="w-full flex flex-col lg:justify-between sm:mb-10 lg:mb-20">
        <!-- 頁籤 -->
        <div class="w-full flex">
          <div class="py-3 pe-6">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(Tab.PAYMENT)"
              @click="changeTab(Tab.PAYMENT)"
            >
              <h6>計畫介紹</h6>
            </button>
          </div>
          <div class="py-3 pe-6">
            <button
              class="pb-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              :class="tabClass(Tab.QUESTION)"
              @click="changeTab(Tab.QUESTION)"
            >
              <h6>常見問答</h6>
            </button>
          </div>
        </div>

        <!-- 計畫介紹 -->
        <div v-if="isTab(Tab.PAYMENT)" class="w-full flex border-2 border-black-10 p-6 bg-white">
          <div class="w-1/3 flex flex-col border border-black-1 py-5 px-6 rounded me-3">
            <div class="flex justify-between items-center mb-5">
              <div class="flex flex-col">
                <h4 class="text-black-6 mb-3">100 積分</h4>
                <h6 class="text-black-10">$ 150 元</h6>
              </div>
              <div class="icon-star-circle text-5xl"></div>
            </div>
            <div class="flex justify-between pb-5 border-b border-black-1 mb-5">
              <div class="w-9/12 border border-black-1 rounded p-2 me-2">1000 積分</div>
              <btn cate="secondary">購買</btn>
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

          <div class="w-1/3 flex flex-col border border-black-1 py-5 px-6 rounded me-3">
            <div class="flex justify-between items-center mb-5">
              <div class="flex flex-col">
                <h4 class="text-blue mb-3">加薪計畫</h4>
                <h6 class="text-black-10">$ 699 元/每次</h6>
              </div>
              <div class="icon-fire text-6xl text-blue"></div>
            </div>
            <div class="flex justify-between pb-5 border-b border-black-1 mb-5">
              <btn class="w-full">馬上訂閱</btn>
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

          <div class="w-1/3 flex flex-col border border-black-1 py-5 px-6 rounded">
            <div class="h-full flex flex-col pb-5 mb-5 justify-center items-center">
              <div class="flex flex-col">
                <div class="caption mb-5">支援下列付款方式</div>
                <div class="text-md">
                  <img src="../assets/img/line-pay.svg" alt="LINE Pay" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 常見問答 -->
        <div v-if="isTab(Tab.QUESTION)" class="w-full flex flex-col border-2 border-black-10 py-6 px-20 bg-white">
          <div class="flex flex-col border border-black-1 me-3 rounded">
            <div class="w-full flex justify-between items-center py-5 px-6 cursor-pointer" @click="open(1)">
              <h6>付款方式有哪些？</h6>
              <div v-if="!isOpen(1)" class="icon-plus text-black-5"></div>
              <div v-else class="icon-minus text-xl text-black-5"></div>
            </div>
            <p :class="{ hidden: !isOpen(1), block: isOpen(1) }" class="caption pb-5 px-6">
              目前加薪計畫的付款方式僅開放使用LINE Pay。
            </p>
          </div>

          <div class="flex flex-col border border-black-1 me-3 rounded">
            <div class="w-full flex justify-between items-center py-5 px-6 cursor-pointer" @click="open(2)">
              <h6>可以打統編嗎？</h6>
              <div v-if="!isOpen(2)" class="icon-plus text-black-5"></div>
              <div v-else class="icon-minus text-xl text-black-5"></div>
            </div>
            <p :class="{ hidden: !isOpen(2), block: isOpen(2) }" class="caption pb-5 px-6">
              加薪計畫是為個人用戶推出的 VIP 專屬方案。<br />
              若有企業使用需求，請聯絡比薪水客服，客服將於上班日回覆您。
            </p>
          </div>

          <div class="flex flex-col border border-black-1 me-3 rounded">
            <div class="w-full flex justify-between items-center py-5 px-6 cursor-pointer" @click="open(3)">
              <h6>VIP 會員的生效日期是如何判定的？</h6>
              <div v-if="!isOpen(3)" class="icon-plus text-black-5"></div>
              <div v-else class="icon-minus text-xl text-black-5"></div>
            </div>
            <p :class="{ hidden: !isOpen(3), block: isOpen(3) }" class="caption pb-5 px-6">
              訂閱加薪計畫，付款成功後即刻獲得 VIP 會員資格，生效日以付款當下的日期起算。<br />
              例：於 2022.01.01 成立購買訂單，付款方式為 Line Pay，在 2022.01.02 付款成功，VIP 會員資格將由 2022.01.02
              往前往後推算 6 個月喔！
            </p>
          </div>

          <div class="flex flex-col border border-black-1 me-3 rounded">
            <div class="w-full flex justify-between items-center py-5 px-6 cursor-pointer" @click="open(4)">
              <h6>訂閱方案到期後網站會自動幫我續約嗎？</h6>
              <div v-if="!isOpen(4)" class="icon-plus text-black-5"></div>
              <div v-else class="icon-minus text-xl text-black-5"></div>
            </div>
            <p :class="{ hidden: !isOpen(4), block: isOpen(4) }" class="caption pb-5 px-6">
              加薪計畫到期後，VIP 會員權限將會即刻中止，若想持續升級，請到方案説明頁再次下單即可。<br />
              真薪話並不會主動幫你續約，請放心！
            </p>
          </div>

          <div class="flex justify-between items-center border border-black-1 me-3 py-5 px-6 rounded mt-20">
            <div class="flex items-center">
              <div class="icon-info text-3xl me-5"></div>
              <div class="flex flex-col">
                <div class="caption">若有其他需求或疑問</div>
                <div class="caption">請聯繫客服，我們將於上班日回覆您。</div>
              </div>
            </div>
            <btn cate="secondary">聯繫客服</btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 常見問題
const questionIndex = ref(0);
function open(index: number) {
  questionIndex.value == index ? (questionIndex.value = 0) : (questionIndex.value = index);
}
function isOpen(index: number): boolean {
  return questionIndex.value == index;
}

// 共用
enum Tab {
  PAYMENT = 'payment', // 計畫介紹
  QUESTION = 'question', // 常見問答
}
// 目前在哪個頁籤, 預設 "計畫介紹"
const curTab = ref();
curTab.value = Tab.PAYMENT;

function changeTab(tab: Tab) {
  curTab.value = tab;
}
function isTab(tab: Tab): boolean {
  return curTab.value == tab;
}
const tabClass = computed(() => (tab: Tab) => {
  const className = isTab(tab) ? 'border-b-2 text-blue border-b-blue' : 'border-b-2 border-b-transparent';
  return className;
});
</script>
