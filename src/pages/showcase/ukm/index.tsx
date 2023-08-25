import React from "react";
import { Button, Flex, Heading, Icon, Link, Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import Footer from "~/components/Footer";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function UKMPage() {
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <BackgroundAndNavbar bg="/background.png">
        <Flex flexDirection="column" mx="5%">
        <Link href="/showcase">
        <ChevronLeftIcon boxSize="6" color="#C0EACA" />
        </Link>
        <Heading size="H4" textAlign="center" py="5%" color="yellow.5" dropShadow="0px 4px 30px 0px #72D8BA">Rumpun unit kegiatan mahasiswa</Heading>
        <Wrap justify={"space-evenly"} spacingX="20px" spacingY="25px">
          <ViewCard
            image="/background.png"
            title="Agama"
            route={"/"}
          />
          <ViewCard
            image="/background.png"
            title="Seni Budaya"
            route={"/"}
          />
          <ViewCard
            image="/background.png"
            title="Olagraga"
            route={"/"}
          />
          <ViewCard
            image="/background.png"
            title="Pendidikan"
            route={"/"}
          />
          <ViewCard
            image="/background.png"
            title="Kajian"
            route={"/"}
          />
          <ViewCard
            image="/background.png"
            title="Media"
            route={"/"}
          />
        </Wrap>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
