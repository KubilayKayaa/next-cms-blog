import * as Yup from "yup";

const adminAddPost = Yup.object({
  title: Yup.string()
    .max(40, "Must be 40 characters or less.")
    .required("Required."),
  description: Yup.string()
    .max(200, "Must be 200 characters or less.")
    .required("Required."),
});

export default adminAddPost;
