import React from "react";
import navbarStyles from "./navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import utilsStyles from "../../../styles/utils.module.scss";

export default function Navbar() {
  const Router = useRouter();

  const signOut = () => {
    sessionStorage.removeItem("user");
    Router.push("/admin/auth/signin");
  };

  return (
    <nav className={navbarStyles.navbar}>
      <Link href="/admin">
        <a className={navbarStyles.navbarLogo}>Home</a>
      </Link>
      <div>
        <Link href="/admin/posts">
          <a className={navbarStyles.navbarLink}>Posts</a>
        </Link>
        <button className={utilsStyles.tButton + " " + navbarStyles.navbarLink}>
          <Link href="/">
            <a target="_blank" className={navbarStyles.navbarLinkItem}>
              Live
            </a>
          </Link>
        </button>
        <button onClick={signOut} className={utilsStyles.tButton}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
