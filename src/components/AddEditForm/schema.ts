import { object, string } from "yup";

export const schema = object({
  firstName: string().required("Required"),
  lastName: string().required("Required"),
  company: string().required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string().min(8, "8+ characters").required("Required"),
});
