import Http from '@/utilities/useHttp';

export default new (class user extends Http {
  /**
   * 取得使用人資料
   */
  public getUserProfile() {
    return this.get(`/api/user/profile`);
  }

  /**
   * 登出
   */
  public postLogout() {
    return this.post(`/api/auth/logout`);
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

  /**
   * 每日簽到獲取積分
   * 滿 7 天獲得 50 積分，滿 14 天獲得 100 積分，第 15 天開始新的輪迴
   */
  public postDailyCheckIn() {
    return this.post(`/api/user/checkIn`);
  }

  public postEmailVerificationCode(email: string) {
    return this.post(`/api/user/sendEmailVerificationCode`, {
      newEmail: email,
    });
  }

  public postNewEmail(params) {
    return this.post(`/api/user/updateEmail`, params);
  }
})();
