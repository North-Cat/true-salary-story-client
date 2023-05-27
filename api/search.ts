import Http from '@/utilities/useHttp';

export default new (class search extends Http {
  /**
   * 302 取得熱門薪資資訊
   */
  public getTopPost() {
    return this.get('/api/salary/getTopPost');
  }

  /**
   * 303 取得熱門公司資訊
   */
  public getTopCompany() {
    return this.get('/api/salary/getTopCompany');
  }

  /**
   * 305 依條件搜尋
   * @params id
   */
  public getPostResultsByParam(companyName?: string, type?: string, title?: string, page?: number, limit?: number) {
    return this.get(
      `/api/salary/search?companyName=${companyName}&type=${type}&title=${title}&page=${page}&limit=${limit}`,
    );
  }

  /**
   * 308 查詢熱門產業
   * @params id
   */
  public getTopCompanyType() {
    return this.get('/api/salary/getTopCompanyType');
  }
})();
