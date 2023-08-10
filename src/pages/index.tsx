import { type NextPage } from "next";
import Layout from "~/layout";
import { Container, Heading, theme, Text, Box, Button, Image } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Navbar currentPage="Back to Home"/>
      <Container>Hello world </Container>
      <Heading size="SH1">SH1</Heading>
      <Heading size="H3">h3</Heading>
      <Heading size="H1">h1</Heading>
      <Heading size="H1">h1</Heading> 
      <Heading size="H1">h1</Heading>
      <Heading size="H1">h1</Heading>
      <Heading size="H1">h1</Heading>
      <Heading size="H1">h1</Heading>
      <Heading size="H4">h2</Heading>
      <Heading>Default Heading</Heading>
      <Text>Default Text</Text>
      <Text size="B1">B1</Text>
      <Text size="B5">B5</Text>
      <Text size="A">Additional</Text>
    </Layout>
  );
};

export default Home;