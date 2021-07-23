import styles from "../../../styles/admin-auth.module.scss";
import utilsStyles from "../../../styles/utils.module.scss";
import { Formik, Form } from "formik";
import TextField from "../../../components/TextField";
import adminAuthSignin from "../../../FormikValidations/adminAuthSignin";
import http from "../../../http-config";
import Loader from "../../../components/Loader/Loader";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Signin() {
  const [showLoader, setShowLoader] = useState(false);
  const [isThereUserError, setIsThereUserError] = useState(false);
  const Router = useRouter();

  const signIn = async (values) => {
    const usersRes = await fetch(`${http}/api/admin/auth/users`);
    const usersData = await usersRes.json();

    const isThere = usersData.data.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (!isThere) {
      setIsThereUserError(true);
    } else {
      setIsThereUserError(false);
      const res = await fetch(`${http}/api/admin/auth/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        setShowLoader(true);
      }

      const data = await res.json();

      if (
        data.user.email == values.email ||
        data.user.password == values.password
      ) {
        sessionStorage.setItem("user", JSON.stringify(data.token));
        Router.push("/admin/posts");
        // window.location.href = "/admin/posts";
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.container}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={adminAuthSignin}
          onSubmit={(values) => signIn(values)}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h3>Sign In</h3>
              <div className={utilsStyles.hUnderline}></div>
              {isThereUserError && (
                <div className={utilsStyles.sError}>
                  Email/Password is wrong.
                </div>
              )}
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
              {showLoader ? (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>
              ) : (
                <>
                  <button type="submit" className={utilsStyles.tButton}>
                    Sign In
                  </button>
                  <Link href="/admin/auth/signup">
                    <a className={styles.link}>
                      Dont you have an account? Sign Up
                    </a>
                  </Link>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
