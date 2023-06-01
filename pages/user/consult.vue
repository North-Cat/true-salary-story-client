<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

useHead({
  title: '請教記錄',
});
definePageMeta({
  middleware: 'auth',
});
interface Requester {
  isRead: boolean;
}
const { width } = useWindowSize();
const isActive = ref('');
const search = ref('');
const message = ref<HTMLInputElement | null>(null);
const room = ref<HTMLInputElement | null>(null);
const step = ref(1);
const rightSide = [
  {
    consultId: '111',
    requester: {
      userId: '64578009c6b3b228ccd5fcc3',
      name: 'Chen Yu',
      title: '工程師',
      createDate: '2023/5/20',
      message: '我覺得你可以...',
      companyName: '台灣塑膠工業府份有限公司',
      isRead: false,
    },
  },
  {
    consultId: '222',
    requester: {
      userId: '6j4589j2dd6b3b334ad5fdd8',
      name: '王曉明',
      title: '前端工程師',
      createDate: '2023/4/14',
      message: '您好,我想問...',
      companyName: '台灣塑膠工業府份有限公司',
      isRead: false,
    },
  },
  {
    consultId: '333',
    requester: {
      userId: '6jdfg89jssdd133b894as5fdcs',
      name: '吳大米',
      title: 'PT',
      createDate: '2023/03/14',
      message: '前輩你好，請問...',
      companyName: '統一超商有限公司',
      isRead: true,
    },
  },
  {
    consultId: '444',
    requester: {
      userId: '9024g89jss00933b89aas5fdcs',
      name: 'Jordan',
      title: 'PT',
      createDate: '2023/02/20',
      message: '好的，謝謝',
      companyName: '統一超商有限公司',
      isRead: false,
    },
  },
  {
    consultId: '555',
    requester: {
      userId: '90lo119jss00933b0012s5f008',
      name: 'Rose',
      title: '',
      createDate: '2023/02/20',
      message: '那我了解了，我覺得還是要這樣比較好',
      companyName: '六角學院股份有限公司',
      isRead: true,
    },
  },
  {
    consultId: '666',
    requester: {
      userId: '6j4589j2dd6b3b334ad5fdd8',
      name: '王曉明',
      title: '前端工程師',
      createDate: '2023/4/14',
      message: '您好,我想問...',
      companyName: '台灣塑膠工業府份有限公司',
      isRead: false,
    },
  },
  {
    consultId: '777',
    requester: {
      userId: '6jdfg89jssdd133b894as5fdcs',
      name: '吳大米',
      title: 'PT',
      createDate: '2023/03/14',
      message: '前輩你好，請問...',
      companyName: '統一超商有限公司',
      isRead: true,
    },
  },
  {
    consultId: '888',
    requester: {
      userId: '9024g89jss00933b89aas5fdcs',
      name: 'Jordan',
      title: 'PT',
      createDate: '2023/02/20',
      message: '好的，謝謝',
      companyName: '統一超商有限公司',
      isRead: false,
    },
  },
  {
    consultId: '999',
    requester: {
      userId: '90lo119jss00933b0012s5f008',
      name: 'Rose',
      title: '',
      createDate: '2023/02/20',
      message: '那我了解了，我覺得還是要這樣比較好',
      companyName: '六角學院股份有限公司',
      isRead: true,
    },
  },
];
const chatRooms = {
  consultId: '111',
  title: '前端工程師',
  ompanyName: '台灣塑膠工業府份有限公司',
  messages: [
    {
      messageId: '11111',
      userId: '64578009c6b3b228ccd5fcc3',
      content: '你好，我想請教你在這邊的如果進去的話有教育訓練嗎',
      post: 'get',
      createDate: '2023/04/12',
    },
    {
      messageId: '22222',
      userId: '64578009c6b3b228ccd5fcc3',
      content:
        '因為我看他的104上面寫的好像會有教育訓練，然後我還蠻重視這個\n剛好您的職業是我所想要得，所以想跟您確認一下謝謝。',
      post: 'get',
      createDate: '2023/04/12',
    },
    {
      messageId: '33333',
      userId: '64578009c6b3b228ccd5fcc3',
      content: '你好，我之前進來的時候是有的哦，會派一個人交你工作事項，然後公司會有一天是全體教育訓練',
      post: 'send',
      createDate: '2023/04/15',
    },
    {
      messageId: '44444',
      userId: '64578009c6b3b228ccd5fcc3',
      content: '所以不用擔心~',
      post: 'send',
      createDate: '2023/04/15',
    },
    {
      messageId: '55555',
      userId: '64578009c6b3b228ccd5fcc3',
      content: '好的，謝謝你的回覆',
      post: 'get',
      createDate: '2023/04/15',
    },
  ],
};
const onClick = (item: { requester: Requester; consultId: string }) => {
  isActive.value = item.consultId;
  rightSide.forEach((rightSideItem) => {
    if (item.consultId === rightSideItem.consultId) {
      item.requester.isRead = true;
    }
  });
  step.value = 2;
};
const tempIsSend = ref(false);
const adjustTextareaHeight = ({ isSend = false }: { isSend?: boolean }) => {
  console.log(isSend);
  const textarea = message.value as HTMLInputElement;
  if (isSend || (!isSend && tempIsSend.value && search.value !== '')) {
    textarea.style.height = '64px';
    search.value = '';
  } else {
    textarea.style.height = '64px';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  }
  tempIsSend.value = isSend;
};
const sendMessage = (e: { key: string; preventDefault: () => void }) => {
  const trimmedMessage = search.value.trim();
  if ((e.key === 'Enter' && search.value === '') || trimmedMessage === '') {
    e.preventDefault();
    return;
  }
  // 在此處執行傳送訊息的相關操作

  console.log('傳送訊息:', search.value);

  // 清空輸入框
  search.value = '';
  adjustTextareaHeight({ isSend: true });
};
const scrollToBottom = () => {
  const chatRoom = room.value as HTMLInputElement;
  chatRoom.scrollTop = chatRoom?.scrollHeight;
};
const goBack = () => {
  step.value = 1;
  isActive.value = '';
};
onMounted(() => {
  scrollToBottom();
});
</script>
<template>
  <userLayouts>
    <div class="lg:flex">
      <div
        class="w-full lg:w-2/6 h-[500px] overflow-y-scroll lg:overscroll-contain"
        :class="{ isMobile: width < 678, isActive: step === 1 }"
      >
        <div class="divide-y divide-black-3">
          <div v-for="(item, $index) in rightSide" :key="$index" class="">
            <button :class="{ 'bg-black-1': isActive === item.consultId }" class="p-3 w-full" @click="onClick(item)">
              <div>
                <h5
                  class="text-lg text-blue text-base text-left"
                  :class="{ 'text-blue-dark': isActive === item.consultId }"
                >
                  {{ '職務' }}
                </h5>
                <p class="text-sm text-left">{{ '公司名稱' }}</p>
                <div class="flex justify-between text-sm">
                  <p class="truncate pr-2" :class="{ 'text-black-5': item.requester.isRead }">
                    {{ item.requester.message }}
                  </p>
                  <span class="shirnk">{{ '2023/04/12' }}</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/6 lg:pl-4" :class="{ isMobile: width < 678, isActive: step === 2 }">
        <BaseButton cate="gray-text" class="px-0 py-0 mb-2 lg:hidden" @click="goBack"
          ><i class="icon-left-arrow pr-3"></i>返回</BaseButton
        >
        <div>
          <h5 class="text-lg text-blue text-base text-left">{{ '職務' }}</h5>
          <p class="text-sm text-left">{{ '公司名稱' }}</p>
        </div>
        <hr class="text-black-3 my-3" />
        <div ref="room" class="h-[400px] overflow-y-scroll pr-2">
          <template v-for="item in chatRooms.messages" :key="item.messageId">
            <div v-if="item.post === 'get'" class="max-w-[14rem] flex justify-start mb-3">
              <div class="bg-black-1 p-3 rounded-r-lg rounded-bl-lg text-black-10">
                <p class="text-sm">{{ item.content }}</p>
              </div>
            </div>
            <div v-if="item.post === 'send'" class="max-w-[14rem] flex justify-end ml-auto mb-3">
              <div class="bg-blue text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">{{ item.content }}</p>
              </div>
            </div>
          </template>
        </div>
        <div class="flex">
          <textarea
            id="chatInput"
            ref="message"
            v-model="search"
            name="chatInput"
            placeholder="輸入文字..."
            rows="1"
            class="resize-none w-full border border-black-1 rounded py-2 px-4 mt-2 max-h-[200px] min-h-[64px] resize-none overflow-y-auto"
            @input="adjustTextareaHeight({ isSend: false })"
            @keydown.enter.exact="sendMessage"
          />
        </div>
      </div>
    </div>
  </userLayouts>
</template>
<style scoped>
.isMobile {
  @media screen and (max-width: 678px) {
    display: none;
  }
}
.isMobile.isActive {
  display: block;
}
</style>
