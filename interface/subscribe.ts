export interface ISubscribeCompanies {
  company: {
    companyName: string;
    address: string;
    photo: string;
    shared: number;
    companyId: string;
  };
  _id: string;
  createdAt: number;
}

export interface ISubscribeCompaniesResponse {
  result: ISubscribeCompanies[];
  totalCount: number;
}
