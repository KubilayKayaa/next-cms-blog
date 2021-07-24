import styles from "./navbar.module.scss";
import { AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ userInfo }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.info}>
        <h1>{userInfo.data[0].fullName}</h1>
        <h3>{userInfo.data[0].title}</h3>
      </div>
      <div className={styles.socials}>
        {userInfo.data[0].instagram && (
          <Link href={`https://instagram.com/${userInfo.data[0].instagram}`}>
            <a target="_blank">
              <FiInstagram size="24" />
            </a>
          </Link>
        )}
        {userInfo.data[0].twitter && (
          <Link href={`https://twitter.com/${userInfo.data[0].twitter}`}>
            <a target="_blank">
              <AiOutlineTwitter size="24" />
            </a>
          </Link>
        )}

        {userInfo.data[0].github && (
          <Link href={`https://github.com/${userInfo.data[0].github}`}>
            <a target="_blank">
              <AiFillGithub size="24" />
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}
