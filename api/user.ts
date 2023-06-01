import Http from '@/utilities/useHttp';

export default new (class user extends Http {
  /**
   * 取得使用人資料
   */
  public getUserProfile() {
    return this.get(`/user/profile`);
  }

  /**
   * 登出
   */
  public postLogout() {
    return this.post(`/auth/logout`);
  }

  /**
   * GET 使用人薪水分享列表
   * @params keyword
   * @params limit
   * @params page
   */
  public getMySalary({
    keyword,
    limit = 5,
    page = 1,
  }: {
    keyword: string | number | undefined;
    limit?: number;
    page: number;
  }) {
    return this.get(`/api/account/salary/shared/list?keyword=${keyword}&limit=${limit}&page=${page}`);
  }

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
   * GET 使用人薪水分享列表
   * @params keyword
   * @params limit
   * @params page
   */
  public getOpenedSalary({
    keyword,
    limit = 5,
    page = 1,
  }: {
    keyword: string | number | undefined;
    limit?: number;
    page: number;
  }) {
    return this.get(`/api/account/salary/unlocked/list?keyword=${keyword}&limit=${limit}&page=${page}`);
  }
})();
