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
})();
