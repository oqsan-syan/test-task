import { Status } from "./enums/status";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  company: string;
  email: string;
  password: string;
  status: Status;
}

export interface AddedCustomer {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
  status: Status;
}

export interface UpdateCustomer {
  id?: string | undefined;
  avatar?: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
  status: Status;
}

export interface FormValues {
  id?: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
}
