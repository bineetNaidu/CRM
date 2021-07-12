export interface ICustomer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
  notes: INote[] | string[];
}

export interface INote {
  id?: string;
  body: string;
}
