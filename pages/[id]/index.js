import React from "react";
import styles from "./detail.module.scss";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import utilsStyles from "../../styles/utils.module.scss";
import { useRouter } from "next/dist/client/router";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import adminComment from "../../FormikValidations/adminComment";
import http from "../../http-config";

function PostDetail({ post, comments }) {
  const Router = useRouter();

  const addComment = async (values) => {
    const res = await fetch(`${http}/api/admin/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (res.status === 201) {
      Router.reload(window.location.pathname);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <button
          className={utilsStyles.tButton + " " + styles.back}
          onClick={() => Router.push("/")}
        >
          <MdArrowBack size="32" />
        </button>
        <div className={styles.postDetail}>
          <h3>{post.data.title}</h3>
          <p>{post.data.description}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <h3>All Comments</h3>
        <div className={utilsStyles.hUnderline}></div>
        <div className={styles.allComments}>
          {comments &&
            comments.data
              .filter((comment) => comment.postId === post.data._id)
              .filter((c) => c.active === true)
              .map((c) => (
                <div className={styles.comment} key={c._id}>
                  <h3 className={styles.userComment}>{c.comment}</h3>
                  <div className={styles.user}>
                    <p className={styles.fullName}>{c.fullName}</p>
                    <p className={styles.time}>{c.time.split("T")[0]}</p>
                  </div>
                  {/* <p className={styles.email}>{c.email}</p> */}
                </div>
              ))}
        </div>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            comment: "",
            postId: post.data._id,
          }}
          validationSchema={adminComment}
          onSubmit={(values) => addComment(values)}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h4>Add Comment</h4>

              <TextField
                label="Full Name"
                name="fullName"
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
                label="Comment"
                name="comment"
                type="text"
                isInput={false}
              />
              <button type="submit" className={utilsStyles.tButton}>
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${http}/api/admin/posts/${context.query.id}`);
  const post = await res.json();

  const resComments = await fetch(`${http}/api/admin/comments`);
  const comments = await resComments.json();

  return {
    props: { post, comments },
  };
}

export default PostDetail;
