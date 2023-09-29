import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Preloader from "../src/components/preloader";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.push("/home", "/home", { shallow: true });
    }, 2000);
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Blog Generator" content="Generated by create next app" />
        <link rel="icon" href="/nb.png" type="image/x-icon" />
        <title>NextBit</title>
      </Head>
      <Preloader />
    </>
  );
}
