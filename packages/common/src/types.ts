export interface ICustomer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
  notes: INote[] | string[];
  deals: IDeal[] | string[];
}

export type StatusTypes = 'planning' | 'inProgress' | 'finalized' | 'done';

export interface INote {
  id?: string;
  body: string;
  bgColor?: string;
}

export interface IDeal {
  id?: string;
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  estimatedTime: number;
  actualTime?: number;
  status: StatusTypes;
}

export interface ISetting {
  id?: string;
  isDarkMode: boolean;
  timezone: string;
  crmName: string;
}

export interface IInvoice {
  id?: string;
  customer: string | ICustomer;
  invoiceDate: Date | string;
  payment: {
    method: string;
    transactionId: string;
    cardNumber: string;
  };
  summary: string;
  totalAmount: number;
  tax?: number;
  subTotal?: number;
  shippingCost?: number;
}
