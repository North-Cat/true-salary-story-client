import Http from '@/utilities/useHttp';
import { IEmail } from '@/interface/user';

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

  public postNewEmail(params: IEmail) {
    return this.post(`/api/user/updateEmail`, params);
  }

  /*
    Biometric API(生物註冊與生物登入相關功能)
  */
  // get biometric status
  public postToggleBiometric(enable: boolean) {
    return this.post(`/api/auth/toggleBiometric`, { enable });
  }

  // 1. get biometric attestation data, for register
  public async postGenerateAttestation(isAndroid: boolean) {
    const response = await this.post(`/api/auth/generateAttestation`, {
      isAndroid,
    });
    return response.data;
  }

  // 2. verify biometric attestation data, if success then register biometric
  public async postVerifyAttestation(credential: any, challenge: string, userId: string) {
    const response = await this.post(`/api/auth/verifyAttestation`, {
      ...credential,
      challenge,
      userId,
    });
    return response;
  }

  // refresh token
  public postRefreshToken(refreshToken: string) {
    return this.post(`/api/auth/refreshToken`, { refreshToken });
  }

  // 3. get biometric assertion data, for login
  public async postGenerateAssertion() {
    const response = await this.post(`/api/auth/generateAssertion`);
    return response.data;
  }

  // 4. verify biometric assertion data, if success then login
  public postVerifyAssertion(credential: any, challenge: string, userId: string) {
    return this.post(`/api/auth/verifyAssertion`, {
      ...credential,
      challenge,
      userId,
    });
  }
})();
