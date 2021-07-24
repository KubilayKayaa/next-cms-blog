import * as Yup from "yup";

const adminComment = Yup.object({
  fullName: Yup.string()
    .max(120, "Must be 120 characters or less.")
    .required("Required."),
  email: Yup.string()
    .email()
    .max(120, "Must be 120 characters or less.")
    .required("Required."),
  comment: Yup.string().required("Required"),
});

export default adminComment;
