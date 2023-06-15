import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { useConsultStore } from '@/store/consult';
import { showSuccess } from '@/utilities/message';

export const useWSStore = defineStore('ws', () => {
  const {
    public: { wssBase },
  } = useRuntimeConfig();
  const userStore = useUserStore();
  const consultStore = useConsultStore();

  const url = wssBase;
  const ws = ref<WebSocket>();
  const hasNewMessage = ref(0);

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

        if (sender !== userStore.currentUser._id) {
          hasNewMessage.value = hasNewMessage.value + 1;
        }
      } else if (res.type === 'create') {
        showSuccess('', '有一筆新的"向你請教"加入');

        const { data } = res;
        consultStore.consultList = data;
      }
    };
  };

  return { ws, init, hasNewMessage };
});
