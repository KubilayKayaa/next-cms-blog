import * as Yup from "yup";

const adminAuthSignin = Yup.object({
  email: Yup.string()
    .email("Email is invalid.")
    .max(80, "Must be 80 characters or less")
    .required("Required."),
  password: Yup.string()
    .max(40, "Must be 40 characters or less")
    .required("Required"),
});

export default adminAuthSignin;
