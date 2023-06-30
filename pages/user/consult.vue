<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/user';
import { useWSStore } from '@/store/ws';
import { useConsultStore } from '@/store/consult';
import { IConsult } from '@/interface/consult';

useHead({
  title: '請教記錄',
});
definePageMeta({
  middleware: 'auth',
});

const router = useRouter();
const { width } = useWindowSize();
const userStore = useUserStore();
const wsStore = useWSStore();
const consultStore = useConsultStore();
const { consultList, loading2, myConsultList, otherConsultList } = storeToRefs(consultStore);

const search = ref('');
const message = ref<HTMLInputElement | null>(null);
const room = ref<HTMLInputElement | null>(null);
const step = ref(1);

const scrollToBottom = () => {
  const chatRoom = room.value as HTMLInputElement;
  if (chatRoom) {
    chatRoom.scrollTop = chatRoom.scrollHeight;
  }
};

wsStore.hasNewMessage = 0;
consultStore.fetchConsultList().finally(() => {
  scrollToBottom();
});

const currentConsult = computed(() => consultStore.currentConsult);
const isActive = computed(() => consultStore.isActive);
const messageList = computed(() => (currentConsult.value ? currentConsult.value.messages : []));

watch(messageList, () => {
  if (!room.value) return;

  if (Math.abs(room.value.scrollTop + room.value.offsetHeight - room.value.scrollHeight) <= 10) {
    nextTick(() => {
      if (!room.value) return;
      room.value.scrollTop = room.value.scrollHeight;
    });
  }
});

const onClick = async (item: IConsult) => {
  consultStore.currentConsult = item;
  consultStore.isActive = item._id;

  const isSender = consultStore.currentConsult.sender === userStore.currentUser._id;
  if (isSender) {
    consultStore.currentConsult.isSenderRead = true;
  } else {
    consultStore.currentConsult.isReceiverRead = true;
  }

  const payload = {
    type: 'read',
    consultId: currentConsult.value._id,
    readerId: userStore.currentUser._id,
  };

  if (wsStore.ws) {
    wsStore.ws.send(JSON.stringify(payload));
  }
  step.value = 2;

  await nextTick();
  scrollToBottom();
};

const tempIsSend = ref(false);

const adjustTextareaHeight = ({ isSend = false }: { isSend?: boolean }) => {
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
  if (e.isComposing) return;

  const trimmedMessage = search.value.trim();
  if ((e.key === 'Enter' && search.value === '') || trimmedMessage === '') {
    e.preventDefault();
    return;
  }
  // 在此處執行傳送訊息的相關操作
  const payload = {
    type: 'chat',
    consultId: currentConsult.value._id,
    content: search.value,
    receiverId:
      currentConsult.value.sender === userStore.currentUser._id
        ? currentConsult.value.receiver
        : currentConsult.value.sender,
  };

  if (wsStore.ws) {
    wsStore.ws.send(JSON.stringify(payload));
    console.log('傳送訊息:', search.value);
  }

  // 清空輸入框
  search.value = '';
  adjustTextareaHeight({ isSend: true });
};

const goBack = () => {
  step.value = 1;
  consultStore.isActive = '';
};
const goSalary = (postId: string) => {
  const routeData = router.resolve({ path: `/salary/${postId}` });
  window.open(routeData.href, '_blank');
};

const formatData = (createdAt: Date) => {
  const date = new Date(createdAt);
  const localDate = date.toLocaleDateString('zh-TW');
  return localDate;
};
</script>

