import Http from '@/utilities/useHttp';

export default new (class search extends Http {
  /**
   * 依條件搜尋
   * @params id
   */
  public getPostResultsByParam(
    companyName?: string,
    type?: string,
    title?: string,
    page?: number,
    limit?: number,
    sort?: string,
  ) {
    return this.get(
      `/api/salary/search?companyName=${companyName}&type=${type}&title=${title}&page=${page}&limit=${limit}&sort=${sort}`,
    );
  }
})();
