import React from "react";
import Layout from "~/layout";
import Footer from "~/components/Footer";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Heading } from "@chakra-ui/react";

export default function HimpunanInfo() {
  return (
    <Layout title="Himpunan: {Nama Himpunan}">
      <BackgroundAndNavbar bg="/background.png">
        <Center>
          {" "}
          <Heading> Info Himpunan </Heading>{" "}
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
