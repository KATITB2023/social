import { type NextPage } from "next";
import Layout from "~/layout";
import { Container, Heading, theme, Text, Box, Button, Image } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import BerhasilRequest from "~/components/PopupChat/BerhasilRequest";
import EhAdaApaNih from "~/components/PopupChat/EhAdaApaNih";
import KamuYakin from "~/components/PopupChat/KamuYakin";
import SatSetSatSet from "~/components/PopupChat/SatSetSatSet";
import SemogaLain from "~/components/PopupChat/SemogaLain";
import TemanmuMenolak from "~/components/PopupChat/TemanmuMenolak";
import YahTemanmu from "~/components/PopupChat/YahTemanmu";
import YayTemanmu from "~/components/PopupChat/YayTemenmu";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Navbar />
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
      <BerhasilRequest/>
      <EhAdaApaNih/>
      <KamuYakin/>
      <SatSetSatSet/>
      <SemogaLain/>
      <TemanmuMenolak/>
      <YahTemanmu/>
      <YayTemanmu/>
    </Layout>
  );
};

export default Home;