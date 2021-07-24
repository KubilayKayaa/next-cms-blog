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
      <Link href="/admin/posts">
        <a className={navbarStyles.navbarLogo}>Home</a>
      </Link>
      <div>
        <Link href="/admin">
          <a className={navbarStyles.navbarLink}>Change User Informations</a>
        </Link>
        <Link href="/">
          <a
            target="_blank"
            className={
              navbarStyles.navbarLinkItem +
              "  " +
              utilsStyles.tButton +
              "  " +
              navbarStyles.navbarLink
            }
          >
            See Live
          </a>
        </Link>
        <Link href="/admin/auth/createuser">
          <a
            target="_blank"
            className={
              navbarStyles.navbarLinkItem +
              "  " +
              utilsStyles.tButton +
              "  " +
              navbarStyles.navbarLink
            }
          >
            Create Admin User
          </a>
        </Link>

        <button
          onClick={signOut}
          className={utilsStyles.tButton + "  " + navbarStyles.navbarLink}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
