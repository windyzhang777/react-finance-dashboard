export interface Transaction {
  _id: string;
  amount: number;
  buyer: string;
  productIds: string[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
