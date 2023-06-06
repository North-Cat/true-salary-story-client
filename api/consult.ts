import Http from '@/utilities/useHttp';

export default new (class consult extends Http {
  /**
   * xxx - 建立請教資料
   */
  public postConsult(data: { receiverId: string; postId: string }) {
    return this.post('/api/account/consult', data);
  }
})();
