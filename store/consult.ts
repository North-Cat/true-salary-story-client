import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

import { IConsult } from '@/interface/consult';
import { useUserStore } from '@/store/user';

export const useConsultStore = defineStore('consult', () => {
  const route = useRoute();
  const { consultApi } = useApi();
  const userStore = useUserStore();

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

    const data = result.map((o: any) => ({ ...o, isRead: false }));

    consultList.value = data;
    loading2.value = false;

    const target = consultList.value.find((o) => o.activePost.postId === route.query.post);

    if (target) {
      target.isRead = true;
      currentConsult.value = target;
      isActive.value = target._id;
    } else {
      const [first] = myConsultList.value.length ? myConsultList.value : consultList.value;
      first.isRead = true;
      currentConsult.value = first;
      isActive.value = first._id;
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
