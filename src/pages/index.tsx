import { type NextPage } from "next";
import Layout from "~/layout";
import { Container, Heading, theme, Text } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Navbar></Navbar>
    </Layout>
  );
};

export default Home;
