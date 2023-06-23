import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

import { IConsult } from '@/interface/consult';
import { useUserStore } from '@/store/user';
import { useWSStore } from '@/store/ws';

export const useConsultStore = defineStore('consult', () => {
  const route = useRoute();
  const { consultApi } = useApi();
  const userStore = useUserStore();
  const wsStore = useWSStore();

  const consultList = ref<IConsult[]>([]);
  const currentConsult = ref();
  const isActive = ref('');
  const loading2 = ref(false);

  const myConsultList = computed(() => consultList.value.filter((o) => o.sender === userStore.currentUser._id));
  const otherConsultList = computed(() => consultList.value.filter((o) => o.sender !== userStore.currentUser._id));

  const createConsult = async (payload: { receiverId: string; postId: string }) => {
    try {
      await consultApi.postConsult(payload);
    } catch (error) {
      console.error('create consult error: ', error);
      throw error;
    }
  };

  const fetchConsultList = async () => {
    loading2.value = true;
    const { result } = await consultApi.getConsultList();

    consultList.value = result;
    loading2.value = false;

    const target = consultList.value.find((o) => o.activePost.postId === route.query.post);

    if (target) {
      const payload = {
        type: 'read',
        consultId: target._id,
        readerId: userStore.currentUser._id,
      };

      const isSender = target.sender === userStore.currentUser._id;
      const isReceiver = target.receiver === userStore.currentUser._id;
      if (isSender) {
        target.isSenderRead = true;
      }
      if (isReceiver) {
        target.isReceiverRead = true;
      }

      if (wsStore.ws) {
        wsStore.ws.send(JSON.stringify(payload));
      }
      currentConsult.value = target;
      isActive.value = target._id;
    } else {
      const [first] = myConsultList.value.length ? myConsultList.value : consultList.value;
      if (first) {
        const payload = {
          type: 'read',
          consultId: first._id,
          readerId: userStore.currentUser._id,
        };

        const isSender = first.sender === userStore.currentUser._id;
        const isReceiver = first.receiver === userStore.currentUser._id;
        if (isSender) {
          first.isSenderRead = true;
        }
        if (isReceiver) {
          first.isReceiverRead = true;
        }

        if (wsStore.ws) {
          wsStore.ws.send(JSON.stringify(payload));
        }
        currentConsult.value = first;
        isActive.value = first._id;
      }
    }
  };

  const updateCurrentConsult = (consult: IConsult) => {
    currentConsult.value = consult;
  };

  return {
    createConsult,

    fetchConsultList,
    loading2,
    updateCurrentConsult,
    consultList,
    myConsultList,
    otherConsultList,
    currentConsult,
    isActive,
  };
});
