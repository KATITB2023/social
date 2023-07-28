import { type NextPage } from "next";
import Layout from "~/layout";
import { Container, Heading, theme, Text, Box, Button } from "@chakra-ui/react";
import { ProfilePhotoSelectImage } from "~/components/ProfilePhotoSelectImage";
import { useState } from "react";

const Home: NextPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <Layout title="Home">

      <Container>Hello world </Container>
      <Heading size="SH1">SH1</Heading>
      <Heading size="H3">h3</Heading>
      <Heading size="H1">h1</Heading>
      <Heading size="H4">h2</Heading>
      <Heading>Default Heading</Heading>
      <Text>Default Text</Text>
      <Text size="B1">B1</Text>
      <Text size="B5">B5</Text>
      <Text size="A">Additional</Text>
      <ProfilePhotoSelectImage open={open} setOpen={setOpen}/>
    </Layout>
  );
};

export default Home;
