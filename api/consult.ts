import Http from '@/utilities/useHttp';

export default new (class consult extends Http {
  /**
   * xxx - 建立請教資料
   */
  public postConsult(data: { receiverId: string; postId: string }) {
    return this.post('/api/account/consult', data);
  }

  /**
   * GET 507 - 查看請教紀錄 - 取得請教列表
   *
   */
  public getConsultList() {
    return this.get(`/api/account/consult/list`);
  }
})();
