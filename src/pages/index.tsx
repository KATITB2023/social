import { type NextPage } from "next";
import Layout from "~/layout";
import { Container, theme } from "@chakra-ui/react";
import { Theme } from "@chakra-ui/react";
import { color } from "framer-motion";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Container>Hello world </Container>
    </Layout>
  );
};

export default Home;
