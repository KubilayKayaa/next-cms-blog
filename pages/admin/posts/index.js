import React, { useState, useEffect } from "react";
import Redirect from "../../../components/Redirect";
import Navbar from "../../../components/admin/Navbar/Navbar";
import Search from "../../../components/admin/Posts/Search";
import styles from "./posts.module.scss";
import ActivePosts from "../../../components/admin/Posts/ActivePosts/ActivePosts";
import AddPost from "../../../components/admin/Posts/AddPost/AddPost";

export default function Index() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPost, setSearchPost] = useState("");

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("user") ? true : false);
    setIsLoading(false);
  }, [isAuth]);

  if (isLoading) {
    return null;
  } else {
    if (isAuth == true) {
      return (
        <>
          <Navbar />
          <div className={styles.postsContainer}>
            <Search
              placeholder="Search posts..."
              searchPost={searchPost}
              setSearchPost={setSearchPost}
            />
            <div className={styles.header}>
              <h1>All Posts</h1>
              <AddPost />
            </div>
            <ActivePosts />
          </div>
        </>
      );
    } else {
      return <Redirect to="/admin/auth/signin" />;
    }
  }
}
