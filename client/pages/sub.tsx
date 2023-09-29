/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../src/styles/sub.module.scss";

const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta name="description" content="#" />
        <meta name="keywords" content="#" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You! for Subscribing</title>
      </Head>
      <Image
        className={styles.img}
        src="/email.png"
        alt="letter"
        width={200}
        height={200}
        layout="intrinsic"
      />
      <h1>Thank You for Subscribing!</h1>
      <h2>Hi Anurag Goswami,</h2>
      <p>We are incredibly exicited to have you here.</p>
      <p>You have been added to our list and you will hear from us soon.</p>
    </div>
  );
};

export default Page;
