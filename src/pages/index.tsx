import type { NextPage } from "next";
import Head from "next/head";

import Main from "components/Main";

import { makeServer } from "server/server";

const Home: NextPage = () => {
  makeServer();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Main />
    </>
  );
};

export default Home;
