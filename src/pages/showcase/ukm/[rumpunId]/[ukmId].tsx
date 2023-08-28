import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Heading } from "@chakra-ui/react";

export default function UKMInfo() {
  return (
    <Layout title="UKM: {Nama UKM}">
      <BackgroundAndNavbar bg="/background.png">
        <Center>
          {" "}
          <Heading> Info UKM </Heading>{" "}
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
