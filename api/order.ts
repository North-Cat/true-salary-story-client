import Http from '@/utilities/useHttp';

export default new (class order extends Http {
  /**
   * 依條件搜尋
   * @params purchaseType: 購買類別 single:單買,subscription:訂閱
   * @params amount: 購買金額
   */
  public postLinePayOrder(data: object) {
    return this.post('/linepay/order', data);
  }

  /**
   * 依條件搜尋
   * @params transactionId: 從 postLinePay() 取得的訂單編號
   */
  public postLinePayTransaction(transactionId: string) {
    return this.post(`/linepay/${transactionId}`);
  }
})();
