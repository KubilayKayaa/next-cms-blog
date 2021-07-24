import * as Yup from "yup";

const adminAddPost = Yup.object({
  title: Yup.string()
    .max(120, "Must be 40 characters or less.")
    .required("Required."),
  description: Yup.string().required("Required."),
  postImage: Yup.string(),
});

export default adminAddPost;
