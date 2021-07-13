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

export type NoteCategoryTypes =
  | 'planning'
  | 'inProgress'
  | 'finalized'
  | 'done';

export interface INote {
  id?: string;
  body: string;
  bgColor?: string;
  category: NoteCategoryTypes;
}
