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
