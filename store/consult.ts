import { defineStore } from 'pinia';

export const useConsultStore = defineStore('consult', () => {
  const { consultApi } = useApi();

  const createConsult = async (payload: { receiverId: string; postId: string }) => {
    try {
      await consultApi.postConsult(payload);
    } catch (error) {
      console.error('create consult error: ', error);
      throw error;
    }
  };

  return {
    createConsult,
  };
});
