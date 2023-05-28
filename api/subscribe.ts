import Http from '@/utilities/useHttp';

export default new (class subscribe extends Http {
  /**
   * GET 使用人薪水訂閱
   * @params keyword
   * @params limit
   * @params page
   */
  public getSubscribeCompanies({
    keyword,
    limit = 5,
    page = 1,
  }: {
    keyword: string | number | undefined;
    limit?: number;
    page: number;
  }) {
    return this.get(`/api/account/salary/following/list?keyword=${keyword}&limit=${limit}&page=${page}`);
  }

  /**
   * DELETE 取消訂用
   * @params keyword
   * @params limit
   * @params page
   */
  public deleteSubscribeCompany(id: string) {
    return this.delete(`/api/account/salary/${id}/subscribe`);
  }
})();
