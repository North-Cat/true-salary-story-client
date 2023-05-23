import Http from '@/utilities/useHttp';

export default new (class postShare extends Http {
  /**
   * 取得統編資料
   * @params id
   */
  public getUniformNumbers(id: number | string) {
    return this.get(`/api/salary/uniformNumbers/${id}`);
  }

  /**
   * POST 薪資資訊
   * @params submitData
   */
  public postSalary(submitData: object) {
    return this.post(`/api/salary`, submitData);
  }

  public getSalaryInfo(id: number) {
    console.log(id);
    return this.get(`/api/salary/${id}`);
  }

  public requestSalaryInfo(id: number) {
    return this.post(`/api/salary/${id}/permission`);
  }
})();
