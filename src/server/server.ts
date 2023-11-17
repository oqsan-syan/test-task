import Mirage, { createServer } from "miragejs";

import { CustomerModel } from "./types";
import { generateAvatar } from "utils/avatarGenerator";

export const makeServer = () => {
  const server = createServer({
    models: {
      customers: CustomerModel,
    },

    routes() {
      this.get("api/customers", (schema) => {
        return schema.db.customers;
      });

      this.post("api/customers", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.avatar = generateAvatar(attrs.email);
        attrs.id = Date.now().toString();
        return attrs;
      });

      this.put("api/customers/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const customer = schema.db.customers.find(id);
        return attrs;
        // Not Working :(
        if (customer) {
          customer.update(attrs);
          return customer;
        }
      });
      this.del("api/customers/:id", (schema, request) => {
        const id = request.params.id;
        const customer = schema.db.customers.find(id);

        if (customer) {
          return customer.destroy().then(() => {
            return new Mirage.Response(
              200,
              {},
              { message: "Customer deleted successfully" }
            );
          });
        }
      });
    },
  });

  return server;
};
