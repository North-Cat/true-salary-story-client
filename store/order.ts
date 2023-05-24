import { defineStore } from 'pinia';
export const useOrderStore = defineStore('order', () => {
  const { orderApi } = useApi();

  // call api 800 取得 line pay transactionId
  const fetchLinePayOrder = async (param: object): Promise<string> => {
    const { data } = await orderApi.postLinePayOrder(param);
    return data ? data.transactionId : undefined;
  };

  // call api 801 送出 transactionId
  const fetchLinePayTransaction = async (transactionId: string): Promise<string> => {
    const { data } = await orderApi.postLinePayTransaction(transactionId);
    return data ? data.paymentUrl : undefined;
  };

  return {
    fetchLinePayOrder,
    fetchLinePayTransaction,
  };
});
