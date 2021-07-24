import styles from "../../../../pages/admin/posts/posts.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BiShowAlt } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "../../../../http-config";

export default function ActivePosts({ searchPost }) {
  const Router = useRouter();

  const [posts, setPosts] = useState();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const res = await fetch(`${http}/api/admin/posts`);
    const data = await res.json();

    setPosts(data);
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(`${http}/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      Router.reload(window.location.pathname);
    } catch (error) {
      console.log("error", error);
    }
  };

  const inactivePost = async (id) => {
    try {
      const res = await fetch(`${http}/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: false }),
      });
      Router.reload(window.location.pathname);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(posts && posts.data.filter((p) => p.active === true));
  console.log(posts && posts.data.length !== 0 ? "0a eşit" : "0a eşit değil");

  return (
    <div className={styles.posts}>
      {posts &&
        posts.data
          .filter((po) => {
            if (searchPost === "") {
              return po;
            } else if (
              po.title.toUpperCase().includes(searchPost.toUpperCase()) ||
              po.description.toUpperCase().includes(searchPost.toUpperCase())
            ) {
              return po;
            }
          })
          .filter((p) => p.active === true)
          .map((post) => (
            <div className={styles.post} key={post._id}>
              <Link href={`/admin/posts/${post._id}`}>
                <a>{post.title}</a>
              </Link>
              <p>{post.description}</p>
              <div className={styles.actions}>
                <BiShowAlt
                  color="#afac81"
                  size="20"
                  onClick={() => inactivePost(post._id)}
                />
                <FiEdit2
                  color="#afac81"
                  size="18"
                  onClick={() => Router.push(`/admin/posts/${post._id}/edit`)}
                />

                <AiOutlineDelete
                  color="#afac81"
                  size="20"
                  onClick={() => deletePost(post._id)}
                />
              </div>
            </div>
          ))}
    </div>
  );
}
