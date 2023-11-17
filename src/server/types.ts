import { Model } from "miragejs";
import { Customer } from "types/customer";

export const CustomerModel = Model.extend<Partial<Customer>>({});

export interface Server {
  db: {
    customers: Customer[];
  };
}
