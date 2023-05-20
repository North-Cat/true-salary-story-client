import Http from '@/utilities/useHttp';

export default new (class postShare extends Http {
  /**
   * 取得統編資料
   * @params id
   */
  public getUniformNumbers(id: number | string) {
    return this.get(`/api/salary/uniformNumbers/${id}`);
  }

  public getSalaryInfo(id: string) {
    return this.get(`/api/salary/${id}`);
  }

  public requestSalaryInfo(id: number) {
    return this.post(`/api/salary/${id}/permission`);
  }
})();
