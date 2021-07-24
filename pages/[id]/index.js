import React from "react";
import styles from "./detail.module.scss";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import utilsStyles from "../../styles/utils.module.scss";
import { useRouter } from "next/dist/client/router";
import http from "../../http-config";

function PostDetail({ post }) {
  console.log(post);
  const Router = useRouter();
  return (
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
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${http}/api/admin/posts/${context.query.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
}

export default PostDetail;
