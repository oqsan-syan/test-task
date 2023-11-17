import { FC, useState } from "react";

import { FormValues } from "types/customer";
import { initialValues } from "constants/formData";

import AddEditForm from "./AddEditForm";
import Customers from "./Customers";
import Header from "./Header";
import Container from "./Container";

const CustomerForm: FC = () => {
  const [formData, setFormData] = useState<FormValues>(initialValues);

  return (
    <div className="lg:grid xl:grid-cols-30/70 lg:grid-cols-40/60">
      {/* __________________________ADD/Edit FORM_____________________ */}
      <Container className="border-r border-grey">
        <Header title="Add Customer" />
        <AddEditForm
          formData={formData}
          resetFormData={() => setFormData(initialValues)}
        />
      </Container>

      {/* _______________________Customers___________________________ */}
      <Container>
        <Header title="Customers" />
        <Customers updateFormData={setFormData} />
      </Container>
    </div>
  );
};

export default CustomerForm;
