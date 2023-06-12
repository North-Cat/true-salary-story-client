import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { useConsultStore } from '@/store/consult';

export const useWSStore = defineStore('ws', () => {
  const {
    public: { wssBase },
  } = useRuntimeConfig();
  const userStore = useUserStore();
  const consultStore = useConsultStore();

  const url = wssBase;
  const ws = ref<WebSocket>();

  const init = () => {
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      console.log('open connection', userStore.currentUser._id);

      if (ws.value) {
        ws.value.send(
          JSON.stringify({
            type: 'userId',
            userId: userStore.currentUser._id,
          }),
        );
      }
    };

    ws.value.onclose = () => {
      console.log('close connection');
    };

    ws.value.onmessage = (event: any) => {
      const res = JSON.parse(event.data);
      console.log('res: ', res);

      if (res.type === 'chat') {
        const { consultId, content, senderId: sender, createDate } = res;

        const target = consultStore.consultList.find((o) => o._id === consultId);

        if (target) {
          target.messages = [
            ...target.messages,
            {
              sender,
              content,
              createDate,
            },
          ];

          if (target._id !== consultStore.currentConsult._id) {
            target.isRead = false;
          }
        }
      }
    };
  };

  return { ws, init };
});
