import styles from "../../../../pages/admin/posts/posts.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BiShowAlt } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivePosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const res = await fetch("http://localhost:3000/api/admin/posts");
    const data = await res.json();

    setPosts(data);
  };

  console.log(posts && posts.data.filter((p) => p.active === true));

  return (
    <div className={styles.posts}>
      {posts &&
        posts.data
          .filter((p) => p.active === true)
          .map((post) => (
            <div className={styles.post} key={post._id}>
              <Link href="#">
                <a>{post.title}</a>
              </Link>
              <p>{post.description}</p>
              <div className={styles.actions}>
                <BiShowAlt color="#afac81" size="20" />
                <FiEdit2 color="#afac81" size="18" />
                <AiOutlineDelete color="#afac81" size="20" />
              </div>
            </div>
          ))}
    </div>
  );
}
