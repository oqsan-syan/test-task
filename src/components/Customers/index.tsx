import { FC, useEffect } from "react";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  deleteCustomer,
  fetchInitialCustomers,
} from "store/customers/customerServise";

import { Customer, FormValues } from "types/customer";
import { Status } from "types/enums/status";

import editIcon from "assets/icons/Edit.svg";
import trashIcon from "assets/icons/Trash.svg";

const columns = ["Name", "Company", "Email", "Admin", "Actions"];

interface CustomersProps {
  updateFormData: (value: FormValues) => void;
}

const Customers: FC<CustomersProps> = ({ updateFormData }) => {
  const dispatch = useAppDispatch();
  const { customers, status } = useAppSelector((state) => state.customers);

  const handleRemoveUser = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const handleEditUser = (id: string) => {
    const currentCustomer = customers.find((el) => el.id === id);

    if (currentCustomer) updateFormData(currentCustomer);
  };

  useEffect(() => {
    if (customers.length === 0) dispatch(fetchInitialCustomers());
  }, [customers.length]);

  return (
    <div>
      {status === "loading" && customers.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="font-medium text-placeholder text-left py-1.5 px-3 first:pl-0 last:pr-0"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {status === "succeeded" && customers.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="text-center mt-20">No Data</div>
                  </td>
                </tr>
              )}
              {customers.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td className="py-1.5 pr-3">
                    <div className="flex gap-2 items-center">
                      <div
                        dangerouslySetInnerHTML={{ __html: customer.avatar }}
                        className="avatar"
                      />
                      <div className="text-primary font-medium">
                        {customer.firstName} {customer.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="text-primary font-medium py-1.5 px-3">
                    {customer.company}
                  </td>
                  <td className="text-primary font-medium py-1.5 px-3">
                    {customer.email}
                  </td>
                  <td className="py-1.5 px-3 w-12">
                    <div
                      className={`${
                        customer.status === Status.ADMIN ? "bg-blue" : "bg-grey"
                      } w-12 h-6 rounded`}
                    ></div>
                  </td>
                  <td className="py-1.5 pl-3 w-16">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        className="w-4 h-4 hover:bg-lightGrey"
                        onClick={() => handleEditUser(customer.id)}
                      >
                        <Image src={editIcon} alt="editIcon" />
                      </button>
                      <button
                        className="w-4 h-4 hover:bg-lightGrey"
                        onClick={() => handleRemoveUser(customer.id)}
                      >
                        <Image src={trashIcon} alt="editIcon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
