import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../src/styles/nav.module.scss";
import { userDetails } from "../utils/userDetails";
import Head from "next/head";

const Navbar = ({ auth, title }) => {
  const placeholder = {
    _id: "",
    username: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };

  const [userDetails, SetuserDetails] = React.useState<userDetails>(
    JSON.parse(
      typeof auth !== "undefined" && auth !== undefined
        ? auth
        : JSON.stringify(placeholder)
    )
  );

  return (
    <nav className={styles.nav}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Link href="/">
        <a className={styles.headlink}>
          <Image
            src="/nb.png"
            alt="Vercel Logo"
            width={72}
            height={72}
            className={styles.logo}
          />
          <h1 className={styles.headlinktext}>{title}</h1>
        </a>
      </Link>
      <div className={styles.menu}>
        {userDetails.hasOwnProperty("username") &&
        userDetails.username.length > 0 ? (
          <Link href="/dashboard" as={`/dashboard`} passHref>
            <a className={styles.navDash} onClick={() => {}}>
              <div />
              <div>{userDetails.username}</div>
            </a>
          </Link>
        ) : (
          <Link href="/login" as="/login" passHref>
            <a className={styles.login}>Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
