import * as Yup from "yup";

const adminAuthSignup = Yup.object({
  username: Yup.string()
    .max(40, "Must be 40 characters or less.")
    .required("Required."),
  email: Yup.string()
    .email("Email is invalid.")
    .max(80, "Must be 80 characters or less")
    .min(6, "Must be at least 6 characters.")
    .required("Required."),
  password: Yup.string()
    .max(40, "Must be 40 characters or less")
    .min(6, "Must be at least 6 characters.")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match.")
    .required("Confirm password is required."),
});

export default adminAuthSignup;
