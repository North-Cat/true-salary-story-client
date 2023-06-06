import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';

export const useWSStore = defineStore('ws', () => {
  const {
    public: { wssBase },
  } = useRuntimeConfig();
  const userStore = useUserStore();

  const url = wssBase;
  const ws = ref();

  const historyMessage = ref<any[]>([]);

  const init = () => {
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      console.log('open connection', userStore.currentUser._id);

      ws.value.send(
        JSON.stringify({
          type: 'userId',
          userId: userStore.currentUser._id,
        }),
      );
    };

    ws.value.onclose = () => {
      console.log('close connection');
    };

    ws.value.onmessage = (event: any) => {
      const res = JSON.parse(event.data);
      console.log('res: ', res);

      historyMessage.value = [...historyMessage.value, res];
    };
  };

  return { ws, init };
});
