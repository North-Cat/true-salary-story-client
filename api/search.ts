import Http from '@/utilities/useHttp';
import { ISearch } from '@/interface/search';

export default new (class search extends Http {
  /**
   * 300 取得首頁初始化資訊
   */
  public getHomeInit() {
    return this.get('/api/public/statistics', undefined, undefined, false);
  }

  /**
   * 302 取得熱門薪資資訊
   */
  public getTopPost() {
    return this.get('/api/salary/getTopPost', undefined, undefined, false);
  }

  /**
   * 303 取得熱門公司資訊
   */
  public getTopCompany() {
    return this.get('/api/salary/getTopCompany', undefined, undefined, false);
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
   * 306 查詢單一公司所有職位
   * @params taxId
   */
  public getCompanyTitles(taxId: string) {
    return this.get(`/api/salary/company/${taxId}/title`);
  }

  /**
   * 307 查詢單一公司全部薪水資訊
   * @params id
   */
  public getCompanySalaries(params: ISearch) {
    const { taxId, sortOption, titleOption, page, limit } = params;
    return this.get(
      `/api/salary/company/${taxId}?sortOption=${sortOption}&titleOption=${titleOption}&page=${page}&limit=${limit}`,
    );
  }

  /**
   * 308 查詢熱門產業
   * @params id
   */
  public getTopCompanyType() {
    return this.get('/api/salary/getTopCompanyType', undefined, undefined, false);
  }

  /**
   * 309 查詢單一公司概況
   * @params taxId
   */
  public getCompanyInfo(taxId: string) {
    return this.get(`/api/salary/company/${taxId}/infos`);
  }
})();