<template>
  <userLayouts>
    <client-only>
      <template v-if="!loading2">
        <div class="lg:flex">
          <div
            class="w-full lg:w-2/6 h-[500px] overflow-y-scroll lg:overscroll-contain"
            :class="{ isMobile: width < 678, isActive: step === 1 }"
          >
            <!-- <p>isWSOpen: {{ wsStore.isWSOpen }}</p> -->
            <div class="divide-y divide-black-3">
              <h6 class="mb-2 flex items-center">
                <span class="icomoon icon-message text-blue text-2xl mr-2"></span>
                <span>我的請教</span>
                <span class="ml-auto">共{{ myConsultList.length }}筆</span>
              </h6>
              <template v-if="myConsultList.length">
                <div v-for="(item, $index) in myConsultList" :key="$index" class="">
                  <button :class="{ 'bg-black-1': isActive === item._id }" class="p-3 w-full" @click="onClick(item)">
                    <div>
                      <h5
                        class="text-lg text-blue text-base text-left"
                        :class="{ 'text-blue-dark': isActive === item._id }"
                      >
                        {{ item.activePost.title }}
                      </h5>
                      <p class="text-sm text-left">{{ item.activePost.companyName }}</p>
                      <div class="flex justify-between text-sm">
                        <p
                          class="truncate pr-2"
                          :class="{
                            'text-black-5': item.isSenderRead,
                          }"
                        >
                          {{ item.messages.length ? item.messages[item.messages.length - 1].content : '暫無對話' }}
                        </p>
                        <span class="shirnk">{{ formatData(item.updateDate) }}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </template>
              <template v-else>暫無請教紀錄</template>
            </div>
            <div class="group w-full">
              <hr class="text-black-10 my-3" />
            </div>
            <div class="divide-y divide-black-3">
              <h6 class="mb-2 flex items-center">
                <span class="icomoon icon-message text-blue text-2xl mr-2"></span>
                <span class="mb-2 block">向我請教</span>
                <span class="ml-auto">共{{ otherConsultList.length }}筆</span>
              </h6>
              <template v-if="otherConsultList.length">
                <div v-for="(item, $index) in otherConsultList" :key="$index" class="">
                  <button :class="{ 'bg-black-1': isActive === item._id }" class="p-3 w-full" @click="onClick(item)">
                    <div>
                      <h5
                        class="text-lg text-blue text-base text-left"
                        :class="{ 'text-blue-dark': isActive === item._id }"
                      >
                        {{ item.activePost.title }}
                      </h5>
                      <p class="text-sm text-left">{{ item.activePost.companyName }}</p>
                      <div class="flex justify-between text-sm">
                        <p
                          class="truncate pr-2"
                          :class="{
                            'text-black-5': item.isReceiverRead,
                          }"
                        >
                          {{ item.messages.length ? item.messages[item.messages.length - 1].content : '暫無對話' }}
                        </p>
                        <span class="shirnk">{{ formatData(item.updateDate) }}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </template>
              <template v-else>目前沒有人向我請教</template>
            </div>
          </div>
          <div class="w-full lg:w-4/6 lg:pl-4" :class="{ isMobile: width < 678, isActive: step === 2 }">
            <!-- <p>isWSOpen: {{ wsStore.isWSOpen }}</p> -->
            <BaseButton cate="gray-text" class="px-0 py-0 mb-2 lg:hidden" @click="goBack"
              ><i class="icon-left-arrow pr-3"></i>返回</BaseButton
            >
            <div>
              <h5
                v-if="currentConsult && currentConsult.activePost"
                class="text-lg text-blue text-base text-left cursor-pointer"
                @click="goSalary(currentConsult.activePost.postId)"
              >
                {{ currentConsult.activePost.title }}
              </h5>
              <p v-if="currentConsult && currentConsult.activePost" class="text-sm text-left">
                {{ currentConsult.activePost.companyName }}
              </p>
            </div>
            <hr class="text-black-3 my-3" />
            <div ref="room" class="h-[400px] overflow-y-scroll pr-2">
              <template v-if="messageList.length">
                <template v-for="item in messageList" :key="item.messageId">
                  <div v-if="item.sender !== userStore.currentUser._id" class="max-w-[14rem] flex justify-start mb-3">
                    <div class="bg-black-1 p-3 rounded-r-lg rounded-bl-lg text-black-10">
                      <p class="text-sm">{{ item.content }}</p>
                    </div>
                  </div>
                  <div
                    v-if="item.sender === userStore.currentUser._id"
                    class="max-w-[14rem] flex justify-end ml-auto mb-3"
                  >
                    <div class="bg-blue text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">{{ item.content }}</p>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>暫無對話紀錄</template>
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
                @keydown.enter="sendMessage"
              />
            </div>
          </div>
        </div>
      </template>
    </client-only>
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
