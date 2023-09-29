/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import styles from "../src/styles/notfound.module.scss";

const Page = () => {
  let Title = "404 : Page Not Found";

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta name="description" content="#" />
        <meta name="keywords" content="#" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{Title}</title>
      </Head>
      <h1>404</h1>
      <p>
        Oops! The Page you are looking for might have been removed, had it's
        name changed or is temporarily unavailabe.
      </p>
    </div>
  );
};

export default Page;
