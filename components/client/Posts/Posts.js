import styles from "./posts.module.scss";
import Link from "next/link";
import Search from "../../admin/Posts/Search";
import { useState } from "react";

export default function Posts({ postsInfo }) {
  console.log(postsInfo);

  const [searchPost, setSearchPost] = useState("");

  return (
    <div className={styles.posts}>
      <Search
        placeholder="Search..."
        searchPost={searchPost}
        setSearchPost={setSearchPost}
        className={styles.search}
      />
      {postsInfo.data
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
            <Link href={`/${post._id}`}>
              <a className={styles.postTitle}>{post.title}</a>
            </Link>
            <p>{post.description}</p>
          </div>
        ))}
    </div>
  );
}
