import React, { useState, useEffect } from "react";
import Redirect from "../../../components/Redirect";
import Navbar from "../../../components/admin/Navbar/Navbar";
import Search from "../../../components/admin/Posts/Search";
import styles from "./posts.module.scss";
import ActivePosts from "../../../components/admin/Posts/ActivePosts/ActivePosts";
import AddPost from "../../../components/admin/Posts/AddPost/AddPost";
import InActivePosts from "../../../components/admin/Posts/ActivePosts/InActivePosts";

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
              <h1></h1>
              <AddPost />
            </div>
            <h3>Active Posts</h3>
            <ActivePosts searchPost={searchPost} />
            <h3>Inactive Posts</h3>
            <InActivePosts searchPost={searchPost} />
          </div>
        </>
      );
    } else {
      return <Redirect to="/admin/auth/signin" />;
    }
  }
}
