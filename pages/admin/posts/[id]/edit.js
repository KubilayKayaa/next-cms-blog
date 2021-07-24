import { Formik, Form } from "formik";
import TextField from "../../../../components/TextField";
import adminAddPost from "../../../../FormikValidations/adminAddPost";
import Navbar from "../../../../components/admin/Navbar/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../../components/Redirect";
import Head from "next/head";
import utilsStyles from "../../../../styles/utils.module.scss";
import styles from "../posts.module.scss";
import Loader from "../../../../components/Loader/Loader";
import adminAuthStyles from "../../../../styles/admin-auth.module.scss";
import http from "../../../../http-config";

function Edit({ post, url }) {
  const Router = useRouter();

  const [sameDataError, setSameDataError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("user") ? true : false);
    setIsLoading(false);
  }, [isAuth]);

  const updatePost = async (values) => {
    const res = await fetch(`${http}/api/admin/posts`);
    const data = await res.json();

    const sameData = data.data.find(
      (d) => d.title === values.title && d.description === values.description
    );

    if (sameData) {
      setSameDataError(true);
    } else {
      setSameDataError(false);
      setShowLoader(true);
      await fetch(`${http}/api/admin/posts/${post.data._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      Router.push("/admin/posts");
    }
  };

  if (isLoading) {
    return null;
  } else {
    if (isAuth == true) {
      return (
        <>
          <Navbar />
          <Formik
            initialValues={{
              title: post.data.title,
              description: post.data.description,
            }}
            validationSchema={adminAddPost}
            onSubmit={(values) => {
              updatePost(values);
            }}
          >
            {(formik) => (
              <div className={styles.editPostContainer}>
                <Head>
                  <title>Admin Post Edit - {post.data.title}</title>
                  <meta
                    name="description"
                    content="Generated by create next app"
                  />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Form>
                  <h3>Update Post</h3>
                  <div className={utilsStyles.hUnderline}></div>
                  {sameDataError && (
                    <div className={utilsStyles.sError}>
                      This data is already exists.
                    </div>
                  )}
                  <TextField
                    label="Title"
                    name="title"
                    type="text"
                    isInput={true}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    type="text"
                    isInput={false}
                  />
                  {showLoader ? (
                    <div className={adminAuthStyles.loaderContainer}>
                      <Loader />
                    </div>
                  ) : (
                    <button className={utilsStyles.tButton} type="submit">
                      Update
                    </button>
                  )}
                </Form>
              </div>
            )}
          </Formik>
        </>
      );
    } else {
      return <Redirect to="/admin/auth/signin" />;
    }
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(`${http}/api/admin/posts/${context.query.id}`);
  const post = await res.json();

  return {
    props: { post, url: context.req.headers.host },
  };
}

export default Edit;
