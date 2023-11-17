import { FC, useEffect, useRef, useState } from "react";

import { Form, Formik, FormikProps } from "formik";
import { schema } from "./schema";

import LabelInput from "components/LabelInput";

import { Status } from "types/enums/status";
import { FormValues } from "types/customer";

import { useAppDispatch } from "store/hooks";
import {
  addNewCustomer,
  updateCustomer,
} from "store/customers/customerServise";

interface AddEditFormProps {
  formData: FormValues;
  resetFormData: () => void;
}

const AddEditForm: FC<AddEditFormProps> = ({ formData, resetFormData }) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<FormValues>>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(Status.USER);

  const handleChangeStatus = (status: Status) => {
    setStatus(status);
  };

  const onSubmit = (values: FormValues, { resetForm }: any) => {
    if (formData?.id) {
      dispatch(updateCustomer({ ...values, status }));
    } else {
      dispatch(addNewCustomer({ ...values, status }));
    }

    resetForm();
    setStatus(Status.USER);
    resetFormData();
  };

  useEffect(() => {
    if (formData.id && formRef.current) {
      formRef.current?.setValues(formData);
    }
  }, [formData.id]);

  return (
    <Formik
      initialValues={formData}
      validationSchema={schema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ isValid }) => {
        return (
          <Form>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex justify-between gap-6 w-full">
                <LabelInput value="First Name" name="firstName" />
                <LabelInput value="Last Name" name="lastName" />
              </div>
              <LabelInput value="Company" name="company" />

              <div>
                <label
                  className="text-secondary font-medium text-base mb-[10px] block"
                  htmlFor="status"
                >
                  Status
                </label>
                <div className="flex items-center justify-between bg-lightGrey boredr border-lightGrey rounded-lg p-1 gap-1">
                  <button
                    className={`text-primary py-1 px-1.5 rounded w-full ${
                      status === Status.USER
                        ? "bg-white w-full shadow-selectBtn"
                        : ""
                    } hover:bg-opacity-90`}
                    onClick={() => handleChangeStatus(Status.USER)}
                  >
                    User
                  </button>
                  <button
                    className={`text-primary py-1 px-1.5 rounded w-full ${
                      status === Status.ADMIN
                        ? "bg-white w-full shadow-selectBtn"
                        : ""
                    } hover:bg-opacity-90`}
                    onClick={() => handleChangeStatus(Status.ADMIN)}
                  >
                    Administrator
                  </button>
                </div>
              </div>

              <LabelInput value="Email" name="email" type="email" />
              <LabelInput
                value="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                helperText="8+ characters"
                onTogglePassword={() => setShowPassword((prev) => !prev)}
                showPassword={showPassword}
              />

              <button
                type="submit"
                className="w-full text-white bg-blue py-2 px-3 rounded-lg font-bold hover:bg-darkBlue disabled:bg-placeholder"
                disabled={!isValid}
              >
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditForm;
