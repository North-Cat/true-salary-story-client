export interface IMyOrdersProducts {
  name: string;
  quantity: number;
  price: number;
}
export interface IOrderDetailsPackage {
  id: string;
  amount: number;
  products: IMyOrdersProducts[];
}
export interface IMyOrdersList {
  _id: string;
  status: string;
  createdAt: Date;
  orderDetails: {
    amount: number;
    currency: string;
    orderId: string;
    packages: IOrderDetailsPackage[];
  };
}
export interface IMyOrdersListResponse {
  result: IMyOrdersList[];
  totalCount: number;
}

export interface IPointsList {
  _id: string;
  user: string;
  point: number;
  remark: string;
  startDate: Date;
  createdAt: Date;
}

export interface IPointsListRespose {
  result: IPointsList[];
  totalCount: number;
}
