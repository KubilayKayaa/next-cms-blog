import styles from "./posts.module.scss";
import Link from "next/link";
import Search from "../../admin/Posts/Search";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Posts({ postsInfo }) {
  const [searchPost, setSearchPost] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updateSize() {
      console.log(window.scrollY);
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.onscroll = () => {
      updateSize();
    };
  }, []);

  console.log(scrolled);

  return (
    <>
      <div
        className={
          scrolled
            ? styles.searchScrolled + "  " + styles.searchContainer
            : styles.searchContainer
        }
      >
        <Search
          placeholder="Search..."
          searchPost={searchPost}
          setSearchPost={setSearchPost}
          className={styles.search}
        />
      </div>
      <div className={styles.posts}>
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
              <div className={styles.postHeader}>
                {post.postImage &&
                  post.postImage.length != "" &&
                  post.postImage != "undefined" && (
                    <div className={styles.postImage}>
                      <Image
                        src={post.postImage}
                        alt={post.title}
                        layout="fixed"
                        width={160}
                        height={160}
                        objectFit="cover"
                        priority
                      />
                    </div>
                  )}
                <div>
                  <Link href={`/${post._id}`}>
                    <a className={styles.postTitle}>{post.title}</a>
                  </Link>
                  <p>{post.description}</p>
                </div>
              </div>
              <p className={styles.time}>{post.time.split("T")[0]}</p>
            </div>
          ))}
      </div>
    </>
  );
}
