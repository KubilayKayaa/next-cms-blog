import * as Yup from "yup";

const adminUserInfo = Yup.object({
  fullName: Yup.string()
    .max(40, "Must be 40 characters or less.")
    .required("Required."),
  title: Yup.string()
    .max(40, "Must be 200 characters or less.")
    .required("Required."),
  instagram: Yup.string().max(40, "Must be 200 characters or less."),
  twitter: Yup.string().max(40, "Must be 200 characters or less."),
  github: Yup.string().max(40, "Must be 200 characters or less."),
});

export default adminUserInfo;
