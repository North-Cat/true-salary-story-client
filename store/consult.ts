import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

import { IConsult } from '@/interface/consult';

export const useConsultStore = defineStore('consult', () => {
  const { consultApi } = useApi();
  const route = useRoute();

  const consultList = ref<IConsult[]>([]);
  const currentConsult = ref();
  const isActive = ref('');

  const createConsult = async (payload: { receiverId: string; postId: string }) => {
    try {
      await consultApi.postConsult(payload);
    } catch (error) {
      console.error('create consult error: ', error);
      throw error;
    }
  };

  const fetchConsultList = async () => {
    try {
      const { result } = await consultApi.getConsultList();

      const data = result.map((o: any) => ({ ...o, isRead: false }));

      consultList.value = data;
      const target = consultList.value.find((o) => o.activePost.postId === route.query.post);

      if (target) {
        target.isRead = true;
        currentConsult.value = target;
        isActive.value = target._id;
      }
    } catch (error) {
      console.error('get consult list error: ', error);
      throw error;
    }
  };

  const updateCurrentConsult = (consult: IConsult) => {
    currentConsult.value = consult;
  };

  return {
    createConsult,

    fetchConsultList,
    updateCurrentConsult,
    consultList,
    currentConsult,
    isActive,
  };
});
