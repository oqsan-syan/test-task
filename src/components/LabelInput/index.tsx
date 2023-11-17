import { FC } from "react";
import { ErrorMessage, Field, FormikValues, useFormikContext } from "formik";

import Image from "next/image";

import eyeIcon from "assets/icons/Eye.svg";
import eyeOffIcon from "assets/icons/EyeOff.svg";

interface LabelInputProps {
  name: string;
  value: string;
  type?: "text" | "email" | "password";
  helperText?: string;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const LabelInput: FC<LabelInputProps> = ({
  name,
  value,
  type = "text",
  helperText,
  onTogglePassword,
  showPassword,
}) => {
  const formik = useFormikContext<FormikValues>();

  return (
    <div className="w-full relative">
      <label
        className="text-secondary font-medium text-base mb-[10px] block"
        htmlFor={name}
      >
        {value}
      </label>
      <Field
        className="text-primary border border-grey rounded-lg py-2 px-3 bg-white w-full focus:outline-none focus:shadow-inputFocused relative"
        id={name}
        type={type}
        name={name}
        placeholder={value}
      />
      {name === "password" && (
        <button
          className="absolute right-0 top-11 flex items-center pr-2"
          onClick={onTogglePassword}
        >
          <Image src={showPassword ? eyeOffIcon : eyeIcon} alt={eyeIcon} />
        </button>
      )}

      {!formik.errors[name] && helperText && (
        <div className="mt-[10px]">
          <span className="text-placeholder text-sm">8+ characters</span>
        </div>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red text-sm mt-[10px]"
      />
    </div>
  );
};

export default LabelInput;
