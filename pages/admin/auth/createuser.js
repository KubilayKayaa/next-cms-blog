import styles from "../../../styles/admin-auth.module.scss";
import utilsStyles from "../../../styles/utils.module.scss";
import { Formik, Form } from "formik";
import TextField from "../../../components/TextField";
import adminAuthSignup from "../../../FormikValidations/adminAuthSignup";
import http from "../../../http-config";
import Loader from "../../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../components/Redirect";

export default function Signup() {
  const [showLoader, setShowLoader] = useState(false);
  const [sameUserError, setSameUserError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("user") ? true : false);
    setIsLoading(false);
  }, [isAuth]);

  const Router = useRouter();

  const signUp = async (values) => {
    const usersRes = await fetch(`${http}/api/admin/auth/users`);
    const usersData = await usersRes.json();

    const sameUser = usersData.data.find(
      (user) => user.email === values.email || user.username === values.username
    );

    if (sameUser) {
      setSameUserError(true);
    } else {
      const res = await fetch(`${http}/api/admin/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status == 201) {
        setSameUserError(false);
        setShowLoader(true);
        Router.push("/admin/posts");
      }
    }
  };

  if (isLoading) {
    return null;
  } else {
    if (isAuth == true) {
      return (
        <div className={styles.authContainer}>
          <div className={styles.container}>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={adminAuthSignup}
              onSubmit={(values) => signUp(values)}
            >
              {(formik) => (
                <Form className={styles.form}>
                  <h3>Create User</h3>
                  <div className={utilsStyles.hUnderline}></div>
                  {sameUserError && (
                    <div className={utilsStyles.sError}>
                      This user is already exists.
                    </div>
                  )}
                  <TextField
                    label="Username"
                    name="username"
                    type="text"
                    isInput={true}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    isInput={true}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    isInput={true}
                  />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    isInput={true}
                  />
                  {showLoader ? (
                    <div className={styles.loaderContainer}>
                      <Loader />
                    </div>
                  ) : (
                    <button type="submit" className={utilsStyles.tButton}>
                      Create
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/admin/auth/signin" />;
    }
  }
}
